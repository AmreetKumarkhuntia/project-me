import { logger } from "$services/logger";

/**
 * Interface for the API response structure, including status, headers, body, and error
 */
export interface APICallerResponse<T> {
  status: number;
  statusText: string;
  headers: Headers | null;
  body: T;
  error: string | null;
}

/**
 * Initializes a response with default values before making an API call.
 * @param data The data to be included in the body of the response.
 * @returns An APICallerResponse object with default values.
 */
export function initiateCallerResponse(data: any): APICallerResponse<any> {
  return {
    status: 0,
    statusText: "uninitiated call",
    headers: null,
    body: data,
    error: "uninitiated call",
  };
}

/**
 * Class for making API calls with customizable URL, body, method, headers, query params, and response decoder.
 * TODO: add proxy caller too
 */
export class APICaller<T> {
  private url: string | null = null;
  private body: object | null = null;
  private method: string = "POST"; // Default HTTP method is POST
  private reqHeaders: Map<string, string> | null = null;
  private queryParams: Map<string, string> | null = null;
  private decoder: (data: any) => T | null = (data) => null; // Default no-op decoder

  /**
   * Sets the URL for the API call.
   * @param url The URL to which the API request will be sent.
   * @returns The APICaller instance for chaining.
   */
  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  /**
   * Sets the body of the API request.
   * @param body The body object to send in the request.
   * @returns The APICaller instance for chaining.
   */
  setBody(body: object): this {
    this.body = body;
    return this;
  }

  /**
   * Sets the HTTP method for the API request (e.g., "GET", "POST").
   * @param method The HTTP method to use for the request.
   * @returns The APICaller instance for chaining.
   */
  setMethod(method: string): this {
    this.method = method;
    return this;
  }

  /**
   * Sets the headers for the API request.
   * @param headers A Map containing the headers for the request.
   * @returns The APICaller instance for chaining.
   */
  setHeaders(headers: Map<string, string> | Record<string, string>): this {
    if (headers instanceof Map) {
      this.reqHeaders = headers;
    } else {
      this.reqHeaders = new Map(Object.entries(headers));
    }
    return this;
  }

  /**
   * Sets the query parameters for the API request.
   * @param queryParams A Map containing the query parameters for the URL.
   * @returns The APICaller instance for chaining.
   */
  setQueryParams(queryParams: Map<string, string>): this {
    this.queryParams = queryParams;
    return this;
  }

  /**
   * Sets the decoder function to process the raw API response data.
   * @param decoder A function that takes the raw response data and returns the parsed result.
   * @returns The APICaller instance for chaining.
   */
  setDecoder(decoder: (data: any) => T | null): this {
    this.decoder = decoder;
    return this;
  }

  /**
   * Makes the API call, processes the response, and returns the result.
   *
   * Steps:
   * 1. Check if the URL is provided before proceeding with the API call.
   * 2. If query parameters exist, append them to the URL.
   * 3. Set the headers: If provided, use them; otherwise, use the default `Content-Type`.
   * 4. If the HTTP method is neither GET nor POST, stringify and include the body in the request.
   * 5. Make the API call using `fetch`.
   * 6. If the response is not ok (status not in the 200 range), set an error.
   * 7. Parse the response body as JSON.
   * 8. If an error occurs during the fetch or response parsing, set an error message.
   * 9. Use the provided decoder function to process the raw data.
   * 10. Return an object containing the status, headers, body (processed by the decoder), and any errors.
   * 11. If no response is received, return a failure response with an error message.
   *
   * @returns A Promise containing an APICallerResponse with the result of the API call.
   */
  async callApi(): Promise<APICallerResponse<T | null>> {
    let result: T | null = null;
    let rawData: any = null;
    let response: Response | null = null;
    let error: string | null = null;
    let contentType: string | null = null;

    if (this.url !== null) {
      let fullUrl = this.url;

      if (this.queryParams) {
        const queryString = Array.from(this.queryParams.entries())
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
        if (queryString !== null && queryString.length > 0) {
          fullUrl += `?${queryString}`;
        }
      }

      const headers = this.reqHeaders
        ? Object.fromEntries(this.reqHeaders.entries())
        : { "Content-Type": "application/json" };

      try {
        const stringifiedBody =
          this.body && !(this.body instanceof FormData)
            ? JSON.stringify(this.body)
            : this.body;

        response = await fetch(fullUrl, {
          method: this.method,
          headers,
          body:
            this.method !== "GET" && this.method !== "POST"
              ? stringifiedBody
              : undefined,
        });

        contentType = response.headers.get("Content-Type");
        if (!response.ok) {
          error = `Error: ${response.status} ${response.statusText}`;
        }

        // TODO: handle other type of response headers
        if (contentType && contentType.includes("text/html")) {
          rawData = await response.text();
        } else if (contentType && contentType.includes("text/plain")) {
          rawData = await response.text();
        } else {
          rawData = await response.json();
        }
      } catch (err) {
        error = "Exception in Api Caller: " + String(err);
      }
    }

    result = this.decoder(rawData);

    if (response !== null) {
      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: result,
        error: String(error),
      };
    } else {
      return {
        status: 500,
        statusText: "failure",
        headers: null,
        body: null,
        error: error ?? "unknown failure", // Default error if no error message is provided
      };
    }
  }

  /**
   * Helper function to configure and initialize the API call with parameters.
   * @param url The URL for the API request.
   * @param body The body of the API request.
   * @param method The HTTP method to use for the request.
   * @param reqHeaders The headers for the request.
   * @param queryParams The query parameters for the URL.
   * @param decoder The function to decode the response data.
   */
  buildApiCall(
    url: string,
    body: object,
    method: string = "POST",
    reqHeaders: Map<string, string> | null = null,
    queryParams: Map<string, string> | null = null,
    decoder: (data: any) => T | null = (data) => null
  ): void {
    this.setUrl(url);
    this.setBody(body);
    this.setMethod(method);
    this.setHeaders(reqHeaders || new Map());
    this.setQueryParams(queryParams || new Map());
    this.setDecoder(decoder);
  }
}
// Implementations using caller to just get data etc.. with default headers and stuff
export async function getInnerHTML(url: string): Promise<string | null> {
  const tag = "getInnerHTML";
  const apiCaller = new APICaller<string>();
  const requestHeaders: Map<string, string> = new Map([
    ["Content-Type", "text/html"],
  ]);
  const queryParams: Map<string, string> = new Map();
  let result: string | null = null;

  apiCaller.buildApiCall(
    url,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (body) => body
  );

  try {
    logger.logExternalApiRequest(tag, {
      url,
      requestHeaders,
      queryParams,
    });

    const response = await apiCaller.callApi();
    result = response.body;

    logger.logExternalApiResponse(tag, {
      status: response.status,
      error: response.error,
      headers: response.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return result;
}
