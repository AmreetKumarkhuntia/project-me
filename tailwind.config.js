/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#D4FF00",
          foreground: "#121110",
        },
        /* THE ATELIER design tokens (design-v2 §1) */
        bg: "#121110",
        "bg-2": "#171614",
        "bg-3": "#1D1C19",
        ink: "#EDEAE3",
        "ink-dim": "#A9A49A",
        "ink-faint": "#6E6A61",
        chartreuse: "#D4FF00",
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
        "accent-dim": "var(--accent-dim)",
      },
      spacing: {
        /* page side gutter (design-v2 §3) */
        gutter: "clamp(24px, 6vw, 96px)",
        /* tighter inner gutter (player bar) */
        "gutter-sm": "clamp(16px, 3vw, 48px)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": "clamp(56px, 9vw, 132px)",
        "display-l": "clamp(48px, 7vw, 104px)",
        "display-m": "clamp(36px, 5vw, 72px)",
        "title-s": "24px",
        micro: ["11px", { letterSpacing: "0.18em", lineHeight: "1.5" }],
        "micro-10": ["10px", { letterSpacing: "0.18em", lineHeight: "1.5" }],
      },
      lineHeight: {
        display: "0.98",
        "display-m": "1.05",
        body: "1.65",
      },
      transitionTimingFunction: {
        gallery: "cubic-bezier(0.16, 1, 0.3, 1)",
        "gallery-exit": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        "accent-glow": "0 0 24px rgba(212,255,0,0.25)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "scroll-line": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1.5%, -1%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "scroll-line": "scroll-line 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "ken-burns": "ken-burns 24s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
}
