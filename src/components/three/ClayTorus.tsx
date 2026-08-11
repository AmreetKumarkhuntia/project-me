// src/components/three/ClayTorus.tsx — displaced clay sculpture, atrium centerpiece (design-v2 §6)
// A gently displaced torus knot (home.md §S1 allows icosahedron/torus-knot):
// layered trigonometric noise gives the folded, hand-worked clay feel.
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ClayTorusProps {
  color?: string;
  autoRotateSpeed?: number;
}

/** Two-octave value-noise displacement for a soft folded-clay feel. */
function displace(geometry: THREE.BufferGeometry, amount: number, freq: number) {
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const coarse =
      Math.sin(v.x * freq + v.y * 1.3) *
      Math.cos(v.y * freq * 0.8 + v.z * 1.1) *
      Math.sin(v.z * freq * 1.2 + v.x);
    const fine =
      Math.sin(v.x * freq * 2.7 + v.z * 2.1) * Math.cos(v.y * freq * 2.3 + v.x * 1.4) * 0.35;
    const n = coarse + fine;
    const len = v.length();
    if (len > 0) {
      v.multiplyScalar(1 + (n * amount) / len);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
}

export default function ClayTorus({ color = "#B8AFA2", autoRotateSpeed = 0.08 }: ClayTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const g = new THREE.TorusKnotGeometry(1.05, 0.42, 400, 56, 2, 3);
    displace(g, 0.1, 1.7);
    return g;
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += delta * autoRotateSpeed;
    mesh.rotation.x = THREE.MathUtils.lerp(
      mesh.rotation.x,
      state.pointer.y * -0.15 + 0.35,
      0.04,
    );
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, state.pointer.x * 0.15, 0.04);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[0.35, 0, 0]}>
      {/* matte stone clay — a whisper of environment for soft modeling */}
      <meshStandardMaterial color={color} roughness={0.82} metalness={0.02} envMapIntensity={0.45} />
    </mesh>
  );
}
