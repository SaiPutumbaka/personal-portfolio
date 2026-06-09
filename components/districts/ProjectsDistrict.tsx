"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    tag: "Deep Learning",
    title: "Customer Churn Prediction",
    blurb:
      "A deep learning model that predicts customer churn using a Multi-Layer Perceptron (MLP) and Decision Tree, served through a clean, interactive Streamlit dashboard. Users can adjust customer attributes and instantly see churn probability driven by the trained models.",
    stack: ["Python", "TensorFlow", "Scikit-learn", "Streamlit", "Pandas"],
    link: "https://churn-prediction-dashboard-sai.streamlit.app/",
  },
  {
    tag: "Agentic AI",
    title: "AI Resume Strategist",
    blurb:
      "A multi-agent system that tailors resume bullet points to specific job postings for ATS optimization. Agents coordinate to rewrite content, applying delta patching and regex cleaning to produce precise, structure-preserving edits — all wrapped in a Streamlit interface.",
    stack: ["Python", "Multi-Agent", "LLMs", "Regex", "Streamlit"],
    link: "https://ai-resume-strategist.streamlit.app/",
  },
  {
    tag: "Backend Development",
    title: "SecureOps REST API",
    blurb:
      "A REST API built with .NET and C# that handles data-entry communication between a frontend user and a backend database. Provides clean, secure endpoints for create/read operations with structured persistence. Full source available on GitHub.",
    stack: [".NET", "C#", "REST API", "SQL", "Entity Framework"],
    link: "https://github.com/SaiPutumbaka/SecureOpsAPI",
  },
  {
    tag: "Web Development",
    title: "Modern Web · This Portfolio",
    blurb:
      "Production-grade Next.js + TypeScript builds with motion-heavy UI and 3D scenes — including this immersive Atlanta portfolio (React Three Fiber, Framer Motion, Tailwind).",
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
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[12px] tracking-wide text-atl-peach hover:text-white transition"
            >
              View Project <span aria-hidden>→</span>
            </a>
          )}
        </motion.article>
      ))}
    </div>
  );
}
