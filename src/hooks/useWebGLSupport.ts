// src/hooks/useWebGLSupport.ts — detect WebGL once, before first paint
import { useState } from "react";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

/** Returns false when WebGL is unavailable or context creation fails. */
export function useWebGLSupport(): boolean {
  const [supported] = useState(detectWebGL);
  return supported;
}
