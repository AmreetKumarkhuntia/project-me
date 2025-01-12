<script lang="ts">
  import { getGitRepos } from "$client/projects";
  import { onMount } from "svelte";
  import { Header, LazyLoader } from "vergins";
  import Project from "./Project.svelte";
  import type { Source } from "$generated/types/Projects.ts";
  import { projectStore } from "$stores/projects.ts";

  let source: Source = "github";
  $: projects = $projectStore.githubProjects ?? [];

  onMount(async () => {
    // based on theme we fetch
    await getGitRepos();
  });
</script>

<div class="github">
  <Header hLevel={3}>
    <LazyLoader maxCount={1}>PROJECTS</LazyLoader>
  </Header>
  {#each projects as project, index}
    {#if index < 3}
      <Project {source} {project} />
    {/if}
  {/each}
</div>

<style lang="scss">
</style>
