import {
  decodeGitProjectDetails,
  decodeSpotifyAlbum,
  decodeSpotifyAlbumItem,
  type GitProjectDetails,
  type SpotifyAlbum,
  type SpotifyAlbumItem,
} from "$generated/types";

export function isGitProjectDetails(proj: unknown): proj is GitProjectDetails {
  return decodeGitProjectDetails(proj) !== null;
}

export function isSpotifyAlbum(proj: unknown): proj is SpotifyAlbum {
  return decodeSpotifyAlbum(proj) !== null;
}

export function isSpotifyAlbumItem(proj: unknown): proj is SpotifyAlbumItem {
  return decodeSpotifyAlbumItem(proj) !== null;
}
