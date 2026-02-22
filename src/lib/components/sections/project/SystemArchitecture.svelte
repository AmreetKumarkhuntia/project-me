<script lang="ts">
  import { fade } from "svelte/transition";
  import ServerIcon from "$components/icons/ServerIcon.svelte";
  import ConnectorVerticalIcon from "$components/icons/ConnectorVerticalIcon.svelte";
  import PackageIcon from "$components/icons/PackageIcon.svelte";
  import ConnectorArrowIcon from "$components/icons/ConnectorArrowIcon.svelte";
  import SectionHeader from "$components/ui/SectionHeader.svelte";

  export let architecture: {
    title: string;
    controlPlane: {
      label: string;
      items: string[];
    } | null;
    dataPlane: {
      label: string;
      nodes: string[];
    } | null;
    layers:
      | {
          label: string;
          nodes: {
            icon: string;
            label: string;
            description: string;
          }[];
        }[]
      | null;
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

      {#if architecture.layers}
        <div class="layers-container">
          <div class="vertical-connector-line"></div>
          {#each architecture.layers as layer, i}
            <div
              class="layer-section"
              style:z-index={architecture.layers.length - i}
            >
              <div class="layer-label-wrapper">
                <h3 class="layer-label">{layer.label}</h3>
              </div>
              <div class="layer-nodes-grid">
                {#each layer.nodes as node}
                  <div class="layer-node-card">
                    <div class="node-header">
                      <span class="node-icon">
                        <PackageIcon />
                      </span>
                      <span class="node-title">{node.label}</span>
                    </div>
                    <p class="node-desc">{node.description}</p>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {:else if architecture.controlPlane && architecture.dataPlane}
        <!-- Control Plane -->
        <div class="diagram-container">
          <div class="plane-box control-plane">
            <h3 class="plane-label">{architecture.controlPlane.label}</h3>
            <div class="nodes-grid">
              {#each architecture.controlPlane.items as item}
                <div class="node-card">{item}</div>
              {/each}
            </div>
          </div>

          <!-- Connector -->
          <div class="connector-arrow">
            <ConnectorArrowIcon />
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
      {/if}
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

  .diagram-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--color-bg-panel-dark);
    padding: var(--space-8);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .plane-box {
    width: 100%;
    border: 1px dashed var(--color-border-subtle-dashed);
    border-radius: var(--radius-lg);
    padding: var(--space-8);
    background: var(--color-bg-panel-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .plane-label {
    font-family: monospace; /* Developer monospace style */
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-top: 0;
    margin-bottom: var(--space-6);
    font-weight: var(--font-weight-medium);
  }

  .plane-label::before {
    content: "// ";
  }

  .nodes-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    justify-content: center;
    width: 100%;
  }

  .node-card {
    background: var(--color-bg-card-darker);
    border: 1px solid var(--color-border-subtle-white);
    padding: 12px 24px;
    border-radius: 4px;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    min-width: 140px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .node-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.7);
  }

  .connector-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-3) 0;
    color: rgba(255, 255, 255, 0.3); /* Subtle dotted line */
  }

  /* Layered Architecture Styles */
  .layers-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-24); /* Increased gap between layers */
    width: 100%;
    position: relative;
    padding-left: var(--space-12); /* Increased left padding for the line */
  }

  .vertical-connector-line {
    position: absolute;
    left: var(--space-4); /* Position the line relative to the container */
    top: 50px; /* Start below the first label */
    bottom: 50px; /* End above the last cards */
    width: 2px;
    background: var(--color-primary); /* Solid yellow color */
    opacity: 0.15; /* Make it subtle like in the design */
  }

  .layer-section {
    position: relative;
    /* Add a small solid yellow line segment for each layer */
    border-left: 2px solid var(--color-primary);
    padding-left: var(--space-8);
    margin-left: calc(
      -1 * var(--space-8) - 2px
    ); /* Offset to align with the subtle line */
  }

  .layer-label-wrapper {
    margin-bottom: var(--space-6);
  }

  .layer-label {
    color: var(
      --color-primary
    ); /* Use primary color (yellow) for layer labels */
    font-size: 0.75rem; /* Smaller font size (var(--font-size-xs)) */
    font-weight: 800; /* Bolder font (var(--font-weight-black) or 800) */
    letter-spacing: 0.1em; /* Increased letter spacing */
    text-transform: uppercase;
    font-family: var(
      --font-primary
    ); /* Use primary font instead of secondary */
    margin: 0;
  }

  .layer-nodes-grid {
    display: flex;
    gap: var(--space-6);
    flex-wrap: wrap;
  }

  .layer-node-card {
    background: var(--color-bg-card-dark);
    border-radius: 8px;
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex: 1;
    min-width: 240px;
    max-width: 320px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      border-color 0.2s;
  }

  .layer-node-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .node-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-1); /* Reduced bottom margin */
  }

  .node-icon {
    color: var(--color-primary); /* Yellow icon */
    background: rgba(255, 204, 0, 0.08); /* Very subtle yellow background */
    padding: var(--space-3); /* Slightly more padding */
    border-radius: var(--radius-md); /* Slightly larger radius */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .node-title {
    color: var(--color-text-primary); /* Explicitly white for title */
    font-weight: 700; /* Bold */
    font-size: 1.125rem; /* Slightly larger (var(--font-size-lg) or 1.125rem) */
    letter-spacing: -0.02em; /* Tighter letter spacing */
  }

  .node-desc {
    color: var(--color-text-muted-dark); /* Lighter grey for description */
    font-size: 0.875rem; /* (var(--font-size-sm)) */
    line-height: 1.5;
    margin: 0;
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
