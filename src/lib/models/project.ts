import type { GitProjectDetails, SpotifyAlbum } from "$generated/types";

export function isGitProjectDetails(
  proj: GitProjectDetails | SpotifyAlbum | null
): proj is GitProjectDetails {
  return proj !== null;
}

export function isSpotifyAlbum(
  proj: GitProjectDetails | SpotifyAlbum | null
): proj is SpotifyAlbum {
  return proj !== null;
}
