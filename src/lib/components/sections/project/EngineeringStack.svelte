<script lang="ts">
  import type { EngineeringStack } from "$generated/types/Configuration";
  import CpuIcon from "$components/icons/CpuIcon.svelte";
  import SectionHeader from "$components/ui/SectionHeader.svelte";

  export let title: string;
  export let stack: EngineeringStack | null = null;
</script>

{#if stack}
  <div class="engineering-stack-section">
    <SectionHeader {title}>
      <svelte:fragment slot="icon">
        <CpuIcon size={24} color="var(--color-primary)" />
      </svelte:fragment>
    </SectionHeader>
    <p class="stack-subtitle">{stack.subtitle}</p>
    <div class="stack-subtitle-line"></div>
    <div class="stack-grid">
      {#each stack.groups as group}
        <div class="stack-group">
          <p class="stack-group-label">{group.label}</p>
          <div class="stack-pills">
            {#each group.items as item}
              <span class="stack-pill">{item}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .engineering-stack-section {
    width: 100%;
  }

  .stack-subtitle {
    color: var(--color-text-secondary);
    font-size: var(--font-size-base);
    margin-bottom: var(--space-2);
    line-height: var(--line-height-relaxed);
  }

  .stack-subtitle-line {
    width: 40px;
    height: 2px;
    background-color: var(--color-primary);
    margin-bottom: var(--space-8);
  }

  .stack-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-10) var(--space-8);
  }

  .stack-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .stack-group-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-widest);
    margin: 0;
  }

  .stack-pills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .stack-pill {
    display: inline-flex;
    align-items: center;
    padding: var(--space-1) var(--space-3);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    background: transparent;
    border: 1px solid var(--color-border-secondary);
    border-radius: var(--radius-full);
    white-space: nowrap;
    transition:
      border-color var(--transition-fast),
      color var(--transition-fast);
  }

  .stack-pill:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  @media (max-width: 1024px) {
    .stack-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .stack-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
