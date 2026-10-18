// src/components/three/useWindowPointer.ts — window-level pointer for parallax.
// The sculpture canvases are pointer-events: none (and now live in a fixed
// backdrop layer), so r3f's state.pointer never updates; this shared listener
// provides the same normalized -1..1 coords (y up positive) from the window.
import { useEffect } from "react";

const pointer = { x: 0, y: 0 };
let listeners = 0;

function onMove(e: PointerEvent) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

/** Returns a stable, mutated-in-place pointer object — read it inside useFrame. */
export function useWindowPointer(): Readonly<{ x: number; y: number }> {
  useEffect(() => {
    if (listeners++ === 0) window.addEventListener("pointermove", onMove);
    return () => {
      if (--listeners === 0) window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return pointer;
}
