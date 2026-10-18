// src/sections/music/CeramicWaveScene.tsx — black-ceramic frozen waveform
// sculpture with concentric ripple displacement, sound-reactive via the
// AudioProvider's shared AnalyserNode (design-v2 §6, music.md §S1).
// Rendered as the page backdrop; the parent pauses it when the tab is hidden.
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import BackdropFraming from "@/components/three/BackdropFraming";
import Dust from "@/components/three/Dust";
import StudioEnvironment from "@/components/three/StudioEnvironment";
import { useAudio } from "@/hooks/useAudio";

/** Ring/disc mesh with concentric ripples — "a frozen waveform". */
function WaveformDisc() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ampRef = useRef(0);
  const freqRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const { getAnalyser, isPlaying } = useAudio();
  const playingRef = useRef(isPlaying);
  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  const { geometry, base } = useMemo(() => {
    const g = new THREE.RingGeometry(0.55, 2.05, 128, 40);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const b = new Float32Array(pos.count * 2); // radial distance + angle per vertex
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      b[i * 2] = Math.sqrt(x * x + y * y);
      b[i * 2 + 1] = Math.atan2(y, x);
    }
    return { geometry: g, base: b };
  }, []);

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;
    const t = clock.getElapsedTime();

    // sample playback amplitude from the shared analyser
    let target = 0;
    const analyser = getAnalyser();
    if (analyser && playingRef.current) {
      const bins = analyser.frequencyBinCount;
      if (!freqRef.current || freqRef.current.length !== bins) {
        freqRef.current = new Uint8Array(bins);
      }
      const freq = freqRef.current;
      analyser.getByteFrequencyData(freq);
      const usable = Math.floor(bins * 0.5); // musical energy lives low
      let sum = 0;
      for (let i = 0; i < usable; i++) sum += freq[i] ?? 0;
      target = Math.min(1, (sum / usable / 255) * 1.6);
    }
    ampRef.current += (target - ampRef.current) * 0.12;
    const amp = ampRef.current;

    // concentric ripple displacement along Z, gentle and amplitude-driven
    const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const rippleAmp = 0.04 + amp * 0.3;
    for (let i = 0; i < pos.count; i++) {
      const r = base[i * 2]!;
      const a = base[i * 2 + 1]!;
      const wave =
        Math.sin(r * 5.5 - t * 1.6) * rippleAmp +
        Math.sin(r * 11 + a * 3 + t * 0.7) * rippleAmp * 0.35;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    mesh.geometry.computeVertexNormals();

    // idle breathing scale 1 ↔ 1.03, 4s sine
    const breathe = 1 + 0.015 * (1 + Math.sin(t * (Math.PI / 2)));
    group.scale.setScalar(breathe);
    // extremely slow auto-rotation (0.05 rad/s, design-v2 §6)
    group.rotation.z += delta * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[-0.95, 0.25, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        {/* glazed black ceramic: dark dielectric base + strong clearcoat specular */}
        <meshPhysicalMaterial
          color="#14110E"
          roughness={0.5}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.22}
          envMapIntensity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

interface CeramicWaveSceneProps {
  /** freeze the render loop on the last frame (tab hidden) */
  paused?: boolean;
}

export default function CeramicWaveScene({ paused = false }: CeramicWaveSceneProps) {
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
      <ambientLight intensity={0.3} color="#FFF4E0" />
      <directionalLight position={[-4, 5, 4]} intensity={1.8} color="#FFF4E0" />
      <directionalLight position={[5, -2, 3]} intensity={0.35} color="#B9C4D6" />
      {/* thin chartreuse rim from the right — the gallery spotlight */}
      <directionalLight position={[6, 1, -4]} intensity={1.1} color="#D4FF00" />
      <BackdropFraming xFrac={0.23} y={-0.2} scale={1.3}>
        <WaveformDisc />
      </BackdropFraming>
      {/* quiet room air — denser dust (music.md §S1) */}
      <Dust count={400} spread={[12, 6, 4]} opacity={0.3} />
    </Canvas>
  );
}
