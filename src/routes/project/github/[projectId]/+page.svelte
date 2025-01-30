<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { decodeString } from "type-decoder";
  import { marked } from "marked";
  import {
    Header,
    TimeLine,
    type TimeLineDetails,
    type TimeLineDetailsAlignment,
    type TimeLineProps,
  } from "vergins";

  import { getGithubRepoWithCommits } from "$client/projects";
  import type { GitCommit, GitProjectDetails } from "$generated/types";
  import Project from "$components/Projects/Project.svelte";
  import { formatDateToReadable } from "$client";
  import { setLoader } from "$stores/projects";

  let commits: GitCommit[];
  let project: GitProjectDetails | null = null;
  let timeLineProps: TimeLineProps | null = null;
  let timeLineEvents: TimeLineDetails[] = [];

  async function loadProjectData(projectId: string | null) {
    if (projectId === null) return;

    project = await getGithubRepoWithCommits(projectId);

    if (project !== null && project.commits !== null) {
      commits = project.commits;
      const iconMaps: Map<string, string> = new Map();
      const events: TimeLineDetails[] = [];

      for (let i = 0; i < commits.length; i++) {
        const commit = commits[i];
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
</style>
