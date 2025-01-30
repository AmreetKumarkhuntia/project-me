import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getCompiledGitRepo, getGithubCommits } from "$services/github";
import {
  githubApiUrl,
  githubApiVersion,
  githubAuthToken,
  githubUserName,
} from "$server/config";
import { decodeSource } from "$generated/types/Projects.ts";

export async function GET({ url, request, params }: RequestEvent) {
  let response: APIResponse;

  const tag = `GET /api/project/${params.source}/${params.projectId}`;
  const searchParams = new Map<string, string>(url.searchParams.entries());
  const source = decodeSource(params?.source);
  const projectId = params?.projectId ?? null;

  logger.logServerRequest(tag, { request, params, searchParams });

  try {
    if (projectId !== null) {
      switch (source) {
        case "spotify":
        case "github":
        default: {
          const repo = await getCompiledGitRepo(
            githubApiUrl,
            githubApiVersion,
            githubUserName,
            projectId,
            githubAuthToken
          );
          if (repo !== null) {
            const githubCommits = await getGithubCommits(
              githubApiUrl,
              githubApiVersion,
              githubUserName,
              projectId,
              githubAuthToken,
              searchParams
            );
            repo.commits = githubCommits;
            response = APIResponseHandler.successResponse("success", repo);
          } else {
            response = APIResponseHandler.badRequestResponse(
              "Couldn't find details. Something Went Wrong."
            );
          }
        }
      }
    } else {
      response = APIResponseHandler.notFoundResponse("Invalid project Id.");
    }
  } catch (err) {
    logger.logException(tag, String(err));
    response = APIResponseHandler.badRequestResponse(String(err));
  }

  logger.logServerResponse(tag, {
    status: response.status,
    code: response.code,
    message: response.message,
  });
  return APIResponseHandler.toResponse(response);
}
