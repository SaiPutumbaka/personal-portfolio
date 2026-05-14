import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atl: {
          // Sky / background tones — Atlanta at dusk
          sky: "#0b1a2c",
          deep: "#091322",
          dusk: "#1d3557",
          // Warm Georgia peach + gold accents
          peach: "#f4a261",
          gold: "#e9c46a",
          amber: "#f9a826",
          // Text tones
          cream: "#f8f1e3",
          ink: "#e9eef7",
          muted: "#a8b8c8",
          // Falcons-adjacent deep red as a secondary accent
          rust: "#c1432a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        warm:
          "0 0 18px rgba(244,162,97,0.45), 0 0 48px rgba(233,196,106,0.25)",
        card:
          "0 30px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(244,162,97,0.25)",
      },
      keyframes: {
        floatY: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        warmGlow: {
          "0%,100%": {
            textShadow:
              "0 0 12px rgba(244,162,97,0.55), 0 0 28px rgba(233,196,106,0.35)",
          },
          "50%": {
            textShadow:
              "0 0 18px rgba(244,162,97,0.85), 0 0 48px rgba(233,196,106,0.55)",
          },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        sheen: "sheen 3.5s ease-in-out infinite",
        warmGlow: "warmGlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
