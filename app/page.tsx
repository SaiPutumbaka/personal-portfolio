"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DISTRICTS,
  type DistrictId,
} from "@/components/districts";
import CentralHub from "@/components/CentralHub";
import HudCard from "@/components/HudCard";
import ProjectsDistrict from "@/components/districts/ProjectsDistrict";
import SkillsDistrict from "@/components/districts/SkillsDistrict";
import PersonalDistrict from "@/components/districts/PersonalDistrict";
import CommsDistrict from "@/components/districts/CommsDistrict";

const AtlantaScene = dynamic(() => import("@/components/AtlantaScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center text-atl-peach/70 font-mono text-xs tracking-[0.3em]">
      Loading Atlanta…
    </div>
  ),
});

const KEY_TO_DISTRICT: Record<string, DistrictId> = {
  ArrowUp: "north",
  ArrowDown: "south",
  ArrowLeft: "west",
  ArrowRight: "east",
  w: "north",
  s: "south",
  a: "west",
  d: "east",
};

export default function HomePage() {
  // Independent state: where the camera is (active) vs whether the HUD card is showing (cardOpen).
  const [active, setActive] = useState<DistrictId | null>(null);
  const [cardOpen, setCardOpen] = useState(false);

  const hubVisible = active === null;
  const inDistrict = active !== null;

  const enterDistrict = useCallback((id: DistrictId) => {
    setActive(id);
    setCardOpen(false); // travel first; user clicks the beacon to reveal info
  }, []);

  const openCard = useCallback(() => setCardOpen(true), []);
  const closeCard = useCallback(() => setCardOpen(false), []);

  const goHome = useCallback(() => {
    setActive(null);
    setCardOpen(false);
  }, []);

  // Keyboard:
  //   arrows / WASD → travel to a district
  //   Enter / Space → open card if in a district
  //   Esc           → if card open, close card; else go home
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (cardOpen) setCardOpen(false);
        else if (inDistrict) goHome();
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && inDistrict && !cardOpen) {
        e.preventDefault();
        setCardOpen(true);
        return;
      }
      const next = KEY_TO_DISTRICT[e.key];
      if (next) {
        setActive(next);
        setCardOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cardOpen, inDistrict, goHome]);

  const activeConfig = active ? DISTRICTS[active] : null;

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* 3D Atlanta — camera moves through the city when arrows are picked */}
      <div className="absolute inset-0 z-0">
        <AtlantaScene district={active} onBeaconClick={openCard} />
      </div>

      {/* Soft top + bottom gradients to keep UI legible over the 3D scene */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,19,34,0.72) 0%, rgba(9,19,34,0.35) 45%, rgba(9,19,34,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] z-10"
        style={{
          background:
            "linear-gradient(0deg, rgba(9,19,34,0.85) 0%, rgba(9,19,34,0.35) 60%, rgba(9,19,34,0) 100%)",
        }}
      />

      {/* Top bar */}
      <div className="absolute z-30 top-5 left-6 font-mono text-[11px] tracking-[0.22em] uppercase text-atl-peach/85">
        Sai Putumbaka · Atlanta
      </div>
      <div className="absolute z-30 top-5 right-6 font-mono text-[11px] tracking-[0.22em] uppercase text-atl-muted">
        {active ? activeConfig?.neighborhood : "Standing in the city"}
      </div>

      {/* Central Hub — photo + name + titles + arrows. Only at home. */}
      <CentralHub visible={hubVisible} onActivate={enterDistrict} />

      {/* In-district overlay: neighborhood title + hint to click the beacon */}
      <AnimatePresence>
        {inDistrict && !cardOpen && activeConfig && (
          <motion.div
            key={`district-overlay-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-x-0 top-[14vh] z-20 flex flex-col items-center text-center"
          >
            <div className="pill" style={{ marginBottom: 12 }}>
              {activeConfig.neighborhood}
            </div>
            <h2
              className="font-display font-bold leading-tight text-warm"
              style={{ fontSize: "clamp(2rem, 5.5vw, 3.6rem)" }}
            >
              {districtTitle(active)}
            </h2>
            <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-atl-muted/85 mt-3">
              Click the glowing beacon to read more
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "← Home" pill — visible whenever the user is in a district */}
      <AnimatePresence>
        {inDistrict && (
          <motion.button
            key="home-pill"
            type="button"
            onClick={goHome}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="absolute z-30 top-14 left-6 pointer-events-auto rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.22em] uppercase backdrop-blur-md transition hover:scale-105"
            style={{
              borderColor: "rgba(244,162,97,0.55)",
              background: "rgba(11,26,44,0.55)",
              color: "#f4a261",
            }}
            aria-label="Return to the plaza"
          >
            ← Back to plaza
          </motion.button>
        )}
      </AnimatePresence>

      {/* District HUD card */}
      <AnimatePresence mode="wait">
        {cardOpen && active && activeConfig && (
          <HudCard
            key={active}
            district={activeConfig}
            title={districtTitle(active)}
            onClose={closeCard}
          >
            {renderDistrict(active)}
          </HudCard>
        )}
      </AnimatePresence>

      {/* Footer hint — bottom-right so it doesn't sit behind the South arrow */}
      <div className="absolute bottom-3 right-6 z-30 font-mono text-[10px] tracking-[0.32em] uppercase text-atl-muted/70 text-right">
        {!inDistrict && "WASD · Arrows · pick a direction"}
        {inDistrict && !cardOpen && "Enter to open · Esc to return"}
        {cardOpen && "Esc to close · Back to keep exploring"}
      </div>
    </main>
  );
}

function renderDistrict(id: DistrictId) {
  switch (id) {
    case "north":
      return <ProjectsDistrict />;
    case "east":
      return <SkillsDistrict />;
    case "south":
      return <PersonalDistrict />;
    case "west":
      return <CommsDistrict />;
  }
}

function districtTitle(id: DistrictId): string {
  switch (id) {
    case "north":
      return "Projects";
    case "east":
      return "Skills & Playbook";
    case "south":
      return "About Sai";
    case "west":
      return "Get in touch";
  }
}
