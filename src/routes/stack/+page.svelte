<script lang="ts">
  import Technical from "$components/sections/Technical.svelte";
  import Contact from "$components/sections/Contact.svelte";
</script>

<div class="page-container">
  <Technical />
  <Contact />
</div>

<style>
  .page-container {
    min-height: 100vh;
    color: var(--color-text-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font-primary);
    padding-top: var(--space-16);
  }
</style>
