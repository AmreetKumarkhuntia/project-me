// src/components/three/ClayTorus.tsx — displaced clay sculpture, atrium centerpiece (design-v2 §6)
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ClayTorusProps {
  color?: string;
  autoRotateSpeed?: number;
}

/** Simple value-noise displacement for a soft folded-clay feel. */
function displace(geometry: THREE.BufferGeometry, amount: number, freq: number) {
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n =
      Math.sin(v.x * freq + v.y * 1.3) *
      Math.cos(v.y * freq * 0.8 + v.z * 1.1) *
      Math.sin(v.z * freq * 1.2 + v.x);
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
    const g = new THREE.TorusGeometry(1.5, 0.62, 96, 160);
    displace(g, 0.22, 2.1);
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
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
    </mesh>
  );
}
