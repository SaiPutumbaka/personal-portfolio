"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Sparkles, Stars } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  ACCENT_HEX,
  BEACON_POS,
  DISTRICTS,
  type DistrictId,
} from "./districts";

/**
 * Atlanta dusk skyline rendered in 3D. Procedural buildings + hand-placed
 * recognizable landmarks. Camera flies between viewpoints when the active
 * district changes, giving the feel of moving through the city.
 */
interface SceneProps {
  district: DistrictId | null;
  onBeaconClick: (id: DistrictId) => void;
}

export default function AtlantaScene({ district, onBeaconClick }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 4.5, 18], fov: 55, near: 0.1, far: 220 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
    >
      {/* Dusk sky color + warm fog */}
      <color attach="background" args={["#0c1a2e"]} />
      <fog attach="fog" args={["#1a2f4e", 22, 95]} />

      {/* Sky dome with vertical dusk gradient */}
      <SkyDome />

      {/* Sun glow at the horizon */}
      <SunGlow />

      {/* Lights */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[0, 4, -40]}
        intensity={1.6}
        color="#f4a261"
      />
      <pointLight position={[0, 12, 8]} intensity={0.7} color="#e9c46a" distance={45} />
      <pointLight position={[-15, 3, -8]} intensity={0.5} color="#c1432a" distance={30} />
      <pointLight position={[15, 3, -8]} intensity={0.5} color="#5b9bd5" distance={30} />

      {/* Stars in upper sky */}
      <Stars radius={120} depth={50} count={2200} factor={3.5} fade speed={0.3} />

      {/* The city */}
      <Ground />
      <CityLandmarks />
      <BackgroundBuildings />
      <ForegroundBuildings />

      {/* Warm dust / fireflies between buildings */}
      <Sparkles count={80} scale={[40, 8, 30]} size={2.5} speed={0.25} color="#f4a261" />

      {/* Pulsing beacon — only visible when a district is active */}
      {district && (
        <Beacon
          position={BEACON_POS[district]}
          color={ACCENT_HEX[DISTRICTS[district].accent]}
          onClick={() => onBeaconClick(district)}
        />
      )}

      <CameraRig district={district} />
    </Canvas>
  );
}

/* ---------------- Sky dome ---------------- */

