"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/* ─── Eyebrow label ─────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] text-[#c084fc]/40 tracking-[0.3em] uppercase mb-5 select-none">
      {children}
    </p>
  );
}

/* ─── Single manifesto block ────────────────────────────────── */
/*
 * Geometry: beam column is w-8 (32px). Beam center = 16px from flex container.
 * This block's left edge = content-col left edge = 32px from flex container.
 * Dot: left=-22px → left edge at 32-22=10px, center=10+6=16px ✓
 */
function ManifestoBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div ref={ref} className="relative pl-10 sm:pl-14 mb-48 last:mb-0">
      {/* Glowing dot — always center-aligned with the beam */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute top-3 w-3 h-3 rounded-full bg-[#c084fc] border-2 border-[#0a0a0a]"
        style={{
          left: "-22px",
          boxShadow:
            "0 0 14px rgba(192,132,252,0.9), 0 0 30px rgba(192,132,252,0.4)",
        }}
      />

      {/* Text — fades up on viewport entry */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── NarrativeManifesto ────────────────────────────────────── */
export default function NarrativeManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  /* Measure the content block so the beam knows its maximum extent */
  useEffect(() => {
    const measure = () => {
      if (contentRef.current) setContentH(contentRef.current.scrollHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  /* Drive the beam with scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  /* beamH goes 0 → full content height as user scrolls through */
  const beamH = useTransform(smoothed, [0, 1], [0, contentH]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-screen bg-[#0a0a0a] py-24 sm:py-32 px-6 sm:px-10"
    >
      {/* ── Ambient neon glow (top-left) ──────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[700px] h-[500px] opacity-[0.07] blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at top left, #c084fc, transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="flex">

          {/* ══ Beam column ════════════════════════════════════════
           *  Fixed 32px (w-8) wide. Everything in the content column
           *  is offset by this width, so dots can extend back into it.
           * ══════════════════════════════════════════════════════ */}
          <div className="relative flex-none w-8" aria-hidden="true">
            {/* Static track — subtle background line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#1e1e1e]" />

            {/* Animated glow — grows as user scrolls.
             *  left: 15px (= 16px center − 1px for 2px width, no transforms
             *  to avoid Framer Motion inline-style conflicts with CSS classes) */}
            <motion.div
              className="absolute top-0 w-[2px] rounded-full"
              style={{
                left: "15px",
                height: beamH,
                background:
                  "linear-gradient(to bottom, #c084fc 0%, #9333ea 80%, transparent 100%)",
                boxShadow:
                  "0 0 10px rgba(192,132,252,0.8), 0 0 26px rgba(192,132,252,0.3)",
              }}
            />
          </div>

          {/* ══ Content column ════════════════════════════════════ */}
          <div ref={contentRef} className="flex-1">

            {/* ── Block 1: The Hook & Name ─────────────────────── */}
            <ManifestoBlock>
              <Label>01 — Identity</Label>
              <h1 className="text-[clamp(2.8rem,7.5vw,5.75rem)] font-black leading-[0.9] tracking-tight">
                <span className="block text-white/30 font-light text-[0.42em] tracking-normal mb-3">
                  My name is
                </span>
                <span className="text-white">Mariia Batalkina.</span>
              </h1>
            </ManifestoBlock>

            {/* ── Block 2: The Discipline ──────────────────────── */}
            <ManifestoBlock>
              <Label>02 — Foundation</Label>
              <p className="text-[clamp(1.2rem,3vw,2.1rem)] font-semibold text-white/75 leading-snug">
                For{" "}
                <span className="text-white">12 years</span>, I mastered the
                physical discipline, resilience, and absolute precision of{" "}
                <span className="text-white font-bold italic">
                  professional ballet
                </span>
                .
              </p>
            </ManifestoBlock>

            {/* ── Block 3: The Drive ───────────────────────────── */}
            <ManifestoBlock>
              <Label>03 — The Drive</Label>
              <p className="text-[clamp(1.05rem,2.6vw,1.85rem)] font-light text-white/60 leading-relaxed">
                I never stop seeking the next challenge. Currently mastering
                the mechanics of balance and acceleration{" "}
                <span className="text-white font-medium">
                  on a motorcycle.
                </span>
              </p>
            </ManifestoBlock>

            {/* ── Block 4: The Craft / Engineering Title ───────── */}
            <ManifestoBlock>
              <Label>04 — The Craft</Label>
              <div className="space-y-5">
                {/* Lead-in — intentionally quiet */}
                <p className="text-[clamp(0.9rem,2vw,1.25rem)] text-white/35 font-light leading-relaxed">
                  Today, I channel that exact same relentless drive into my
                  craft:
                </p>
                {/* Hero statement — neon purple, bold */}
                <p className="text-[clamp(1.2rem,3vw,2.1rem)] font-bold text-[#c084fc] leading-snug">
                  Engineering secure, scalable Next.js and Python web
                  architectures.
                </p>
              </div>
            </ManifestoBlock>

          </div>
        </div>
      </div>

      {/* ── Subtle scroll hint — visible until user scrolls ───── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase font-mono">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#c084fc]/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
