"use client";

import { motion } from "framer-motion";
import { GitFork, Link2, Mail } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const LINKS = [
  {
    id: "footer-github",
    href: "https://github.com/mbatalkina22",
    icon: GitFork,
    label: "GitHub",
  },
  {
    id: "footer-linkedin",
    href: "https://linkedin.com/in/mariia-batalkina",
    icon: Link2,
    label: "LinkedIn",
  },
  {
    id: "footer-email",
    href: "mailto:mari.batalkina@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#0a0a0a] pt-28 pb-14 px-6">

      {/* ── Neon top-border glow ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(192,132,252,0.45), transparent)",
        }}
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 text-center">

        {/* ── Eyebrow + heading ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex flex-col items-center gap-2"
        >
          {/* Eyebrow — matches Toolkit "TECHNOLOGIES" label exactly */}
          <p className="text-sm uppercase tracking-[0.2em] text-purple-400 font-semibold">
            Next Challenge
          </p>

          {/* Heading — matches Toolkit "The Toolkit" size exactly */}
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Let&apos;s connect.
          </h2>
        </motion.div>

        {/* ── Social icons ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
          className="flex items-center gap-8"
        >
          {LINKS.map(({ id, href, icon: Icon, label }, i) => (
            <motion.a
              key={id}
              id={id}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 + i * 0.08, ease: EASE }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="group flex items-center justify-center w-14 h-14 rounded-full
                         bg-neutral-900 border border-white/10
                         hover:bg-white/10 hover:border-purple-500/50
                         transition-all duration-300"
            >
              <Icon
                size={22}
                strokeWidth={2}
                className="text-neutral-300 group-hover:text-purple-400 transition-colors duration-300"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div className="w-full h-px bg-white/[0.05] mt-2" />

        {/* ── Copyright bar ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 text-[11px] text-white/20"
        >
          <p>© {new Date().getFullYear()} Mariia Batalkina. All rights reserved.</p>
          <p className="font-mono">
            Next.js ·{" "}
            <span className="text-[#c084fc]/40">Tailwind · Framer Motion</span>
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
