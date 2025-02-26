<script lang="ts">
  import { marked } from "marked";
  import { Card, flyAndFade } from "vergins";

  import type {
    GitProjectDetails,
    SpotifyAlbum,
    SpotifyAlbumItem,
  } from "$generated/types";
  import type { Source } from "$generated/types/Projects.ts";
  import { isGitProjectDetails, isSpotifyAlbum } from "$models/project";
  import { formatDateToString } from "$client";

  export let source: Source = "github";
  export let project: GitProjectDetails | SpotifyAlbum | null;
  export let comeFrom: "left" | "right" = "left";
  export let shouldRenderWithinCard: boolean = true;

  export let onClick: (
    project: GitProjectDetails | SpotifyAlbumItem
  ) => void = () => {};

  let innerHtml: string = "";

  $: if (project && isGitProjectDetails(project)) {
    loadInnerHtml(project);
  }

  async function loadInnerHtml(project: GitProjectDetails) {
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
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="project"
  in:flyAndFade={{ x: comeFrom === "left" ? 700 : -700, duration: 300 }}
>
  {#if source === "github" && isGitProjectDetails(project)}
    <div class="project-github">
      {#if shouldRenderWithinCard}
        <Card>
          <div
            class="project-github-loader"
            on:click={() => {
              onClick(project);
            }}
          >
            {#if innerHtml !== ""}
              {@html innerHtml}
            {/if}
          </div>
        </Card>
      {:else if innerHtml !== ""}
        <div class="project-details">
          {@html innerHtml}
        </div>
      {/if}
    </div>
  {:else if source === "spotify" && isSpotifyAlbum(project) && project.items !== null}
    <div class="project-spotify">
      {#each project.items as item}
        <Card>
          <div
            class="spotify-album display-flex"
            on:click={() => {
              onClick(item);
            }}
          >
            <div
              class="spotify-album-image display-flex display-flex-center display-align-col"
            >
              <img src={item.images[0].url ?? null} alt="album" />
            </div>
            <div
              class="spotify-album-description display-flex display-align-col display-justify-between"
            >
              <div
                class="spotify-album-type display-flex display-justify-between"
              >
                <span>{item.album_type}</span>
                <span>{formatDateToString(item.release_date)}</span>
              </div>
              <div class="spotify-album-name">{item.name}</div>
              <div class="spotify-album-tracks">
                Tracks: {item.total_tracks}
              </div>
              <div class="spotify-album-artists">
                <div>Artists:</div>
                <div>
                  {#each item.artists as artist}
                    <div class="spotify-album-artist">
                      <a href={artist.external_urls.spotify}>
                        {artist.name}
                      </a>
                    </div>
                  {/each}
                </div>
              </div>
              <div class="spotify-album-profile">
                <a href={item.external_urls.spotify}>View Album</a>
              </div>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  {:else}
    INVALID SOURCE
  {/if}
</div>

<style>
  .project {
    align-items: center;
    width: 100%;
    padding: 2% 0%;
  }

  .project-github-loader {
    width: 100%;
    border: none;
    border-radius: 4px;
    min-height: 300px;
  }

  .spotify-album-description {
    height: auto;
    padding: 0 28px;
    width: calc(100% - var(--spotify-album-size));
  }

  .spotify-album-image {
    height: auto;
    width: var(--spotify-album-size);
  }

  .spotify-album-image img {
    width: inherit;
    height: inherit;
  }

  .spotify-album-type {
    font-weight: 400;
    font-size: 12px;
    color: var(--tertiary-color);

    text-transform: capitalize;
  }

  .spotify-album-name {
    font-weight: 700;
    font-size: 52px;
    color: var(--active-color);

    margin: 8px 0;

    text-transform: capitalize;
  }

  .spotify-album-tracks {
    font-weight: 400;
    font-size: 12px;
    color: var(--quinary-color);

    margin: 8px 0;

    text-transform: capitalize;
  }

  .spotify-album-artists {
    font-weight: 500;
    font-size: 16px;
    color: var(--secondary-color);

    margin: 6px 0;

    text-transform: capitalize;
  }

  .spotify-album-artist {
    font-weight: 400;
    font-size: 9px;
    color: var(--quinary-color);

    margin: 8px 0;

    text-transform: capitalize;
  }

  .spotify-album-profile {
    font-weight: 600;

    color: var(--secondary-color);

    font-size: 14px;

    margin-bottom: 18px;
  }

  @media only screen and (max-width: 740px) {
    .spotify-album {
      flex-direction: column;
    }

    .spotify-album-image {
      width: 100%;
    }

    .spotify-album-description {
      padding: 28px 0;
      width: 100%;
    }
  }
</style>
