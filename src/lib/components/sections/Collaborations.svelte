<script lang="ts">
  import LightningIcon from "$components/icons/LightningIcon.svelte";
  import StackIcon from "$components/icons/StackIcon.svelte";
  import CloudIcon from "$components/icons/CloudIcon.svelte";
  import ShieldIcon from "$components/icons/ShieldIcon.svelte";

  const cards = [
    {
      icon: LightningIcon,
      title: "High-Throughput APIs",
      stat: "SUB-50MS P95 LATENCY",
    },
    {
      icon: StackIcon,
      title: "Distributed State",
      stat: "LINEAR SCALABILITY",
    },
    {
      icon: CloudIcon,
      title: "Infrastructure as Code",
      stat: "ZERO-DOWNTIME DEPLOYS",
    },
    {
      icon: ShieldIcon,
      title: "Real-time Processing",
      stat: "500K EVENTS / SECOND",
    },
  ];
</script>

<section class="outcome-section">
  <div class="outcome-content">
    <div class="header-container">
      <span class="label">MY CAPABILITIES</span>
      <h2 class="section-title">Outcome-Driven Engineering</h2>
    </div>

    <div class="cards-grid">
      {#each cards as card}
        <div class="card">
          <div class="card-icon">
            <svelte:component
              this={card.icon}
              size={48}
              color="var(--color-primary)"
            />
          </div>
          <h3 class="card-title">{card.title}</h3>
          <p class="card-stat">{card.stat}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .outcome-section {
    padding: var(--space-44) 0 var(--space-32) 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .outcome-content {
    max-width: var(--container-xl);
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header-container {
    text-align: center;
    margin-bottom: var(--space-20);
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
    width: 100%;
  }

  .card {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-bg-tertiary); /* Soft border initially */
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    aspect-ratio: 1 / 1;
    justify-content: space-between;
    transition: all 0.3s ease;
  }

  .card:hover {
    border-color: var(--color-border-primary);
    transform: translateY(-5px);
    cursor: pointer;
    box-shadow: var(--shadow-subtle);
  }

  .card-icon {
    margin-bottom: var(--space-4);
  }

  .card-title {
    font-family: var(--font-secondary);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin-bottom: 0;
  }

  .card-stat {
    font-family: var(--font-primary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-tertiary);
    letter-spacing: var(--space-0-5);
    text-transform: uppercase;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }
  }

  @media (max-width: 768px) {
    .outcome-content {
      width: 90%;
    }

    .section-title {
      font-size: var(--font-size-4xl);
    }

    .cards-grid {
      grid-template-columns: 1fr;
    }

    .card {
      aspect-ratio: auto;
      padding: var(--space-6);
    }
  }
</style>
