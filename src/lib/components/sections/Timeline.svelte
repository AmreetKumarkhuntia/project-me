<script lang="ts">
  import { experience } from "$configuration/experience";
  import TrendIcon from "$components/icons/TrendIcon.svelte";
</script>

<section class="impact-timeline">
  <div class="container">
    <div class="header">
      <h2 class="subtitle">CAREER PATH</h2>
      <h1 class="title">Timeline of Impact</h1>
    </div>

    <div class="timeline">
      {#each experience as item, i}
        <div class="timeline-item">
          <!-- Timeline graphics -->
          <div class="timeline-marker">
            <div class="dot"></div>
            {#if i !== experience.length - 1}
              <div class="line"></div>
            {/if}
          </div>

          <!-- Content -->
          <div class="content">
            <div class="role-header">
              <div class="role-title">
                <h3>{item.role}</h3>
                <span class="company">{item.company}</span>
              </div>
              <span class="period">{item.period}</span>
            </div>

            <p class="description">{item.description}</p>

            <div class="impact-metric">
              <TrendIcon size={16} class="trend-icon" />
              <span class="label">SCALE IMPACT:</span>
              <span class="value">{item.scaleImpact}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .impact-timeline {
    color: var(--color-text-primary);
    padding: var(--space-20) 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .container {
    max-width: var(--container-lg);
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
  }

  .header {
    margin-bottom: var(--space-8);
  }

  .subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-primary); /* Yellow/Gold from theme */
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-2);
    font-family: var(--font-secondary);
  }

  .title {
    font-size: var(--font-size-5xl);
    font-family: var(--font-secondary);
    font-weight: var(--font-weight-bold);
    margin: 0;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .timeline-item {
    display: flex;
    gap: var(--space-8);
    position: relative;
  }

  .timeline-item:last-child .content {
    padding-bottom: 0;
  }

  .timeline-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 24px;
    padding-top: var(--space-2);
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: var(--color-primary);
    border-radius: 50%;
    z-index: 1;
    z-index: 1;
    box-shadow: var(--shadow-glow);
  }

  .line {
    width: 2px;
    flex-grow: 1;
    background-color: var(--color-border-secondary);
    opacity: 1;
    margin-top: var(--space-2);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding-top: 0;
    padding-bottom: var(--space-16);
  }

  .role-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  .role-title h3 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    font-family: var(--font-secondary);
    margin: 0 0 var(--space-1) 0;
  }

  .company {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
  }

  .period {
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary); /* Faded text */
    border: 1px solid var(--color-border-secondary);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    letter-spacing: 0.05em;
    font-weight: var(--font-weight-medium);
  }

  .description {
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin: 0;
    max-width: 65ch;
  }

  .impact-metric {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .impact-metric .label {
    margin: 0 !important;
  }

  :global(.trend-icon) {
    color: var(--color-primary);
  }

  .metric-text {
    font-size: var(--font-size-sm);
    font-family: var(--font-mono);
  }

  .label {
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
    margin-right: var(--space-2);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .value {
    color: var(--color-text-primary);
  }

  @media (max-width: 768px) {
    .container {
      gap: var(--space-12);
    }

    .timeline-item {
      gap: var(--space-4);
    }

    .role-header {
      flex-direction: column;
      gap: var(--space-1);
    }

    .period {
      align-self: flex-start;
      margin-top: var(--space-2);
    }
  }
</style>
