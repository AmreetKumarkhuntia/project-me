<script lang="ts">
  import { goto } from "$app/navigation";
  import { setLoader } from "$stores/site";
  import MenuOption from "./Svg/MenuOption.svelte";

  function onMenuClick() {
    setLoader(true);
    goto("/configure");
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="site-settings display-flex" on:click={onMenuClick}>
  <div class="site-settings-menu">
    <MenuOption />
  </div>
  <div class="site-settings-menu">CONFIG CHANGE</div>
</div>

<style>
  .site-settings {
    position: fixed;
    top: 50vh;
    left: 2vw;
    z-index: 100;

    font-size: var(--font-xs);

    writing-mode: vertical-rl;
    text-orientation: upright;
  }

  .site-settings-menu {
    height: 28px;
    padding: 4px;
  }

  @media only screen and (max-width: 670px) {
    .site-settings {
      display: none;
    }
  }
</style>
