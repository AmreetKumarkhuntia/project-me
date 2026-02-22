<script lang="ts">
  import ServerIcon from "$components/icons/ServerIcon.svelte";
  import ConnectorVerticalIcon from "$components/icons/ConnectorVerticalIcon.svelte";
  import SectionHeader from "$components/ui/SectionHeader.svelte";

  export let architecture: {
    title: string;
    controlPlane: {
      label: string;
      items: string[];
    };
    dataPlane: {
      label: string;
      nodes: string[];
    };
  };
</script>

{#if architecture}
  <section class="system-architecture-section" id="system-architecture">
    <div class="content-container">
      <SectionHeader
        title={architecture.title}
        subtitle="High-level overview of the control and data plane components."
      >
        <svelte:fragment slot="icon">
          <ServerIcon size={24} color="var(--color-primary)" />
        </svelte:fragment>
      </SectionHeader>

      <div class="diagram-container">
        <!-- Control Plane -->
        <div class="plane-box control-plane">
          <h3 class="plane-label">{architecture.controlPlane.label}</h3>
          <div class="nodes-grid">
            {#each architecture.controlPlane.items as item}
              <div class="node-card">{item}</div>
            {/each}
          </div>
        </div>

        <!-- Connector -->
        <div class="connector">
          <ConnectorVerticalIcon
            size={24}
            height={40}
            color="currentColor"
            class="connector-line"
          />
        </div>

        <!-- Data Plane -->
        <div class="plane-box data-plane">
          <h3 class="plane-label">{architecture.dataPlane.label}</h3>
          <div class="nodes-grid">
            {#each architecture.dataPlane.nodes as node}
              <div class="node-card">{node}</div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  .system-architecture-section {
    width: 100%;
    color: var(--color-text-primary);
  }

  .content-container {
    width: 100%;
  }

  /* Diagram styles */
  .diagram-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--color-bg-secondary);
    padding: var(--space-8);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-subtle);
  }

  .plane-box {
    width: 100%;
    border: 1px dashed var(--color-border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-8);
    background: var(--color-bg-tertiary);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .plane-label {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-top: 0;
    margin-bottom: var(--space-6);
    font-weight: var(--font-weight-bold);
  }

  .nodes-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    justify-content: center;
    width: 100%;
  }

  .node-card {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-subtle);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    min-width: 140px;
    text-align: center;
    box-shadow: var(--shadow-subtle);
  }

  .connector {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-2) 0;
    color: var(--color-border-subtle);
  }

  @media (max-width: 1024px) {
    .content-container {
      width: 90%;
    }
  }

  @media (max-width: 640px) {
    .nodes-grid {
      flex-direction: column;
    }

    .node-card {
      width: 100%;
    }
  }
</style>
