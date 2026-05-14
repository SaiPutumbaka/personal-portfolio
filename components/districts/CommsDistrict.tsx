"use client";

import { motion } from "framer-motion";

const CHANNELS = [
  {
    name: "Email",
    handle: "saiputumbaka323@gmail.com",
    href: "mailto:saiputumbaka323@gmail.com",
    cta: "Send a note",
  },
  {
    name: "Phone",
    handle: "(908) 529-7536",
    href: "tel:+19085297536",
    cta: "Give a call",
  },
  {
    name: "LinkedIn",
    handle: "in/saiputumbaka",
    href: "https://www.linkedin.com/in/saiputumbaka",
    cta: "Connect",
  },
  {
    name: "GitHub",
    handle: "@saiputumbaka",
    href: "https://github.com/saiputumbaka",
    cta: "See the code",
  },
];

export default function CommsDistrict() {
  return (
    <div className="space-y-5">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[15px] leading-relaxed text-atl-cream/90 max-w-2xl"
      >
        Open to{" "}
        <span className="text-atl-peach font-semibold">full-time roles</span>,{" "}
        <span className="text-atl-peach font-semibold">consulting</span>, and
        interesting builds. Atlanta-based (US citizen), happy to relocate or
        work remote. Fastest reply is by email.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CHANNELS.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.href}
            target={
              c.href.startsWith("mailto:") || c.href.startsWith("tel:")
                ? undefined
                : "_blank"
            }
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            whileHover={{ y: -3 }}
            className="group rounded-xl border border-atl-peach/30 bg-white/[0.03] p-5 block hover:border-atl-peach transition-colors"
          >
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-atl-peach mb-2">
              {c.name}
            </div>
            <div className="font-display font-semibold text-white text-[17px] break-all leading-tight">
              {c.handle}
            </div>
            <div className="mt-4 flex items-center gap-2 text-atl-gold text-[13px] font-mono">
              <span>{c.cta}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
