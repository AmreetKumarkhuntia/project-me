<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { decodeString } from "type-decoder";
  import { Header } from "vergins";

  import type { SpotifyAlbumItem, SpotifyTrack } from "$generated/types";
  import { setLoader, setSource } from "$stores/site";
  import { getSpotifyAlbums, getSpotifyTracksFromBackend } from "$client/info";
  import { skillStore, updateSpotifyTracks } from "$stores/skills";
  import { formatDateToString } from "$client";
  import { openInANewWindow } from "$client/navigation";

  let tracks: SpotifyTrack[] = [];
  let spotifyAlbum: SpotifyAlbumItem | null = null;

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

      await getSpotifyAlbums();

      const data = page.data;
      const projectId = decodeString(data.projectId);
      if (
        $skillStore.spotifyAlbum !== null &&
        $skillStore.spotifyAlbum.items !== null
      ) {
        for (let i = 0; i < $skillStore.spotifyAlbum.items.length; i++) {
          const spotifyAlbumItem = $skillStore.spotifyAlbum.items[i];
          if (spotifyAlbumItem.id === projectId) {
            spotifyAlbum = spotifyAlbumItem;
          }
        }
      }
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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="project-page-spotify display-flex">
  {#if tracks.length > 0 && spotifyAlbum !== null}
    <div class="project-page-spotify-album">
      {#if spotifyAlbum.images.length > 0}
        <img
          src={spotifyAlbum.images[0].url}
          alt="spotify album"
          on:click={() => {
            if (spotifyAlbum !== null)
              openInANewWindow(spotifyAlbum.external_urls.spotify);
          }}
        />
      {/if}
      <div class="project-page-spotify-album-description">
        <Header hLevel={1}>
          {spotifyAlbum.name}
        </Header>
        <div class="project-page-spotify-album-date">
          {formatDateToString(spotifyAlbum.release_date)}
        </div>
        <div class="project-page-spotify-album-artist-title">Artists:</div>
        {#each spotifyAlbum.artists as artist}
          <div class="project-page-spotify-album-artist">
            <a href={artist.external_urls.spotify}>
              {artist.name}
            </a>
          </div>
        {/each}
      </div>
    </div>
    <div class="project-page-spotify-songs">
      {#each tracks as track}
        <div
          class="project-page-spotify-song display-flex"
          on:click={() => {
            openInANewWindow(track.external_urls.spotify);
          }}
        >
          <!-- <div class="project-page-spotify-song-image">
            {#if spotifyAlbum.images.length > 0}
              <img src={spotifyAlbum.images[0].url} alt="spotify album" />
            {/if}
          </div>
          <div>
            <div class="project-page-spotify-song-title">
              {track.name}
            </div>
            <div class="project-page-spotify-album-artist-title">
              Artists:
              {#each spotifyAlbum.artists as artist}
                <a href={artist.external_urls.spotify}>
                  {artist.name}
                </a>
              {/each}
            </div>
            <div class="project-page-spotify-album-artist-duration">
              Duration: {msToMinutesAndSeconds(track.duration_ms)}
            </div>
          </div> -->
          <iframe
            src="https://open.spotify.com/embed/track/{track.id}"
            title="spotify single"
            frameborder="0"
            allow="encrypted-media"
          ></iframe>
        </div>
      {/each}
    </div>
  {:else}
    NO DATA PRESENT
  {/if}
</div>

<style lang="scss">
  .project-page-spotify {
    height: calc(100vh - var(--navbar-height));
    padding: 100px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .project-page-spotify-album {
    width: 60%;
    max-width: 640px;

    img {
      border-radius: 12px;
      width: 100%;
      height: auto;
      cursor: pointer;
    }
  }

  .project-page-spotify-album-artist {
    font-size: 12px;
    padding: 4px 0;

    a {
      color: var(--primary-color);
      text-decoration: none;
    }
  }

  .project-page-spotify-album-artist-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--quaternary-color);
    padding: 12px 0;

    a {
      color: var(--primary-color);
      text-decoration: none;
    }
  }

  .project-page-spotify-album-date {
    font-size: 12px;
  }

  .project-page-spotify-album-description {
    padding: 6%;
    padding-left: 0;
  }

  .project-page-spotify-songs {
    padding-left: 5%;
    width: -webkit-fill-available;
    height: 100%;
    min-height: 320px;
    overflow: scroll;

    h3 {
      margin-top: 0;
    }
  }

  .project-page-spotify-songs::-webkit-scrollbar {
    display: none;
  }

  .project-page-spotify-song {
    // margin-bottom: 5px;
    cursor: pointer;

    iframe {
      width: 100%;
      height: 230px;
    }

    // .project-page-spotify-album-artist-title {
    //   font-size: 12px;
    //   padding: 8px 0;
    //   a {
    //     margin-left: 4px;
    //   }
    // }
  }

  // .project-page-spotify-song-image {
  //   width: 24%;
  //   margin-right: 4%;

  //   img {
  //     border-radius: 5px;
  //     width: 100%;
  //     height: auto;
  //   }
  // }

  // .project-page-spotify-song-title {
  //   font-size: 18px;
  //   font-weight: 600;
  //   color: var(--active-color);
  // }

  // .project-page-spotify-album-artist-duration {
  //   font-size: 12px;
  // }

  @media only screen and (max-width: 900px) {
    .project-page-spotify {
      flex-direction: column;
    }

    .project-page-spotify-songs {
      padding: 5% 0;
    }
  }

  @media only screen and (max-width: 670px) {
    .project-page-spotify {
      padding: 5%;
    }
  }

  @media only screen and (max-width: 500px) {
    .project-page-spotify-album {
      width: 100%;
    }
  }
</style>
