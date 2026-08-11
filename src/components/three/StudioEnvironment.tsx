// src/components/three/StudioEnvironment.tsx — shared gallery environment map.
// Metallic, glossy and glass materials need an environment to reflect; without
// one they render as flat silhouettes against the near-black room. This builds
// a tiny "light card" scene matching the design's studio lighting (design-v2
// §6: warm key, cool fill, single chartreuse rim), runs it through PMREM, and
// attaches the result declaratively as the scene's environment.
import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function buildGalleryEnv(): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0B0A09");

  const card = (
    color: string,
    intensity: number,
    w: number,
    h: number,
    pos: [number, number, number],
  ) => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.position.set(...pos);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };

  card("#FFF4E0", 9, 7, 5, [-4, 6, 3]); // big warm key, upper left
  card("#FFF4E0", 3, 4, 3, [1, 7, -1]); // warm overhead spill
  card("#B9C4D6", 2.2, 5, 4, [5, -2, 3]); // soft cool fill, lower right
  card("#D4FF00", 6, 0.6, 6, [6, 1, -4]); // thin chartreuse rim strip, behind right
  card("#3A332B", 1.4, 9, 9, [0, -6, 0]); // faint warm floor bounce

  return scene;
}

export default function StudioEnvironment() {
  const gl = useThree((s) => s.gl);

  const target = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const rt = pmrem.fromScene(buildGalleryEnv(), 0.06);
    pmrem.dispose();
    return rt;
  }, [gl]);

  useEffect(() => () => target.dispose(), [target]);

  return <primitive object={target.texture} attach="environment" />;
}
