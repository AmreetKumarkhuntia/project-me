<script lang="ts">
  import { philosophy } from "$configuration/philosophy";
  import BoltIcon from "$components/icons/BoltIcon.svelte";
  import PulseIcon from "$components/icons/PulseIcon.svelte";
  import ShieldIcon from "$components/icons/ShieldIcon.svelte";

  const iconMap: Record<string, any> = {
    bolt: BoltIcon,
    pulse: PulseIcon,
    shield: ShieldIcon,
  };
</script>

<section class="philosophy-section">
  <div class="container">
    {#each philosophy as item, i}
      <div class="card {i === 1 ? 'highlight' : ''}">
        <div class="card-content">
          <div class="header">
            <h3 class="title">{item.title}</h3>
          </div>
          <p class="quote">{item.quote}</p>
        </div>
        <div class="icon-wrapper">
          <svelte:component this={iconMap[item.icon]} size={120} class="icon" />
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .philosophy-section {
    color: var(--color-text-primary);
    padding: var(--space-20) 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .container {
    max-width: var(--container-lg);
    width: 90%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }

  .card {
    background-color: var(--color-bg-surface-light);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--space-8);
    position: relative;
    overflow: hidden;
    transition:
      transform 0.3s ease,
      border-color 0.3s ease;
    display: flex;
    flex-direction: column;
    min-height: 400px; /* Taller card */
  }

  .card:hover,
  .card.highlight {
    border-color: var(--color-border-primary);
    transform: translateY(-4px);
  }

  /* Center Highlight Border */
  .card.highlight {
    border: 1px solid var(--color-primary-light);
    box-shadow: var(--shadow-subtle);
  }

  .header {
    margin-bottom: var(--space-6);
    position: relative;
    z-index: 2;
  }

  .title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.15em;
    color: var(--color-primary);
    margin: 0;
    text-transform: uppercase;
    font-family: var(--font-secondary);
  }

  .icon-wrapper {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 1;
    pointer-events: none;
    transform: rotate(15deg);
  }

  :global(.icon) {
    color: var(--color-text-tertiary);
    opacity: 0.05;
    transition: opacity 0.3s ease;
  }

  .card:hover :global(.icon),
  .card.highlight :global(.icon) {
    opacity: 0.1;
  }

  .quote {
    font-family: var(--font-primary);
    font-size: var(--font-size-md);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary);
    margin: 0;
    font-style: italic;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 1024px) {
    .container {
      grid-template-columns: 1fr;
      max-width: 500px;
    }

    .card.highlight {
      transform: none;
    }
  }
</style>
