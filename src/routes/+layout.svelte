<script lang="ts">
  import "$css/noir.scss";
  import { onMount } from "svelte";
  import BackgroundField from "$components/BackgroundField.svelte";

  let { children } = $props();

  onMount(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let io: IntersectionObserver | null = null;

    function enable() {
      root.classList.add("reveal-on");
      // hero stagger: reveal on next frame so the transition plays
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          document.querySelectorAll<HTMLElement>(".stag").forEach((el, i) => {
            el.style.transitionDelay = (0.05 + i * 0.07).toFixed(2) + "s";
            el.classList.add("is-in");
          });
        }),
      );
      // scroll-driven reveals for the rest
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
      );
      document.querySelectorAll(".r").forEach((el) => io!.observe(el));
    }

    let onVis: (() => void) | null = null;

    // content stays fully visible when reduced motion is requested
    if (!reduced) {
      if (!document.hidden) {
        // give the DOM a tick to paint, then arm reveals
        requestAnimationFrame(enable);
      } else {
        onVis = () => {
          if (!document.hidden) {
            document.removeEventListener("visibilitychange", onVis!);
            enable();
          }
        };
        document.addEventListener("visibilitychange", onVis);
      }
    }

    return () => {
      io?.disconnect();
      if (onVis) document.removeEventListener("visibilitychange", onVis);
      root.classList.remove("reveal-on");
    };
  });
</script>

<div class="scanlight"></div>
<div class="gridfx"></div>
<BackgroundField />
<div class="grain"></div>
<div class="shell">
  {@render children()}
</div>
