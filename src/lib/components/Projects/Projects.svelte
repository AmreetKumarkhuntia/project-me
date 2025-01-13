<script lang="ts">
  import { getGitRepos } from "$client/projects";
  import { onMount } from "svelte";
  import { Header, LazyLoader } from "vergins";
  import Project from "./Project.svelte";
  import type { Source } from "$generated/types/Projects.ts";
  import { projectStore } from "$stores/projects.ts";

  let source: Source = "github";
  let activeIndex: number = 0;
  let prevIndex: number = 0;
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
  <div class="carousel-dot-container">
    <div class="display-flex display-flex-center">
      {#each projects as _, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="carousel-dot-button {activeIndex === index
            ? 'carousel-dot-button-active'
            : ''}"
          on:click={() => {
            prevIndex = activeIndex;
            activeIndex = index;
          }}
        ></div>
      {/each}
    </div>
  </div>
  {#each projects as project, index}
    {#if activeIndex === index}
      <Project
        {source}
        {project}
        comeFrom={prevIndex > activeIndex ? "right" : "left"}
      />
    {/if}
  {/each}
</div>

<style lang="scss">
</style>
