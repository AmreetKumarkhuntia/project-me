# GAMING — "The Play Room" (`/gaming`)

The interactive wing: one small playable piece in a vitrine, plus a shelf of favorite games. Same gallery language — the arcade is gone; the game is now a minimalist kinetic sculpture you can play. Games list is data-driven (`src/data/games.ts`, 4 placeholders, swappable).

## S1. Room header
- **Layout:** 160px top padding. 8/4 grid. Left: `— 01 / THE PLAY ROOM` + Display L: `Play, *framed*.` ("framed" chartreuse italic). Sub (max 44ch, `--ink-dim`): "One playable piece and a shelf of the games that shaped how I think about systems, feedback, and flow."
- Right: **frosted-glass polyhedron** (R3F: icosahedron with transmission/frosted material (or matcap fallback), soft inner warm glow, thin chartreuse edge light, slow 0.07 rad/s tumble, pointer parallax) + plaque `Nº 04 — FROZEN DICE` / `FROSTED GLASS, INNER LIGHT`. Dust 300 pts. Fallback: `sculpt-glass.png`.
- **Animation (load):** headline word masks (accent last) → sculpture fades in tumbling from 12° rotation offset → plaque staggers.
- **Scroll:** parallax 1.15×, out by 60vh.

## S2. The Vitrine — playable piece: "DUST CATCHER"
A museum display case containing the game. Full-width panel (`--bg-2`, hairline border, 16px padding simulating a mat/frame; corner plaque `INTERACTIVE — PLEASE TOUCH`, which inverts the usual museum rule).
- **Header row:** Playfair Title S `Dust Catcher` + mono `A KINETIC STUDY IN DRIFT AND TIMING · 2026` | right: score (mono, `SCORE 000`) + best score (`BEST 000`, persisted to localStorage).
- **Canvas (aspect 16:9, max-height 70vh, `--bg` inner, 1px hairline):** the game, restyled to gallery minimalism —
  - Player: a small off-white ring (14px radius, 2px stroke) at bottom, moved with ←/→ or A/D (and pointer drag on touch).
  - Falling objects: warm white dust motes (glowing 3–5px dots, drift with gentle sine sway, fall speed increases with score) and occasional chartreuse motes worth 3×.
  - Hazards: sparse dark-gray "shards" (small rotating squares, `--ink-faint`) — catching one ends the run.
  - Catch effect: mote bursts into 6 tiny particles + soft chartreuse ring ripple; score ticks up with a small float-up number.
  - Background of playfield: the same drifting dust field as the 3D scenes (CSS/canvas) — the game feels like reaching into the gallery air.
  - No neon, no grid, no beeps overload: subtle WebAudio ticks (soft sine blip on catch, low thud on shard), mutable via speaker icon.
- **States:** `IDLE` (Playfair italic "Press to begin" + accent START pill) → `PLAYING` → `PAUSED` (Esc or pause button; overlay "Paused — the dust waits.") → `GAME OVER` (Playfair Display M score, "BEST" ribbon if beaten, RESTART pill).
- **Animation:** panel fades + rises 40px at 80% viewport; canvas inner reveals with clip-path inset animation (1s) on first view; start countdown `3 · 2 · 1` in Playfair italics, 0.5s each.

## S3. The Shelf — favorite games
- **Layout:** section label `— 02 / THE SHELF` + right mono note `FOUR THAT SHAPED THE SYSTEMS THINKING`. 4-column grid (2-col tablet, 1-col mobile) of game cards, data-driven placeholders:
  1. `game-cover-1.png` — "Elderwild" — DARK FANTASY RPG — "Systems and consequence."
  2. `game-cover-2.png` — "Monument Logic" — PUZZLE — "Space as interface."
  3. `game-cover-3.png` — "Farlight Drift" — SPACE SIM — "Lonely, precise machinery."
  4. `game-cover-4.png` — "Gambit" — STRATEGY — "Patience as a mechanic."
- **Card:** 4:5 cover in hairline frame (8px `--bg-3` mat) + beneath: mono index `G.01`, Playfair Title S title, mono genre + one-line note (`--ink-dim`).
- **Hover:** cover scales 1.05 within frame + subtle lift (translateY −6px, shadow 0 16px 40px rgba(0,0,0,0.5)); a thin accent hairline draws under the title (scaleX 0→1, 0.4s); cursor label "VIEW".
- **Animation:** cards stagger rise 50px, 0.12s stagger, trigger 80%; covers clip-wipe bottom→top on first reveal.

## S4. Controls & credits strip
Hairline top, mono 10px row: `CONTROLS — ←/→ OR A/D MOVE · ESC PAUSE · SOUND TOGGLE IN-VITRINE` left, `BEST SCORE SAVED LOCALLY` right.
- **Animation:** single fade, trigger 90%.

## S5. Return band + shared Footer
`BACK TO —` + `The Atrium ↗` → `/`. Then shared Footer.
- **Animation:** slides in 60px from left at 80% viewport.

## Assets
`/sculpt-glass.png` (fallback), `/game-cover-1..4.png`, `/texture-grain.png`.

## Interactions checklist
Playable keyboard + touch game (start/pause/restart, score, localStorage best, WebAudio ticks with mute) · frosted-glass hero sculpture · card hovers with accent hairline · cursor "VIEW"/"PLAY" · reduced-motion: game remains playable (physics unchanged), ambient animations off, static sculpture image.
