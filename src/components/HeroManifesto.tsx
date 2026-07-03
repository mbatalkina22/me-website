"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Target, Gauge, Zap } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ─── Card data ─────────────────────────────────────────────── */

const CARDS = [
  {
    id: "discipline",
    icon: Target,
    title: "The Discipline",
    description:
      "For 12 years, I mastered the physical resilience and absolute precision of professional ballet. I treat zero-regression code architecture with the exact same rigor.",
  },
  {
    id: "drive",
    icon: Gauge,
    title: "The Drive",
    description:
      "I never stop seeking the next challenge. Currently mastering the mechanics of balance and acceleration on a motorcycle to keep my growth mindset sharp.",
  },
  {
    id: "craft",
    icon: Zap,
    title: "The Craft",
    description:
      "Today, I channel that relentless drive into engineering secure, multi-tenant AI backends and high-performance Next.js ecosystems.",
  },
] as const;

/* ─── Aceternity-style 3D tilt card ─────────────────────────── */
/*
 * Architecture:
 *   perspective wrapper (CSS perspective: 1200px)
 *     └── card body motion.div (rotateX, rotateY via useSpring,
 *                               transformStyle: preserve-3d)
 *           ├── icon  motion.div  (translateZ: 60 → pops toward viewer)
 *           ├── title motion.div  (translateZ: 40 → mid-depth)
 *           └── desc  motion.div  (translateZ: 20 → subtle depth,
 *                                  opacity 0→1 on hover)
 */
function StoryCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  /* Raw rotation values driven directly by mouse position */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  /* Spring-smooth the rotation for buttery feel */
  const smoothRotateX = useSpring(rotateX, { stiffness: 280, damping: 28, mass: 0.5 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 280, damping: 28, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    /* Map cursor position to ±12deg tilt */
    rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -12);
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 12);
  };

  const handleMouseLeave = () => {
    /* Spring back to flat */
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    /* Perspective container — must NOT have transform itself */
    <div style={{ perspective: "1200px" }} className="w-full">
      <motion.div
        ref={cardRef}
        /* ── Transform state (MotionValues bypass animate engine) ── */
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d", /* must be on parent for child translateZ */
        }}
        /* ── Glow/shadow driven by animate (normal Framer engine) ── */
        animate={{
          boxShadow: isHovered
            ? "0 0 45px rgba(192,132,252,0.22), 0 0 90px rgba(192,132,252,0.08), 0 32px 64px -16px rgba(0,0,0,0.95)"
            : "0 20px 40px -16px rgba(0,0,0,0.65)",
        }}
        transition={{
          /* Box shadow transitions independently of the spring rotation */
          boxShadow: { duration: 0.5, ease: "easeOut" },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        /* ── Visual styles — border color driven by JS hover state ── */
        className={[
          "relative w-full min-h-[320px] rounded-2xl p-8 cursor-default",
          "bg-neutral-900 border",
          "transition-colors duration-500",
          isHovered ? "border-purple-500/30" : "border-white/[0.07]",
        ].join(" ")}
      >
        {/* ── Icon (translateZ: 60 — pops most toward viewer) ──── */}
        <motion.div
          style={{ translateZ: 60 }}
          animate={{
            backgroundColor: isHovered
              ? "rgba(192,132,252,0.13)"
              : "rgba(255,255,255,0.04)",
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-6 w-11 h-11 flex items-center justify-center rounded-xl"
        >
          <Icon
            size={20}
            className={`transition-colors duration-300 ${
              isHovered ? "text-[#c084fc]" : "text-white/35"
            }`}
          />
        </motion.div>

        {/* ── Title (translateZ: 40) ─────────────────────────────── */}
        <motion.div style={{ translateZ: 40 }}>
          <h3 className="text-xl font-bold text-white tracking-tight mb-5 leading-tight">
            {title}
          </h3>
        </motion.div>

        {/* ── Description — fades in + slides up on hover ─────── */}
        {/*   translateZ: 20 composes with animate {y, opacity}    */}
        <motion.div
          style={{ translateZ: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <p className="text-sm text-white/55 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* ── "Hover to reveal" hint — fades out on hover ─────── */}
        <motion.span
          style={{ translateZ: 20 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="absolute bottom-8 left-8 text-[10px] text-white/18 font-mono tracking-[0.22em] uppercase select-none"
          aria-hidden="true"
        >
          hover to reveal
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ─── HeroManifesto ─────────────────────────────────────────── */

export default function HeroManifesto() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-24 sm:py-32 overflow-hidden"
    >
      {/* ── Ambient purple glow — top-center ──────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] blur-[130px]"
        style={{
          opacity: 0.18,
          background:
            "radial-gradient(ellipse at center top, #c084fc 0%, transparent 55%)",
        }}
      />

      {/* ── Hero header ─────────────────────────────────────────
       *   Three staggered fade-up animations:
       *   name → 0s, sub-headline → +0.15s, tagline → +0.3s
       * ────────────────────────────────────────────────────── */}
      <div className="text-center mb-16 sm:mb-20 max-w-4xl relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-[clamp(3rem,9vw,7rem)] font-black text-white leading-[0.88] tracking-tight mb-5"
        >
          Mariia Batalkina
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
          className="text-[clamp(1rem,2.4vw,1.3rem)] font-semibold text-[#c084fc] tracking-wide mb-4"
        >
          Software Engineer. Former Elite Athlete.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
          className="text-sm sm:text-base text-white/25 leading-relaxed max-w-md mx-auto"
        >
          Hover the cards below to see how 12 years of physical discipline
          engineered my approach to scalable web architecture.
        </motion.p>
      </div>

      {/* ── 3D Story cards ──────────────────────────────────────
       *   grid-cols-1 on mobile → grid-cols-3 on md+
       *   Slight delay so they animate after the header
       * ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl relative z-10"
      >
        {CARDS.map((card) => (
          <StoryCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </motion.div>
    </section>
  );
}
