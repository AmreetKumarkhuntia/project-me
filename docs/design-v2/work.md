# WORK — "The Engineering Wing" (`/work`)

The main exhibition: four works in an accordion gallery, a materials wall (stack), and the provenance record (experience). Data-driven from `src/data/projects.ts`, `skills.ts`, `experience.ts`.

## S1. Wing header
- **Layout:** 160px top padding (under fixed nav). 8/4 grid. Left: `— 01 / THE ENGINEERING WING` + Display L headline: `Systems that *stay up*.` ("stay up" chartreuse italic). Sub-line (Inter, `--ink-dim`, max 44ch): "Four selected works — tools, libraries, and pipelines built to be boring in production."
- Right: **dark-bronze ribbon sculpture** (R3F: interlocking twisted torus segments, metallic matcap, warm spot from above, slow 0.06 rad/s rotation, pointer parallax) + GalleryPlaque `Nº 02 — LOAD-BEARING RIBBONS` / `CAST BRONZE, KINETIC` + sparse dust (200 pts). Fallback: `sculpt-bronze.png`.
- **Animation (load):** label → headline word masks (0.06s stagger) → sculpture fade/scale 0.96→1 over 1.4s → plaque staggers up.
- **Scroll:** sculpture parallaxes 1.15× and fades out by 60vh.

## S2. The Accordion Gallery — 4 works
Full-width list, hairline-separated rows. **Collapsed row** (96px+ tall, 12-col grid): mono index `01` (--ink-faint) | Playfair Display M project name | mono meta right `CATEGORY · YEAR` (--ink-faint; category in accent on the open row) | plus icon (+ rotates 45° → ×).
**Expanded content** (grid-rows 0fr→1fr, 0.6s gallery ease): two columns —
- Left (7): `THE PROBLEM` mono label + paragraph; `WHAT I BUILT` mono label + paragraph; `VIEW REPOSITORY ↗` accent mono link.
- Right (5): vertical hairline divider; `IMPACT` label + giant Playfair chartreuse stat + mono caption; stack pills (hairline chips).
Rows (verbatim content):
1. **Video Clipper** — `CLI + WEB APP · 2025`. Problem: "Finding the highlight moments in long-form video is slow, manual work — scrubbing timelines and guessing what will land." Built: "A TypeScript CLI pulls the transcript, chunks it, and scores every segment with an LLM. A Svelte web app drives the same pipeline — paste a URL, watch the ranked segments appear, and cut clips with ffmpeg in one click." Impact: `Top 10` ranked segments per run. Stack: TypeScript, Node.js, Svelte, LLM API, ffmpeg, yt-dlp.
2. **Knik** — `LOCAL-FIRST AI · 2025`. "A privacy-first voice assistant that runs locally — sub-second speech with no cloud round-trip." Kokoro-82M TTS + FastAPI + React + MCP. Impact: `Sub-second` local voice latency. Stack: Python, FastAPI, React, Kokoro-82M, MCP.
3. **Vernix** — `COMPONENT LIBRARY · 2024`. "A Svelte component library with 10+ reusable components and built-in transitions, published to NPM — motion baked in, not bolted on." Impact: `10+` reusable components. Stack: Svelte, TypeScript, NPM.
4. **Lilac** — `DEV TOOLING · 2024`. "A lightweight TypeScript logging package — structured output, custom transports, published to NPM." Impact: `−20%` debugging time. Stack: TypeScript, Node.js, NPM.
- First row open by default. Opening a row closes others (single-open accordion).
- **Hover (collapsed):** name turns italic + shifts 16px right; background `--bg-2`; cursor label "OPEN".
- **Animation:** rows stagger in 60px rise at 80% viewport, 0.1s stagger; expansion content fades 0.3s after height animation begins; impact stat counts/slides up on open.

## S3. Materials wall — Stack
- **Layout:** section label `— 02 / MATERIALS`. Six hairline rows, 4/8 grid: left mono group label, right the items as inline pill chips.
  - `BACKEND` — Haskell, PureScript, TypeScript, Node.js, Servant, Express
  - `PERSISTENCE` — PostgreSQL, ClickHouse, MongoDB, MySQL, Redis
  - `INFRASTRUCTURE` — Kubernetes, Docker, AWS, GCP, Helm, ArgoCD
  - `NETWORKING` — Envoy, Istio, gRPC, Squid
  - `OBSERVABILITY` — OpenTelemetry, Prometheus, Grafana, Kibana, Vector, OpenObserve
  - `CI/CD` — GitHub Actions, ArgoCD, Helm, Docker Compose
- **Animation:** rows draw hairlines (scaleX) + chips stagger 0.04s fade/rise at 80% viewport. Chip hover: border→accent, translateY −4px, 0.3s.

## S4. Provenance — Experience
- **Layout:** section label `— 03 / PROVENANCE`. Timeline as hairline-separated entries, 4/8 grid: left mono period + company; right role (Playfair Title S) + bullet achievements (Inter, `--ink-dim`).
  - `AUG 2024 — PRESENT · JUSPAY` — **Software Engineer**: Led 11-service EKS→GKE migration — ~20% cost cut at 99.99% uptime · Built centralized monitoring, ~40% MTTR reduction · Shipped a 1M+ logs/day observability pipeline.
  - `JAN — JUL 2024 · JUSPAY` — **Software Engineer Intern**: Address validation cut RTO ~75% across 30k+ monthly orders · AWS anomaly detection cut alert fatigue ~30%.
- A 4px accent dot rides the left hairline spine, positioned by scroll progress (ScrollTrigger scrub).
- **Animation:** entries rise 40px stagger 0.15s; the spine line draws vertically with scroll (scaleY scrub).

## S5. Next-room footer band + shared Footer
Full-width hairline band: `NEXT ROOM —` mono + Playfair Display M link `The Listening Room ↗` → `/music`. Hover: italic + accent. Then the shared Footer.
- **Animation:** band text slides in from left 60px at 80% viewport.

## Assets
`/sculpt-bronze.png` (fallback), `/texture-grain.png`. 3D: bronze ribbon sculpture + sparse dust.

## Interactions checklist
Single-open accordion with animated expansion · cursor "OPEN" label · chip hovers · scroll-scrubbed timeline spine · next-room band · reduced-motion: accordion still functional, static sculpture image.
