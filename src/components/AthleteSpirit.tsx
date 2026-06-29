"use client";

import { motion } from "framer-motion";

const cards = [
  {
    id: "discipline",
    emoji: "🩰",
    title: "The Discipline",
    body: "12 years as a professional ballet dancer taught me resilience, precision, and how to perform flawlessly under pressure.",
    accent: "Resilience · Precision · Pressure",
  },
  {
    id: "drive",
    emoji: "🏍️",
    title: "The Drive",
    body: "I never stop seeking the next challenge. Currently mastering the mechanics of balance and acceleration on a motorcycle.",
    accent: "Curiosity · Balance · Speed",
  },
  {
    id: "craft",
    emoji: "⚡",
    title: "The Craft",
    body: "Today, I channel that exact same physical discipline into building secure, scalable Next.js and TypeScript architectures.",
    accent: "Security · Scale · Craft",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function AthleteSpirit() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[#39ff14] text-sm font-semibold tracking-widest uppercase mb-3">
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

        {/* Cards grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              id={`athlete-card-${card.id}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl border border-[#222] bg-[#111] p-8 overflow-hidden cursor-default"
            >
              {/* Neon top line that extends on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39ff14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at top center, rgba(57,255,20,0.06) 0%, transparent 70%)"
                }}
              />

              {/* Emoji */}
              <motion.div
                className="text-4xl mb-6 inline-block"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                {card.emoji}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#39ff14] transition-colors duration-300">
                {card.title}
              </h3>

              {/* Body text — slides up on hover */}
              <p className="text-[#ededed]/60 text-sm leading-relaxed mb-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                {card.body}
              </p>

              {/* Accent tags — hidden until hover */}
              <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                <p className="text-xs text-[#39ff14]/70 font-mono tracking-wider">
                  {card.accent}
                </p>
              </div>

              {/* Bottom corner decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at bottom right, #39ff14, transparent)"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
