"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = "easeInOut";
const DURATION = 0.4;

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
      "I never stop seeking the next challenge. Whether calculating racing lines on a motorcycle or navigating downhill trails, I thrive on mastering mechanics and calculated risk.",
  },
  {
    id: "architecture",
    label: "ARCHITECTURE.",
    story:
      "Today, I am based in Switzerland and ready to commit 100% to channeling this relentless drive into engineering secure, multi-tenant AI backends and high-performance Next.js ecosystems.",
  },
] as const;

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
  const [isLocked, setIsLocked] = useState(false);
  const isActive = isHovered || isLocked;

  return (
    <motion.div
      layout
      transition={{ duration: DURATION, ease: EASE }}
      className="flex flex-col cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsLocked((v) => !v)}
    >
      <motion.h2
        layout
        transition={{ duration: DURATION, ease: EASE }}
        initial={{ opacity: 0, x: -28 }}
        animate={{
          opacity: 1,
          x: 0,
          color: isActive ? "#c084fc" : "rgba(255, 255, 255, 0.11)",
          filter: isActive
            ? "drop-shadow(0 0 28px rgba(192,132,252,0.55)) drop-shadow(0 0 60px rgba(192,132,252,0.2))"
            : "drop-shadow(0 0 0px rgba(192,132,252,0))",
        }}
        className="select-none font-black tracking-tighter leading-none text-7xl md:text-9xl"
      >
        {label}
      </motion.h2>

      <AnimatePresence>
        {isActive && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-6 pl-2">
              <div className="border-l-2 border-purple-500/40 pl-5 max-w-2xl">
                <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
                  {story}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HeroManifesto() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[700px] h-[500px] blur-[120px]"
        style={{
          opacity: 0.12,
          background: "radial-gradient(ellipse at 15% 25%, #c084fc 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
        className="mb-10 sm:mb-14 relative z-10"
      >
        <p className="text-white/50 text-sm sm:text-[0.95rem] font-light tracking-wide leading-relaxed">
          Mariia Batalkina. Software Engineer. Based in Switzerland.
        </p>
        <p className="mt-2 text-[10px] sm:text-[11px] text-white/18 tracking-[0.25em] uppercase font-mono">
          Hover to expand the timeline.
        </p>
      </motion.div>

      <motion.div
        layout
        transition={{ duration: DURATION, ease: EASE }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex flex-col gap-2"
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
