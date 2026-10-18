// src/components/three/BackdropFraming.tsx — off-center framing for backdrop sculptures.
// Offsets the sculpture by a fraction of the viewport width in world units, so
// on desktop it sits in the right third (partially cropped by the edge) and on
// narrow viewports it drifts back toward center — no media queries needed.
import type { ReactNode } from "react";
import { useThree } from "@react-three/fiber";

interface BackdropFramingProps {
  /** horizontal offset as a fraction of viewport width (world units) */
  xFrac?: number;
  y?: number;
  scale?: number;
  children: ReactNode;
}

export default function BackdropFraming({
  xFrac = 0.24,
  y = 0,
  scale = 1,
  children,
}: BackdropFramingProps) {
  const viewport = useThree((s) => s.viewport);
  return (
    <group position={[viewport.width * xFrac, y, 0]} scale={scale}>
      {children}
    </group>
  );
}
