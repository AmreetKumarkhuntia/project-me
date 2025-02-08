<script lang="ts">
  import { onMount } from "svelte";
  import { Header, LazyLoader } from "vergins";
  import { goto } from "$app/navigation";

  import type { Source } from "$generated/types/Projects.ts";
  import type { GitProjectDetails } from "$generated/types";
  import Project from "./Project.svelte";
  import { getGitRepos, getSpotifyAlbums } from "$client/projects";
  import { projectStore } from "$stores/projects.ts";
  import { setLoader } from "$stores/site";

  export let source: Source = "github";
  let activeIndex: number = 0;
  let prevIndex: number = 0;

  $: githubProjects = $projectStore.githubProjects ?? [];
  $: SpotifyAlbum = $projectStore.spotifyAlbum;
  $: changeLoader(), $projectStore.githubProjects;
  $: changeLoader(), $projectStore.spotifyAlbum;

  function changeLoader() {
    const projects = $projectStore.githubProjects;
    const album = $projectStore.spotifyAlbum;
    if (source === "github" && projects !== null && projects.length > 0) {
      setLoader(false);
    } else if (source === "spotify" && album !== null) {
      setLoader(false);
    }
  }

  function handleGithubProjectClick(project: GitProjectDetails) {
    const projectName = project.repo.name;

    goto(`/project/github/${projectName}`);
  }

  onMount(async () => {
    if (source === "github") {
      await getGitRepos();
    } else if (source === "spotify") {
      await getSpotifyAlbums();
    }
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="github">
  {#if source === "github"}
    <Header hLevel={3}>
      <LazyLoader maxCount={1}>Projects</LazyLoader>
    </Header>
  {/if}
  {#if source === "github"}
    <div class="carousel-dot-container">
      <div class="display-flex display-flex-center">
        {#each githubProjects as _, index}
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
    {#each githubProjects as project, index}
      {#if activeIndex === index}
        <Project
          {source}
          {project}
          onClick={handleGithubProjectClick}
          comeFrom={prevIndex > activeIndex ? "right" : "left"}
        />
      {/if}
    {/each}
  {:else}
    <Project {source} project={SpotifyAlbum} />
  {/if}
</div>

<style lang="scss">
</style>
