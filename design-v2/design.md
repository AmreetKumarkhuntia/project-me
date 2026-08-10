# THE ATELIER — Global Design System (v2)

A portfolio reimagined as a **private art gallery after hours**. The visitor walks through rooms: the Atrium (Home), the Engineering Wing (Work), the Listening Room (Music), the Play Room (Gaming). One design system throughout — warm near-black walls, off-white Didone typography, a single chartreuse accent used like gallery lighting — with sculptural 3D objects (clay matcaps, fine wireframes, particle dust) instead of v1's neon grid.

**Explicitly banned (v1 retro/cyberpunk residue):** neon cyan/magenta/violet, scanlines, CRT effects, HUD brackets, terminal/retro chrome, per-page accent colors, glow-text, pixel fonts, arcade bevels.

---

## 1. Color System

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#121110` | Warm near-black "gallery wall" (all pages) |
| `--bg-2` | `#171614` | Slightly lifted panel / card background |
| `--bg-3` | `#1D1C19` | Hover states, inset wells |
| `--ink` | `#EDEAE3` | Warm off-white primary text |
| `--ink-dim` | `#A9A49A` | Secondary text, captions |
| `--ink-faint` | `#6E6A61` | Metadata, footer |
| `--accent` | `#D4FF00` | Chartreuse — THE single accent. Gallery spotlight color. |
| `--accent-dim` | `#D4FF00` at 35% | Hairline accents, idle indicators |
| `--hairline` | `rgba(237,234,227,0.10)` | 1px dividers everywhere |
| `--hairline-strong` | `rgba(237,234,227,0.22)` | Card borders, input borders |

Accent discipline: chartreuse appears on ≤3 elements per viewport — one italic emphasis word per headline, status dots, active nav indicator, primary CTA, the 3D rim-light. Never as large fills except the small square logo chip and the primary CTA pill.

Per-room tonal shift (subtle, NOT color-coding): the 3D sculpture's matcap/material and dust density shift per page (atrium = warm stone clay; work = dark bronze; music = black ceramic with chartreuse rim; gaming = frosted glass). Background, text, accent remain identical everywhere.

## 2. Typography

Google Fonts:
- **Display:** `Playfair Display` (400, 400 italic, 500, 600) — high-contrast Didone, the original portfolio's voice. All headlines mix roman + italic words.
- **Body/UI:** `Inter` (400, 500, 600) — neutral, quiet.
- **Micro-label/mono:** `IBM Plex Mono` (400, 500) — metadata, nav, section numbers, captions.

Scale (desktop → mobile):
- Display XL (hero): `clamp(56px, 9vw, 132px)` / lh 0.98 / Playfair 400, italic words 400i
- Display L (page titles, contact): `clamp(48px, 7vw, 104px)` / lh 1.0
- Display M (project names in accordion, section heads): `clamp(36px, 5vw, 72px)` / lh 1.05
- Title S: `24px` Playfair 400
- Body: `16–17px` Inter 400 / lh 1.65, color `--ink-dim` (lead-ins may be `--ink` 500)
- **Micro-label:** `11px` IBM Plex Mono 500 / uppercase / letter-spacing `0.18em` / `--ink-faint`. Accent variant: chartreuse.
- **Section number:** `11px` mono, format `— 01 / WORK` (em-dash, thin number, slash, uppercase label), `--ink-faint`; number may be accent.

Emphasis rule: every display headline contains exactly one italic phrase; exactly one word/phrase per page's key headline is chartreuse italic. Never both on the same word unless it's the single hero accent word.

## 3. Spacing & Layout

- Base unit 8px. Section vertical padding: `160px` desktop / `96px` mobile.
- Max content width `1440px`, side gutters `clamp(24px, 6vw, 96px)`.
- Editorial asymmetric splits: recurring 7/5 or 8/4 grids — mega left-aligned headline, right column holds meta tables (label left / value right, hairline-separated rows), 3D sculpture, or stats.
- Hairline dividers (1px `--hairline`) separate all list rows and sections — the original's signature.
- Numbered sections everywhere: `01 / ATMOSPHERE`, `02 / SELECTED WORK`, etc.

## 4. Motion

