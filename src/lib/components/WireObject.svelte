<script lang="ts">
  // Editorial Noir — 3D wireframe "constellation" hero object (canvas, no libs).
  // A rotating node-graph on a sphere: distributed-systems / observability motif.
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let wrap: HTMLDivElement;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // fibonacci sphere of nodes
    const N = 26;
    type Node = { x: number; y: number; z: number; p: number };
    const pts: Node[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pts.push({
        x: Math.cos(th) * r,
        y,
        z: Math.sin(th) * r,
        p: Math.random() * Math.PI * 2,
      });
    }
    // edges between nearby nodes
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dz = pts[i].z - pts[j].z;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.72) edges.push([i, j]);
      }

    function resize() {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 1.4;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 1.4;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let ta = 0;
    function frame() {
      ta += 0.0042;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const ay = ta + mouse.x * 0.9;
      const ax = mouse.y * 0.7 + 0.32;
      const cyr = Math.cos(ay);
      const syr = Math.sin(ay);
      const cxr = Math.cos(ax);
      const sxr = Math.sin(ax);
      const cxp = w / 2;
      const cyp = h / 2;
      const R = Math.min(w, h) * 0.4;
      const persp = 2.6;

      const proj = pts.map((pt) => {
        // rotate Y then X
        const x = pt.x * cyr - pt.z * syr;
        let z = pt.x * syr + pt.z * cyr;
        const y = pt.y * cxr - z * sxr;
        z = pt.y * sxr + z * cxr;
        const s = persp / (persp - z);
        return { sx: cxp + x * R * s, sy: cyp + y * R * s, z, s, p: pt.p };
      });

      ctx!.clearRect(0, 0, w, h);

      // edges
      for (const [i, j] of edges) {
        const a = proj[i];
        const b = proj[j];
        const depth = (a.z + b.z) / 2; // -1..1
        const alpha = 0.1 + ((depth + 1) / 2) * 0.42;
        ctx!.strokeStyle = `rgba(230,255,0,${alpha.toFixed(3)})`;
        ctx!.lineWidth = 0.6 + ((depth + 1) / 2) * 0.7;
        ctx!.beginPath();
        ctx!.moveTo(a.sx, a.sy);
        ctx!.lineTo(b.sx, b.sy);
        ctx!.stroke();
      }
      // nodes
      for (const a of proj) {
        const front = a.z > 0.15;
        const tw = (Math.sin(ta * 2 + a.p) + 1) / 2;
        const rad = (front ? 2.1 : 1.2) * a.s + (front ? tw * 1.1 : 0);
        ctx!.beginPath();
        ctx!.arc(a.sx, a.sy, Math.max(0.6, rad), 0, Math.PI * 2);
        if (front) {
          ctx!.fillStyle = `rgba(230,255,0,${(0.55 + tw * 0.45).toFixed(3)})`;
          ctx!.shadowColor = "rgba(230,255,0,0.8)";
          ctx!.shadowBlur = 8 * a.s;
        } else {
          ctx!.fillStyle = `rgba(236,232,222,${(0.18 + ((a.z + 1) / 2) * 0.2).toFixed(3)})`;
          ctx!.shadowBlur = 0;
        }
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  });
</script>

<div class="hero__object" bind:this={wrap}>
  <canvas bind:this={canvas}></canvas>
</div>
