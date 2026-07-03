"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────── */

const TOTAL = 5;

/* ─── Per-block animation ranges ───────────────────────────────
 *
 *  Each of the 5 blocks owns 1/5 of scrollYProgress [0→1].
 *  Within its segment every block follows this arc:
 *    0%–28%  → emerge  (scale 0.3→1, opacity 0→1, blur 14→0)
 *   28%–62%  → in focus (hold)
 *   62%–100% → exit    (scale 1→2.2, opacity 1→0, blur 0→10)
 *
 *  Block 0 exception: already in focus at progress=0 (no entry anim).
 *  Block 4 exception: never exits — holds focus to end of scroll.
 * ─────────────────────────────────────────────────────────────*/

function getRanges(index: number): {
  input: [number, number, number, number];
  scale: [number, number, number, number];
  opacity: [number, number, number, number];
  blur: [number, number, number, number];
} {
  const seg = 1 / TOTAL;
  const start = index * seg;
  const end = (index + 1) * seg;
  const isFirst = index === 0;
  const isLast = index === TOTAL - 1;

  // 28% and 62% of each segment for enter/exit thresholds
  const focusStart = start + seg * 0.28;
  const focusEnd = start + seg * 0.62;

  return {
    // Block 0: both first keyframes are at 0/0.001 with equal outputs → already in focus on load
    // Block 4: last keyframe clamped to 1.0 → holds focus at end of scroll
    // All offsets stay within [0, 1] to satisfy WAAPI requirements
    input: [
      isFirst ? 0     : start,
      isFirst ? 0.001 : focusStart,
      focusEnd,
      isLast  ? 1.0   : end,
    ] as [number, number, number, number],

    scale: [
      isFirst ? 1 : 0.3, // start: first=in-focus, others=far away
      1,                  // enter focus
      1,                  // hold focus
      isLast ? 1 : 2.2,  // exit: last=stay, others=zoom past
    ] as [number, number, number, number],

    opacity: [
      isFirst ? 1 : 0,
      1,
      1,
      isLast ? 1 : 0,
    ] as [number, number, number, number],

    blur: [
      isFirst ? 0 : 14,
      0,
      0,
      isLast ? 0 : 10,
    ] as [number, number, number, number],
  };
}

/* ─── Individual cinematic block ────────────────────────────── */

function CinematicBlock({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const r = getRanges(index);
  const scale = useTransform(progress, r.input, r.scale);
  const opacity = useTransform(progress, r.input, r.opacity);
  const blurNum = useTransform(progress, r.input, r.blur);

  // Convert numeric blur to CSS filter string
  const filter = useTransform(blurNum, (v) => `blur(${v.toFixed(2)}px)`);

  return (
    <motion.div
      // All blocks are stacked full-screen; only the in-focus one is visible
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-10"
      style={{ scale, opacity, filter }}
    >
      {children}
    </motion.div>
  );
}

/* ─── CinematicScroll ───────────────────────────────────────── */

export default function CinematicScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track scroll through the tall outer container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Sync active block index for the progress indicator
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(TOTAL - 1, Math.floor(v * TOTAL)));
  });

  return (
    /*
     * Outer div: (TOTAL + 1) × 100vh tall — creates the scroll space.
     * Scrollable distance = 500vh for 5 blocks = 100vh per block.
     * The sticky inner viewport stays fixed while outer scrolls past.
     */
    <div
      ref={outerRef}
      id="manifesto"
      className="relative bg-[#0a0a0a]"
      style={{ height: `${(TOTAL + 1) * 100}vh` }}
    >
      {/* ── Sticky viewport ──────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">

        {/* Very subtle centre glow — doesn't distract from text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(192,132,252,0.05), transparent 65%)",
          }}
        />

        {/* ════════════════════════════════════════════════════
         *   BLOCK 1 — The Hook
         *   Largest text; immediately visible on page load.
         * ════════════════════════════════════════════════════ */}
        <CinematicBlock index={0} progress={scrollYProgress}>
          <div className="text-center max-w-5xl">
            <h1 className="text-[clamp(2.8rem,8.5vw,6.5rem)] font-black text-white leading-[0.9] tracking-tight">
              My name is
              <br />
              Mariia Batalkina.
            </h1>
          </div>
        </CinematicBlock>

        {/* ════════════════════════════════════════════════════
         *   BLOCK 2 — The Past
         * ════════════════════════════════════════════════════ */}
        <CinematicBlock index={1} progress={scrollYProgress}>
          <div className="text-center max-w-3xl">
            <p className="text-[clamp(1.2rem,3.2vw,2.2rem)] font-medium text-white/70 leading-snug">
              For{" "}
              <span className="text-white font-semibold">12 years</span>, I
              mastered the physical discipline, resilience, and absolute
              precision of professional ballet.
            </p>
          </div>
        </CinematicBlock>

        {/* ════════════════════════════════════════════════════
         *   BLOCK 3 — The Pivot
         * ════════════════════════════════════════════════════ */}
        <CinematicBlock index={2} progress={scrollYProgress}>
          <div className="text-center max-w-3xl">
            <p className="text-[clamp(1.2rem,3.2vw,2.2rem)] font-medium text-white/70 leading-snug">
              But I realized I didn&apos;t just want to perform on the stage.
              I wanted to{" "}
              <span className="text-white font-semibold">
                build the underlying architecture
              </span>
              .
            </p>
          </div>
        </CinematicBlock>

        {/* ════════════════════════════════════════════════════
         *   BLOCK 4 — The Drive
         * ════════════════════════════════════════════════════ */}
        <CinematicBlock index={3} progress={scrollYProgress}>
          <div className="text-center max-w-3xl">
            <p className="text-[clamp(1.2rem,3.2vw,2.2rem)] font-medium text-white/70 leading-snug">
              I never stop seeking the next challenge. Today, I am mastering
              the mechanics of balance and acceleration{" "}
              <span className="text-white font-semibold">on a motorcycle...</span>
            </p>
          </div>
        </CinematicBlock>

        {/* ════════════════════════════════════════════════════
         *   BLOCK 5 — The Craft / Final Destination
         *   Two-part layout: quiet lead-in + neon purple hero line.
         *   This block NEVER exits — it stays in focus at scroll end.
         * ════════════════════════════════════════════════════ */}
        <CinematicBlock index={4} progress={scrollYProgress}>
          <div className="text-center max-w-3xl space-y-6">
            <p className="text-[clamp(0.95rem,2.2vw,1.5rem)] font-light text-white/40 leading-relaxed tracking-wide">
              ...and channeling that exact same relentless drive into
            </p>
            <p className="text-[clamp(1.35rem,3.8vw,2.75rem)] font-bold text-[#c084fc] leading-snug">
              engineering secure, scalable{" "}
              <span className="text-white">Next.js</span> and{" "}
              <span className="text-white">Python</span>
              {" "}ecosystems.
            </p>
          </div>
        </CinematicBlock>

        {/* ── Progress pill indicator ─────────────────────────
         *   Active block → wider pill in neon purple.
         *   Inactive → narrow dot in dim white.
         * ──────────────────────────────────────────────────── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10"
          aria-hidden="true"
        >
          {Array.from({ length: TOTAL }, (_, i) => (
            <motion.div
              key={i}
              className="h-[3px] rounded-full"
              animate={{
                width: active === i ? 28 : 6,
                opacity: active === i ? 1 : 0.2,
                backgroundColor: active === i ? "#c084fc" : "#ffffff",
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
