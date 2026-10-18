// src/sections/gaming/PlayScene.tsx — frosted-glass polyhedron, the Play Room artwork (gaming-v2 §S1)
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BackdropFraming from "@/components/three/BackdropFraming";
import Dust from "@/components/three/Dust";
import StudioEnvironment from "@/components/three/StudioEnvironment";
import { useWindowPointer } from "@/components/three/useWindowPointer";

function FrostedPolyhedron() {
  const groupRef = useRef<THREE.Group>(null);

  const pointer = useWindowPointer();

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    // slow 0.07 rad/s tumble + pointer parallax (gaming-v2 §S1)
    g.rotation.y += delta * 0.07;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * -0.15 + 0.3, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.x * 0.12, 0.04);
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      {/* frosted glass shell */}
      <mesh>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshPhysicalMaterial
          color="#D9D6CF"
          transmission={0.88}
          roughness={0.32}
          thickness={1.4}
          ior={1.45}
          envMapIntensity={1.1}
          transparent
          opacity={0.94}
          flatShading
        />
      </mesh>
      {/* soft inner warm glow */}
      <mesh scale={0.55}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#FFF4E0"
          emissive="#FFDFA8"
          emissiveIntensity={0.85}
          roughness={0.6}
        />
      </mesh>
      {/* delicate edge light — chartreuse wireframe echo at low opacity */}
      <mesh scale={1.002}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#D4FF00" wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

interface PlaySceneProps {
  /** freeze the render loop on the last frame (offscreen / tab hidden) */
  paused?: boolean;
}

export default function PlayScene({ paused = false }: PlaySceneProps) {
  // frameloop "never" freezes the canvas on its last drawn frame (design-v2 §6)
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <StudioEnvironment />
      {/* soft three-point studio lighting (design-v2 §6) */}
      <ambientLight intensity={0.4} color="#FFF4E0" />
      <directionalLight position={[-4, 5, 4]} intensity={1.3} color="#FFF4E0" />
      <directionalLight position={[5, -2, 3]} intensity={0.35} color="#B9C4D6" />
      {/* thin chartreuse edge light from the right */}
      <directionalLight position={[6, 1, -4]} intensity={0.7} color="#D4FF00" />
      <BackdropFraming xFrac={0.24} y={0.1} scale={1.4}>
        <FrostedPolyhedron />
      </BackdropFraming>
      <Dust count={300} spread={[12, 6, 4]} opacity={0.26} />
    </Canvas>
  );
}
