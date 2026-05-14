"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    tag: "Data Analytics",
    title: "Dashboards & Data Quality at GPC",
    blurb:
      "At Genuine Parts Company (NAPA Auto Parts), standardized data quality across 500+ franchise locations and built Power BI dashboards leadership uses to track risk, incidents, and compliance KPIs. Automated data pipelines and system health checks improved traceability and cut downtime.",
    stack: ["Power BI", "Python", "SQL", "R", "Pipelines"],
  },
  {
    tag: "IT Consulting",
    title: "Systems Integration at HB Global",
    blurb:
      "Built and governed structured data repositories for 2,000+ applicants and project records across regulated client environments. Integrated ATS, ServiceNow, and SAP-aligned systems to support traceable audits and onboarding — and shipped operational dashboards for project risk and vendor performance.",
    stack: ["ServiceNow", "SAP", "ATS", "Power BI", "Compliance"],
  },
  {
    tag: "Financial Analytics",
    title: "Cost, Pricing & Market Analysis",
    blurb:
      "Built Excel-based proposal and cost-tracking models used by leadership to assess pricing, risk, and regulatory exposure across customer jobs. Authored a SWOT / FDI advisement proposal for car-sales expansion into Canada and visualized regional performance with Tableau heatmaps.",
    stack: ["Excel", "PowerPoint", "Power BI", "Tableau", "SWOT / FDI"],
  },
  {
    tag: "Web Development",
    title: "Modern Web · This Portfolio",
    blurb:
      "Production-grade Next.js + TypeScript builds with motion-heavy UI and 3D scenes — including this immersive Atlanta portfolio (React Three Fiber, Framer Motion, Tailwind). Also: Activity Planet, an application-development project currently in-progress.",
    stack: ["Next.js", "TypeScript", "React Three Fiber", "Tailwind", "Framer Motion"],
  },
];

export default function ProjectsDistrict() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PROJECTS.map((p, i) => (
        <motion.article
          key={p.tag}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
          className="rounded-xl border border-atl-peach/30 bg-atl-deep/70 p-5 hover:border-atl-peach/70 transition"
        >
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-atl-peach mb-2">
            {p.tag}
          </div>
          <h3 className="font-display font-bold text-xl text-white leading-snug mb-2">
            {p.title}
          </h3>
          <p className="text-[14.5px] leading-relaxed text-atl-cream/90 mb-4">
            {p.blurb}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] px-2 py-0.5 rounded-md border border-atl-gold/40 text-atl-gold/90 bg-atl-gold/5"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
