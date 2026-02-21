import {
  isJSON,
  decodeString,
  _decodeString,
  decodeNumber,
  _decodeNumber,
  decodeUnknown,
  decodeBoolean,
  _decodeBoolean,
  decodeArray,
  _decodeArray,
} from "type-decoder";

/**
 * @type { APIResponse }
 */
export type APIResponse = {
  /**
   * @type { StatusEnum }
   * @memberof APIResponse
   */
  status: StatusEnum;
  /**
   * @type { string }
   * @memberof APIResponse
   */
  message: string;
  /**
   * @type { number }
   * @memberof APIResponse
   */
  code: number;
  [keys: string]: unknown;
};

export function decodeAPIResponse(rawInput: unknown): APIResponse | null {
  if (isJSON(rawInput)) {
    const decodedStatus = decodeStatusEnum(rawInput["status"]);
    const decodedMessage = decodeString(rawInput["message"]);
    const decodedCode = decodeNumber(rawInput["code"]);

    if (
      decodedStatus === null ||
      decodedMessage === null ||
      decodedCode === null
    ) {
      return null;
    }

    const decodedAdditionalProperties: Record<string, unknown> = {};
    const knownKeys = new Set(["status", "message", "code"]);
    for (const key in rawInput) {
      if (!knownKeys.has(key)) {
        const decodedValue = decodeUnknown(rawInput[key]);
        if (decodedValue === null) {
          return null;
        }
        decodedAdditionalProperties[key] = decodedValue;
      }
    }
    return {
      ...decodedAdditionalProperties,
      status: decodedStatus,
      message: decodedMessage,
      code: decodedCode,
    };
  }
  return null;
}

/**
 * @type { StatusEnum }
 */
export type StatusEnum =
  | "success"
  | "error"
  | "unauthorized"
  | "not_found"
  | "bad_request"
  | "internal_server_error";

export function decodeStatusEnum(rawInput: unknown): StatusEnum | null {
  switch (rawInput) {
    case "success":
    case "error":
    case "unauthorized":
    case "not_found":
    case "bad_request":
    case "internal_server_error":
      return rawInput;
  }
  return null;
}

export function _decodeStatusEnum(rawInput: unknown): StatusEnum | undefined {
  switch (rawInput) {
    case "success":
    case "error":
    case "unauthorized":
    case "not_found":
    case "bad_request":
    case "internal_server_error":
      return rawInput;
  }
  return;
}

/**
 * @type { Token }
 */
export type Token = {
  /**
   * @type { boolean }
   * @memberof Token
   */
  valid: boolean;
  /**
   * @type { TokenDecodedToken }
   * @memberof Token
   */
  decodedToken: TokenDecodedToken | null;
  /**
   * @type { string }
   * @memberof Token
   */
  error: string | null;
};

export function decodeToken(rawInput: unknown): Token | null {
  if (isJSON(rawInput)) {
    const decodedValid = decodeBoolean(rawInput["valid"]);
    const decodedDecodedToken = decodeTokenDecodedToken(
      rawInput["decodedToken"],
    );
    const decodedError = decodeString(rawInput["error"]);

    if (decodedValid === null) {
      return null;
    }

    return {
      valid: decodedValid,
      decodedToken: decodedDecodedToken,
      error: decodedError,
    };
  }
  return null;
}

/**
 * @type { TokenDecodedToken }
 */
export type TokenDecodedToken = Record<string, unknown>;

export function decodeTokenDecodedToken(
  rawInput: unknown,
): TokenDecodedToken | null {
  if (isJSON(rawInput)) {
    const decodedAdditionalProperties: TokenDecodedToken = {};
    for (const key in rawInput) {
      const decodedValue = decodeUnknown(rawInput[key]);
      if (decodedValue === null) {
        return null;
      }
      decodedAdditionalProperties[key] = decodedValue;
    }
    return decodedAdditionalProperties;
  }
  return null;
}

/**
 * @type { ServerAccess }
 */
export type ServerAccess = {
  /**
   * @type { string }
   * @memberof ServerAccess
   */
  name: string;
  /**
   * @type { string[] }
   * @memberof ServerAccess
   */
  paths: string[];
  /**
   * @type { ServerAPIAccessEnum }
   * @memberof ServerAccess
   */
  serverAPIAccess: ServerAPIAccessEnum;
};

export function decodeServerAccess(rawInput: unknown): ServerAccess | null {
  if (isJSON(rawInput)) {
    const decodedName = decodeString(rawInput["name"]);
    const decodedPaths = decodeArray(rawInput["paths"], decodeString);
    const decodedServerAPIAccess = decodeServerAPIAccessEnum(
      rawInput["serverAPIAccess"],
    );

    if (
      decodedName === null ||
      decodedPaths === null ||
      decodedServerAPIAccess === null
    ) {
      return null;
    }

    return {
      name: decodedName,
      paths: decodedPaths,
      serverAPIAccess: decodedServerAPIAccess,
    };
  }
  return null;
}

/**
 * @type { ServerAPIAccessEnum }
 */
export type ServerAPIAccessEnum = "READ" | "WRITE" | "ANY";

export function decodeServerAPIAccessEnum(
  rawInput: unknown,
): ServerAPIAccessEnum | null {
  switch (rawInput) {
    case "READ":
    case "WRITE":
    case "ANY":
      return rawInput;
  }
  return null;
}

export function _decodeServerAPIAccessEnum(
  rawInput: unknown,
): ServerAPIAccessEnum | undefined {
  switch (rawInput) {
    case "READ":
    case "WRITE":
    case "ANY":
      return rawInput;
  }
  return;
}

/**
 * @type { TokenGenerateResponse }
 */
export type TokenGenerateResponse = {
  /**
   * @type { string }
   * @memberof TokenGenerateResponse
   */
  token: string | null;
  /**
   * @type { ServerAccess }
   * @memberof TokenGenerateResponse
   */
  tokenData: ServerAccess | null;
};

export function decodeTokenGenerateResponse(
  rawInput: unknown,
): TokenGenerateResponse | null {
  if (isJSON(rawInput)) {
    const decodedToken = decodeString(rawInput["token"]);
    const decodedTokenData = decodeServerAccess(rawInput["tokenData"]);

    return {
      token: decodedToken,
      tokenData: decodedTokenData,
    };
  }
  return null;
}

/**
 * @type { VerifyTokenBody }
 */
export type VerifyTokenBody = {
  /**
   * @type { string }
   * @memberof VerifyTokenBody
   */
  token: string;
  /**
   * @type { CheckForEnum }
   * @memberof VerifyTokenBody
   */
  checkFor: CheckForEnum;
};

export function decodeVerifyTokenBody(
  rawInput: unknown,
): VerifyTokenBody | null {
  if (isJSON(rawInput)) {
    const decodedToken = decodeString(rawInput["token"]);
    const decodedCheckFor = decodeCheckForEnum(rawInput["checkFor"]);

    if (decodedToken === null || decodedCheckFor === null) {
      return null;
    }

    return {
      token: decodedToken,
      checkFor: decodedCheckFor,
    };
  }
  return null;
}

/**
 * @type { CheckForEnum }
 */
export type CheckForEnum = "RSA" | "JWT";

export function decodeCheckForEnum(rawInput: unknown): CheckForEnum | null {
  switch (rawInput) {
    case "RSA":
    case "JWT":
      return rawInput;
  }
  return null;
}

export function _decodeCheckForEnum(
  rawInput: unknown,
): CheckForEnum | undefined {
  switch (rawInput) {
    case "RSA":
    case "JWT":
      return rawInput;
  }
  return;
}