function SkyDome() {
  const uniforms = useMemo(
    () => ({
      topColor: { value: new THREE.Color("#06101e") },
      midColor: { value: new THREE.Color("#3a274a") },
      horizonColor: { value: new THREE.Color("#e07a45") },
    }),
    []
  );

  return (
    <mesh scale={[1, 1, 1]}>
      <sphereGeometry args={[100, 32, 16]} />
      <shaderMaterial
        side={THREE.BackSide}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 midColor;
          uniform vec3 horizonColor;
          varying vec3 vPos;
          void main() {
            float h = normalize(vPos).y;
            float t = clamp(h * 0.5 + 0.5, 0.0, 1.0);
            vec3 col = mix(horizonColor, midColor, smoothstep(0.45, 0.62, t));
            col = mix(col, topColor, smoothstep(0.62, 0.95, t));
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function SunGlow() {
  return (
    <mesh position={[0, 1.5, -55]}>
      <sphereGeometry args={[14, 32, 32]} />
      <meshBasicMaterial
        color="#ffd9a8"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------------- Ground ---------------- */

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
        <planeGeometry args={[260, 220]} />
        <meshStandardMaterial color="#080d1a" roughness={1} metalness={0.05} />
      </mesh>
      {/* Subtle peach reflection strip near horizon */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -38]}>
        <planeGeometry args={[120, 16]} />
        <meshBasicMaterial color="#3a1c1a" transparent opacity={0.55} />
      </mesh>
    </>
  );
}

/* ---------------- Buildings ---------------- */

interface Building {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  kind?: "spire" | "pyramid" | "cylinder" | "twin" | "step";
  hue?: number; // 0..1 → fraction along peach/blue spectrum
}

// Hand-placed iconic Atlanta landmarks along the central downtown line.
const LANDMARKS: Building[] = [
  // One Atlantic Center (Midtown, pyramidal top)
  { x: -10, z: -14, w: 2.2, d: 2.2, h: 11, kind: "pyramid", hue: 0.3 },
  // GLG Grand / Promenade II
  { x: -7, z: -14, w: 1.4, d: 1.4, h: 9.5, kind: "step", hue: 0.25 },
  // 1180 Peachtree
  { x: -4.5, z: -14, w: 1.6, d: 1.6, h: 10, hue: 0.35 },
  // Bank of America Plaza — iconic spire (Midtown's tallest)
  { x: 0, z: -15, w: 2.6, d: 2.6, h: 14.5, kind: "spire", hue: 0.5 },
  // SunTrust / Truist Plaza (stepped)
  { x: 3.5, z: -14, w: 2, d: 2, h: 11.5, kind: "step", hue: 0.45 },
  // Westin Peachtree Plaza (cylinder)
  { x: 6.5, z: -14, w: 1.6, d: 1.6, h: 11, kind: "cylinder", hue: 0.55 },
  // 191 Peachtree Towers (twin pyramids)
  { x: 9.5, z: -14, w: 1.3, d: 1.3, h: 10.5, kind: "pyramid", hue: 0.6 },
  { x: 11.2, z: -14, w: 1.3, d: 1.3, h: 10.5, kind: "pyramid", hue: 0.6 },
  // Truist Park / right-side block
  { x: 14, z: -14, w: 1.8, d: 1.8, h: 9, kind: "pyramid", hue: 0.65 },
];

function CityLandmarks() {
  return (
    <group>
      {LANDMARKS.map((b, i) => (
        <BuildingMesh key={`lm-${i}`} b={b} variant="near" />
      ))}
    </group>
  );
}

function BackgroundBuildings() {
  // Procedural backdrop — denser block of generic buildings further behind.
  const buildings = useMemo<Building[]>(() => {
    const rng = mulberry32(91);
    const arr: Building[] = [];
    for (let i = 0; i < 120; i++) {
      arr.push({
        x: (rng() - 0.5) * 60,
        z: -22 - rng() * 28,
        w: 0.9 + rng() * 1.4,
        d: 0.9 + rng() * 1.4,
        h: 2 + rng() * 7,
        hue: rng(),
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <BuildingMesh key={`bg-${i}`} b={b} variant="far" />
      ))}
    </group>
  );
}

function ForegroundBuildings() {
  // Smaller buildings to either side, closer to camera, framing the view.
  const buildings = useMemo<Building[]>(() => {
    const rng = mulberry32(2025);
    const arr: Building[] = [];
    for (let i = 0; i < 36; i++) {
      const side = rng() > 0.5 ? 1 : -1;
      arr.push({
        x: side * (10 + rng() * 18),
        z: -2 - rng() * 10,
        w: 1.2 + rng() * 1.6,
        d: 1.2 + rng() * 1.6,
        h: 1.5 + rng() * 4.5,
        hue: rng(),
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <BuildingMesh key={`fg-${i}`} b={b} variant="mid" />
      ))}
    </group>
  );
}

function BuildingMesh({ b, variant }: { b: Building; variant: "near" | "mid" | "far" }) {
  // Slate-toned dark building. Hue controls warmth of accent strip.
  const base = variant === "far" ? "#0a1424" : "#0b1a2e";
  const accentColor = useMemo(() => {
    const c = new THREE.Color();
    // Interpolate peach → blue
    const peach = new THREE.Color("#f4a261");
    const blue = new THREE.Color("#5b9bd5");
    c.copy(peach).lerp(blue, b.hue ?? 0.5);
    return c;
  }, [b.hue]);

  const halfH = b.h / 2;

  return (
    <group position={[b.x, halfH, b.z]}>
      {/* Main body */}
      {b.kind === "cylinder" ? (
        <mesh>
          <cylinderGeometry args={[b.w / 2, b.w / 2, b.h, 24]} />
          <meshStandardMaterial color={base} roughness={0.85} metalness={0.15} />
        </mesh>
      ) : (
        <mesh>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color={base} roughness={0.85} metalness={0.15} />
        </mesh>
      )}

      {/* Pyramidal top */}
      {b.kind === "pyramid" && (
        <mesh position={[0, halfH + b.w * 0.35, 0]}>
          <coneGeometry args={[b.w * 0.72, b.w * 0.7, 4]} />
          <meshStandardMaterial color={base} roughness={0.85} metalness={0.15} />
        </mesh>
      )}

      {/* Iconic spire (BoA Plaza) */}
      {b.kind === "spire" && (
        <>
          <mesh position={[0, halfH + b.w * 0.4, 0]}>
            <coneGeometry args={[b.w * 0.6, b.w * 0.9, 4]} />
            <meshStandardMaterial
              color="#0d1a2f"
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
          {/* Lit crown */}
          <mesh position={[0, halfH + b.w * 0.85, 0]}>
            <boxGeometry args={[0.12, 1.0, 0.12]} />
            <meshStandardMaterial
              color="#f4a261"
              emissive="#f4a261"
              emissiveIntensity={2.2}
            />
          </mesh>
        </>
      )}

      {/* Stepped top */}
      {b.kind === "step" && (
        <mesh position={[0, halfH + b.h * 0.05, 0]}>
          <boxGeometry args={[b.w * 0.65, b.h * 0.12, b.d * 0.65]} />
          <meshStandardMaterial color={base} roughness={0.85} metalness={0.15} />
        </mesh>
      )}

      {/* Warm window lights — emissive plane on the front face */}
      {variant !== "far" && (
        <WindowsFace b={b} accent={accentColor} />
      )}

      {/* Accent edge strip near top — gives the building character */}
      <mesh position={[0, halfH - 0.2, b.d / 2 + 0.001]}>
        <boxGeometry args={[b.w * 0.9, 0.04, 0.01]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} />
      </mesh>
    </group>
  );
}

function WindowsFace({ b, accent }: { b: Building; accent: THREE.Color }) {
  // Generate a small grid of emissive window dots on the front face.
  const dots = useMemo(() => {
    const rng = mulberry32(Math.floor(b.x * 100 + b.z * 7 + b.h));
    const cols = Math.max(2, Math.floor(b.w * 2));
    const rows = Math.max(3, Math.floor(b.h * 1.2));
    const arr: { x: number; y: number; lit: boolean }[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        arr.push({
          x: -b.w / 2 + (i + 0.5) * (b.w / cols),
          y: -b.h / 2 + (j + 0.6) * (b.h / rows),
          lit: rng() > 0.5,
        });
      }
    }
    return arr;
  }, [b.w, b.h, b.x, b.z]);

  return (
    <group>
      {dots.map((d, i) =>
        d.lit ? (
          <mesh key={i} position={[d.x, d.y, b.d / 2 + 0.002]}>
            <planeGeometry args={[0.06, 0.06]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        ) : null
      )}
    </group>
  );
}

/* ---------------- Camera rig ---------------- */

type Viewpoint = { pos: [number, number, number]; look: [number, number, number] };

const CAMERA: Record<"home" | DistrictId, Viewpoint> = {
  home:  { pos: [0, 4.5, 18],   look: [0, 6, -10] },
  north: { pos: [0, 6.5, -2.5], look: [0, 9, -25] },   // diving into Midtown
  east:  { pos: [12, 5, 2],     look: [-4, 6.5, -18] },// turning to look west across downtown
  south: { pos: [0, 16, 24],    look: [0, 3, -8] },    // up high, overview of city
  west:  { pos: [-12, 5, 2],    look: [4, 6.5, -18] }, // turning east across downtown
};

function CameraRig({ district }: { district: DistrictId | null }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...CAMERA.home.pos));
  const targetLook = useRef(new THREE.Vector3(...CAMERA.home.look));
  const currentLook = useRef(new THREE.Vector3(...CAMERA.home.look));
  const t = useRef(0);

  useFrame((_, dt) => {
    const v = district ? CAMERA[district] : CAMERA.home;
    targetPos.current.set(...v.pos);
    targetLook.current.set(...v.look);

    // gentle idle bob when at home
    t.current += dt;
    const bobY = district ? 0 : Math.sin(t.current * 0.7) * 0.15;

    const k = 1 - Math.pow(0.0018, dt);
    camera.position.lerp(
      new THREE.Vector3(
        targetPos.current.x,
        targetPos.current.y + bobY,
        targetPos.current.z
      ),
      k
    );
    currentLook.current.lerp(targetLook.current, k);
    camera.lookAt(currentLook.current);
  });

  return null;
}

/* ---------------- Beacon ---------------- */

interface BeaconProps {
  position: [number, number, number];
  color: string;
  onClick: () => void;
}

function Beacon({ position, color, onClick }: BeaconProps) {
  const core = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring1Mat = useRef<THREE.MeshBasicMaterial>(null);
  const ring2Mat = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Core orb breathing pulse
    if (core.current) {
      const s = 1 + Math.sin(t * 3.2) * 0.18;
      core.current.scale.setScalar(s);
    }
    // Two expanding halo rings, offset by 0.5 of cycle for continuous ripples
    const animate = (
      mesh: THREE.Mesh | null,
      mat: THREE.MeshBasicMaterial | null,
      phase: number
    ) => {
      if (!mesh || !mat) return;
      const p = ((t * 0.75 + phase) % 1) ;
      const scale = 1 + p * 2.2;
      mesh.scale.setScalar(scale);
      mat.opacity = (1 - p) * 0.55;
    };
    animate(ring1.current, ring1Mat.current, 0);
    animate(ring2.current, ring2Mat.current, 0.5);
  });

  return (
    <group position={position}>
      {/* Halo rings — billboarded so they always face camera */}
      <Billboard>
        <mesh ref={ring1}>
          <ringGeometry args={[0.55, 0.7, 48]} />
          <meshBasicMaterial
            ref={ring1Mat}
            color={color}
            transparent
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={ring2}>
          <ringGeometry args={[0.55, 0.7, 48]} />
          <meshBasicMaterial
            ref={ring2Mat}
            color={color}
            transparent
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* Soft outer glow disc */}
      <Billboard>
        <mesh>
          <circleGeometry args={[1.4, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* Clickable core orb */}
      <mesh
        ref={core}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        scale={hovered ? 1.15 : 1}
      >
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {/* Point light to illuminate nearby buildings */}
      <pointLight color={color} intensity={3} distance={10} />
    </group>
  );
}

/* ---------------- utils ---------------- */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
