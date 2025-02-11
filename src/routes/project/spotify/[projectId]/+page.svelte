<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { decodeString } from "type-decoder";

  import type { SpotifyTrack } from "$generated/types";
  import { setLoader, setSource } from "$stores/site";
  import { getSpotifyTracksFromBackend } from "$client/projects";
  import { updateSpotifyTracks } from "$stores/projects";
  import { goto } from "$app/navigation";

  let tracks: SpotifyTrack[] = [];

  async function loadSpotifyTracks(projectId: string) {
    try {
      tracks = await getSpotifyTracksFromBackend(projectId);
      updateSpotifyTracks(tracks);
    } catch (err) {
      console.log("Exception:", String(err));
    }
  }

  onMount(async () => {
    try {
      setLoader(true);
      setSource("spotify");
      const data = page.data;
      const projectId = decodeString(data.projectId);
      if (projectId !== null) {
        await loadSpotifyTracks(projectId);
      } else {
        goto("/not-found");
      }
    } catch (err) {
      console.log("Exception:", String(err));
    }
    setLoader(false);
  });
</script>

<div class="project-page-spotify">
  {#if tracks.length > 0}
    {#each tracks as track}
      {track.name}
    {/each}
  {:else}
    NO DATA PRESENT
  {/if}
</div>

<style lang="scss">
  .project-page-spotify {
    min-height: var(--page-height);

    padding: 4%;
    padding-top: 0;
  }
</style>
