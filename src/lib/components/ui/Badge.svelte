<script lang="ts">
  export let variant: "default" | "status" | "tech" = "default";
  export let customClass: string = "";
</script>

<div class="badge {variant} {customClass}">
  <slot />
</div>

<style>
  .badge {
    display: inline-block;
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
    border: 1px solid var(--color-border-primary);
  }

  /* Default Badge (System Architect) */
  .badge.default {
    padding: var(--space-2) var(--space-4);
    border-radius: 20px;
    font-size: var(--font-size-xs);
    letter-spacing: var(--letter-spacing-wide);
    /* Removed margin-bottom to make component reusable */
  }

  /* Status Badge (Master Node) */
  .badge.status {
    padding: var(--space-2) var(--space-4);
    background: var(--color-hover);
    border-radius: var(--radius-sm);
    font-size: 0.7rem;
    letter-spacing: 1.5px;
    font-weight: var(--font-weight-semibold);
  }

  /* Tech Badge (Projects) */
  .badge.tech {
    font-size: var(--font-size-xs);
    background: var(--color-bg-tag);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border-tag);
    text-transform: none; /* Ensure it doesn't inherit uppercase if set elsewhere */
    letter-spacing: normal;
    font-weight: normal;
    transition:
      border-color 0.2s ease,
      color 0.2s ease;
    cursor: default;
  }

  .badge.tech:hover {
    border-color: var(--color-border-primary);
    color: var(--color-text-primary);
  }
</style>
