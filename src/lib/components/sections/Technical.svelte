<script lang="ts">
  import Badge from "$components/ui/Badge.svelte";
  import { technicalInventory } from "$configuration/skills";
  import CpuIcon from "$components/icons/CpuIcon.svelte";
  import DatabaseIcon from "$components/icons/DatabaseIcon.svelte";
  import CloudIcon from "$components/icons/CloudIcon.svelte";

  const iconMap: Record<string, any> = {
    cpu: CpuIcon,
    database: DatabaseIcon,
    cloud: CloudIcon,
  };
</script>

<section class="tech-inventory">
  <div class="container">
    <div class="header">
      <h2 class="subtitle">TECHNICAL INVENTORY</h2>
      <h1 class="title">Built to Sustain</h1>
    </div>

    <div class="grid">
      {#each technicalInventory as category}
        <div class="column">
          <div class="column-header">
            <svelte:component
              this={iconMap[category.icon]}
              size={24}
              class="icon"
            />
            <h3>{category.title}</h3>
          </div>

          {#each category.items as item}
            <div class="card">
              <div class="card-header">
                <h4>{item.title}</h4>
                <Badge variant="tech">{item.badge}</Badge>
              </div>
              <p>{item.desc}</p>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .tech-inventory {
    color: var(--color-text-primary);
    padding: var(--space-20) 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .container {
    max-width: var(--container-xl);
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }

  .header {
    text-align: center;
    margin-bottom: var(--space-8);
  }

  .subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-2);
    font-family: var(--font-secondary); /* Assuming monospace/sans for label */
  }

  .title {
    font-size: var(--font-size-5xl);
    font-family: var(--font-secondary); /* Serif usually, checking theme */
    font-weight: var(--font-weight-bold);
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
    position: relative;
  }

  /* Vertical separators */
  .column:not(:last-child) {
    border-right: 1px solid var(--color-border-secondary);
    padding-right: var(--space-8);
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .column-header {
    display: flex;
    align-items: center;
    font-family: var(--font-secondary);
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    color: var(--color-primary);
  }

  .column-header h3 {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-black);
    letter-spacing: 0.1em;
    margin: 0;
  }

  /* Icons are styled via props or global class if needed, checking style */
  :global(.icon) {
    stroke: var(--color-primary);
  }

  .card {
    background-color: var(--color-bg-surface-light);
    border: 1px solid var(--color-border-tag);
    padding: var(--space-6);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    border-color: var(--color-border-primary);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h4 {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
  }

  .card p {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    margin: 0;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .column:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid var(--color-border-secondary);
      padding-right: 0;
      padding-bottom: var(--space-8);
    }
  }
</style>
