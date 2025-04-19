import { isJSON, decodeNumber, decodeString, decodeArray } from "type-decoder";

/**
 * @type { SteamGame }
 */
export type SteamGame = {
  /**
   * @type { number }
   * @memberof SteamGame
   */
  appid: number;
  /**
   * @type { string }
   * @memberof SteamGame
   */
  name: string;
  /**
   * @type { number }
   * @memberof SteamGame
   */
  playtime_forever: number;
  /**
   * @type { string }
   * @memberof SteamGame
   */
  img_icon_url: string;
  /**
   * @type { number }
   * @memberof SteamGame
   */
  rtime_last_played: number;
};

export function decodeSteamGame(rawInput: unknown): SteamGame | null {
  if (isJSON(rawInput)) {
    const decodedAppid = decodeNumber(rawInput["appid"]);
    const decodedName = decodeString(rawInput["name"]);
    const decodedPlaytimeForever = decodeNumber(rawInput["playtime_forever"]);
    const decodedImgIconUrl = decodeString(rawInput["img_icon_url"]);
    const decodedRtimeLastPlayed = decodeNumber(rawInput["rtime_last_played"]);

    if (
      decodedAppid === null ||
      decodedName === null ||
      decodedPlaytimeForever === null ||
      decodedImgIconUrl === null ||
      decodedRtimeLastPlayed === null
    ) {
      return null;
    }

    return {
      appid: decodedAppid,
      name: decodedName,
      playtime_forever: decodedPlaytimeForever,
      img_icon_url: decodedImgIconUrl,
      rtime_last_played: decodedRtimeLastPlayed,
    };
  }
  return null;
}

/**
 * @type { SteamAchievementSchema }
 */
export type SteamAchievementSchema = {
  /**
   * @type { string }
   * @memberof SteamAchievementSchema
   */
  name: string;
  /**
   * @type { string }
   * @memberof SteamAchievementSchema
   */
  displayName: string;
  /**
   * @type { string }
   * @memberof SteamAchievementSchema
   */
  description: string | null;
  /**
   * @type { string }
   * @memberof SteamAchievementSchema
   */
  icon: string;
  /**
   * @type { string }
   * @memberof SteamAchievementSchema
   */
  icongray: string;
};

export function decodeSteamAchievementSchema(
  rawInput: unknown,
): SteamAchievementSchema | null {
  if (isJSON(rawInput)) {
    const decodedName = decodeString(rawInput["name"]);
    const decodedDisplayName = decodeString(rawInput["displayName"]);
    const decodedDescription = decodeString(rawInput["description"]);
    const decodedIcon = decodeString(rawInput["icon"]);
    const decodedIcongray = decodeString(rawInput["icongray"]);

    if (
      decodedName === null ||
      decodedDisplayName === null ||
      decodedIcon === null ||
      decodedIcongray === null
    ) {
      return null;
    }

    return {
      name: decodedName,
      displayName: decodedDisplayName,
      description: decodedDescription,
      icon: decodedIcon,
      icongray: decodedIcongray,
    };
  }
  return null;
}

/**
 * @type { SteamAchievement }
 */
export type SteamAchievement = {
  /**
   * @type { string }
   * @memberof SteamAchievement
   */
  name: string;
  /**
   * @type { string }
   * @memberof SteamAchievement
   */
  percent: string;
};

export function decodeSteamAchievement(
  rawInput: unknown,
): SteamAchievement | null {
  if (isJSON(rawInput)) {
    const decodedName = decodeString(rawInput["name"]);
    const decodedPercent = decodeString(rawInput["percent"]);

    if (decodedName === null || decodedPercent === null) {
      return null;
    }

    return {
      name: decodedName,
      percent: decodedPercent,
    };
  }
  return null;
}

/**
 * @type { SteamGameDetails }
 */
export type SteamGameDetails = {
  /**
   * @type { string }
   * @memberof SteamGameDetails
   */
  name: string;
  /**
   * @type { string }
   * @memberof SteamGameDetails
   */
  detailed_description: string | null;
  /**
   * @type { string }
   * @memberof SteamGameDetails
   */
  about_the_game: string;
  /**
   * @type { string }
   * @memberof SteamGameDetails
   */
  short_description: string | null;
  /**
   * @type { string }
   * @memberof SteamGameDetails
   */
  header_image: string;
  /**
   * @type { string }
   * @memberof SteamGameDetails
   */
  website: string | null;
  /**
   * @type { SteamScreenshots[] }
   * @memberof SteamGameDetails
   */
  screenshots: SteamScreenshots[];
  /**
   * @type { SteamPCRequirements }
   * @memberof SteamGameDetails
   */
  pc_requirements: SteamPCRequirements;
};

export function decodeSteamGameDetails(
  rawInput: unknown,
): SteamGameDetails | null {
  if (isJSON(rawInput)) {
    const decodedName = decodeString(rawInput["name"]);
    const decodedDetailedDescription = decodeString(
      rawInput["detailed_description"],
    );
    const decodedAboutTheGame = decodeString(rawInput["about_the_game"]);
    const decodedShortDescription = decodeString(rawInput["short_description"]);
    const decodedHeaderImage = decodeString(rawInput["header_image"]);
    const decodedWebsite = decodeString(rawInput["website"]);
    const decodedScreenshots = decodeArray(
      rawInput["screenshots"],
      decodeSteamScreenshots,
    );
    const decodedPcRequirements = decodeSteamPCRequirements(
      rawInput["pc_requirements"],
    );

    if (
      decodedName === null ||
      decodedAboutTheGame === null ||
      decodedHeaderImage === null ||
      decodedScreenshots === null ||
      decodedPcRequirements === null
    ) {
      return null;
    }

    return {
      name: decodedName,
      detailed_description: decodedDetailedDescription,
      about_the_game: decodedAboutTheGame,
      short_description: decodedShortDescription,
      header_image: decodedHeaderImage,
      website: decodedWebsite,
      screenshots: decodedScreenshots,
      pc_requirements: decodedPcRequirements,
    };
  }
  return null;
}

/**
 * @type { SteamPCRequirements }
 */
export type SteamPCRequirements = {
  /**
   * @type { string }
   * @memberof SteamPCRequirements
   */
  minimum: string | null;
  /**
   * @type { string }
   * @memberof SteamPCRequirements
   */
  recommended: string | null;
};

export function decodeSteamPCRequirements(
  rawInput: unknown,
): SteamPCRequirements | null {
  if (isJSON(rawInput)) {
    const decodedMinimum = decodeString(rawInput["minimum"]);
    const decodedRecommended = decodeString(rawInput["recommended"]);

    return {
      minimum: decodedMinimum,
      recommended: decodedRecommended,
    };
  }
  return null;
}

/**
 * @type { SteamScreenshots }
 */
export type SteamScreenshots = {
  /**
   * @type { number }
   * @memberof SteamScreenshots
   */
  id: number;
  /**
   * @type { string }
   * @memberof SteamScreenshots
   */
  path_full: string;
};

export function decodeSteamScreenshots(
  rawInput: unknown,
): SteamScreenshots | null {
  if (isJSON(rawInput)) {
    const decodedId = decodeNumber(rawInput["id"]);
    const decodedPathFull = decodeString(rawInput["path_full"]);

    if (decodedId === null || decodedPathFull === null) {
      return null;
    }

    return {
      id: decodedId,
      path_full: decodedPathFull,
    };
  }
  return null;
}
