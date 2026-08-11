// src/data/projects.ts — selected work (design.md §14)
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "video-clipper",
    index: "01",
    title: "Video Clipper",
    category: "CLI + Web app",
    year: "2025",
    problem:
      "Finding highlight moments in long-form video is slow, manual work — scrubbing timelines and guessing what will land.",
    built:
      "TypeScript CLI pulls the transcript, chunks it, scores every segment with an LLM; a Svelte web app drives the same pipeline — paste a URL, watch the ranked segments appear, cut clips with ffmpeg in one click.",
    impact: "Top 10 ranked segments per run.",
    stack: ["TypeScript", "Node.js", "Svelte", "LLM API", "ffmpeg", "yt-dlp"],
    links: [
      { label: "GITHUB", href: "https://github.com/AmreetKumarkhuntia/video-clipper" },
    ],
  },
  {
    id: "on-device-voice-assistant",
    index: "02",
    title: "Knik",
    category: "Local-first AI",
    year: "2025",
    problem:
      "Cloud voice assistants trade privacy for convenience; network round-trip adds latency you can feel.",
    built:
      "Kokoro-82M TTS with an async FastAPI backend and React frontend; an MCP router orchestrates local tools so the whole loop — listen, think, speak — stays on-device and fast.",
    impact: "Sub-second local voice latency.",
    stack: ["React", "FastAPI", "Kokoro-82M", "MCP", "Python", "WebAudio"],
    links: [
      { label: "GITHUB", href: "https://github.com/AmreetKumarkhuntia/knik" },
    ],
  },
  {
    id: "motion-first-component-library",
    index: "03",
    title: "Vernix",
    category: "Component library",
    year: "2024",
    problem:
      "Design patterns drifted between projects; UI work kept restarting from zero — slow, inconsistent, hard to maintain.",
    built:
      "Published SvelteKit + Vite component library: buttons, inputs, modals and more, each with motion baked in so consuming apps get consistent feel for free.",
    impact: "10+ reusable components.",
    stack: ["Svelte", "SvelteKit", "Vite", "TypeScript", "NPM"],
    links: [
      { label: "GITHUB", href: "https://github.com/AmreetKumarkhuntia/project-vernix" },
    ],
  },
  {
    id: "structured-logging-library",
    index: "04",
    title: "Lilac",
    category: "Dev tooling",
    year: "2024",
    problem:
      "Debugging crawled because logs were unstructured — no levels, no context, nothing queryable.",
    built:
      "Small dependency-light logger with custom transports for console, file, and remote sinks; structured by default, so logs become data instead of noise.",
    impact: "−20% debugging time.",
    stack: ["TypeScript", "Node.js", "NPM"],
    links: [
      { label: "GITHUB", href: "https://github.com/AmreetKumarkhuntia/lilac-typescript" },
    ],
  },
];
