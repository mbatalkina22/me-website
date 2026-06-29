"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, FolderOpen } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const name = "Mariia Batalkina";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-grid overflow-hidden"
    >
      {/* Radial neon glow behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(circle, #39ff14 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 max-w-4xl"
      >
        {/* Eyebrow badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 text-[#39ff14] text-sm font-medium tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Animated name */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none"
          aria-label={name}
        >
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className={`inline-block ${char === " " ? "w-6 sm:w-8" : ""}`}
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #a0a0a0 50%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl font-semibold tracking-wide"
          style={{ color: "#39ff14" }}
        >
          Software Engineer.{" "}
          <span className="text-[#ededed]/70">Former Elite Athlete.</span>
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base sm:text-lg text-[#ededed]/50 leading-relaxed font-light"
        >
          I don&apos;t just write code. I engineer high-performance digital
          experiences.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-px bg-[#39ff14]/40"
        />

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <motion.a
            href="#projects"
            id="hero-view-projects"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 20px rgba(57,255,20,0.5), 0 0 60px rgba(57,255,20,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#39ff14] text-black font-bold text-sm tracking-wide cursor-pointer select-none"
          >
            <FolderOpen size={16} />
            View Projects
          </motion.a>

          <motion.a
            href="#"
            id="hero-download-cv"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(57,255,20,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#39ff14]/50 bg-[#39ff14]/5 text-[#39ff14] font-bold text-sm tracking-wide cursor-pointer select-none hover:bg-[#39ff14]/10 transition-colors"
          >
            <ArrowDownToLine size={16} />
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#ededed]/30 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#39ff14]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
