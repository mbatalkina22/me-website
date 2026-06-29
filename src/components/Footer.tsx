"use client";

import { motion } from "framer-motion";
import { GitFork, Link2, Mail } from "lucide-react";

const links = [
  {
    id: "footer-github",
    href: "https://github.com",
    icon: GitFork,
    label: "GitHub",
  },
  {
    id: "footer-linkedin",
    href: "https://linkedin.com",
    icon: Link2,
    label: "LinkedIn",
  },
  {
    id: "footer-email",
    href: "mailto:hello@example.com",
    icon: Mail,
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative py-20 px-6 border-t border-[#1a1a1a]">
      {/* Subtle neon top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(57,255,20,0.5), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 text-center">
        {/* Main CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#39ff14] text-xs font-semibold tracking-widest uppercase mb-4">
            Let&apos;s Connect
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight">
            Ready to commit{" "}
            <span
              className="neon-text-glow"
              style={{ color: "#39ff14" }}
            >
              100%
            </span>{" "}
            to the next challenge.
          </h2>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mt-2"
        >
          {links.map(({ id, href, icon: Icon, label }) => (
            <motion.a
              key={id}
              id={id}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[#222] bg-[#111] text-[#ededed]/50 hover:text-[#39ff14] hover:border-[#39ff14]/50 hover:bg-[#39ff14]/5 transition-colors duration-300"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-[#1a1a1a] mt-4" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 text-xs text-[#ededed]/30"
        >
          <p>
            © {new Date().getFullYear()} Mariia Batalkina. All rights reserved.
          </p>
          <p className="font-mono">
            Built with{" "}
            <span className="text-[#39ff14]/60">Next.js · Tailwind · Framer Motion</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
