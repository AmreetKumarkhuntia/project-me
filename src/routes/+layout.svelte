<script lang="ts">
  import "$css/theme.scss";
  import "$css/style.scss";

  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { browser } from "$app/environment";

  import Loader from "$components/Loaders/Loader.svelte";
  import { setSource, setTheme, siteStore } from "$stores/site";
  import { decodeSource, decodeTheme } from "$generated/types";

  let body: HTMLDivElement | null = null;

  $: showLoader = $siteStore.showLoader;
  $: setSiteTheme(), $siteStore.theme;

  function setSiteTheme() {
    if (browser) {
      document.body.setAttribute("data-theme", $siteStore.theme);
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
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/monokai.min.css"
  />
</svelte:head>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="body" bind:this={body}>
  {#if showLoader}
    <div
      class="loader-container display-flex display-flex-center display-align-col"
    >
      <Loader />
    </div>
  {/if}
  <div style="display: {showLoader === true ? 'none' : 'block'};">
    <slot />
  </div>
</div>

<style>
  .body {
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 0;
    padding: 0 var(--space-24) 0 var(--space-24);
    background: linear-gradient(
      180deg,
      var(--color-bg-primary) 0%,
      var(--color-bg-secondary) 100%
    );
  }

  .body::-webkit-scrollbar {
    display: none;
  }

  .loader-container {
    height: 100vh;
    width: 100vw;

    position: fixed;
    top: 0;
    left: 0;
  }
</style>
