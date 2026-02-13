<script lang="ts">
  export let variant: "primary" | "secondary" | "link" = "primary";
  export let href: string | undefined = undefined;
  export let type: "button" | "submit" | "reset" = "button";
  export let onClick: (() => void) | undefined = undefined;

  function handleClick() {
    if (onClick) onClick();
  }
</script>

{#if href}
  <a {href} class="btn btn-{variant}" on:click={handleClick}>
    <slot />
  </a>
{:else}
  <button {type} class="btn btn-{variant}" on:click={handleClick}>
    <slot />
  </button>
{/if}

<style>
  .btn {
    cursor: pointer;
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-family: inherit;
    text-decoration: none;
  }

  /* Primary Button */
  .btn-primary {
    background: var(--color-primary);
    color: var(--color-bg-primary);
    border: none;
    padding: 0.875rem 1.75rem;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
  }

  .btn-primary:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-primary);
  }

  /* Secondary Button */
  .btn-secondary {
    background: transparent;
    color: var(--color-text-primary);
    border: 1.5px solid var(--color-border-secondary);
    padding: 0.875rem 1.5rem;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
  }

  .btn-secondary:hover {
    border-color: var(--color-text-secondary);
    background: rgba(255, 255, 255, 0.05);
  }

  /* Link/Resume Button */
  .btn-link {
    background: transparent;
    color: var(--color-text-secondary);
    border: none;
    padding: var(--space-2) 0;
    font-size: 0.95rem;
    font-weight: var(--font-weight-medium);
    display: inline-flex;
  }

  .btn-link:hover {
    color: var(--color-text-primary);
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .btn-primary,
    .btn-secondary {
      width: 100%;
    }
  }
</style>
