// src/components/three/WirePolyhedron.tsx — fine wireframe + chartreuse nodes (design-v2 §6)
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WirePolyhedronProps {
  radius?: number;
  detail?: number;
  nodeCount?: number;
}

export default function WirePolyhedron({ radius = 1.6, detail = 1, nodeCount = 14 }: WirePolyhedronProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(radius, detail), [radius, detail]);

  const nodePositions = useMemo(() => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const pts: THREE.Vector3[] = [];
    const step = Math.max(1, Math.floor(pos.count / nodeCount));
    for (let i = 0; i < pos.count && pts.length < nodeCount; i += step) {
      pts.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }
    return pts;
  }, [geometry, nodeCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (g) {
      g.rotation.y += delta * 0.05;
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * -0.15, 0.04);
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, state.pointer.x * 0.15, 0.04);
    }
    const nodes = nodesRef.current;
    if (nodes) {
      const t = state.clock.getElapsedTime();
      nodePositions.forEach((p, i) => {
        const s = 1 + 0.15 * Math.sin(t * ((Math.PI * 2) / 3) + i); // 3s sine pulse
        dummy.position.copy(p);
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        nodes.setMatrixAt(i, dummy.matrix);
      });
      nodes.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#EDEAE3" wireframe transparent opacity={0.15} />
      </mesh>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, nodePositions.length]}
        key={nodePositions.length}
      >
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#D4FF00" />
      </instancedMesh>
    </group>
  );
}
