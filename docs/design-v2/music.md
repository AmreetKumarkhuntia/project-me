# MUSIC — "The Listening Room" (`/music`)

A dim gallery room where five sound pieces hang on the wall. Custom audio player, data-driven track list (`src/data/tracks.ts` — swap files/titles without touching UI). Audio files: reuse v1's 5 demos (`/audio/neon-drift.mp3` etc.).

## S1. Room header
- **Layout:** 160px top padding. 8/4 grid. Left: `— 01 / THE LISTENING ROOM` + Display L headline: `Sound, *hung* on walls.` ("hung" chartreuse italic). Sub (max 44ch, `--ink-dim`): "Five pieces written between deploys — synths, ambience, and slow compilations. Press play; the room dims."
- Right: **black-ceramic waveform sculpture** (R3F: ring/disc mesh with concentric ripple displacement animated gently by amplitude when audio plays — idle: slow breathing scale 1↔1.03, 4s sine; glossy ceramic material, thin chartreuse rim light, 0.05 rad/s rotation) + plaque `Nº 03 — FROZEN WAVEFORM` / `GLAZED CERAMIC, SOUND-REACTIVE`. Dust 400 pts (denser — "quiet room air"). Fallback: `sculpt-ceramic.png`.
- **Animation (load):** headline word masks (stagger 0.06s; accent word last) → sculpture rises from 24px below + fades, 1.4s → plaque staggers.
- **Scroll:** sculpture scales up 1→1.08 and exits at 70vh parallax.

## S2. The Wall — track exhibition list
Full-width hairline-separated rows; each row is a playable "piece." 12-col grid per row: index mono `T.01` | 96×96 cover thumbnail (hairline frame, 4px mat) | Playfair Title S track title + italic Playfair genre | mono duration right | circular play button (hairline ring, accent triangle on hover).
Tracks (verbatim):
| # | Title | Genre (italic) | Cover | Mood note (mono, `--ink-faint`) |
|---|---|---|---|---|
| T.01 | Neon Drift | *synthwave* | cover-neon-drift.png | DUSK HIGHWAY, LONG EXPOSURE |
| T.02 | Static Bloom | *dark ambient* | cover-static-bloom.png | INK DIFFUSING AT NIGHT |
| T.03 | Midnight Compile | *lo-fi* | cover-midnight-compile.png | DESK LAMP, WARM STATIC |
| T.04 | Latency Zero | *EDM* | cover-latency-zero.png | CONCENTRIC, PRECISE |
| T.05 | Signal Lost | *sci-fi ambient* | cover-signal-lost.png | ONE LIGHT, VERY FAR |
- **Active track row:** background `--bg-2`, left 3px accent bar, cover swaps to a live mini visualizer (canvas bars in accent at 60% opacity over the cover at 30%), title gains accent italic.
- **Hover (inactive):** cover scales 1.06 inside its frame, row bg `--bg-2`, cursor label "LISTEN".
- **Click behavior:** row click = play/pause that track; play starts the persistent player (S3). Double-purpose chevron opens an expandable detail strip (like work accordion): waveform canvas + mood note + `ADD TO QUEUE` ghost button.
- **Animation:** rows stagger rise 50px at 80% viewport, 0.1s stagger; on track change, new row's accent bar draws top→bottom (scaleY, 0.4s) and title crossfades.

## S3. The Player — persistent bottom bar
Fixed bottom bar (72px, `backdrop-blur`, `--bg` 85%, hairline top border). Appears (slides up 100%, 0.5s) on first play, never leaves.
- Left: 48×48 cover thumbnail + title (Playfair italic 16px) + genre mono 10px.
- Center: transport — prev / play-pause (accent filled circle 40px) / next; below them a full-width thin progress track (2px hairline; filled portion accent, 3px height on hover; draggable scrub head 10px accent dot) with mono 10px times at ends.
- Right: queue icon (opens right-side drawer listing the 5 tracks in order, drag-optional, click-to-jump), volume (lucide icon + shadcn Slider vertical popover), and `ROOM TONE` toggle — dims the whole page (`filter: brightness(0.85)` + vignette overlay) while playing, like gallery lights lowering. On by default.
- Visualizer: 24 thin bars behind the center controls (WebAudio AnalyserNode; accent at 25% opacity). Fallback when analyser unavailable: gentle CSS sine animation.
- Keyboard: Space play/pause, ←/→ seek 5s, ↑/↓ volume, M mute, N/P next/prev (documented in queue drawer footer).
- **Animation:** track change — thumbnail crossfade + title slides up through mask; progress smooth via rAF; bars lerp for buttery motion.

## S4. About the room (small editorial strip)
- **Layout:** hairline top, 6/6 split. Left: `— 02 / NOTES` + Playfair Title S: *"Made between deploys."* Right (Inter, `--ink-dim`): "Every piece here was produced late at night in Bengaluru — a counterpoint to the day job: unpredictable on purpose. The room tone toggle lowers the lights, the way a gallery does for video work."
- **Animation:** columns rise 30px, fade, trigger 80%.

## S5. Next-room band + shared Footer
`NEXT ROOM —` + `The Play Room ↗` → `/gaming`. Then shared Footer (sits above the persistent player; add 72px bottom padding when player is active).

## Assets
`/sculpt-ceramic.png` (fallback), `/cover-neon-drift.png`, `/cover-static-bloom.png`, `/cover-midnight-compile.png`, `/cover-latency-zero.png`, `/cover-signal-lost.png`, `/texture-grain.png`. Audio: existing `/audio/*.mp3`.

## Interactions checklist
Fully keyboard-accessible custom player (play/pause/seek/volume/queue) · analyser-driven sculpture ripple + bar visualizer · room-tone dimming toggle · expandable track detail strips · cursor "LISTEN" · graceful no-WebAudio/no-WebGL fallbacks.
