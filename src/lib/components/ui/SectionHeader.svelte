<script lang="ts">
  import type { Snippet } from "svelte";

  export let title: string;
  export let subtitle: string | undefined = undefined;
</script>

<div class="section-header">
  <h2 class="section-title">
    {#if $$slots.icon}
      <span class="header-icon">
        <slot name="icon" />
      </span>
    {/if}
    {title.toUpperCase()}
  </h2>
  {#if subtitle}
    <p class="section-subtitle">
      {subtitle}
    </p>
  {/if}
</div>

<style>
  .section-header {
    margin-bottom: var(--space-12);
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(
        to right,
        var(--color-primary) 0%,
        var(--color-primary) 5%,
        transparent 5%,
        transparent 100%
      )
      1;
    padding-bottom: var(--space-4);
  }

  .section-title {
    font-family: var(--font-secondary);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    margin-top: 0;
    margin-bottom: var(--space-2);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--color-text-primary);
  }

  .header-icon {
    display: flex;
    align-items: center;
  }

  .section-subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0;
  }
</style>
