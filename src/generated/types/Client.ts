import { isJSON, decodeBoolean, decodeString } from "type-decoder";

/**
 * @type { FlyerProperties }
 */
export type FlyerProperties = {
  /**
   * @type { boolean }
   * @memberof FlyerProperties
   */
  showFlyer: boolean;
  /**
   * @type { string }
   * @memberof FlyerProperties
   */
  body: string;
  /**
   * @type { string }
   * @memberof FlyerProperties
   */
  flyerType: string | null;
};

export function decodeFlyerProperties(
  rawInput: unknown,
): FlyerProperties | null {
  if (isJSON(rawInput)) {
    const decodedShowFlyer = decodeBoolean(rawInput["showFlyer"]);
    const decodedBody = decodeString(rawInput["body"]);
    const decodedFlyerType = decodeString(rawInput["flyerType"]);

    if (decodedShowFlyer === null || decodedBody === null) {
      return null;
    }

    return {
      showFlyer: decodedShowFlyer,
      body: decodedBody,
      flyerType: decodedFlyerType,
    };
  }
  return null;
}

/**
 * @type { Theme }
 */
export type Theme = "default" | "red" | "green" | "blue";

export function decodeTheme(rawInput: unknown): Theme | null {
  switch (rawInput) {
    case "default":
    case "red":
    case "green":
    case "blue":
      return rawInput;
  }
  return null;
}
