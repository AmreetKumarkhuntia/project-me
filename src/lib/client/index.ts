import { decodeAPIResponse } from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";
import { decodeString, isJSON } from "type-decoder";

export async function getHtmlUsingProxy(url: string): Promise<string | null> {
  const tag = "getHtmlUsingProxy";
  const requestHeaders: Map<string, string> = new Map([["X-Proxy-Url", url]]);
  const apiUrl: string = window.location.href + "api/proxy";
  const queryParams: Map<string, string> = new Map();
  const apiCaller = new APICaller<unknown>();

  let plainText: string | null = null;

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (body) => body
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    const body = result.body;
    if (isJSON(body)) {
      plainText = decodeString(body["innerHTML"]);
    }
    logger.logExternalApiResponse(tag, {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return plainText;
}

export async function getRawJsonData(apiUrl: string): Promise<any> {
  const tag = "getRawJsonData";
  const requestHeaders: Map<string, string> = new Map();
  const queryParams: Map<string, string> = new Map();
  const apiCaller = new APICaller<any>();

  let rawData: any = null;

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (body) => body
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    rawData = result.body;

    logger.logExternalApiResponse(tag, {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return rawData;
}
