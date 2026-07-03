"use client";

import { motion } from "framer-motion";
import { Activity, Wind, Zap, type LucideIcon } from "lucide-react";

interface Card {
  id: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  accent: string;
}

const cards: Card[] = [
  {
    id: "discipline",
    Icon: Activity,
    title: "The Discipline",
    body: "12 years as a professional ballet dancer taught me resilience, precision, and how to perform flawlessly under pressure.",
    accent: "Resilience · Precision · Pressure",
  },
  {
    id: "drive",
    Icon: Wind,
    title: "The Drive",
    body: "I never stop seeking the next challenge. Currently mastering the mechanics of balance and acceleration on a motorcycle.",
    accent: "Curiosity · Balance · Speed",
  },
  {
    id: "craft",
    Icon: Zap,
    title: "The Craft",
    body: "Today, I channel that exact same physical discipline into building secure, scalable Next.js and TypeScript architectures.",
    accent: "Security · Scale · Craft",
  },
];

// Container orchestrates the stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.05,
    },
  },
};

// Each card fades in and slides up — no bounce, pure ease
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function AthleteSpirit() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-[#c084fc] text-sm font-semibold tracking-widest uppercase mb-3">
            Who I Am
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Athlete Spirit
          </h2>
          <p className="mt-4 text-[#ededed]/50 max-w-xl mx-auto text-base">
            Three core traits forged outside the keyboard that define how I
            think and build inside it.
          </p>
        </motion.div>

        {/* ── Cards grid — layout UNCHANGED ─────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map(({ id, Icon, title, body, accent }) => (
            <motion.div
              key={id}
              id={`athlete-card-${id}`}
              variants={cardVariants}
              whileHover={{
                y: -4,
                boxShadow: "0 0 0 1px rgba(192,132,252,0.35), 0 8px 32px rgba(192,132,252,0.08)",
                transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
              }}
              className="group relative rounded-2xl border border-[#222] bg-[#111] p-8 overflow-hidden cursor-default"
            >
              {/* Subtle radial glow — visible only on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top center, rgba(192,132,252,0.05) 0%, transparent 65%)",
                }}
              />

              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#c084fc]/8 text-[#c084fc]">
                <Icon size={20} strokeWidth={1.75} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c084fc] transition-colors duration-300">
                {title}
              </h3>

              {/* Body */}
              <p className="text-[#ededed]/60 text-sm leading-relaxed mb-6">
                {body}
              </p>

              {/* Accent tags — revealed on hover */}
              <div className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-xs text-[#c084fc]/65 font-mono tracking-wider">
                  {accent}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
