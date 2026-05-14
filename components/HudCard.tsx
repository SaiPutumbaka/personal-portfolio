"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { ACCENT_HEX, type DistrictConfig } from "./districts";

interface Props {
  district: DistrictConfig;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function HudCard({ district, title, onClose, children }: Props) {
  const accent = ACCENT_HEX[district.accent];

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center p-4">
      <motion.div
        key={district.id}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto w-[min(960px,94vw)] max-h-[84vh] card-frame glass-card relative"
        style={{
          boxShadow: `0 30px 80px -10px rgba(0,0,0,0.7), 0 0 0 1px ${accent}55, 0 0 60px ${accent}33`,
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-[18px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            boxShadow: `0 0 14px ${accent}`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-7 pt-6 pb-4">
          <div className="min-w-0">
            <div className="pill" style={{ borderColor: `${accent}66`, color: accent, background: `${accent}14` }}>
              <span style={{ background: accent, width: 6, height: 6, borderRadius: 999, display: "inline-block" }} />
              {district.neighborhood}
            </div>
            <h2
              className="font-display font-bold mt-3 leading-tight text-3xl md:text-4xl text-white"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              {title}
            </h2>
            <p className="text-atl-muted text-sm md:text-[15px] mt-1">{district.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition hover:scale-105"
            style={{
              borderColor: `${accent}80`,
              color: accent,
              background: `${accent}10`,
            }}
            aria-label="Close card and keep exploring"
          >
            Close ✕
          </button>
        </div>

        <div
          className="mx-7 mb-4 h-px"
          style={{
            background: `linear-gradient(90deg, ${accent}80, transparent)`,
          }}
        />

        {/* Body */}
        <div className="px-7 pb-8 pt-1 overflow-y-auto hud-scroll max-h-[60vh]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
