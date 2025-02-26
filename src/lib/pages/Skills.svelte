<script lang="ts">
  import { Header, LazyLoader } from "vergins";

  import {
    databases,
    frameworks,
    languages,
    tools,
  } from "$configuration/skills";
  import TechIcon from "$components/TechIcon.svelte";
  import Projects from "$components/Projects/Projects.svelte";
  import { siteStore } from "$stores/site";
  import Games from "$components/Games/Games.svelte";

  $: skillSource = $siteStore.source;
</script>

<div class="skills">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>
      {#if skillSource === "github"}
        Tech
      {:else if skillSource === "spotify"}
        Albums I Make
      {:else}
        Games I Play
      {/if}
    </LazyLoader>
  </Header>
  {#if skillSource === "github"}
    <Header hLevel={4}>
      <LazyLoader maxCount={1}>Languages</LazyLoader>
    </Header>
    <div
      class="skill-tech-icons display-flex-wrap display-flex display-flex-center"
    >
      {#each languages as tech}
        <!-- {tech} -->
        <TechIcon {tech} />
      {/each}
    </div>
    <Header hLevel={4}>
      <LazyLoader maxCount={1}>Frameworks/Templating Tools</LazyLoader>
    </Header>
    <div
      class="skill-tech-icons display-flex-wrap display-flex display-flex-center"
    >
      {#each frameworks as tech}
        <!-- {tech} -->
        <TechIcon {tech} />
      {/each}
    </div>
    <Header hLevel={4}>
      <LazyLoader maxCount={1}>Tools</LazyLoader>
    </Header>
    <div
      class="skill-tech-icons display-flex-wrap display-flex display-flex-center"
    >
      {#each tools as tech}
        <!-- {tech} -->
        <TechIcon {tech} />
      {/each}
    </div>
    <Header hLevel={4}>
      <LazyLoader maxCount={1}>Databases</LazyLoader>
    </Header>
    <div
      class="skill-tech-icons display-flex-wrap display-flex display-flex-center"
    >
      {#each databases as tech}
        <!-- {tech} -->
        <TechIcon {tech} />
      {/each}
    </div>
  {/if}
  {#if skillSource === "github" || skillSource === "spotify"}
    <Projects source={skillSource} />
  {/if}
  {#if skillSource === "games"}
    <Games />
  {/if}
</div>

<style lang="scss">
  .skills {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }

  .skill-tech-icons {
    padding: 0 5%;
    --tech-icon-size: 72px;
    --tech-icon-margin: 36px 36px 9px 36px;
    --tech-icon-hover-size: 90px;

    --tech-icon-transform: scale(1.25);
  }

  @media only screen and (max-width: 650px) {
    .skill-tech-icons {
      --tech-icon-size: 48px;
      --tech-icon-margin: 28px;
    }
  }
</style>
