<script lang="ts">
  import "vergins/css/improved-theme";
  import { onMount } from "svelte";

  import "$css/style.scss";
  import Navbar from "$components/Navbar.svelte";
  import { projectStore } from "$stores/projects";
  import Loader from "$components/Loaders/Loader.svelte";
  import Flyer from "$components/Flyer.svelte";

  let splineViewer: HTMLDivElement | null = null;
  const splineUrl =
    "https://prod.spline.design/NOCuMB-Go49BrzoP/scene.splinecode";

  $: showLoader = $projectStore.showLoader;

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

  onMount(async () => {
    hideSpline();
  });
</script>

<svelte:head>
  <script
    type="module"
    src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"
  ></script>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
  />
</svelte:head>

<div class="spline-background">
  <spline-viewer bind:this={splineViewer} url={splineUrl}></spline-viewer>
</div>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="body" on:mousemove={handleMouseMove}>
  {#if showLoader}
    <div
      class="loader-container display-flex display-flex-center display-align-col"
    >
      <Loader />
    </div>
  {/if}
  <div style="display: {showLoader === true ? 'none' : 'block'};">
    <Navbar />
    <Flyer />
    <slot />
  </div>
</div>

<style>
  .spline-background,
  .body {
    overflow-x: hidden;
    position: fixed;
    z-index: -10;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
  .body::-webkit-scrollbar {
    display: none;
  }
  .body {
    height: calc(100vh - var(--page-margin));
    margin-top: var(--page-margin);
    z-index: 0;
  }

  .loader-container {
    height: 100vh;
    width: 100vw;

    position: fixed;
    top: 0;
    left: 0;
  }
</style>
