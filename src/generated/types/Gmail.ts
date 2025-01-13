import { isJSON, decodeString } from "type-decoder";

/**
 * @type { SendGmailRequest }
 */
export type SendGmailRequest = {
  /**
   * @description Contact person email
   * @type { string }
   * @memberof SendGmailRequest
   */
  email: string;
  /**
   * @description The subject of the email
   * @type { string }
   * @memberof SendGmailRequest
   */
  subject: string;
  /**
   * @description The content of the email body
   * @type { string }
   * @memberof SendGmailRequest
   */
  description: string;
};

export function decodeSendGmailRequest(
  rawInput: unknown,
): SendGmailRequest | null {
  if (isJSON(rawInput)) {
    const decodedEmail = decodeString(rawInput["email"]);
    const decodedSubject = decodeString(rawInput["subject"]);
    const decodedDescription = decodeString(rawInput["description"]);

    if (
      decodedEmail === null ||
      decodedSubject === null ||
      decodedDescription === null
    ) {
      return null;
    }

    return {
      email: decodedEmail,
      subject: decodedSubject,
      description: decodedDescription,
    };
  }
  return null;
}
