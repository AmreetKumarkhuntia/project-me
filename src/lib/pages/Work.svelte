<script lang="ts">
  import { Header, LazyLoader } from "vergins";

  import {
    databases,
    frameworks,
    languages,
    tools,
  } from "$configuration/work.ts";
  import TechIcon from "$components/TechIcon.svelte";
  import Projects from "$components/Projects/Projects.svelte";
  import { siteStore } from "$stores/site";

  $: projectSource = $siteStore.source;
</script>

<div class="work">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>
      {#if projectSource === "github"}
        Work
      {:else}
        Albums
      {/if}
    </LazyLoader>
  </Header>
  {#if projectSource === "github"}
    <div>
      <LazyLoader maxCount={1}>
        A collection of projects that push the envelope and get things done.
        From clever solutions to real-world impact, it's all here.
      </LazyLoader>
    </div>

    <Header hLevel={4}>
      <LazyLoader maxCount={1}>Languages</LazyLoader>
    </Header>
    <div
      class="work-tech-icons display-flex-wrap display-flex display-flex-center"
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
      class="work-tech-icons display-flex-wrap display-flex display-flex-center"
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
      class="work-tech-icons display-flex-wrap display-flex display-flex-center"
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
      class="work-tech-icons display-flex-wrap display-flex display-flex-center"
    >
      {#each databases as tech}
        <!-- {tech} -->
        <TechIcon {tech} />
      {/each}
    </div>
  {/if}

  <Projects source={projectSource} />
</div>

<style lang="scss">
  .work {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }

  .work-tech-icons {
    padding: 0 5%;
    --tech-icon-size: 72px;
    --tech-icon-margin: 36px 36px 9px 36px;
    --tech-icon-hover-size: 90px;

    --tech-icon-transform: scale(1.25);
  }

  @media only screen and (max-width: 650px) {
    .work-tech-icons {
      --tech-icon-size: 48px;
      --tech-icon-margin: 28px;
    }
  }
</style>
