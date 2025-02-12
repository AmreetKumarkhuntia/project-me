import {
  isJSON,
  decodeString,
  decodeNumber,
  decodeArray,
  decodeBoolean,
} from "type-decoder";

/**
 * @type { SpotifyAlbum }
 */
export type SpotifyAlbum = {
  /**
   * @type { string }
   * @memberof SpotifyAlbum
   */
  href: string;
  /**
   * @type { SpotifyAlbumItem[] }
   * @memberof SpotifyAlbum
   */
  items: SpotifyAlbumItem[] | null;
};

export function decodeSpotifyAlbum(rawInput: unknown): SpotifyAlbum | null {
  if (isJSON(rawInput)) {
    const decodedHref = decodeString(rawInput["href"]);
    const decodedItems = decodeArray(rawInput["items"], decodeSpotifyAlbumItem);

    if (decodedHref === null) {
      return null;
    }

    return {
      href: decodedHref,
      items: decodedItems,
    };
  }
  return null;
}

/**
 * @type { SpotifyTrack }
 */
export type SpotifyTrack = {
  /**
   * @type { string }
   * @memberof SpotifyTrack
   */
  id: string;
  /**
   * @type { SpotifyArtist[] }
   * @memberof SpotifyTrack
   */
  artists: SpotifyArtist[];
  /**
   * @type { number }
   * @memberof SpotifyTrack
   */
  disc_number: number;
  /**
   * @type { number }
   * @memberof SpotifyTrack
   */
  duration_ms: number;
  /**
   * @type { SpotifyExternalUrls }
   * @memberof SpotifyTrack
   */
  external_urls: SpotifyExternalUrls;
  /**
   * @type { string }
   * @memberof SpotifyTrack
   */
  name: string;
  /**
   * @type { string }
   * @memberof SpotifyTrack
   */
  type: string;
  /**
   * @type { boolean }
   * @memberof SpotifyTrack
   */
  explicit: boolean;
};

export function decodeSpotifyTrack(rawInput: unknown): SpotifyTrack | null {
  if (isJSON(rawInput)) {
    const decodedId = decodeString(rawInput["id"]);
    const decodedArtists = decodeArray(
      rawInput["artists"],
      decodeSpotifyArtist,
    );
    const decodedDiscNumber = decodeNumber(rawInput["disc_number"]);
    const decodedDurationMs = decodeNumber(rawInput["duration_ms"]);
    const decodedExternalUrls = decodeSpotifyExternalUrls(
      rawInput["external_urls"],
    );
    const decodedName = decodeString(rawInput["name"]);
    const decodedType = decodeString(rawInput["type"]);
    const decodedExplicit = decodeBoolean(rawInput["explicit"]);

    if (
      decodedId === null ||
      decodedArtists === null ||
      decodedDiscNumber === null ||
      decodedDurationMs === null ||
      decodedExternalUrls === null ||
      decodedName === null ||
      decodedType === null ||
      decodedExplicit === null
    ) {
      return null;
    }

    return {
      id: decodedId,
      artists: decodedArtists,
      disc_number: decodedDiscNumber,
      duration_ms: decodedDurationMs,
      external_urls: decodedExternalUrls,
      name: decodedName,
      type: decodedType,
      explicit: decodedExplicit,
    };
  }
  return null;
}

/**
 * @type { SpotifyAlbumItem }
 */
export type SpotifyAlbumItem = {
  /**
   * @type { string }
   * @memberof SpotifyAlbumItem
   * @example album
   */
  album_type: string;
  /**
   * @type { number }
   * @memberof SpotifyAlbumItem
   * @example 8
   */
  total_tracks: number;
  /**
   * @type { SpotifyExternalUrls }
   * @memberof SpotifyAlbumItem
   */
  external_urls: SpotifyExternalUrls;
  /**
   * @type { string }
   * @memberof SpotifyAlbumItem
   * @example https://api.spotify.com/v1/albums/3y0qv885RtoliKdWZP912v
   */
  href: string;
  /**
   * @type { string }
   * @memberof SpotifyAlbumItem
   * @example 3y0qv885RtoliKdWZP912v
   */
  id: string | null;
  /**
   * @type { SpotifyImage[] }
   * @memberof SpotifyAlbumItem
   */
  images: SpotifyImage[];
  /**
   * @type { string }
   * @memberof SpotifyAlbumItem
   * @example ME
   */
  name: string;
  /**
   * @type { string }
   * @memberof SpotifyAlbumItem
   * @example 2021-07-18
   */
  release_date: string;
  /**
   * @type { string }
   * @memberof SpotifyAlbumItem
   * @example spotify:album:3y0qv885RtoliKdWZP912v
   */
  uri: string | null;
  /**
   * @type { SpotifyArtist[] }
   * @memberof SpotifyAlbumItem
   */
  artists: SpotifyArtist[];
};

