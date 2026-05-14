"use client";

import { motion } from "framer-motion";

interface Group {
  heading: string;
  items: string[];
  accent: "peach" | "gold";
}

const TECH: Group[] = [
  {
    heading: "Languages",
    accent: "peach",
    items: ["Python", "SQL", "R", "TypeScript", "JavaScript"],
  },
  {
    heading: "Analytics & BI",
    accent: "gold",
    items: ["Power BI", "Tableau", "KPI Dashboards", "Pandas", "Performance Metrics"],
  },
  {
    heading: "Office Suite (MOS Certified)",
    accent: "peach",
    items: ["Excel", "PowerPoint", "Word"],
  },
  {
    heading: "Enterprise Systems",
    accent: "gold",
    items: ["ServiceNow", "SAP", "ATS", "IT Operations", "Incident Management"],
  },
  {
    heading: "Web Development",
    accent: "peach",
    items: ["Next.js", "React", "Tailwind", "Framer Motion", "Three.js / R3F"],
  },
  {
    heading: "Security & Compliance",
    accent: "gold",
    items: ["CompTIA Security+", "Access Controls", "Compliance Workflows", "Data Handling"],
  },
];

const SALES: Group[] = [
  {
    heading: "B2B / B2C Methodologies",
    accent: "peach",
    items: [
      "Prospecting",
      "Qualification",
      "Consultative Selling",
      "Account Management",
    ],
  },
  {
    heading: "GTM Execution",
    accent: "gold",
    items: [
      "Outbound Campaigns (door-to-door · phone · signage)",
      "Proposal & Estimate Development",
      "Lead Generation",
      "Repeat & Referral Growth",
    ],
  },
];

export default function SkillsDistrict() {
  return (
    <div className="space-y-8">
      <Section title="Technical Stack" groups={TECH} />
      <Section title="B2B Sales Playbook" groups={SALES} />
    </div>
  );
}

function Section({ title, groups }: { title: string; groups: Group[] }) {
  return (
    <div>
      <h3 className="font-display font-bold text-lg text-white mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.heading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <div
              className={`font-mono text-[10px] tracking-[0.22em] uppercase mb-2 ${
                g.accent === "peach" ? "text-atl-peach" : "text-atl-gold"
              }`}
            >
              {g.heading}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="font-body text-[13px] px-2.5 py-1 rounded-md border border-white/15 bg-white/[0.04] text-atl-cream"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
