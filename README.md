# The Atelier — personal portfolio

A portfolio as *a private art gallery after hours*. Four rooms — the Atrium
(home), the Engineering Wing (work), the Listening Room (music), and the Play
Room (gaming) — rendered in an editorial serif system with sculptural 3D
centerpieces, a persistent audio player, and a playable canvas game.

Live design language: warm near-black (`#121110`), warm off-white ink, one
chartreuse accent (`#D4FF00`), Playfair Display / Inter / IBM Plex Mono.
The full design docs live in [`docs/design-v2/`](docs/design-v2/).

## Stack

- **React 19 + TypeScript (strict)** on **Vite 7**
- **react-router 7** (declarative routes) — `/`, `/work`, `/music`, `/gaming`, 404 catch-all
- **Tailwind CSS 3.4** — all design tokens in `tailwind.config.js` (no ad-hoc inline styles)
- **three + @react-three/fiber** — one sculpture scene per room, static-image fallback without WebGL
- **GSAP + ScrollTrigger, Lenis, Framer Motion** — museum-pace motion, disabled under `prefers-reduced-motion`
- **WebAudio** — analyser-driven visualizers and the game's sound blips

## Commands

```sh
npm install
npm run dev       # vite dev server on :3000
npm run build     # tsc -b (strict) + vite build -> dist/
npm run preview   # serve the build locally (SPA fallback included)
npm run start     # alias of preview
npm run lint      # eslint, passes with zero errors
```

## Editing content

Nothing user-visible is hard-coded in components — it all lives in typed data
modules under [`src/data/`](src/data/):

| File | Holds |
|---|---|
| `data/profile.ts` | identity, metrics, ethos principles |
| `data/projects.ts` | the four selected works |
| `data/tracks.ts` | the five tracks (file, cover, genre, mood) |
| `data/games.ts` | the Play Room shelf |
| `data/skills.ts` / `data/experience.ts` | materials wall + provenance timeline |
| `data/socials.ts` | email + social links |
| `data/site.ts` | nav, brand, footer, status line |
| `data/pages/*.ts` | every headline, plaque, and paragraph, per room |
| `data/placeholders.ts` | **the single source of every placeholder** — search `TODO_EDIT` |

All shared types are in [`src/types/`](src/types/) (`import type { X } from "@/types"`).

### Placeholders still to fill in

`src/data/placeholders.ts` is the only file with placeholder content: the
GitHub/LinkedIn/Twitter links, the four project repository URLs, and the four
shelf games. Replace them there and the whole site updates.

## Structure

```
src/
├── App.tsx            routes
├── components/        shared chrome (Navbar, Footer, Cursor, Preloader, …)
│   ├── home/          Atrium sections
│   ├── music/         audio visualizer helpers
│   └── three/         R3F helpers (Dust, ClayTorus, WebGLFallback)
├── sections/          work/ · music/ · gaming/ page sections
├── pages/             route components (thin composers)
├── data/              all content (see above)
├── types/             all shared TypeScript types
├── hooks/             useAudio, useReducedMotion, useWebGLSupport
├── providers/         AudioProvider + audio context
└── lib/               small pure helpers
```

## Deploying

Built for Vercel with zero dashboard config: Vite is auto-detected, `npm run
build` emits `dist/`, and [`vercel.json`](vercel.json) rewrites every path to
`index.html` so deep links like `/work` resolve with the client router.
