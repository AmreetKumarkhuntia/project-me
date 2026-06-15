import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "video-clipper",
    name: "Video Clipper",
    year: "2025",
    kind: "CLI + Web app",
    tags: ["TypeScript", "LLM", "Svelte", "ffmpeg"],
    summary:
      "Analyzes a YouTube video with an LLM, ranks the most interesting moments, and cuts the clips automatically.",
    problem:
      "Finding the highlight moments in long-form video is slow, manual work — scrubbing timelines and guessing what will land.",
    engineering:
      "A TypeScript CLI pulls the transcript, chunks it, and scores every segment with an LLM. A Svelte web app drives the same pipeline — paste a URL, watch the ranked segments appear, and cut clips with ffmpeg in one click.",
    impact: { value: "Top 10", unit: "ranked segments per run" },
    stack: ["TypeScript", "Node.js", "Svelte", "LLM API", "ffmpeg", "yt-dlp"],
    repo: "https://github.com/AmreetKumarkhuntia/video-clipper",
  },
  {
    slug: "knik",
    name: "Knik",
    year: "2025",
    kind: "Local-first AI",
    tags: ["AI", "Local-first", "React", "FastAPI"],
    summary:
      "A privacy-first voice assistant that runs locally — sub-second speech with no cloud round-trip.",
    problem:
      "Cloud voice assistants trade your privacy for convenience, and the network round-trip adds latency you can feel.",
    engineering:
      "Integrated the Kokoro-82M TTS model with an async FastAPI backend and a React frontend. An MCP router orchestrates local tools so the whole loop — listen, think, speak — stays on-device and fast.",
    impact: { value: "Sub-second", unit: "local voice latency" },
    stack: ["React", "FastAPI", "Kokoro-82M", "MCP", "Python", "WebAudio"],
    repo: "https://github.com/AmreetKumarkhuntia/knik",
  },
  {
    slug: "vernix",
    name: "Vernix",
    year: "2024",
    kind: "Component library",
    tags: ["Svelte", "UI/UX", "NPM"],
    summary:
      "A Svelte component library with 10+ reusable components and built-in transitions, published to NPM.",
    problem:
      "Design patterns drifted between projects and UI work kept restarting from zero — slow, inconsistent, hard to maintain.",
    engineering:
      "Built and published a SvelteKit + Vite component library: buttons, inputs, modals and more, each with motion baked in so consuming apps get consistent feel for free.",
    impact: { value: "10+", unit: "reusable components" },
    stack: ["Svelte", "SvelteKit", "Vite", "TypeScript", "NPM"],
    repo: "https://github.com/AmreetKumarkhuntia/project-vernix",
  },
  {
    slug: "lilac",
    name: "Lilac",
    year: "2024",
    kind: "Dev tooling",
    tags: ["TypeScript", "Logging", "NPM"],
    summary:
      "A lightweight TypeScript logging package — structured output, custom transports, published to NPM.",
    problem:
      "Debugging crawled because logs were unstructured — no levels, no context, nothing you could actually query.",
    engineering:
      "Designed and shipped a small, dependency-light logger with custom transports for console, file, and remote sinks. Structured by default, so logs become data instead of noise.",
    impact: { value: "−20%", unit: "debugging time" },
    stack: ["TypeScript", "Node.js", "NPM"],
    repo: "https://github.com/AmreetKumarkhuntia/lilac-typescript",
  },
];
