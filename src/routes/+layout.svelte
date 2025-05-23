<script lang="ts">
  import "vergins/css/improved-theme";
  import "$css/theme.scss";
  import "$css/style.scss";

  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { browser } from "$app/environment";

  import Navbar from "$components/Navbar.svelte";
  import Loader from "$components/Loaders/Loader.svelte";
  import Flyer from "$components/Flyer.svelte";
  import SiteSettings from "$components/SiteSettings.svelte";
  import { setSource, setTheme, siteStore } from "$stores/site";
  import { decodeSource, decodeTheme } from "$generated/types";

  let body: HTMLDivElement | null = null;
  let splineViewer: HTMLDivElement | null = null;
  const splineUrl =
    "https://prod.spline.design/NOCuMB-Go49BrzoP/scene.splinecode";
  const splineViewerJsUrl =
    "https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js";

  $: showLoader = $siteStore.showLoader;
  $: setSiteTheme(), $siteStore.theme;

  function setSiteTheme() {
    if (browser) {
      document.body.setAttribute("data-theme", $siteStore.theme);
    }
  }

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

  afterNavigate(() => {
    if (body) {
      body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  });

  onMount(async () => {
    const savedTheme = decodeTheme(localStorage.getItem("x-theme"));
    const savedSkill = decodeSource(localStorage.getItem("x-skill"));

    if (savedTheme !== null) {
      setTheme(savedTheme);
    }
    if (savedSkill !== null) {
      setSource(savedSkill);
    } else {
      setSource("github");
    }

    hideSpline();
  });
</script>

<svelte:head>
  <script type="module" src={splineViewerJsUrl}></script>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/monokai.min.css"
  />
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
  /> -->
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/night-owl.min.css"
  /> -->
</svelte:head>

<div class="spline-background">
  <spline-viewer bind:this={splineViewer} url={splineUrl}></spline-viewer>
</div>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="body" on:mousemove={handleMouseMove} bind:this={body}>
  {#if showLoader}
    <div
      class="loader-container display-flex display-flex-center display-align-col"
    >
      <Loader />
    </div>
  {/if}
  <div style="display: {showLoader === true ? 'none' : 'block'};">
    <SiteSettings />
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
