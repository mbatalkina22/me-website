"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ─── Word data ─────────────────────────────────────────────── */

const WORDS = [
  {
    id: "precision",
    label: "PRECISION.",
    story:
      "12 years of professional ballet. I mastered physical resilience and absolute form. Today, I treat zero-regression code architecture with that exact same rigor.",
  },
  {
    id: "velocity",
    label: "VELOCITY.",
    story:
      "I never stop seeking the next challenge. Whether calculating racing lines on a motorcycle or navigating technical downhill mountain bike trails, I thrive on mastering mechanics and calculated risk.",
  },
  {
    id: "architecture",
    label: "ARCHITECTURE.",
    story:
      "I am ready to commit 100% to my next challenge: channeling this relentless drive into engineering secure, multi-tenant AI backends and high-performance Next.js ecosystems.",
  },
] as const;

/* ─── KineticWord ────────────────────────────────────────────── */
/*
 * Layout chain for smooth sibling animations:
 *
 *   outer container  [layout]       ← tracks its own height change
 *     h2             [layout="position"]  ← tracks only its position
 *     AnimatePresence > story div   ← mounts/unmounts the text
 *
 * When one word expands, Framer Motion re-measures all sibling
 * KineticWord containers (which also have `layout`) and animates
 * them to their new y positions.
 *
 * onHoverStart / onHoverEnd drive the active state.
 * onClick toggles it for touch devices (tap-to-expand/collapse).
 */
function KineticWord({
  label,
  story,
  delay,
}: {
  label: string;
  story: string;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false); /* click-lock for mobile */
  const isActive = isHovered || isLocked;

  return (
    <motion.div
      layout /* ← this element re-animates when its height changes */
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsLocked((v) => !v)}
      className="cursor-default"
    >
      {/* ── The massive word ──────────────────────────────────── */}
      <motion.h2
        layout="position"
        animate={{
          color: isActive
            ? "#c084fc"
            : "rgba(255, 255, 255, 0.11)",
          filter: isActive
            ? "drop-shadow(0 0 28px rgba(192, 132, 252, 0.55)) drop-shadow(0 0 60px rgba(192, 132, 252, 0.2))"
            : "drop-shadow(0 0 0px rgba(192, 132, 252, 0))",
          x: isActive ? 4 : 0,
        }}
        transition={{ duration: 0.38, ease: EASE }}
        className="
          select-none font-black tracking-tighter leading-none
          text-[clamp(3.2rem,9.5vw,8.5rem)]
        "
      >
        {label}
      </motion.h2>

      {/* ── Story text — mounts/unmounts with AnimatePresence ─── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 8,
              transition: { duration: 0.15, ease: EASE },
            }}
            transition={{ duration: 0.4, ease: EASE }}
            className="pt-3 pb-6 pl-1"
          >
            {/* Purple left-border accent */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.3, ease: EASE }}
              className="border-l-2 border-purple-500/40 pl-5 max-w-2xl"
            >
              <p className="text-white/45 text-base sm:text-[1.05rem] leading-relaxed font-light">
                {story}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── HeroManifesto ─────────────────────────────────────────── */

export default function HeroManifesto() {
  return (
    <section
      id="hero"
      className="
        relative min-h-screen bg-[#0a0a0a]
        flex flex-col justify-center
        px-6 sm:px-12 lg:px-20 xl:px-28
        py-20
        overflow-hidden
      "
    >
      {/* ── Ambient glow — top-left, editorial feel ─────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[700px] h-[500px] blur-[120px]"
        style={{
          opacity: 0.12,
          background:
            "radial-gradient(ellipse at 15% 25%, #c084fc 0%, transparent 60%)",
        }}
      />

      {/* ── Hook text ───────────────────────────────────────────
       *   Name + location, then instruction hint below it.
       * ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE }}
        className="mb-10 sm:mb-14 relative z-10"
      >
        <p className="text-white/50 text-sm sm:text-[0.95rem] font-light tracking-wide leading-relaxed">
          Mariia Batalkina. Software Engineer. Based in Switzerland.
        </p>
        <p className="mt-2 text-[10px] sm:text-[11px] text-white/18 tracking-[0.25em] uppercase font-mono">
          Hover to expand the timeline.
        </p>
      </motion.div>

      {/* ── Kinetic words container ─────────────────────────────
       *
       *   `layout` here is REQUIRED so that when one KineticWord
       *   expands, Framer Motion detects the container's layout
       *   has changed and can animate siblings.
       *
       *   Each KineticWord also has `layout` so its own y-position
       *   change is animated (the slide-down of subsequent words).
       * ────────────────────────────────────────────────────── */}
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="relative z-10 flex flex-col"
      >
        {WORDS.map((w, i) => (
          <KineticWord
            key={w.id}
            label={w.label}
            story={w.story}
            delay={0.38 + i * 0.12}
          />
        ))}
      </motion.div>
    </section>
  );
}
