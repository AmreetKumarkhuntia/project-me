<script lang="ts">
  import SectionHeader from "$components/ui/SectionHeader.svelte";
  import DocumentIcon from "$components/icons/DocumentIcon.svelte";
  import LightningIcon from "$components/icons/LightningIcon.svelte";

  export let section: {
    id: string;
    title: string;
    content?: string;
    keyContribution?: string | null;
  };
</script>

<div class="generic-section">
  <SectionHeader title={section.title}>
    <svelte:fragment slot="icon">
      {#if section.id === "executive-summary"}
        <DocumentIcon size={24} color="var(--color-primary)" />
      {:else}
        <LightningIcon size={24} color="var(--color-primary)" />
      {/if}
    </svelte:fragment>
  </SectionHeader>

  {#if section.content}
    <div class="section-content">
      <p>{section.content}</p>
    </div>
  {/if}

  {#if section.keyContribution}
    <div class="key-contribution-card">
      <span class="contribution-label">KEY CONTRIBUTION</span>
      <p class="contribution-text">{section.keyContribution}</p>
    </div>
  {/if}
</div>

<style>
  .generic-section {
    width: 100%;
  }

  .section-content {
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
    line-height: 1.8;
  }

  .section-content p {
    margin: 0 0 var(--space-4) 0;
    white-space: pre-line;
  }

  .key-contribution-card {
    margin-top: var(--space-8);
    background: var(--color-bg-contribution);
    border: 1px solid var(--color-border-contribution);
    border-radius: var(--radius-lg);
    padding: var(--space-8) var(--space-10);
  }

  .contribution-label {
    display: block;
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-wider);
    margin-bottom: var(--space-4);
    text-transform: uppercase;
  }

  .contribution-text {
    color: var(--color-text-primary);
    font-size: var(--font-size-lg);
    font-style: italic;
    line-height: var(--line-height-relaxed);
    margin: 0;
    font-family: var(--font-secondary);
  }
</style>
