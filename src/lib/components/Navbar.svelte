<script lang="ts">
  import { Navbar } from "vergins";
  import type { NavigationOptions, NavbarProps } from "vergins";

  import { goto } from "$app/navigation";
  import { openInANewWindow } from "$client/navigation";
  import {
    getHorizontalNavigation,
    getVerticalNavigation,
  } from "$configuration/navigation";
  import MenuOption from "./Svg/MenuOption.svelte";
  import { slide } from "svelte/transition";
  import { setLoader, siteStore } from "$stores/site";

  $: source = $siteStore.source;

  let showVerticalOverlay: boolean = false;

  function onClick(e: NavigationOptions) {
    closeMenuClick();
    if (e.id !== "linkedin" && e.id !== "github") {
      const pathname = window.location.pathname;
      if (pathname !== e.navigationURL) setLoader(true);

      goto(e.navigationURL);
    } else openInANewWindow(e.navigationURL);
  }

  function openMenuClick() {
    showVerticalOverlay = true;
  }

  function closeMenuClick() {
    showVerticalOverlay = false;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="navbar">
  <div class="navbar-horizontal">
    <Navbar navbarProps={getHorizontalNavigation(source)} {onClick} />
  </div>
  <div class="navbar-vertical">
    <div
      class="navbar-menu-option"
      on:click={() => {
        goto("/");
      }}
    >
      AMREET K
    </div>
    <div class="navbar-menu-option" on:click={openMenuClick}>
      <MenuOption />
    </div>
  </div>
  {#if showVerticalOverlay}
    <div
      class="navbar-vertical-overlay"
      in:slide={{ duration: 300 }}
      out:slide={{ duration: 300 }}
    >
      <Navbar
        navbarProps={getVerticalNavigation(source)}
        navbarAlignment={"vertical"}
        {onClick}
        rightImageClick={closeMenuClick}
      />
    </div>
  {/if}
</div>

<style>
  .navbar {
    height: var(--navbar-height);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .navbar-horizontal {
    height: inherit;

    --navbar-padding: 0;
  }

  .navbar-vertical {
    width: 100%;
    height: inherit;

    display: none;
  }

  .navbar-menu-option {
    height: 32px;
    width: auto;
    margin: 0 40px;
    cursor: pointer;

    color: var(--secondary-color);
    font-family: var(--sign-font-family);
    letter-spacing: 4px;
  }

  .navbar-vertical-overlay {
    background-color: var(--dark-background-color);
    backdrop-filter: blur(12px);

    height: 100vh;
    width: 100vw;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;

    --navbar-padding: 0;
  }

  @media only screen and (max-width: 900px) {
    .navbar-horizontal {
      display: none;
    }

    .navbar-vertical {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  @media only screen and (max-width: 400px) {
    .navbar-menu-option {
      height: 26px;
    }
  }
</style>
