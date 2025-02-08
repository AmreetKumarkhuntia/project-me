<script lang="ts">
  import { onMount } from "svelte";
  import { DropDown, Header, LazyLoader } from "vergins";
  import type { DropdownItem } from "vergins";

  import { setLoader, setSource, setTheme, siteStore } from "$stores/site";
  import { decodeSource, type Source, type Theme } from "$generated/types";
  import { talentItems } from "$configuration";

  const availableThemes: Theme[] = ["default", "green", "red", "blue"];

  let dropDownSelectorProps: DropdownItem[] = [];

  function handleThemeChange(changedTheme: Theme) {
    setTheme(changedTheme);
    localStorage.setItem("x-theme", changedTheme);
  }

  onMount(() => {
    const activeSource = $siteStore.source;
    const newItems: DropdownItem[] = [];

    for (let i = 0; i < talentItems.length; i++) {
      newItems.push({
        ...talentItems[i],
        action: () => {
          setSource(talentItems[i].id);
        },
        active: talentItems[i].id === activeSource,
      });
    }

    dropDownSelectorProps = newItems;
    setLoader(false);
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="configure">
  <Header hLevel={2}>
    <LazyLoader>Change Theme</LazyLoader>
  </Header>
  <div class="display-flex display-justify-even display-flex-wrap">
    {#each availableThemes as theme}
      <div
        class="configure-theme-container {theme === $siteStore.theme
          ? 'configure-theme-active'
          : ''}"
        on:click={() => {
          handleThemeChange(theme);
        }}
      >
        <div class="configure-theme" data-theme={theme}></div>
        <div class="configure-theme-text">{theme}</div>
      </div>
    {/each}
  </div>
  <Header hLevel={2}>
    <LazyLoader>Select Skill</LazyLoader>
  </Header>
  <div>
    {#if dropDownSelectorProps.length > 0}
      <DropDown items={dropDownSelectorProps} />
    {/if}
  </div>
</div>

<style lang="scss">
  .configure {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);

    --configure-theme-size: 60px;
  }

  .configure-theme-container {
    cursor: pointer;
    margin: 24px;
    transition: var(--configuration-transition);
  }

  .configure-theme {
    width: var(--configure-theme-size);
    height: var(--configure-theme-size);
    border-radius: 5px;

    cursor: pointer;

    background: linear-gradient(
      to bottom left,
      var(--primary-color) 50%,
      var(--quaternary-color) 50%
    );
    border: 1px solid var(--quaternary-color); /* Optional border */
  }

  .configure-theme-active {
    filter: drop-shadow(2px 2px 10px var(--active-color));
  }

  .configure-theme-text {
    text-align: center;
    text-transform: capitalize;
    color: var(--primary-color);

    margin: 8px 0;
  }
</style>
