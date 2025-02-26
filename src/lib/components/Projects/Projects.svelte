<script lang="ts">
  import { onMount } from "svelte";
  import { Header, LazyLoader } from "vergins";
  import { goto } from "$app/navigation";

  import type { Source } from "$generated/types/Projects.ts";
  import type { GitProjectDetails, SpotifyAlbumItem } from "$generated/types";
  import Project from "./Project.svelte";
  import { getGitRepos, getSpotifyAlbums } from "$client/info";
  import { skillStore } from "$stores/skills";
  import { setLoader } from "$stores/site";
  import { isGitProjectDetails, isSpotifyAlbumItem } from "$models/project";

  export let source: Source = "github";
  let activeIndex: number = 0;
  let prevIndex: number = 0;

  $: githubProjects = $skillStore.githubProjects ?? [];
  $: SpotifyAlbumProject = $skillStore.spotifyAlbum;
  $: changeLoader(), $skillStore.githubProjects;
  $: changeLoader(), $skillStore.spotifyAlbum;

  function changeLoader() {
    const projects = $skillStore.githubProjects;
    const album = $skillStore.spotifyAlbum;
    if (source === "github" && projects !== null && projects.length > 0) {
      setLoader(false);
    } else if (source === "spotify" && album !== null) {
      setLoader(false);
    }
  }

  function handleProjectClick(project: GitProjectDetails | SpotifyAlbumItem) {
    if (isGitProjectDetails(project)) {
      const projectName = project.repo.name;

      goto(`/skill/github/${projectName}`);
    } else if (isSpotifyAlbumItem(project)) {
      const albumId = project.id;

      goto(`/skill/spotify/${albumId}`);
    }
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
          onClick={handleProjectClick}
          comeFrom={prevIndex > activeIndex ? "right" : "left"}
        />
      {/if}
    {/each}
  {:else}
    <Project
      {source}
      project={SpotifyAlbumProject}
      onClick={handleProjectClick}
    />
  {/if}
</div>
