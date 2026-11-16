"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface TimelineItem {
  id: string;
  period: string;
  title: string;
  place: string;
  description: string;
}

const items: TimelineItem[] = [
  {
    id: "msc-usi",
    period: "Sep 2026 — Present",
    title: "M.Sc. Financial Technology and Computing",
    place: "USI, Lugano",
    description:
      "Advanced track, focusing on AI and machine learning electives.",
  },
  {
    id: "neural-wave",
    period: "2026",
    title: "Co-Organizer, Neural Wave AI Hackathon",
    place: "USI, Lugano",
    description:
      "Registration and participant coordination for an AI hackathon with 100+ participants.",
  },
  {
    id: "adesso",
    period: "Jan 2026 — Apr 2026",
    title: "Software Engineering Intern",
    place: "adesso Schweiz AG, Lugano",
    description:
      "Built the backend of a monitoring system (Java/Spring Boot) that traces every request from external systems through its full lifecycle, with retry logic so each request is completed with all the data it needs.",
  },
  {
    id: "soraswiss",
    period: "May 2024 — Dec 2025",
    title: "Software Engineer (Project-Based)",
    place: "SoraSwiss, Lugano",
    description:
      "Delivered full-stack client projects end to end, from e-commerce sites to restaurant automation platforms.",
  },
  {
    id: "bsc-usi",
    period: "2022 — 2025",
    title: "B.Sc. Computer Science",
    place: "USI, Lugano",
    description:
      "Bachelor's thesis: GlitchLab, a full-stack registration platform used by a real client.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[#c084fc] text-sm font-semibold tracking-widest uppercase mb-3">
            Experience & Education
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            The Journey
          </h2>
        </motion.div>

        <ol className="relative border-l border-[#c084fc]/25 ml-2 space-y-10">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              id={`experience-${item.id}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="relative pl-8"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#c084fc] shadow-[0_0_12px_rgba(192,132,252,0.6)]"
              />
              <p className="font-mono text-xs tracking-widest uppercase text-[#c084fc]/70">
                {item.period}
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-[#ededed]/50">{item.place}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#ededed]/75 max-w-2xl">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
