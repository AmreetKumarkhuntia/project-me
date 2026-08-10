// src/components/three/Dust.tsx — warm particle dust, the "gallery air" (design-v2 §6)
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DustProps {
  count?: number;
  spread?: [number, number, number];
  opacity?: number;
}

export default function Dust({ count = 400, spread = [10, 7, 5], opacity = 0.3 }: DustProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread[0];
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
      seeds[i * 2] = Math.random() * Math.PI * 2;
      seeds[i * 2 + 1] = 0.2 + Math.random() * 0.6;
    }
    return { positions, seeds };
  }, [count, spread]);

  useFrame(({ clock }) => {
    const pts = ref.current;
    if (!pts) return;
    const t = clock.getElapsedTime();
    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    const base = positions;
    for (let i = 0; i < count; i++) {
      const p = seeds[i * 2];
      const s = seeds[i * 2 + 1];
      // slow Brownian-ish drift; never mutate base positions
      pos.setXYZ(
        i,
        base[i * 3] + Math.sin(t * 0.1 * s + p) * 0.35,
        base[i * 3 + 1] + Math.sin(t * 0.13 * s + p * 1.7) * 0.3 + t * 0.01 * s,
        base[i * 3 + 2],
      );
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} aria-hidden>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#EDEAE3"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}
