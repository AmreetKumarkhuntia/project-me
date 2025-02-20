import { isJSON, decodeString, decodeNumber, decodeArray } from "type-decoder";

/**
 * @type { Game }
 */
export type Game = {
  /**
   * @type { string }
   * @memberof Game
   */
  name: string;
  /**
   * @type { string }
   * @memberof Game
   */
  id: string;
  /**
   * @type { number }
   * @memberof Game
   */
  playTime: number | null;
  /**
   * @type { number }
   * @memberof Game
   */
  lastPlayed: number;
  /**
   * @type { string }
   * @memberof Game
   */
  iconUrl: string;
  /**
   * @type { Achievement[] }
   * @memberof Game
   */
  achievements: Achievement[];
};

export function decodeGame(rawInput: unknown): Game | null {
  if (isJSON(rawInput)) {
    const decodedName = decodeString(rawInput["name"]);
    const decodedId = decodeString(rawInput["id"]);
    const decodedPlayTime = decodeNumber(rawInput["playTime"]);
    const decodedLastPlayed = decodeNumber(rawInput["lastPlayed"]);
    const decodedIconUrl = decodeString(rawInput["iconUrl"]);
    const decodedAchievements = decodeArray(
      rawInput["achievements"],
      decodeAchievement,
    );

    if (
      decodedName === null ||
      decodedId === null ||
      decodedLastPlayed === null ||
      decodedIconUrl === null ||
      decodedAchievements === null
    ) {
      return null;
    }

    return {
      name: decodedName,
      id: decodedId,
      playTime: decodedPlayTime,
      lastPlayed: decodedLastPlayed,
      iconUrl: decodedIconUrl,
      achievements: decodedAchievements,
    };
  }
  return null;
}

/**
 * @type { Achievement }
 */
export type Achievement = {
  /**
   * @type { string }
   * @memberof Achievement
   */
  iconUrl: string | null;
  /**
   * @type { string }
   * @memberof Achievement
   */
  name: string;
  /**
   * @type { string }
   * @memberof Achievement
   */
  description: string | null;
  /**
   * @type { number }
   * @memberof Achievement
   */
  number: number;
  /**
   * @type { StatEnum }
   * @memberof Achievement
   */
  statEnum: StatEnum;
};

export function decodeAchievement(rawInput: unknown): Achievement | null {
  if (isJSON(rawInput)) {
    const decodedIconUrl = decodeString(rawInput["iconUrl"]);
    const decodedName = decodeString(rawInput["name"]);
    const decodedDescription = decodeString(rawInput["description"]);
    const decodedNumber = decodeNumber(rawInput["number"]);
    const decodedStatEnum = decodeStatEnum(rawInput["statEnum"]);

    if (
      decodedName === null ||
      decodedNumber === null ||
      decodedStatEnum === null
    ) {
      return null;
    }

    return {
      iconUrl: decodedIconUrl,
      name: decodedName,
      description: decodedDescription,
      number: decodedNumber,
      statEnum: decodedStatEnum,
    };
  }
  return null;
}

/**
 * @type { StatEnum }
 */
export type StatEnum = "PERCENT" | "DIRECT";

export function decodeStatEnum(rawInput: unknown): StatEnum | null {
  switch (rawInput) {
    case "PERCENT":
    case "DIRECT":
      return rawInput;
  }
  return null;
}
