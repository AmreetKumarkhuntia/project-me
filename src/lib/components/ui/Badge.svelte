<script lang="ts">
  export let variant: "default" | "status" = "default";
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
</style>