export function decodeSpotifyAlbumItem(
  rawInput: unknown,
): SpotifyAlbumItem | null {
  if (isJSON(rawInput)) {
    const decodedAlbumType = decodeString(rawInput["album_type"]);
    const decodedTotalTracks = decodeNumber(rawInput["total_tracks"]);
    const decodedExternalUrls = decodeSpotifyExternalUrls(
      rawInput["external_urls"],
    );
    const decodedHref = decodeString(rawInput["href"]);
    const decodedId = decodeString(rawInput["id"]);
    const decodedImages = decodeArray(rawInput["images"], decodeSpotifyImage);
    const decodedName = decodeString(rawInput["name"]);
    const decodedReleaseDate = decodeString(rawInput["release_date"]);
    const decodedUri = decodeString(rawInput["uri"]);
    const decodedArtists = decodeArray(
      rawInput["artists"],
      decodeSpotifyArtist,
    );

    if (
      decodedAlbumType === null ||
      decodedTotalTracks === null ||
      decodedExternalUrls === null ||
      decodedHref === null ||
      decodedImages === null ||
      decodedName === null ||
      decodedReleaseDate === null ||
      decodedArtists === null
    ) {
      return null;
    }

    return {
      album_type: decodedAlbumType,
      total_tracks: decodedTotalTracks,
      external_urls: decodedExternalUrls,
      href: decodedHref,
      id: decodedId,
      images: decodedImages,
      name: decodedName,
      release_date: decodedReleaseDate,
      uri: decodedUri,
      artists: decodedArtists,
    };
  }
  return null;
}

/**
 * @type { SpotifyExternalUrls }
 */
export type SpotifyExternalUrls = {
  /**
   * @type { string }
   * @memberof SpotifyExternalUrls
   * @example https://open.spotify.com/artist/7o81QZ0hP1WgKj7N5DF4oM
   */
  spotify: string;
};

export function decodeSpotifyExternalUrls(
  rawInput: unknown,
): SpotifyExternalUrls | null {
  if (isJSON(rawInput)) {
    const decodedSpotify = decodeString(rawInput["spotify"]);

    if (decodedSpotify === null) {
      return null;
    }

    return {
      spotify: decodedSpotify,
    };
  }
  return null;
}

/**
 * @type { SpotifyArtist }
 */
export type SpotifyArtist = {
  /**
   * @type { SpotifyExternalUrls }
   * @memberof SpotifyArtist
   */
  external_urls: SpotifyExternalUrls;
  /**
   * @type { string }
   * @memberof SpotifyArtist
   * @example https://api.spotify.com/v1/artists/7o81QZ0hP1WgKj7N5DF4oM
   */
  href: string;
  /**
   * @type { string }
   * @memberof SpotifyArtist
   * @example 7o81QZ0hP1WgKj7N5DF4oM
   */
  id: string | null;
  /**
   * @type { string }
   * @memberof SpotifyArtist
   * @example Amreet K
   */
  name: string;
  /**
   * @type { string }
   * @memberof SpotifyArtist
   * @example artist
   */
  type: string;
};

export function decodeSpotifyArtist(rawInput: unknown): SpotifyArtist | null {
  if (isJSON(rawInput)) {
    const decodedExternalUrls = decodeSpotifyExternalUrls(
      rawInput["external_urls"],
    );
    const decodedHref = decodeString(rawInput["href"]);
    const decodedId = decodeString(rawInput["id"]);
    const decodedName = decodeString(rawInput["name"]);
    const decodedType = decodeString(rawInput["type"]);

    if (
      decodedExternalUrls === null ||
      decodedHref === null ||
      decodedName === null ||
      decodedType === null
    ) {
      return null;
    }

    return {
      external_urls: decodedExternalUrls,
      href: decodedHref,
      id: decodedId,
      name: decodedName,
      type: decodedType,
    };
  }
  return null;
}

/**
 * @type { SpotifyImage }
 */
export type SpotifyImage = {
  /**
   * @type { string }
   * @memberof SpotifyImage
   * @example https://i.scdn.co/image/ab67616d0000b273105a7fe3b112eb6cad9e908a
   */
  url: string;
  /**
   * @type { number }
   * @memberof SpotifyImage
   * @example 640
   */
  height: number;
  /**
   * @type { number }
   * @memberof SpotifyImage
   * @example 640
   */
  width: number;
};

export function decodeSpotifyImage(rawInput: unknown): SpotifyImage | null {
  if (isJSON(rawInput)) {
    const decodedUrl = decodeString(rawInput["url"]);
    const decodedHeight = decodeNumber(rawInput["height"]);
    const decodedWidth = decodeNumber(rawInput["width"]);

    if (
      decodedUrl === null ||
      decodedHeight === null ||
      decodedWidth === null
    ) {
      return null;
    }

    return {
      url: decodedUrl,
      height: decodedHeight,
      width: decodedWidth,
    };
  }
  return null;
}

/**
 * @type { SpotifyAuthToken }
 */
export type SpotifyAuthToken = {
  /**
   * @type { string }
   * @memberof SpotifyAuthToken
   * @example Bearer
   */
  token_type: string;
  /**
   * @type { string }
   * @memberof SpotifyAuthToken
   */
  access_token: string;
};

export function decodeSpotifyAuthToken(
  rawInput: unknown,
): SpotifyAuthToken | null {
  if (isJSON(rawInput)) {
    const decodedTokenType = decodeString(rawInput["token_type"]);
    const decodedAccessToken = decodeString(rawInput["access_token"]);

    if (decodedTokenType === null || decodedAccessToken === null) {
      return null;
    }

    return {
      token_type: decodedTokenType,
      access_token: decodedAccessToken,
    };
  }
  return null;
}
