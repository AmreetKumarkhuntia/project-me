<script lang="ts">
  import { marked } from "marked";
  import { decodeString } from "type-decoder";
  import { Card, Header } from "vergins";

  import { getHtmlUsingProxy } from "$client";
  import { getReadme } from "$client/projects";
  import type { GitRepo } from "$generated/types";
  import type { Source } from "$generated/types/Projects.ts";

  export let source: Source = "github";
  export let project: GitRepo | null;
  let innerHtml: string = ""; // Default to empty string

  $: if (project) {
    loadInnerHtml();
  }

  async function loadInnerHtml() {
    if (project !== null) {
      try {
        const readMeJson = await getReadme(project);
        const downloadUrl = decodeString(readMeJson?.download_url);

        if (downloadUrl) {
          const markDown = await getHtmlUsingProxy(downloadUrl);

          if (markDown) {
            // Parse markdown to HTML
            innerHtml = await marked(markDown);
          } else {
            console.error("Markdown content is empty or failed to fetch.");
          }
        }
      } catch (error) {
        console.error("Error loading markdown:", error);
      }
    }
  }
</script>

{#if project !== null}
  <div class="project">
    <Card>
      <div class="project-github-loader">
        {#if innerHtml !== ""}
          {@html innerHtml}
        {/if}
      </div>
    </Card>
  </div>
{/if}

<style lang="scss">
  .project {
    align-items: center;
    width: 100%;
    padding: 2% 0%;

    --card-width: 100%;
    --card-height: 100%;
    --card-margin: 0;
    --card-text-color: var(--primary-color);
    --card-hover-scale: 1;
  }

  .project-github-loader {
    width: 100%;
    border: none;
    border-radius: 4px;
    min-height: 300px;
  }
</style>
