import type {
  FlyerProperties,
  GitProjectDetails,
  SpotifyAlbum,
  SpotifyTrack,
  SteamGame,
} from "$generated/types";
import { writable } from "svelte/store";

export type SkillStore = {
  githubProjects: GitProjectDetails[] | null;
  spotifyAlbum: SpotifyAlbum | null;
  spotifyTracks: SpotifyTrack[] | null;
  gamesArray: SteamGame[] | null;
};

const initStore: SkillStore = {
  githubProjects: null,
  spotifyAlbum: null,
  spotifyTracks: null,
  gamesArray: null,
};

export const skillStore = writable<SkillStore>(initStore);

export function updateGithubProjects(githubProjects: GitProjectDetails[]) {
  skillStore.update((previousState) => ({
    ...previousState,
    githubProjects,
  }));
}

export function updateSpotifyAlbum(spotifyAlbum: SpotifyAlbum) {
  skillStore.update((previousState) => ({
    ...previousState,
    spotifyAlbum,
  }));
}

export function updateSpotifyTracks(spotifyTracks: SpotifyTrack[]) {
  skillStore.update((previousState) => ({
    ...previousState,
    spotifyTracks,
  }));
}
