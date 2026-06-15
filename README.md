# Project-Me — Portfolio (v3)

The personal portfolio of **Amreet Khuntia**, Software & DevOps Engineer.

A single immersive landing page in an **Editorial Noir** style — ink-black canvas,
a single acid-yellow accent, and a Didone display face (Bodoni Moda) paired with a
techy grotesk and mono. It introduces who I am up front, then unfolds section by
section: capabilities, selected work, stack, experience, ethos, and contact.

Built with **SvelteKit + Svelte 5** and plain SCSS. Two lightweight, dependency-free
`<canvas>` animations provide the 3D atmosphere (a drifting wireframe globe behind
everything, and a cursor-reactive constellation in the hero).

## Tech stack

- **Framework:** SvelteKit 2 / Svelte 5 (runes)
- **Styling:** SCSS (`src/css/noir.scss`) with CSS custom-property design tokens
- **Type fonts:** Bodoni Moda · Space Grotesk · Space Mono (Google Fonts)
- **Graphics:** Canvas 2D, hand-rolled (no Three.js / WebGL libraries)
- **Tooling:** Vite 6, TypeScript, svelte-check, Prettier (+ prettier-plugin-svelte)

## Project structure

```
src/
├─ app.html                  # document shell + font links
├─ css/noir.scss             # global tokens, ambient layers, all section styles
├─ routes/
│  ├─ +layout.svelte         # ambient layers, background field, scroll-reveal logic
│  └─ +page.svelte           # composes all sections
└─ lib/
   ├─ components/            # Masthead, Nav, Hero, Capabilities, Work, Stack,
   │                         #   Experience, Manifesto, Contact, WireObject,
   │                         #   BackgroundField, ArUp
   └─ configuration/         # content as typed constants (the single source of truth)
      ├─ identity.ts  capabilities.ts  projects.ts  skills.ts
      ├─ experience.ts  philosophy.ts  types.ts  index.ts
static/
└─ resume.pdf                # linked from the hero "View resume" button
```

### Editing content

All copy is data-driven — edit the files under `src/lib/configuration/` and the page
updates. No component changes are needed to add a project, metric, or timeline entry.

## Developing

Install dependencies, then start the dev server (port **4366**):

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server on port 4366            |
| `npm run build`   | Production build                             |
| `npm run preview` | Preview the production build (port 4366)     |
| `npm run check`   | Type-check the project with `svelte-check`   |
| `npm run format`  | Format `src/` with Prettier                  |

## Building & deploying

```bash
npm run build
npm run preview   # to sanity-check the output locally
```

The project uses `@sveltejs/adapter-auto`. For a specific host (Vercel, Netlify,
Node, static, …) install the matching [adapter](https://svelte.dev/docs/kit/adapters)
and update `svelte.config.js`.

## Branches

- `main` — current site (v3, Editorial Noir).
- `v2` — archived snapshot of the previous multi-page portfolio.

---

Feel free to reach out or connect — links are in the contact section of the site.
