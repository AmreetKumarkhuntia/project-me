<script>
  import Loader404 from "$components/Loaders/Loader404.svelte";
  import { setLoader } from "$stores/projects";
  import { onMount } from "svelte";

  onMount(() => {
    setLoader(false);
  });
</script>

<div class="not-found-page display-flex display-flex-center">
  <Loader404 />
</div>

<style lang="scss">
  .not-found-page {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }
</style>
