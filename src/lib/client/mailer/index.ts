import type { SendGmailRequest } from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";
import { decodeString } from "type-decoder";

export type SendSmsClientResult = {
  status: string;
  message: string;
  error: string | null;
};

export async function sendContactMail(
  email: string,
  subject: string,
  description: string
): Promise<SendSmsClientResult> {
  const tag = "sendContactMail";
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.origin + `/api/contact`;
  const queryParams: Map<string, string> = new Map();
  const apiCaller = new APICaller<any>();
  const body: SendGmailRequest = {
    email,
    subject,
    description,
  };

  let smsResult: SendSmsClientResult = {
    status: "failure",
    message: "Something Went Wrong !!!",
    error: null,
  };

  apiCaller.buildApiCall(
    apiUrl,
    body,
    "POST",
    requestHeaders,
    queryParams,
    (data) => data
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();

    logger.logExternalApiResponse(tag, {
      result,
    });

    if (result.status === 200) {
      const msgResponse = decodeString(result?.body?.response) ?? "";
      if (msgResponse.includes("250") && !msgResponse.includes("NOT OK")) {
        smsResult = {
          status: "success",
          message: "Successfully sent mail",
          error: null,
        };
      }
    } else {
      smsResult = {
        status: result.statusText,
        message: result.statusText,
        error: result.error,
      };
    }
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return smsResult;
}
