<script lang="ts">
  import { marked } from "marked";
  import { Card, flyAndFade } from "vergins";

  import type { GitProjectDetails } from "$generated/types";
  import type { Source } from "$generated/types/Projects.ts";

  export let source: Source = "github";
  export let project: GitProjectDetails | null;
  export let comeFrom: "left" | "right" = "left";

  let innerHtml: string = ""; // Default to empty string

  $: if (project) {
    loadInnerHtml();
  }

  async function loadInnerHtml() {
    if (project !== null) {
      try {
        const readmeEncoded = project?.readme?.content ?? null;
        if (readmeEncoded !== null) {
          const markDown = atob(readmeEncoded);

          if (markDown) {
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

<div
  class="project"
  in:flyAndFade={{ x: comeFrom === "left" ? 700 : -700, duration: 300 }}
>
  {#if project !== null}
    <Card>
      <div class="project-github-loader">
        {#if innerHtml !== ""}
          {@html innerHtml}
        {/if}
      </div>
    </Card>
  {/if}
</div>

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
