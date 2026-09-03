import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { planets, type Planet } from "@/data/planets";
import { planetTexture } from "@/lib/planet-texture";

type Props = {
  selected: string | null;
  onSelect: (slug: string | null) => void;
  /** Freeze orbital motion (used for a single-planet detail view). */
  focusOnly?: string | undefined;
  compact?: boolean | undefined;
};

function Sun() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2.4, 48, 48]} />
        <meshBasicMaterial color="#ffdca8" />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.1, 32, 32]} />
        <meshBasicMaterial color="#ffb862" transparent opacity={0.08} />
      </mesh>
      <pointLight intensity={900} distance={300} decay={2} color="#fff0d6" />
    </group>
  );
}

function OrbitPath({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const p: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      p.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return p;
  }, [radius]);

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points],
  );

  return (
    <primitive
      object={
        new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0.09,
          }),
        )
      }
    />
  );
}

function PlanetBody({
  planet,
  selected,
  onSelect,
  paused,
  registerPos,
}: {
  planet: Planet;
  selected: boolean;
  onSelect: (slug: string) => void;
  paused: boolean;
  registerPos: (slug: string, v: THREE.Vector3) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const v = planet.visual;
  const texture = useMemo(
    () => planetTexture(planet.slug, v.colors, v.bands),
    [planet.slug, v.colors, v.bands],
  );
  const start = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      const angle = paused ? start : start + t * v.speed * 0.25;
      group.current.position.set(
        Math.cos(angle) * v.orbit,
        0,
        Math.sin(angle) * v.orbit,
      );
      registerPos(planet.slug, group.current.position);
    }
    if (mesh.current) mesh.current.rotation.y += delta * v.spin;
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  return (
    <group ref={group}>
      <group rotation={[v.tilt ?? 0, 0, 0]}>
        <mesh
          ref={mesh}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(planet.slug);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[v.radius, 48, 48]} />
          <meshStandardMaterial map={texture} roughness={0.85} metalness={0} />
        </mesh>
        {v.rings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[v.radius * 1.4, v.radius * 2.25, 96]} />
            <meshBasicMaterial
              color="#e6d7bb"
              side={THREE.DoubleSide}
              transparent
              opacity={0.45}
            />
          </mesh>
        )}
      </group>
      {(hovered || selected) && (
        <mesh scale={v.radius * 2.4} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.72, 0.75, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={selected ? 0.7 : 0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function CameraRig({
  selected,
  positions,
  controls,
}: {
  selected: string | null;
  positions: Map<string, THREE.Vector3>;
  controls: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const desired = useRef(new THREE.Vector3());

  useFrame(() => {
    const c = controls.current;
    if (!c) return;
    if (selected) {
      const p = positions.get(selected);
      const planet = planets.find((x) => x.slug === selected);
      if (p && planet) {
        target.current.lerp(p, 0.06);
        const dist = Math.max(3.2, planet.visual.radius * 6);
        desired.current
          .copy(p)
          .add(
            new THREE.Vector3(dist * 0.7, dist * 0.45, dist * 0.9),
          );
        camera.position.lerp(desired.current, 0.05);
      }
    } else {
      target.current.lerp(new THREE.Vector3(0, 0, 0), 0.04);
    }
    c.target.copy(target.current);
    c.update();
  });
  return null;
}

export default function Scene({ selected, onSelect, focusOnly, compact }: Props) {
  const controls = useRef<any>(null);
  const positions = useMemo(() => new Map<string, THREE.Vector3>(), []);
  const registerPos = (slug: string, v: THREE.Vector3) => {
    const existing = positions.get(slug);
    if (existing) existing.copy(v);
    else positions.set(slug, v.clone());
  };

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const list = focusOnly ? planets.filter((p) => p.slug === focusOnly) : planets;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{
        position: focusOnly ? [0, 1.8, 9.5] : compact ? [0, 16, 46] : [0, 13, 42],
        fov: 42,
      }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#08090c"]} />
      <ambientLight intensity={focusOnly ? 0.55 : 0.22} />
      {focusOnly ? (
        <directionalLight position={[4, 2, 5]} intensity={2.4} color="#fff3e0" />
      ) : (
        <Sun />
      )}
      <Stars
        radius={140}
        depth={60}
        count={compact ? 1800 : 3200}
        factor={3}
        saturation={0}
        fade
        speed={reduced ? 0 : 0.4}
      />

      {list.map((p) =>
        focusOnly ? (
          <FocusPlanet key={p.slug} planet={p} spin={!reduced} />
        ) : (
          <group key={p.slug}>
            <OrbitPath radius={p.visual.orbit} />
            <PlanetBody
              planet={p}
              selected={selected === p.slug}
              onSelect={onSelect}
              paused={reduced}
              registerPos={registerPos}
            />
          </group>
        ),
      )}

      {!focusOnly && (
        <CameraRig selected={selected} positions={positions} controls={controls} />
      )}

      <OrbitControls
        ref={controls}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.45}
        zoomSpeed={0.6}
        minDistance={focusOnly ? 6 : 6}
        maxDistance={focusOnly ? 16 : 90}
        maxPolarAngle={Math.PI * 0.92}
        autoRotate={!!focusOnly && !reduced}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

function FocusPlanet({ planet, spin }: { planet: Planet; spin: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const v = planet.visual;
  const texture = useMemo(
    () => planetTexture(planet.slug, v.colors, v.bands),
    [planet.slug, v.colors, v.bands],
  );
  useFrame((_, delta) => {
    if (mesh.current && spin) mesh.current.rotation.y += delta * 0.12;
  });
  const scale = 1.6 / v.radius;
  return (
    <group scale={scale} rotation={[v.tilt ?? 0, 0, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[v.radius, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.85} metalness={0} />
      </mesh>
      {v.rings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[v.radius * 1.4, v.radius * 2.25, 128]} />
          <meshBasicMaterial
            color="#e6d7bb"
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}
