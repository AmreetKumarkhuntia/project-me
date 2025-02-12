import type {
  FlyerProperties,
  GitProjectDetails,
  SpotifyAlbum,
  SpotifyTrack,
} from "$generated/types";
import { writable } from "svelte/store";

export type ProjectsStore = {
  githubProjects: GitProjectDetails[] | null;
  spotifyAlbum: SpotifyAlbum | null;
  spotifyTracks: SpotifyTrack[] | null;
};

const initStore: ProjectsStore = {
  githubProjects: null,
  spotifyAlbum: null,
  spotifyTracks: null,
};

export const projectStore = writable<ProjectsStore>(initStore);

export function updateGithubProjects(githubProjects: GitProjectDetails[]) {
  projectStore.update((previousState) => ({
    ...previousState,
    githubProjects,
  }));
}

export function updateSpotifyAlbum(spotifyAlbum: SpotifyAlbum) {
  projectStore.update((previousState) => ({
    ...previousState,
    spotifyAlbum,
  }));
}

export function updateSpotifyTracks(spotifyTracks: SpotifyTrack[]) {
  projectStore.update((previousState) => ({
    ...previousState,
    spotifyTracks,
  }));
}
