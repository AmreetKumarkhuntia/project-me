<script lang="ts">
  import { onMount } from "svelte";
  import { Header, LazyLoader } from "vergins";
  import { goto } from "$app/navigation";

  import { getGitRepos } from "$client/projects";
  import Project from "./Project.svelte";
  import { projectStore } from "$stores/projects.ts";
  import type { Source } from "$generated/types/Projects.ts";
  import type { GitProjectDetails } from "$generated/types";

  let source: Source = "github";
  let activeIndex: number = 0;
  let prevIndex: number = 0;

  $: projects = $projectStore.githubProjects ?? [];

  onMount(async () => {
    // based on theme we fetch
    await getGitRepos();
  });

  function handleClick(project: GitProjectDetails) {
    const projectName = project.repo.name;

    goto(`/project/github/${projectName}`);
  }
</script>

<div class="github">
  <Header hLevel={3}>
    <LazyLoader maxCount={1}>Projects</LazyLoader>
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
        onClick={handleClick}
        comeFrom={prevIndex > activeIndex ? "right" : "left"}
      />
    {/if}
  {/each}
</div>

<style lang="scss">
</style>
