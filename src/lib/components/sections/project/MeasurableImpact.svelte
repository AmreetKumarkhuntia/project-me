<script lang="ts">
  import type { MeasurableImpact } from "$generated/types/Configuration";
  import BarChartIcon from "$components/icons/BarChartIcon.svelte";
  import SectionHeader from "$components/ui/SectionHeader.svelte";

  export let measurableImpact: MeasurableImpact | null = null;
</script>

{#if measurableImpact && measurableImpact.items.length > 0}
  <section class="measurable-impact-section" id="measurable-impact">
    <div class="content-container">
      <SectionHeader
        title="Measurable Impact"
        subtitle={measurableImpact.subtitle ?? ""}
      >
        <svelte:fragment slot="icon">
          <BarChartIcon size={24} color="var(--color-primary)" />
        </svelte:fragment>
      </SectionHeader>

      <div class="metrics-grid">
        {#each measurableImpact.items as item}
          <div class="metric-card">
            <span class="metric-label">{item.label}</span>
            <div class="metric-value-container">
              <span class="metric-value">{item.value}</span>
              <span class="metric-subvalue">{item.subValue}</span>
            </div>
            {#if item.trend}
              <span class="metric-trend">{item.trend}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}

<style>
  .measurable-impact-section {
    width: 100%;
    color: var(--color-text-primary);
  }

  .content-container {
    width: 100%;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-6);
  }

  .metric-card {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--space-6) var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .metric-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .metric-value-container {
    display: flex;
    align-items: baseline;
    gap: var(--space-1);
    margin: var(--space-2) 0;
  }

  .metric-value {
    font-size: var(--font-size-4xl);
    font-family: var(--font-primary);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .metric-subvalue {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
  }

  .metric-trend {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin-top: var(--space-2);
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  @media (max-width: 1024px) {
    .content-container {
      width: 90%;
    }
  }
</style>
