// src/components/home/AtriumScene.tsx — the centerpiece: clay torus + dust (home.md §S1)
import { Canvas } from "@react-three/fiber";
import ClayTorus from "@/components/three/ClayTorus";
import Dust from "@/components/three/Dust";

export default function AtriumScene() {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {/* soft three-point studio lighting (design-v2 §6) */}
      <ambientLight intensity={0.35} color="#FFF4E0" />
      <directionalLight position={[-4, 5, 4]} intensity={1.4} color="#FFF4E0" />
      <directionalLight position={[5, -2, 3]} intensity={0.35} color="#B9C4D6" />
      {/* faint chartreuse rim from the right */}
      <directionalLight position={[6, 1, -4]} intensity={0.6} color="#D4FF00" />
      <ClayTorus />
      <Dust count={300} spread={[8, 6, 4]} opacity={0.28} />
    </Canvas>
  );
}
