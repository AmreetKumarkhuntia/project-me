<script lang="ts">
  import { onMount } from "svelte";

  import { setLoader } from "$stores/site";

  onMount(() => {
    setLoader(false);
  });
</script>

<div class="configure">HELLO WORLD</div>

<style lang="scss">
  .configure {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }
</style>
