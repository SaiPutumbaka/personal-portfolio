"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DISTRICTS,
  type DistrictId,
} from "./districts";
import DirectionalArrow from "./DirectionalArrow";

interface Props {
  visible: boolean;
  onActivate: (id: DistrictId) => void;
}

/**
 * Centered hub: photo + name + titles in the middle, with the four
 * directional arrows positioned just outside the cluster (N/S/E/W).
 */
export default function CentralHub({ visible, onActivate }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
        >
          {/* Cluster — fixed-width box so arrows have a stable frame */}
          <div className="relative w-[min(560px,88vw)] flex flex-col items-center text-center">
            <Portrait />

            <div className="pill mt-3 mb-2">
              <span
                style={{
                  background: "#f4a261",
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  display: "inline-block",
                }}
              />
              Atlanta, GA
            </div>

            <h1
              className="font-display font-bold leading-[0.95] tracking-tight text-warm animate-warmGlow"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}
            >
              Sai Putumbaka
            </h1>

            <div className="peach-rule w-[min(380px,70%)] mt-4 mb-3" />

            <p
              className="font-body text-atl-cream/90 max-w-[520px] mx-auto"
              style={{
                fontSize: "clamp(0.78rem, 1.05vw, 0.92rem)",
                letterSpacing: "0.02em",
              }}
            >
              <span className="text-atl-peach font-semibold">Data Analytics</span>
              <span className="text-atl-muted mx-2">·</span>
              <span className="text-atl-gold font-semibold">AI Analytics</span>
              <span className="text-atl-muted mx-2">·</span>
              <span className="text-atl-peach font-semibold">Financial Analytics</span>
              <span className="text-atl-muted mx-2">·</span>
              <span className="text-atl-gold font-semibold">B2B Sales</span>
            </p>

            {/* Cardinal arrows positioned around the cluster.
                Each arrow renders itself; we only place it via absolute offsets. */}
            {/* North — above the portrait */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-28 md:-top-32 pointer-events-auto">
              <DirectionalArrow
                district={DISTRICTS.north}
                onActivate={onActivate}
              />
            </div>
            {/* South — below the titles */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-24 md:-bottom-28 pointer-events-auto">
              <DirectionalArrow
                district={DISTRICTS.south}
                onActivate={onActivate}
              />
            </div>
            {/* East — to the right of the name */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-8 lg:-right-20 pointer-events-auto">
              <DirectionalArrow
                district={DISTRICTS.east}
                onActivate={onActivate}
              />
            </div>
            {/* West — to the left of the name */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-8 lg:-left-20 pointer-events-auto">
              <DirectionalArrow
                district={DISTRICTS.west}
                onActivate={onActivate}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Portrait() {
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasPhoto(true);
    img.onerror = () => setHasPhoto(false);
    img.src = "/sai.jpg";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative"
    >
      <div
        className="relative w-[clamp(140px,18vw,200px)] aspect-square rounded-full overflow-hidden border-2"
        style={{
          borderColor: "rgba(244,162,97,0.7)",
          boxShadow:
            "0 0 36px rgba(244,162,97,0.55), 0 0 90px rgba(233,196,106,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/sai.jpg"
            alt="Sai Putumbaka"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 18%" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-atl-deep">
            <div className="font-display text-5xl text-atl-peach">SP</div>
          </div>
        )}
      </div>
      {/* warm ring pulse */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none animate-floatY"
        style={{
          boxShadow: "0 0 60px rgba(244,162,97,0.35)",
        }}
      />
    </motion.div>
  );
}
