<script lang="ts">
  // Editorial Noir — faded full-page 3D background field.
  // A slow wireframe globe + depth particles, drifting behind all content.
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // --- sphere mesh (meridians + parallels) ---
    const MER = 14;
    const PAR = 8;
    const SEG = 48;
    const meridians: number[][][] = [];
    for (let m = 0; m < MER; m++) {
      const lon = (m / MER) * Math.PI * 2;
      const line: number[][] = [];
      for (let s = 0; s <= SEG; s++) {
        const lat = -Math.PI / 2 + (s / SEG) * Math.PI;
        line.push([
          Math.cos(lat) * Math.cos(lon),
          Math.sin(lat),
          Math.cos(lat) * Math.sin(lon),
        ]);
      }
      meridians.push(line);
    }
    const parallels: number[][][] = [];
    for (let p = 1; p < PAR; p++) {
      const lat = -Math.PI / 2 + (p / PAR) * Math.PI;
      const line: number[][] = [];
      for (let s = 0; s <= SEG; s++) {
        const lon = (s / SEG) * Math.PI * 2;
        line.push([
          Math.cos(lat) * Math.cos(lon),
          Math.sin(lat),
          Math.cos(lat) * Math.sin(lon),
        ]);
      }
      parallels.push(line);
    }

    // --- depth particles ---
    type Particle = {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      tw: number;
    };
    let parts: Particle[] = [];
    function seedParts() {
      const n = w < 760 ? 34 : 64;
      parts = Array.from({ length: n }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.00018,
        vy: (Math.random() - 0.5) * 0.00018,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParts();
    }
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    function project(
      pt: number[],
      ay: number,
      ax: number,
      R: number,
      cx: number,
      cy: number,
    ) {
      const [x, y] = pt;
      const z = pt[2];
      const x1 = x * Math.cos(ay) - z * Math.sin(ay);
      const z1 = x * Math.sin(ay) + z * Math.cos(ay);
      const y1 = y * Math.cos(ax) - z1 * Math.sin(ax);
      const z2 = y * Math.sin(ax) + z1 * Math.cos(ax);
      const persp = 3.2;
      const s = persp / (persp - z2);
      return [cx + x1 * R * s, cy + y1 * R * s, z2];
    }

    function strokeLine(
      line: number[][],
      ay: number,
      ax: number,
      R: number,
      cx: number,
      cy: number,
      baseAlpha: number,
      accent: boolean,
    ) {
      for (let i = 0; i < line.length - 1; i++) {
        const a = project(line[i], ay, ax, R, cx, cy);
        const b = project(line[i + 1], ay, ax, R, cx, cy);
        const depth = (a[2] + b[2]) / 2;
        const al = baseAlpha * (0.25 + ((depth + 1) / 2) * 0.9);
        ctx!.strokeStyle = accent
          ? `rgba(230,255,0,${(al * 1.1).toFixed(3)})`
          : `rgba(236,232,222,${al.toFixed(3)})`;
        ctx!.lineWidth = 0.7;
        ctx!.beginPath();
        ctx!.moveTo(a[0], a[1]);
        ctx!.lineTo(b[0], b[1]);
        ctx!.stroke();
      }
    }

    let t = 0;
    function frame() {
      t += 0.0016;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      ctx!.clearRect(0, 0, w, h);

      // globe — large, faded, offset toward upper-right, cropped
      const R = Math.min(w, h) * 0.62;
      const cx = w * 0.74 + mouse.x * 26;
      const cy = h * 0.4 + mouse.y * 26;
      const ay = t + mouse.x * 0.5;
      const ax = 0.42 + mouse.y * 0.35;
      ctx!.globalAlpha = 0.5;
      meridians.forEach((l, i) =>
        strokeLine(l, ay, ax, R, cx, cy, 0.07, i % 7 === 0),
      );
      parallels.forEach((l) => strokeLine(l, ay, ax, R, cx, cy, 0.055, false));
      ctx!.globalAlpha = 1;

      // depth particles drifting across full viewport
      for (const p of parts) {
        p.x += p.vx + mouse.x * p.z * 0.0006;
        p.y += p.vy + mouse.y * p.z * 0.0006;
        if (p.x < 0) p.x += 1;
        if (p.x > 1) p.x -= 1;
        if (p.y < 0) p.y += 1;
        if (p.y > 1) p.y -= 1;
        p.tw += 0.012;
        const tw = (Math.sin(p.tw) + 1) / 2;
        const r = 0.5 + p.z * 1.6;
        const accent = p.z > 0.82;
        const al = (0.05 + p.z * 0.16) * (0.5 + tw * 0.5);
        ctx!.beginPath();
        ctx!.arc(p.x * w, p.y * h, r, 0, Math.PI * 2);
        ctx!.fillStyle = accent
          ? `rgba(230,255,0,${(al * 1.3).toFixed(3)})`
          : `rgba(236,232,222,${al.toFixed(3)})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  });
</script>

<canvas class="field" bind:this={canvas}></canvas>
