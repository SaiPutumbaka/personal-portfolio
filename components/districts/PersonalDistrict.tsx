"use client";

import { motion } from "framer-motion";

const FACTS = [
  {
    label: "Education",
    value: "BBA · CIS & Data Analytics — Georgia State University (Graduated)",
  },
  {
    label: "Honors",
    value: "GPA 3.6 · Dean's List · Robinson College of Business",
  },
  {
    label: "Based · Languages",
    value: "Atlanta, GA · English · Telugu (fluent)",
  },
];

const INTERESTS = [
  { label: "Basketball", note: "Youth coach · Mavericks fan (Flagg era)" },
  { label: "Personal Training", note: "Strength + discipline is a habit" },
  { label: "Forensics", note: "Declamation · 3× tournament winner" },
  { label: "Music & Anime", note: "The Weeknd #1 · AoT all-time #1" },
];

export default function PersonalDistrict() {
  return (
    <div className="space-y-6">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[15.5px] leading-relaxed text-atl-cream"
      >
        Graduated from{" "}
        <span className="text-atl-gold font-semibold">
          Georgia State University
        </span>{" "}
        with a{" "}
        <span className="text-atl-peach font-semibold">
          BBA in Computer Information Systems &amp; Data Analytics
        </span>
        . I work across data analytics, IT consulting, and B2B sales —
        building dashboards and systems that turn messy operations into
        decisions, while keeping a foot in the customer conversation.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {FACTS.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="rounded-lg border border-atl-peach/30 bg-atl-peach/[0.06] p-4"
          >
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-atl-peach mb-1.5">
              {f.label}
            </div>
            <div className="font-body text-[15px] text-white leading-snug">
              {f.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-atl-gold mb-3">
          Off the keyboard
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {INTERESTS.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="font-display font-semibold text-white text-[15px]">
                {it.label}
              </div>
              <div className="text-[12.5px] text-atl-muted mt-1 leading-snug">
                {it.note}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
