<script lang="ts">
  import type { TechnicalDecisionOption } from "$generated/types/Configuration";
  import ShieldCheckIcon from "$components/icons/ShieldCheckIcon.svelte";
  import CheckCircleIcon from "$components/icons/CheckCircleIcon.svelte";
  import XCircleIcon from "$components/icons/XCircleIcon.svelte";
  import SectionHeader from "$components/ui/SectionHeader.svelte";

  export let technicalDecisions: {
    title: string;
    options: TechnicalDecisionOption[];
    rationale: string;
  }[] = [];
</script>

{#if technicalDecisions && technicalDecisions.length > 0}
  <section class="technical-decisions-section" id="technical-decisions">
    <div class="content-container">
      <SectionHeader
        title="Technical Decisions"
        subtitle="Documenting the trade-offs and architectural shifts during development."
      >
        <svelte:fragment slot="icon">
          <ShieldCheckIcon size={24} color="var(--color-primary)" />
        </svelte:fragment>
      </SectionHeader>

      <div class="decisions-list">
        {#each technicalDecisions as decision}
          <div class="decision-card">
            <h3 class="decision-title">{decision.title}</h3>

            <div class="decision-options">
              {#each decision.options as option}
                <div class="option-button" class:chosen={option.isChosen}>
                  <span class="option-label">{option.label}</span>
                  <span class="option-icon">
                    {#if option.isChosen}
                      <CheckCircleIcon size={16} color="currentColor" />
                    {:else}
                      <XCircleIcon size={16} color="currentColor" />
                    {/if}
                  </span>
                </div>
              {/each}
            </div>

            <div class="decision-rationale">
              <span class="rationale-label">Rationale:</span>
              <span class="rationale-text">{decision.rationale}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}

<style>
  .technical-decisions-section {
    width: 100%;
    color: var(--color-text-primary);
  }

  .content-container {
    width: 100%;
  }

  /* List and card styles */
  .decisions-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    background: var(--color-bg-secondary);
    padding: var(--space-8);
    border-radius: var(--radius-lg);
  }

  .decision-card {
    border-bottom: 1px solid var(--color-border-subtle);
    padding-bottom: var(--space-8);
  }

  .decision-card:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .decision-title {
    font-family: var(--font-primary);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin-top: 0;
    margin-bottom: var(--space-6);
  }

  .decision-options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .option-button {
    flex: 1;
    min-width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3) var(--space-4);
    background: var(--color-bg-tertiary);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
  }

  .option-button.chosen {
    border-color: var(--color-primary);
    color: var(--color-text-primary);
  }

  .option-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  .option-icon {
    display: flex;
    align-items: center;
  }

  .option-button.chosen .option-icon {
    color: var(--color-primary);
  }

  .decision-rationale {
    font-size: var(--font-size-sm);
    line-height: 1.6;
    color: var(--color-text-secondary);
  }

  .rationale-label {
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
    margin-right: var(--space-1);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .content-container {
      width: 90%;
    }
  }

  @media (max-width: 640px) {
    .decision-options {
      flex-direction: column;
    }

    .option-button {
      min-width: 100%;
    }
  }
</style>
