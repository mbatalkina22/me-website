"use client";

import { motion } from "framer-motion";

const skills = [
  { label: "React", icon: "⚛️" },
  { label: "Next.js", icon: "▲" },
  { label: "TypeScript", icon: "TS" },
  { label: "Python", icon: "🐍" },
  { label: "PostgreSQL", icon: "🐘" },
  { label: "Tailwind CSS", icon: "🎨" },
  { label: "Docker", icon: "🐳" },
  { label: "Kubernetes", icon: "☸️" },
  { label: "Pydantic AI", icon: "🤖" },
];

// Duplicate the list for seamless infinite loop
const doubled = [...skills, ...skills];

export default function SkillsMarquee() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#c084fc] text-sm font-semibold tracking-widest uppercase mb-3">
            Technologies
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            The Toolkit
          </h2>
          <p className="mt-4 text-[#ededed]/50 max-w-xl mx-auto text-base">
            Tools I use to turn complex problems into elegant, production-ready
            systems.
          </p>
        </motion.div>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{
            background: "linear-gradient(to right, #0a0a0a, transparent)"
          }}
        />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{
            background: "linear-gradient(to left, #0a0a0a, transparent)"
          }}
        />

        {/* Scrolling strip */}
        <div
          className="flex animate-marquee w-max"
          aria-label="Technology skills ticker"
        >
          {doubled.map((skill, i) => (
            <div
              key={`${skill.label}-${i}`}
              className="group flex items-center gap-3 mx-4 px-6 py-3.5 rounded-full border border-[#222] bg-[#111] hover:border-[#c084fc]/50 hover:bg-[#c084fc]/5 transition-all duration-300 cursor-default select-none whitespace-nowrap"
            >
              <span
                className="text-lg leading-none font-mono w-6 text-center text-[#c084fc]/60 group-hover:text-[#c084fc] transition-colors duration-300"
                aria-hidden="true"
              >
                {skill.icon}
              </span>
              <span className="text-sm font-semibold text-[#ededed]/70 group-hover:text-[#ededed] transition-colors duration-300 tracking-wide">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
