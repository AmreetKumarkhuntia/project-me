<script lang="ts">
  import type {
    Database,
    Framework,
    Language,
    Tool,
  } from "$generated/types/Projects.ts";

  import { techIconMap } from "$constants/index.ts";
  import { onMount } from "svelte";

  export let tech: Language | Database | Tool | Framework = "svelte";
  $: techClass = techIconMap.get(tech) ?? null;
</script>

<div class="display-flex display-flex-center display-align-col">
  <div class="tech-icon">
    {#if techClass !== null}
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <i class={techClass} />
    {/if}
  </div>
  <div class="tech-icon-font">
    {tech}
  </div>
</div>

<style lang="scss">
  .tech-icon {
    color: var(--tech-icon-color);
    font-size: var(--tech-icon-size);
    margin: var(--tech-icon-margin);
    cursor: pointer;

    transition: all 200ms ease;
  }

  .tech-icon:hover {
    transform: var(--tech-icon-transform);
    filter: var(--tech-icon-hover-filter);
  }

  .tech-icon-font {
    font-size: var(--tech-icon-font-size);
  }

  .tech-icon-font:hover {
    filter: var(--tech-icon-hover-filter);
  }
</style>
