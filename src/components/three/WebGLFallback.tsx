// src/components/three/WebGLFallback.tsx — static sculpture fallback (design-v2 §6)
import { useEffect, useState } from "react";

/** Returns false when WebGL is unavailable or context creation fails. */
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Static pre-generated sculpture PNG with a slow CSS Ken Burns drift.
 * Content stays fully usable — 3D is atmosphere, never information.
 */
export default function WebGLFallback({
  src = "/sculpt-atrium.png",
  alt = "",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
    </div>
  );
}
