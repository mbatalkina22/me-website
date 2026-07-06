"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  tags: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    id: "ai-backend",
    title: "Multi-Tenant AI Backend",
    problem: "Unstructured AI data is notoriously hard to secure and validate.",
    solution:
      "Engineered an agentic lookup layer using Python, Pydantic AI, and a Qdrant Vector DB to enforce strict user data segregation.",
    tags: ["Python", "Pydantic AI", "Qdrant", "Vector DB", "AI"],
    gradient: "from-[#c084fc]/10 via-transparent to-transparent",
  },
  {
    id: "glitchlab",
    title: "GlitchLab Modernization",
    problem:
      "Manual operational workflows were slowing down processes and creating security risks.",
    solution:
      "Acted as the sole engineer to build a secure, Role-Based Access Control (RBAC) platform from scratch using Next.js and MongoDB.",
    tags: ["Next.js", "MongoDB", "RBAC", "TypeScript"],
    gradient: "from-[#c084fc]/10 via-transparent to-transparent",
  },
];

function TiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  }

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        id={`project-card-${project.id}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl border border-[#222] bg-[#111] overflow-hidden cursor-default h-full"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            background: isHovered
              ? `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(192,132,252,0.10) 0%, transparent 60%)`
              : "none",
          }}
        />

        <div
          className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${project.gradient} pointer-events-none`}
        />

        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c084fc] to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10 p-8 flex flex-col gap-6">
          <span className="font-mono text-[#c084fc]/40 text-xs tracking-widest">
            0{projects.indexOf(project) + 1}
          </span>

          <h3 className="text-2xl font-black text-white leading-tight">
            {project.title}
          </h3>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#c084fc]/60">
              The Problem
            </p>
            <p className="text-[#ededed]/60 text-sm leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="w-full h-px bg-[#222]" />

          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#c084fc]/60">
              The Solution
            </p>
            <p className="text-[#ededed]/80 text-sm leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono border border-[#c084fc]/25 bg-[#c084fc]/5 text-[#c084fc]/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[#c084fc] text-sm font-semibold tracking-widest uppercase mb-3">
            Selected Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            The Playground
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
