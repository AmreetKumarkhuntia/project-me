import fetch from "node-fetch";
import { Response as FetchResponse, Headers as FetchHeaders } from "node-fetch";

/**
 * Interface for the API response structure, including status, headers, body, and error
 */
export interface APICallerResponse<T> {
  status: number;
  statusText: string;
  headers: FetchHeaders | null;
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
  setHeaders(headers: Map<string, string>): this {
    this.reqHeaders = headers;
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
    let result: T | null = null; // Default response result is null
    let rawData: any = null; // Raw data from the response
    let response: FetchResponse | null = null; // Fetch response object
    let error = null; // Error handling

    // Step 1: Check if URL is provided before making the API call
    if (this.url !== null) {
      let fullUrl = this.url; // Initialize the full URL with the base URL

      // Step 2: If query parameters exist, append them to the URL
      if (this.queryParams) {
        const queryString = Array.from(this.queryParams.entries())
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
        fullUrl += `?${queryString}`;
      }

      // Step 3: If headers are provided, use them, else use the default Content-Type
      const headers = this.reqHeaders
        ? Object.fromEntries(this.reqHeaders.entries())
        : { "Content-Type": "application/json" };

      try {
        // Step 4: If the method is not GET or POST, include the body
        const stringifiedBody = this.body
          ? JSON.stringify(this.body)
          : undefined;

        // Step 5: Make the API call using fetch
        response = await fetch(fullUrl, {
          method: this.method,
          headers,
          body:
            this.method !== "GET" && this.method !== "POST"
              ? stringifiedBody
              : undefined,
        });

        // Step 6: If the response is not ok, set an error
        if (!response.ok) {
          error = `Error: ${response.status} ${response.statusText}`;
        }

        // Step 7: Parse the response JSON body
        rawData = await response.json();
      } catch (err) {
        // Step 8: If an exception occurs during the fetch or parsing, set an error
        error = "Exception in Api Caller: " + String(err);
      }
    }

    // Step 9: Use the decoder function to process the raw data
    result = this.decoder(rawData);

    // Step 10: Return the response object with status, headers, body, and any errors
    if (response !== null) {
      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: result,
        error: String(error),
      };
    } else {
      // Step 11: If no response, return a failure response
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
