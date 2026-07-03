"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─── Data ─────────────────────────────────────────────────────── */

const nodes = [
  {
    id: "discipline",
    num: "01",
    title: "The Discipline",
    body: "12 years as a professional ballet dancer taught me resilience, precision, and how to perform flawlessly under pressure.",
  },
  {
    id: "drive",
    num: "02",
    title: "The Drive",
    body: "I never stop seeking the next challenge. Currently mastering the mechanics of balance and acceleration on a motorcycle.",
  },
  {
    id: "craft",
    num: "03",
    title: "The Craft",
    body: "Today, I channel that exact same physical discipline into building secure, scalable Next.js and TypeScript architectures.",
  },
];

/* ─── Beam geometry constants ───────────────────────────────────
 *  The beam track sits at left: 12px (left-3) from the container.
 *  The glow is 2px wide starting at left: 11px → center at 12px.
 *  Each dot is 12px (w-3) with left-3 + -translate-x-1/2 → center 12px.
 *  Text content starts at pl-12 (48px) to clear the beam.
 * ───────────────────────────────────────────────────────────── */

/* ─── Individual node ───────────────────────────────────────── */

function BeamNode({ node }: { node: (typeof nodes)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  // Fire when 80px of the node has entered the viewport
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div ref={ref} className="relative pl-12 pb-20 last:pb-0">
      {/* Glowing dot — centered on the beam line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-3 top-[6px] w-3 h-3 rounded-full bg-[#c084fc] -translate-x-1/2 border-2 border-[#0a0a0a]"
        style={{
          boxShadow:
            "0 0 14px rgba(192,132,252,0.9), 0 0 28px rgba(192,132,252,0.4)",
        }}
      />

      {/* Text — slides in from the left as it enters view */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.12,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <p className="font-mono text-xs text-[#c084fc]/50 tracking-widest uppercase mb-2">
          {node.num}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          {node.title}
        </h3>
        <p className="text-[#ededed]/55 text-base leading-relaxed max-w-lg">
          {node.body}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── TracingBeam section ───────────────────────────────────── */

export default function TracingBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  // Measure the nodes block height so the beam knows its max extent
  useEffect(() => {
    const measure = () => {
      if (contentRef.current) setContentH(contentRef.current.scrollHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Spring-smooth the raw scroll progress → buttery beam movement
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 50,
    restDelta: 0.001,
  });

  // Map 0→1 scroll to 0→contentH pixels of drawn beam
  const beamH = useTransform(smoothed, [0, 1], [0, contentH]);

  return (
    <section id="about" className="py-24 px-6">
      <div ref={containerRef} className="max-w-2xl mx-auto">

        {/* ── Section header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-[#c084fc] text-sm font-semibold tracking-widest uppercase mb-3">
            Who I Am
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Athlete Spirit
          </h2>
          <p className="mt-4 text-[#ededed]/50 max-w-md mx-auto text-base">
            Three core traits forged outside the keyboard that define how I
            think and build.
          </p>
        </motion.div>

        {/* ── Beam + nodes ────────────────────────────────── */}
        <div className="relative">

          {/* Static track line — full height background */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#222]" />

          {/* Animated glow beam — height driven by scroll */}
          <motion.div
            className="absolute left-[11px] top-0 w-[2px] rounded-full"
            style={{
              height: beamH,
              background:
                "linear-gradient(to bottom, transparent 0%, #c084fc 15%, #9333ea 80%, transparent 100%)",
              boxShadow:
                "0 0 8px rgba(192,132,252,0.75), 0 0 22px rgba(192,132,252,0.28)",
            }}
          />

          {/* Nodes */}
          <div ref={contentRef}>
            {nodes.map((node) => (
              <BeamNode key={node.id} node={node} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
