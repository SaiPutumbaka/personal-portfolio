export type DistrictId = "north" | "south" | "east" | "west";

export interface DistrictConfig {
  id: DistrictId;
  label: string;
  neighborhood: string;
  subtitle: string;
  // Background zoom config: scale up + translate to pan to this region of the skyline image.
  // Values are tuned for the 2400x1000 atlanta-skyline.svg.
  bgScale: number;
  bgX: number; // px offset applied to the bg layer
  bgY: number;
  accent: "peach" | "gold" | "rust" | "blue";
}

// Home (centered) values
export const HOME = {
  bgScale: 1,
  bgX: 0,
  bgY: 0,
};

export const DISTRICTS: Record<DistrictId, DistrictConfig> = {
  north: {
    id: "north",
    label: "Projects",
    neighborhood: "Midtown · Tech Square",
    subtitle: "What I've built",
    bgScale: 1.6,
    bgX: 280,
    bgY: 60,
    accent: "peach",
  },
  east: {
    id: "east",
    label: "Skills",
    neighborhood: "Downtown · Five Points",
    subtitle: "The stack & the sales playbook",
    bgScale: 1.7,
    bgX: -380,
    bgY: 30,
    accent: "gold",
  },
  south: {
    id: "south",
    label: "About",
    neighborhood: "Buckhead · Piedmont Park",
    subtitle: "Who I am off the keyboard",
    bgScale: 1.55,
    bgX: 60,
    bgY: -80,
    accent: "rust",
  },
  west: {
    id: "west",
    label: "Contact",
    neighborhood: "Atlantic Station · Westside",
    subtitle: "Open a line",
    bgScale: 1.65,
    bgX: 380,
    bgY: 40,
    accent: "blue",
  },
};

export const DISTRICT_ORDER: DistrictId[] = ["north", "east", "south", "west"];

export const ACCENT_HEX: Record<DistrictConfig["accent"], string> = {
  peach: "#f4a261",
  gold: "#e9c46a",
  rust: "#c1432a",
  blue: "#5b9bd5",
};

/**
 * 3D world-space positions for each district's beacon — chosen to sit
 * in the camera's line of sight after the camera flies to that district.
 */
export const BEACON_POS: Record<DistrictId, [number, number, number]> = {
  north: [0, 8, -10],
  east:  [4, 6.5, -10],
  south: [0, 4, 2],
  west:  [-4, 6.5, -10],
};