Museum pace: slow, smooth, weighted. Nothing snappy or bouncy.

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` ("gallery ease") for entrances; `cubic-bezier(0.65, 0, 0.35, 1)` for exits.
- Durations: entrances 0.9–1.4s; hover 0.4s; accordion 0.6s; page transitions 0.7s.
- Scroll: Lenis smooth scroll, lerp 0.09. GSAP ScrollTrigger for reveals: fade + 40px rise, stagger 0.12s, trigger at 80% viewport.
- Headline entrance: word-level split (SplitText), words rise from clipped masks with 0.06s stagger, 1.1s duration. Italic accent word enters last.
- Marquees/tickers (if any): 40s loop, pauses on hover.
- Page transitions: Framer Motion — current page fades to black + scales 0.99 (0.4s), new page rises 24px + fades in (0.7s). A hairline "gallery plaque" sweep (accent line draws left→right) marks route change.
- `prefers-reduced-motion`: disable Lenis smoothing, parallax, dust; instant opacity-only reveals; 3D renders one static frame.

## 5. Cursor

Custom cursor: a small chartreuse dot (8px) + trailing ring (32px, 1px `--hairline-strong`, lerp 0.12). Hovering interactive elements morphs the ring into a 56px circle with a mono micro-label inside ("VIEW", "PLAY", "LISTEN", "OPEN"). Disabled on touch devices; native cursor hidden only on desktop pointers.

## 6. 3D / WebGL Rules (React Three Fiber)

One sculptural WebGL canvas per page, treated as "the artwork in the room."

Shared techniques:
- **Clay/matcap abstract forms:** smooth displaced icosahedra/torus-knots with matcap or MeshStandardMaterial under soft three-point studio lighting (warm key ~`#FFF4E0`, cool fill, chartreuse rim light at low intensity).
- **Fine wireframes:** delicate polyhedron wireframes (`--ink` at 15% opacity) with small glowing chartreuse node spheres (homage to the original's hero polyhedron). Nodes pulse gently (scale 1→1.15, 3s sine).
- **Particle dust:** 300–600 drifting points, tiny (0.5–1.5px), warm white at 20–40% opacity, slow Brownian drift + faint cursor repulsion. This is the "gallery air" — present on all pages, density varies.
- Camera: fixed, subtle parallax on pointer (±0.15 rad, lerped). Auto-rotation extremely slow (0.05–0.12 rad/s).
- Post: no bloom stacks, no chromatic aberration. At most a soft vignette via CSS.

Fallbacks (graceful, mandatory):
- WebGL unavailable / `prefers-reduced-motion` / mobile low-power: render a pre-generated static PNG of the sculpture (see Assets, `sculpt-*.png`) inside the same frame, with a CSS-only slow Ken Burns drift.
- Canvas is `aria-hidden`, `pointer-events: none` except where a page specifies interaction; all content fully usable without it.
- One 3D scene per page max; pause rendering when off-screen (IntersectionObserver) or tab hidden.

## 7. Shared Components

**Navbar (fixed, full-width, hairline bottom border, backdrop blur 12px over `--bg` at 80%):**
- Left: logo — 28×28 accent square with black Playfair "A" + wordmark "Amreet Khuntia" (Playfair italic 18px, `--ink`).
- Center/right: mono micro-label links — `WORK · MUSIC · GAMING` + index numbers (`01`–`03` superscripts). Active link: ink color + 4px chartreuse dot above.
- Far right: status cluster — pulsing 6px accent dot + `BENGALURU, IN · OPEN TO WORK` (mono 10px); CTA pill `GET IN TOUCH` (accent fill, black mono text, sharp 2px radius) scrolls to contact.
- Mobile: hamburger → full-screen overlay menu, giant Playfair links staggered in, mono meta below.
- Scroll behavior: hides on scroll down (translateY -100%, 0.4s), reappears on scroll up.

**Footer (hairline top border):**
- Top row: giant `Let's build something.` (Display L, "build" in chartreuse italic) + email pill `amreetleo123@gmail.com` + social pills (GitHub ↗, LinkedIn ↗, Twitter ↗ — hairline-bordered mono pills, hover: border→accent, arrow slides).
- Bottom row: mono 10px — `© 2026 AMREET KHUNTIA` left, `BENGALURU, INDIA` right, center: `DESIGNED AS AN ATELIER` .
- Present on all pages.

**SectionHeader:** `— NN / LABEL` mono + optional right-aligned note. Hairline beneath.

**MetaTable:** right-column definition rows — mono label left (`--ink-faint`), mono value right (`--ink`), hairline between rows. Values may include accent status dot.

**GalleryPlaque:** small wall-label card beside 3D works — hairline border, mono title/number/"medium" line, mimics museum object labels. Used next to sculptures, tracks, and games.

**Pill/Tag:** hairline-bordered rounded-full mono 11px chips for stack items; hover: border-accent + 4px rise.

**AccordionRow (Work):** giant Playfair project name + index + category/year mono + plus icon; expands to two-column detail (problem/built + impact stat + tags). See work.md.

**AudioPlayer (Music):** persistent bottom bar — see music.md.

**Buttons:** Primary = accent fill, black mono uppercase 11px, 2px radius, hover: slight scale 1.02 + shadow `0 0 24px rgba(212,255,0,0.25)`. Secondary = hairline border, ink mono, hover border-accent.

## 8. Accessibility

- Contrast: `--ink` on `--bg` = 13.9:1; `--ink-dim` = 7.2:1; accent used only for large text/graphical accents, never body copy.
- All interactive elements keyboard-focusable; focus ring = 1px accent outline offset 3px.
- Audio player fully keyboard-operable (space=play/pause, arrows=seek/volume, M=mute); game has Start/Pause buttons + keyboard controls, not pointer-only.
- Semantic landmarks (`header/main/footer/nav`), skip-to-content link, alt text on all generated imagery, `aria-labels` on icon buttons.
- Reduced motion rules per §4.

## 9. Dependencies

`react`, `react-dom`, `react-router-dom`, `typescript`, `tailwindcss@3.4.19`, `vite`, `three`, `@react-three/fiber`, `@react-three/drei` (matcap/Float/Line helpers), `gsap` (+ ScrollTrigger, SplitText via custom splitter if club plugin unavailable — implement word-mask split manually), `framer-motion`, `lenis`, `lucide-react`, `shadcn/ui` primitives (accordion, slider for the audio player, tooltip). Fonts via Google Fonts (Playfair Display, Inter, IBM Plex Mono).

## 10. Page List

| Route | File | Room | One-liner |
|---|---|---|---|
| `/` | `home.md` | The Atrium | Mega editorial hero + clay sculpture, metrics frieze, wings directory, featured work, ethos, contact |
| `/work` | `work.md` | The Engineering Wing | Accordion exhibition of 4 projects, stack wall, experience timeline |
| `/music` | `music.md` | The Listening Room | Sculptural hero + 5-track data-driven exhibition list + custom persistent audio player |
| `/gaming` | `gaming.md` | The Play Room | Playable canvas mini-game ("Dust Catcher") in a gallery vitrine + 4 favorite-game plaques |

Content configs: all projects, tracks, games, metrics, skills, and experience live in typed data files (e.g. `src/data/*.ts`) so content is swappable without touching components.

---

## 11. Assets Manifest

All imagery: dark, refined, gallery-grade, warm near-black backgrounds (#121110), soft studio lighting, warm off-white + single chartreuse (#D4FF00) accent, fine-art editorial mood. **NO baked-in text or typography in any image.** No neon, no grids, no synthwave palettes.

| Filename | Description (generation prompt) | Location | Dimensions | Type |
|---|---|---|---|---|
| `sculpt-atrium.png` | Matte warm-stone clay abstract sculpture, a smooth displaced torus form with soft folds, photographed on a seamless warm near-black studio backdrop, single warm key light from upper left, faint chartreuse rim light on the right edge, shallow depth, fine art gallery product photography, no text | Home hero 3D fallback / OG image | 1600×1200 4:3 | Image |
| `portrait.png` | Moody fine-art portrait of a young Indian male software engineer and musician, three-quarter view, dark warm studio, soft Rembrandt lighting, near-black background, thoughtful expression, dark clothing, subtle warm rim light, editorial photography, grain, no text | Home "01 / The Artist" section | 1200×1500 4:5 | Image |
| `sculpt-bronze.png` | Abstract dark-bronze metallic sculpture of interlocking geometric ribbons, matcap sheen, seamless near-black studio backdrop, soft warm spotlight from above, delicate reflections, museum pedestal photography, no text | Work page 3D fallback | 1600×1200 4:3 | Image |
| `sculpt-ceramic.png` | Black ceramic abstract sound-wave sculpture, rippling concentric organic form like a frozen waveform, glossy glaze catching a thin chartreuse rim light, near-black studio backdrop, single spotlight, fine art photography, no text | Music page 3D fallback | 1600×1200 4:3 | Image |
| `sculpt-glass.png` | Frosted glass abstract polyhedral sculpture with soft inner glow, delicate internal facets, thin chartreuse edge light, near-black studio backdrop, museum vitrine photography, elegant minimal, no text | Gaming page 3D fallback | 1600×1200 4:3 | Image |
| `cover-neon-drift.png` | Abstract fine-art album cover: slow horizontal streaks of warm amber and pale gold light dissolving into near-black darkness, long-exposure photography feel, soft grain, minimal, elegant, no text (track: synthwave — reinterpret as dusk highway light painting, NOT retro neon) | Music track 1 "Neon Drift" | 1000×1000 1:1 | Image |
| `cover-static-bloom.png` | Abstract fine-art album cover: a dark charcoal field with a single soft blooming cloud of pale gray-white particulate haze in the center, like ink diffusing in water at night, near-black background, subtle grain, minimal, no text (track: dark ambient) | Music track 2 "Static Bloom" | 1000×1000 1:1 | Image |
| `cover-midnight-compile.png` | Abstract fine-art album cover: warm dim desk-lamp glow over blurred dark paper and ceramic mug silhouettes at night, deep warm browns and near-black, soft bokeh, quiet lo-fi stillness, photographic, no text (track: lo-fi) | Music track 3 "Midnight Compile" | 1000×1000 1:1 | Image |
| `cover-latency-zero.png` | Abstract fine-art album cover: precise thin concentric rings of pale warm white light expanding across a near-black field, one thin chartreuse ring among them, long-exposure minimalism, elegant, no text (track: EDM) | Music track 4 "Latency Zero" | 1000×1000 1:1 | Image |
| `cover-signal-lost.png` | Abstract fine-art album cover: a vast near-black starless field with one faint drifting diagonal band of pale silver mist and a single tiny warm point of light off-center, cosmic stillness, minimal, no text (track: sci-fi ambient) | Music track 5 "Signal Lost" | 1000×1000 1:1 | Image |
| `game-cover-1.png` | Fine-art game cover: dramatic dark oil-painting style landscape with a lone small armored figure on a cliff under a vast brooding near-black sky, muted earth tones with a single warm light source, painterly, no text (placeholder: dark fantasy RPG) | Gaming favorites 1 | 800×1000 4:5 | Image |
| `game-cover-2.png` | Fine-art game cover: minimalist isometric architectural maze in warm off-white on near-black, impossible staircases, soft shadows, clean geometric illustration, no text (placeholder: puzzle game) | Gaming favorites 2 | 800×1000 4:5 | Image |
| `game-cover-3.png` | Fine-art game cover: moody sci-fi interior, lone silhouette in a dim warm-lit spacecraft corridor, cinematic haze, near-black shadows, painterly realism, no text (placeholder: space sim) | Gaming favorites 3 | 800×1000 4:5 | Image |
| `game-cover-4.png` | Fine-art game cover: abstract tactical composition of off-white geometric pieces on a dark warm board viewed from above, dramatic side light, still-life photography, near-black background, no text (placeholder: strategy game) | Gaming favorites 4 | 800×1000 4:5 | Image |
| `texture-grain.png` | Seamless subtle film-grain / paper-tooth texture, very dark warm gray on near-black, extremely low contrast, tileable, no text | Global background overlay (2–4% opacity) | 512×512 1:1 | Image |
| `favicon.svg` | Accent square (#D4FF00) with black Playfair-style "A" — this SVG is the only asset with letterform | Global | 64×64 | SVG |

Audio: the 5 demo tracks already exist in the project (`/audio/*.mp3` from v1) — reuse them; do not regenerate.
