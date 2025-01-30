<script lang="ts">
  import { onMount } from "svelte";

  import type { GitCommit } from "$generated/types";
  import { parseTextToHtml } from "$client";
  import { Avatar, Card } from "vergins";

  export let commit: GitCommit | null = null;

  let textInnerHtml: string | null;

  onMount(async () => {
    const commitText = commit?.commit.message ?? null;
    textInnerHtml = await parseTextToHtml(commitText);
  });
</script>

{#if commit !== null}
  <div class="github-commit">
    <Card>
      <div class="github-commit-card display-flex display-align-center">
        <div
          class="github-commit-profile display-flex display-align-col display-flex-center"
        >
          <Avatar
            src={commit.author?.avatar_url}
            alt={commit.author?.login}
            size={"42px"}
            smallSize={"36px"}
          />
          {#if commit.author?.login !== undefined}
            <div class="github-commit-profile-name">
              Author: {commit.author.login}
            </div>
          {/if}
        </div>
        <div class="github-commit-description">
          {@html textInnerHtml}
        </div>
      </div>
    </Card>
  </div>
{/if}

<style lang="scss">
  .github-commit {
    --card-height: 100%;
    --card-width: auto;
    --card-text-color: var(--primary-color);
  }

  .github-commit-profile-name {
    padding: 12px;
    font-size: 10px;
  }
</style>
