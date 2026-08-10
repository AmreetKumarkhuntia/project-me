# Plan v2 — AMREET Portfolio REDESIGN: Editorial Art-Gallery × 3D

## Feedback (user, after v1 delivery "AMREET://GRID")
v1 concept/structure liked; visual language REJECTED as "retro" (neon cyberpunk/arcade).
User is an artist; wants 3D + ARTISTIC vibes, referencing his original portfolio's
fonts/placements (https://amreet-khuntia.vercel.app/).

## Reference analysis (screenshots: ref-original-top/mid/lower.png)
Original design DNA to reference:
- TYPE: high-contrast Didone serif display (Playfair-like), roman + italic mixing;
  letterspaced uppercase micro-labels; serif italic emphasis words.
- COLOR: warm near-black bg, warm off-white text, ONE chartreuse accent (~#D4FF00),
  hairlines white 10%.
- PLACEMENT: numbered sections "01 / NAME", editorial asymmetric splits, mega
  left headlines + right meta tables, hairline dividers, accordion work list with
  giant serif project names, giant "Let's build something." footer w/ italic lime word.
- 3D: delicate wireframe polyhedron w/ glowing nodes — sculptural, gallery-like.

## New creative direction (locked)
"ATELIER / ART GALLERY" — an exhibition, not an arcade. Keep v1's structure & features
(4 routes, portals, music player + demo tracks, playable game, mini-player, data configs)
but replace the ENTIRE visual system: serif editorial type, warm dark + off-white +
chartreuse single accent, sculptural 3D art objects (clay/matcap forms, fine wireframes,
particle dust — no neon grids/scanlines/HUD brackets), slow museum-like motion.
Per-dimension accents RETIRED → one gallery system with at most subtle material shifts.

## Corrected real content (from original site UI, missed by v1 scrape)
- Project names: 01 Video Clipper (CLI + Web app · 2025), 02 Knik (Local-first AI · 2025),
  03 Vernix (Component library · 2024), 04 Lilac (Dev tooling · 2024).
- Contact: amreetleo123@gmail.com + GitHub / LinkedIn / Twitter pills.
- Footer: © 2026 AMREET KHUNTIA · BENGALURU, INDIA.
- v1 data configs otherwise correct (metrics, experience, skills, ethos).

## Stages (rerun of Mode A on top of master; v1 = version 346fdc6, lineage kept)
1. Research: DONE — screenshots + DNA above; update info.md.
2. Design: Pro_Designer (same role) → NEW docs in /mnt/agents/output/design-v2/
   (design.md + home/work/music/gaming.md + new asset manifest, fine-art style).
   Designer reads the 3 reference screenshots.
3. Scaffold v2 (branch redesign-scaffold from master): replace design system
   (fonts, CSS, tailwind, shared components, cursor, preloader, three helpers),
   regenerate art assets per new manifest (old neon art removed), update src/data/*
   (project names, email, socials), restyle AudioProvider consumer UI (MiniPlayer),
   rebuild Home. Keep audio mp3s, routing, data-config architecture.
4. Page agents ×3 (branches from master after scaffold-v2 merge): restyle
   work/music/gaming pages per design-v2 page docs, reusing v1 logic where possible.
5. Merge → npm install + build gate → merge to master → build_version (static,
   /mnt/agents/output/app) → deliver. No post-version verification.

## Constraints
- English. Graceful no-WebGL fallback. prefers-reduced-motion respected.
- Real content only (no fabricated facts); tracks/games/socials stay data-driven.
