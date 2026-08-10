# Research — Amreet Khuntia's Existing Portfolio (https://amreet-khuntia.vercel.app/)

Source: scraped live site, 2026-08-04. This is the user's REAL content — reuse it faithfully.
The user wants a REBUILD: an immersive, insane 3D site (sci-fi/cyberpunk, WebGL/Three.js)
that unites three identities: Software/DevOps Engineer, Musician (makes songs), Gamer.

## Identity / Hero
- Name: Amreet Khuntia
- Role: Software & DevOps Engineer (SWE · DevOps)
- Based: Bengaluru, India
- Focus: Backend · Platform
- Status: Available
- Tagline: "I build resilient systems & automate the infrastructure they run on."
- Bio: builds robust backend systems, automates CI/CD pipelines, runs cloud
  infrastructure. Cares about simplicity, observability, making the predictable boring.

## Metrics (Outcome-driven engineering)
1. Sub-50ms p95 latency — High-throughput APIs — Servant + Express services tuned for tight tail latencies.
2. 99.99% uptime — Resilient infrastructure — Zero-downtime deploys across GKE with ArgoCD + Helm.
3. 1M+ logs/day — Observability at scale — Structured logging & tracing pipelines that stay queryable.
4. −40% MTTR — Fast incident recovery — Centralized monitoring that surfaces the cause, not the noise.

## Selected Work (4 projects)

### 1. Video highlight finder (name not stated on site — describe as "AI Video Highlight Finder")
- Problem: Finding highlight moments in long-form video is slow, manual work — scrubbing timelines and guessing what will land.
- Built: TypeScript CLI pulls transcript, chunks it, scores every segment with an LLM. A Svelte web app drives the same pipeline — paste a URL, watch ranked segments appear, cut clips with ffmpeg in one click.
- Impact: Top 10 ranked segments per run.
- Stack: TypeScript, Node.js, Svelte, LLM API, ffmpeg, yt-dlp.

### 2. Local Voice Assistant ("On-device Voice Assistant")
- Problem: Cloud voice assistants trade privacy for convenience; network round-trip adds latency.
- Built: Kokoro-82M TTS model + async FastAPI backend + React frontend. An MCP router orchestrates local tools so the whole loop — listen, think, speak — stays on-device and fast.
- Impact: Sub-second local voice latency.
- Stack: React, FastAPI, Kokoro-82M, MCP, Python, WebAudio.

### 3. Svelte Component Library ("Motion-first Component Library")
- Problem: Design patterns drifted between projects; UI work kept restarting from zero.
- Built: Published a SvelteKit + Vite component library: buttons, inputs, modals and more, each with motion baked in so consuming apps get consistent feel for free.
- Impact: 10+ reusable components.
- Stack: Svelte, SvelteKit, Vite, TypeScript, NPM.

### 4. Structured Logger ("Structured Logging Library")
- Problem: Debugging crawled because logs were unstructured — no levels, no context, nothing queryable.
- Built: Small dependency-light logger with custom transports for console, file, and remote sinks. Structured by default, so logs become data instead of noise.
- Impact: −20% debugging time.
- Stack: TypeScript, Node.js, NPM.

## Technical Inventory (toolkit)
- Backend: Haskell, PureScript, TypeScript, Node.js, Servant, Express
- Persistence: PostgreSQL, ClickHouse, MongoDB, MySQL, Redis
- Infrastructure: Kubernetes, Docker, AWS, GCP, Helm, ArgoCD
- Networking: Envoy, Istio, gRPC, Squid
- Observability: OpenTelemetry, Prometheus, Grafana, Kibana, Vector, OpenObserve
- CI/CD: GitHub Actions, ArgoCD, Helm, Docker Compose

## Experience
1. Juspay — Software Engineer — Aug 2024 → Present
   - Led migration of 11 services from AWS EKS to GCP GKE, cutting infra cost ~20%, lifting uptime to 99.99%.
   - Centralized monitoring across services, reducing MTTR by ~40%.
   - Built a logging system handling 1M+ logs/day, kept queryable and cheap.
2. Juspay — Software Engineer Intern — Jan 2024 → Jul 2024
   - Shipped address validation that cut return-to-origin by ~75% across 30k+ monthly orders.
   - Built AWS anomaly detection that reduced alert fatigue by ~30%.

## Ethos
- Quote: "The best system is the one you can hold in your head — and the boring deploy is the good deploy."
- Principles:
  1. Simplicity — The best system is the one you can hold in your head. I remove before I add.
  2. Observability — If you can't see it, you can't fix it. Every system ships with eyes.
  3. Predictability — Boring deploys are good deploys. Surprises belong in the product, not the pipeline.

## Contact
- "Let's build something." (site has contact section; use placeholder links: GitHub, LinkedIn, email — mark as easy to edit)

## NEW content the user wants added (no source material — design placeholders that are data-driven and easy to swap)
1. MUSIC: user "makes songs". Build a music section with a custom audio player.
   Demo tracks will be AI-generated ambient loops (placeholders, clearly swappable).
   Track list must be data-driven (one config array) so the user can swap in real songs
   (Spotify/SoundCloud links or mp3 files) later.
2. GAMING: user "plays games". Gaming-themed visuals site-wide + a favorite-games
   showcase (placeholder titles like Valorant, etc. — keep generic/editable) + a
   playable neon mini-game (canvas arcade game) as an interactive highlight.

## Creative direction (user gave full freedom — locked by orchestrator)
- Aesthetic: futuristic sci-fi / cyberpunk. Deep black, neon cyan + magenta accents,
  glow, scanlines, glassmorphism, monospace display type.
- 3D: React Three Fiber + drei — particle fields, floating geometry, starfield hero,
  postprocessing bloom. GSAP/Framer Motion scroll animations, Lenis smooth scroll,
  custom cursor. Must degrade gracefully without WebGL.
- Single-page immersive scroll portfolio (one long page with anchored sections is fine;
  designer decides final structure).

---

# v2 UPDATE — redesign research (2026-08-04, from live UI walkthrough)

User feedback on v1: concept liked, visuals REJECTED as "retro". New direction:
artistic/editorial 3D, referencing his ORIGINAL site's fonts & placements.
Reference screenshots: /mnt/agents/output/ref-original-top.png,
ref-original-metrics.png, ref-original-lower.png (READ THESE).

## Original design DNA (must-reference)
- Didone serif display (Playfair-like), roman+italic mixing; letterspaced uppercase
  micro-labels; serif italic emphasis.
- Warm near-black bg, warm off-white text, ONE chartreuse accent, hairlines 10% white.
- Numbered sections "01 / NAME", editorial asymmetric splits, accordion work list with
  giant serif names, giant "Let's build something." footer (italic chartreuse word).
- Delicate wireframe polyhedron 3D with glowing nodes — sculptural, not arcade.

## Corrected real content (v1 scrape missed these)
- Project names: 01 Video Clipper (CLI + Web app · 2025) · 02 Knik (Local-first AI · 2025) ·
  03 Vernix (Component library · 2024) · 04 Lilac (Dev tooling · 2024).
- Contact: amreetleo123@gmail.com; pills: GitHub, LinkedIn, Twitter.
- Note: "Currently open to backend, platform & infrastructure roles."
- Footer: © 2026 AMREET KHUNTIA · BENGALURU, INDIA.
