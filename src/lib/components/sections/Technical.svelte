<script lang="ts">
  import { technicalInventory } from "$configuration/skills";
  import Badge from "$components/ui/Badge.svelte";
  import CpuIcon from "$components/icons/CpuIcon.svelte";
  import DatabaseIcon from "$components/icons/DatabaseIcon.svelte";
  import CloudIcon from "$components/icons/CloudIcon.svelte";
  import NetworkIcon from "$components/icons/NetworkIcon.svelte";
  import TestingIcon from "$components/icons/TestingIcon.svelte";
  import CicdIcon from "$components/icons/CicdIcon.svelte";

  const iconMap: Record<string, any> = {
    cpu: CpuIcon,
    database: DatabaseIcon,
    cloud: CloudIcon,
    network: NetworkIcon,
    testing: TestingIcon,
    cicd: CicdIcon,
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
              size={20}
              stroke="var(--color-primary)"
            />
            <h3>{category.title}</h3>
          </div>

          {#if category.chips && category.chips.length > 0}
            <div class="chips">
              {#each category.chips as chip}
                <Badge variant="tech">{chip}</Badge>
              {/each}
            </div>
          {/if}
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
    text-align: left;
    margin-bottom: var(--space-4);
  }

  .subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-2);
    font-family: var(--font-secondary);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .title {
    font-size: var(--font-size-5xl);
    font-family: var(--font-secondary);
    font-weight: var(--font-weight-bold);
    margin: 0 0 var(--space-2) 0;
    line-height: 1.1;
  }

  .header::after {
    content: "";
    display: block;
    width: 3rem;
    height: 2px;
    background-color: var(--color-primary);
    margin-top: var(--space-3);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-12);
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .column-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-secondary);
  }

  .column-header h3 {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-black);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0;
    color: var(--color-text-secondary);
    font-family: var(--font-secondary);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
  }

  @media (max-width: 768px) {
    .title {
      font-size: var(--font-size-4xl);
    }
  }
</style>
