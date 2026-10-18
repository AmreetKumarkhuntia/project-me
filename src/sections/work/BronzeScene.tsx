// src/sections/work/BronzeScene.tsx — dark-bronze ribbon sculpture + sparse dust (work.md §S1)
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BackdropFraming from "@/components/three/BackdropFraming";
import Dust from "@/components/three/Dust";
import StudioEnvironment from "@/components/three/StudioEnvironment";
import { useWindowPointer } from "@/components/three/useWindowPointer";

/** Interlocking twisted torus segments — cast bronze, kinetic. */
function RibbonGroup() {
  const group = useRef<THREE.Group>(null);

  const pointer = useWindowPointer();

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // slow 0.06 rad/s rotation + pointer parallax (±0.15 rad, lerped)
    g.rotation.y += delta * 0.06;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * -0.15 + 0.25, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.x * 0.15, 0.04);
  });

  const material = (
    <meshStandardMaterial color="#7A5A34" metalness={0.95} roughness={0.28} envMapIntensity={1.25} />
  );

  return (
    <group ref={group} rotation={[0.25, 0, 0]}>
      {/* interlocking partial torus ribbons, each gently twisted */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[1.55, 0.26, 64, 200, Math.PI * 1.5]} />
        {material}
      </mesh>
      <mesh rotation={[-Math.PI / 3.2, 0.9, -0.5]} position={[0.15, -0.1, 0.2]}>
        <torusGeometry args={[1.2, 0.21, 64, 200, Math.PI * 1.35]} />
        {material}
      </mesh>
      <mesh rotation={[Math.PI / 1.9, -0.7, 1.1]} position={[-0.2, 0.15, -0.15]}>
        <torusGeometry args={[0.9, 0.16, 64, 180, Math.PI * 1.6]} />
        {material}
      </mesh>
    </group>
  );
}

export default function BronzeScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <StudioEnvironment />
      {/* warm spot from above + cool fill + faint chartreuse rim (design-v2 §6) */}
      <ambientLight intensity={0.25} color="#FFF4E0" />
      <spotLight position={[0, 6, 2]} angle={0.6} penumbra={0.7} intensity={140} color="#FFF4E0" />
      <directionalLight position={[5, -2, 3]} intensity={0.35} color="#B9C4D6" />
      <directionalLight position={[6, 1, -4]} intensity={0.6} color="#D4FF00" />
      <BackdropFraming xFrac={0.25} y={0} scale={1.25}>
        <RibbonGroup />
      </BackdropFraming>
      <Dust count={200} spread={[12, 6, 4]} opacity={0.24} />
    </Canvas>
  );
}
