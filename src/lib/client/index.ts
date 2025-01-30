import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";
import { marked } from "marked";
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

// parsers of markdown
export async function parseTextToHtml(
  text: string | null
): Promise<string | null> {
  if (text === null) return null;
  return await marked(text);
}

export async function parseTextsToHtml(text: string[]): Promise<string[]> {
  let result: string[] = [];
  let markdownText: string | null = null;

  for (let i = 0; i < text.length; i++) {
    markdownText = await parseTextToHtml(text[i]);

    if (markdownText) {
      result.push(markdownText);
    }
  }

  return result;
}

export function formatDateToReadable(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
}
