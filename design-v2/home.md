# HOME — "The Atrium" (`/`)

The entrance hall. Editorial mega-typography + the gallery's centerpiece sculpture. Sets the system: warm black walls, Playfair roman/italic mix, chartreuse spotlight, hairlines, numbered rooms.

## S0. Pre-hero strip (top marquee bar)
- **Layout:** full-width, 40px tall, hairline bottom border, mono 10px uppercase, `--ink-faint`. Three items spread: `SOFTWARE & DEVOPS ENGINEER` · `VOL. 02 — THE ATELIER` · `● BENGALURU, IN · OPEN TO WORK` (dot is accent, pulses 2s).
- **Animation:** items fade in top-down 12px, stagger 0.15s, on load. Static thereafter (not a scrolling marquee).

## S1. Hero — "The Centerpiece"
- **Layout:** min-height 100vh. 7/5 grid. Left (7 cols): section label `— 01 / AMREET KHUNTIA`, then mega headline (Display XL, 6 lines, left-aligned):
  > I build<br>*resilient* (italic)<br>systems &<br>automate the<br>***infrastructure*** (chartreuse italic)<br>they run on.
- Under headline: bio paragraph (max 46ch): "**Software & DevOps Engineer.** I build robust backend systems, automate CI/CD pipelines, and run cloud infrastructure that ships without drama. I care about simplicity, observability, and making the predictable boring." Lead phrase `--ink` 500, rest `--ink-dim`.
- Right (5 cols), vertically centered: the 3D centerpiece — **warm-stone clay displaced torus** (R3F: icosahedron/torusKnot with simplex-noise vertex displacement, matcap material, warm key light + faint chartreuse rim; slow auto-rotate 0.08 rad/s, pointer parallax ±0.15) floating above a **GalleryPlaque** reading `Nº 01 — UNTITLED (SYSTEM)` / `DISPLACED CLAY, STUDIO LIGHT` / `2026`. Beneath it, 300-point warm dust field. Fallback: `sculpt-atrium.png` with Ken Burns drift.
- Bottom-right of right column: MetaTable — `ROLE / SWE · DevOps` · `BASED / Bengaluru, India` · `FOCUS / Backend · Platform` · `STATUS / ● Available` (accent dot).
- Bottom-left: scroll hint — mono 10px `SCROLL` + animated 1px vertical line growing 0→40px loop (2.4s).
- **Animation (load):** pre-hero strip → label draws in → headline words rise from line masks (word stagger 0.06s, 1.1s, gallery ease; the chartreuse "infrastructure" enters last at +0.3s) → bio fades up 24px → plaque + meta table rows stagger 0.1s → sculpture fades/scales from 0.96 with dust fading in over 1.6s.
- **Scroll:** hero content parallaxes apart — headline moves up at 0.6×, sculpture at 1.2× with slight scale-up, until pinned out at 120vh.

## S2. Metrics frieze — "Proof in the Plaster"
- **Layout:** hairline top border. Section label `— 02 / MEASURED`. A 4-column row (2×2 on mobile), each cell separated by vertical hairlines, centered: giant Playfair figure (Display M) + mono 11px caption.
  - `Sub-50ms` / `P95 LATENCY — HIGH-THROUGHPUT APIS`
  - `99.99%` / `UPTIME — RESILIENT INFRASTRUCTURE`
  - `1M+` / `LOGS / DAY — OBSERVABILITY AT SCALE`
  - `−40%` / `MTTR — FAST INCIDENT RECOVERY`
- One figure per viewport may render chartreuse italic (rotate on each visit or fix `99.99%`).
- **Animation:** ScrollTrigger — figures count/roll up from clipped masks (0.8s, stagger 0.15s, trigger 80%), hairlines draw horizontally (scaleX 0→1, 0.8s).

## S3. The Wings — directory
- **Layout:** section label `— 03 / THE WINGS`. Three full-width hairline rows, each a route link, 12-col grid: index mono `W.01` | giant Playfair name (Display M) `Engineering` / `Music` / `Gaming` | right-aligned mono descriptor + `ENTER ↗`.
  - W.01 Engineering — `RESILIENT SYSTEMS, BORING DEPLOYS` → `/work`
  - W.02 Music — `FIVE PIECES, ONE LISTENING ROOM` → `/music`
  - W.03 Gaming — `A SMALL GAME, FRAMED` → `/gaming`
- **Hover:** name slides 24px right and turns italic; a 160×160px thumbnail preview (sculpt-bronze / cover-midnight-compile / sculpt-glass) fades in following the cursor; row background lifts to `--bg-2`; arrow rotates 45°.
- **Animation:** rows rise 40px + fade, stagger 0.12s at 80% viewport.

## S4. Featured work teaser
- **Layout:** section label `— 04 / SELECTED WORK` + right note `FULL EXHIBITION → /WORK`. One featured project panel (Video Clipper): 6/6 split — left: mono meta `CLI + WEB APP · 2025`, Playfair Display M `Video Clipper`, 2-line summary, stack pills (TypeScript, Node.js, Svelte, LLM API, ffmpeg, yt-dlp); right: impact stat `Top 10` (Playfair, chartreuse) + `RANKED SEGMENTS PER RUN` mono caption + `VIEW REPOSITORY ↗` accent mono link.
- **Animation:** two columns slide in from ±40px, 0.9s, trigger 80%. Pills stagger 0.05s.

## S5. The Artist — portrait + ethos teaser
- **Layout:** 5/7 split. Left: `portrait.png` in a hairline-framed "wall frame" (8px `--bg-2` mat border), caption plaque beneath: `THE ARTIST — BENGALURU, IN`. Right: section label `— 05 / ETHOS`, Playfair block quote (Title S→Display M): *"The best system is the one you can hold in your head — and the boring deploy is the good deploy."* with "boring deploy" in chartreuse italic. Below: three mono principle rows `01 SIMPLICITY` / `02 OBSERVABILITY` / `03 PREDICTABILITY` with one-line descriptions, hairline-separated.
- **Animation:** portrait reveals with a vertical clip-path wipe (bottom→top, 1.2s) + slight scale 1.05→1; quote words stagger in; principle rows draw hairlines then fade.

## S6. Contact (shared Footer component)
Giant `Let's *build* something.` ("build" chartreuse italic, Display L), email + social pills, status note `*Currently open to backend, platform & infrastructure roles.`, legal row.
- **Animation:** words mask-rise staggered; pills pop with 0.08s stagger; accent line sweep draws across the top hairline on entry.

## Assets
`/sculpt-atrium.png`, `/portrait.png`, `/texture-grain.png`, `/favicon.svg` (see design.md manifest). 3D scene: displaced-clay torus + dust (fallback to sculpt-atrium.png).

## Interactions checklist
Custom cursor (VIEW on wing rows) · wing-row cursor-following previews · nav hide/show · Lenis smooth scroll · sculpture pointer parallax · all links/buttons hover states · reduced-motion fallbacks.
