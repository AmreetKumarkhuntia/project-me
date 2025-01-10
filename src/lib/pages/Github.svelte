<script lang="ts">
  import { getGitRepos } from "$client/projects/index.ts";
  import { onMount } from "svelte";
  import { Header, LazyLoader } from "vergins";

  onMount(async () => {
    getGitRepos();
  });
</script>

<div class="github">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>GITHUB</LazyLoader>
  </Header>
</div>

<style lang="scss">
  .github {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }
</style>
