"use client";

import { motion } from "framer-motion";
import { ACCENT_HEX, type DistrictConfig, type DistrictId } from "./districts";

interface Props {
  district: DistrictConfig;
  onActivate: (id: DistrictId) => void;
}

const ROTATION: Record<DistrictId, number> = {
  north: 0,
  east: 90,
  south: 180,
  west: 270,
};

const HOVER_OFFSET: Record<DistrictId, { x: number; y: number }> = {
  north: { x: 0, y: -6 },
  south: { x: 0, y: 6 },
  east: { x: 6, y: 0 },
  west: { x: -6, y: 0 },
};

const LABEL_LINE: Record<DistrictId, string> = {
  north: "Projects",
  east: "Skills",
  south: "About",
  west: "Contact",
};

// Whether the label sits above or below the arrow square.
const LABEL_BELOW: Record<DistrictId, boolean> = {
  north: false, // label above for the top arrow
  south: true,  // label below for the bottom arrow
  east: true,
  west: true,
};

export default function DirectionalArrow({ district, onActivate }: Props) {
  const accent = ACCENT_HEX[district.accent];
  const offset = HOVER_OFFSET[district.id];
  const labelBelow = LABEL_BELOW[district.id];

  const labelBlock = (
    <div className="text-center">
      <div
        className="font-display font-semibold text-[14px] leading-tight"
        style={{ color: accent, textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
      >
        {LABEL_LINE[district.id]}
      </div>
      <div className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-atl-muted mt-0.5 whitespace-nowrap">
        {district.neighborhood.split("·")[0].trim()}
      </div>
    </div>
  );

  return (
    <motion.button
      type="button"
      onClick={() => onActivate(district.id)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      whileHover={{ x: offset.x, y: offset.y, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group flex flex-col items-center gap-2 sheen-mask"
      aria-label={`Open ${LABEL_LINE[district.id]} district`}
    >
      {!labelBelow && labelBlock}
      <div
        className="relative px-3.5 py-2.5 rounded-xl backdrop-blur-md"
        style={{
          background: "rgba(11,26,44,0.6)",
          border: `1px solid ${accent}99`,
          boxShadow: `0 0 18px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 36 36"
          style={{ transform: `rotate(${ROTATION[district.id]}deg)` }}
        >
          <defs>
            <linearGradient id={`grad-${district.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="1" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M18 5 L29 21 L23 21 L23 31 L13 31 L13 21 L7 21 Z"
            fill={`url(#grad-${district.id})`}
            stroke={accent}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {labelBelow && labelBlock}
    </motion.button>
  );
}
