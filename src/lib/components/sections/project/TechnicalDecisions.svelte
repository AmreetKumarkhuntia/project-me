<script lang="ts">
    import type { TechnicalDecisionOption } from "$generated/types/Configuration";

    export let technicalDecisions: {
        title: string;
        options: TechnicalDecisionOption[];
        rationale: string;
    }[] = [];
</script>

{#if technicalDecisions && technicalDecisions.length > 0}
    <section class="technical-decisions-section" id="technical-decisions">
        <div class="content-container">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="shield-icon">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-primary)"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                            />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </span>
                    TECHNICAL DECISIONS
                </h2>
                <p class="section-subtitle">
                    Documenting the trade-offs and architectural shifts during
                    development.
                </p>
            </div>

            <div class="decisions-list">
                {#each technicalDecisions as decision}
                    <div class="decision-card">
                        <h3 class="decision-title">{decision.title}</h3>

                        <div class="decision-options">
                            {#each decision.options as option}
                                <div
                                    class="option-button"
                                    class:chosen={option.isChosen}
                                >
                                    <span class="option-label"
                                        >{option.label}</span
                                    >
                                    <span class="option-icon">
                                        {#if option.isChosen}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                />
                                                <polyline
                                                    points="22 4 12 14.01 9 11.01"
                                                />
                                            </svg>
                                        {:else}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                />
                                                <line
                                                    x1="15"
                                                    y1="9"
                                                    x2="9"
                                                    y2="15"
                                                />
                                                <line
                                                    x1="9"
                                                    y1="9"
                                                    x2="15"
                                                    y2="15"
                                                />
                                            </svg>
                                        {/if}
                                    </span>
                                </div>
                            {/each}
                        </div>

                        <div class="decision-rationale">
                            <span class="rationale-label">Rationale:</span>
                            <span class="rationale-text"
                                >{decision.rationale}</span
                            >
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

    /* Header styles */
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

    .shield-icon {
        display: flex;
        align-items: center;
    }

    .section-subtitle {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin: 0;
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
