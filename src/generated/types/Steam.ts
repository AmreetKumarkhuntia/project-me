import { isJSON, decodeNumber, decodeString } from "type-decoder";

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
  description: string;
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
      decodedDescription === null ||
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
