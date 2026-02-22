<script lang="ts">
  import ChevronDownIcon from "$components/icons/ChevronDownIcon.svelte";

  export let items: { title: string; content: string }[] = [];
  let activeIndex: number | null = 0; // Default first item open

  function toggleAccordion(index: number) {
    activeIndex = activeIndex === index ? null : index;
  }
</script>

<div class="accordion-container">
  {#each items as item, index}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="accordion-item" class:is-active={activeIndex === index}>
      <button class="accordion-header" on:click={() => toggleAccordion(index)}>
        <span class="accordion-title">{item.title}</span>
        <span class="accordion-icon">
          <ChevronDownIcon size={16} color="currentColor" />
        </span>
      </button>
      <div
        class="accordion-content"
        style="max-height: {activeIndex === index ? '500px' : '0'};"
      >
        <div class="accordion-content-inner">
          <p>{item.content}</p>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .accordion-container {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);
    background: transparent;
    overflow: hidden;
  }

  .accordion-item {
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .accordion-item:last-child {
    border-bottom: none;
  }

  .accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-6) var(--space-8);
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
  }

  .accordion-header:hover {
    background: var(--color-bg-surface-light);
  }

  .accordion-title {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
  }

  .accordion-icon {
    display: flex;
    align-items: center;
    color: var(--color-text-secondary);
    transition: transform 0.3s ease;
  }

  .accordion-item.is-active .accordion-icon {
    transform: rotate(180deg);
    color: var(--color-primary);
  }

  .accordion-content {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }

  .accordion-content-inner {
    padding: 0 var(--space-8) var(--space-6) var(--space-8);
  }

  .accordion-content-inner p {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
  }
</style>
