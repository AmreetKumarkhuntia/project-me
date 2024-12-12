<script lang="ts">
  import "vergins/src/css/improved-theme.css";
  import "$css/style.css";
  import Navbar from "$components/Navbar.svelte";
  import { onMount } from "svelte";

  let splineViewer: HTMLDivElement | null = null;
  const splineUrl =
    "https://prod.spline.design/NOCuMB-Go49BrzoP/scene.splinecode";

  function hideSpline() {
    while (splineViewer === null) {}
    const shadowRoot = splineViewer.shadowRoot;
    if (shadowRoot) {
      const logo = shadowRoot.querySelector("#logo");

      if (logo && logo instanceof HTMLElement) {
        logo.remove();
      }
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (splineViewer !== null) {
      const mouseEvent = new MouseEvent("mousemove", event);
      splineViewer.dispatchEvent(mouseEvent);
    }
  }

  onMount(() => {
    hideSpline();
  });
</script>

<svelte:head>
  <script
    type="module"
    src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"
  ></script>
</svelte:head>

<div class="spline-background">
  <spline-viewer bind:this={splineViewer} url={splineUrl}></spline-viewer>
</div>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="body" on:mousemove={handleMouseMove}>
  <Navbar />
  <slot />
</div>

<style>
  .spline-background,
  .body {
    position: fixed;
    z-index: -10;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
  .body {
    z-index: 0;
    margin-top: 100px;
  }
</style>
