<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { decodeNumber, decodeString } from "type-decoder";
  import { marked } from "marked";
  import {
    Header,
    TimeLine,
    type TimeLineDetails,
    type TimeLineDetailsAlignment,
    type TimeLineProps,
  } from "vergins";
  import type { TooltipItem } from "chart.js";

  import { getGithubRepoWithCommits } from "$client/projects";
  import type {
    Database,
    Framework,
    GitCommit,
    GitLanguages,
    GitProjectDetails,
    Language,
    Tool,
  } from "$generated/types";
  import Project from "$components/Projects/Project.svelte";
  import { formatDateToReadable } from "$client";
  import Doughnut from "$components/Charts/Doughnut.svelte";
  import Loader from "$components/Loaders/Loader.svelte";
  import { techColorMap } from "$constants";
  import { decodeTech } from "$models/tech";
  import { setLoader } from "$stores/site";

  let commits: GitCommit[] = [];
  let project: GitProjectDetails | null = null;
  let timeLineProps: TimeLineProps | null = null;
  let timeLineEvents: TimeLineDetails[] = [];
  let languagesLabels: string[] = [];
  let languagesDatasetData: number[] = [];
  let languagesLabelColors: string[] = [];
  let techsUsed: Array<Language | Framework | Tool | Database> = [];

  async function loadCommits(projectCommits: GitCommit[]) {
    const iconMaps: Map<string, string> = new Map();
    const events: TimeLineDetails[] = [];

    for (let i = 0; i < projectCommits.length; i++) {
      const commit = projectCommits[i];
      const authorAvatarUrl = commit.author?.avatar_url ?? null;
      const committerAvatarUrl = commit.committer?.avatar_url ?? null;

      if (authorAvatarUrl !== null) {
        if (commit.author?.login)
          iconMaps.set(commit.author.login, authorAvatarUrl);

        if (commit.commit.author.name)
          iconMaps.set(commit.commit.author.name, authorAvatarUrl);
      }

      if (committerAvatarUrl !== null) {
        if (commit.committer?.login)
          iconMaps.set(commit.committer.login, committerAvatarUrl);

        if (commit.commit.committer.name)
          iconMaps.set(commit.commit.committer.name, committerAvatarUrl);
      }

      const alignment: TimeLineDetailsAlignment =
        i % 2 === 0 ? "left" : "right";
      const date = formatDateToReadable(commit.commit.committer.date);
      const position =
        commit.author?.login ??
        commit.commit.author.name ??
        commit.commit.committer.name;
      const descriptionHtmlText = await marked(commit.commit.message);

      const event = "author/committer";
      const name = "commit";
      const link = commit.author?.html_url ?? null;

      const timeLineDetails: TimeLineDetails = {
        dateStart: date,
        dateEnd: date,
        position,
        description: descriptionHtmlText,
        name,
        event,
        location: "Github",
        alignment,
        link,
      };
      events.push(timeLineDetails);
    }

    timeLineEvents = events;
    timeLineProps = {
      icons: iconMaps,
      duration: null,
      delay: null,
    };
  }

  function loadLanguages(projectLangs: GitLanguages) {
    const langs: string[] = [];
    const langsData: number[] = [];
    const langColors: string[] = [];
    const allTechs: Array<Language | Framework | Tool | Database> = [];
    let totalLines: number = 0;

    for (const [language, data] of Object.entries(projectLangs)) {
      const decodedData = decodeNumber(data);
      if (decodedData) {
        langs.push(language);
        langsData.push(decodedData);
        totalLines += decodedData;

        const tech = decodeTech(language.toLowerCase());
        const color = tech !== null ? (techColorMap.get(tech) ?? null) : null;

        if (color !== null) {
          langColors.push(color);
        }

        if (tech !== null) {
          allTechs.push(tech);
        }
      }
    }

    for (let i = 0; i < langsData.length; i++) {
      langsData[i] = (langsData[i] / totalLines) * 100;
    }

    languagesLabelColors = langColors;
    languagesLabels = langs;
    languagesDatasetData = langsData;
    techsUsed = allTechs;
  }

  async function loadProjectData(projectId: string | null) {
    if (projectId === null) return;

    project = await getGithubRepoWithCommits(projectId);
    // Loads commits
    if (project !== null && project.commits !== null) {
      commits = project.commits;
      loadCommits(project.commits);
    }
    if (project !== null && project.languages !== null) {
      loadLanguages(project.languages);
    }
  }

  function doughnutTooltipItemCallBack(
    tooltipItem: TooltipItem<"doughnut">,
    datasetDataForCallback: number[]
  ): string {
    const datasetIndex = tooltipItem.dataIndex;
    const value = datasetDataForCallback[datasetIndex];
    return `Language used in percentage: ${value}`;
  }

  onMount(async () => {
    try {
      setLoader(true);
      const data = page.data;
      const projectId = decodeString(data.projectId);

      await loadProjectData(projectId);
      setLoader(false);
    } catch (err) {
      console.log("Exception:", String(err));
    }
  });
</script>

<div class="project-page-github">
  {#if project !== null}
    <Project {project} shouldRenderWithinCard={false} />
    <Header hLevel={2}>LANGUAGES</Header>
    <div class="project-page-github-language display-flex display-flex-center">
      {#if languagesDatasetData.length > 0 && languagesLabels.length > 0}
        <Doughnut
          labels={languagesLabels}
          datasetData={languagesDatasetData}
          backgroundColor={languagesLabelColors}
          datasetLabel={"Languages Used"}
          tooltipCallback={doughnutTooltipItemCallBack}
        />
      {:else}
        <Loader />
      {/if}
    </div>
    {#if commits.length > 0}
      <Header hLevel={2}>COMMITS</Header>

      {#if timeLineProps !== null && timeLineEvents.length > 0}
        <TimeLine
          {timeLineProps}
          events={timeLineEvents}
          shouldUsePositionForIcons={true}
        ></TimeLine>
      {/if}
    {/if}
  {:else}
    NO DATA PRESENT
  {/if}
</div>

<style lang="scss">
  .project-page-github {
    min-height: var(--page-height);

    padding: 4%;
    padding-top: 0;

    --timeline-content-padding: 32px;
  }

  .project-page-github-language {
    width: auto;
    height: min(65vh, 100vw);
    max-height: 600px;
  }
</style>
