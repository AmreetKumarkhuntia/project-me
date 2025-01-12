import { githubApiUrl, githubPageIterations } from "$configuration/github.ts";
import { decodeGitRepo, type GitRepo } from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { updateGithubProjects } from "$stores/projects.ts";
import { logger } from "$services/logger";
import { getRawJsonData } from "$client";

export async function getGitRepos() {
  const allRepos = await getReposFromBackend();
  updateGithubProjects(allRepos);
}

export async function getReposFromBackend(): Promise<GitRepo[]> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.href + "api/projects";
  const queryParams: Map<string, string> = new Map([
    ["pages", String(githubPageIterations)],
    ["source", "github"],
  ]);
  const apiCaller = new APICaller<GitRepo[]>();

  const allRepos: GitRepo[] = [];

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (body) => {
      const result: GitRepo[] = [];
      const data = body?.data?.repos ?? [];
      if (Array.isArray(data)) {
        data.map((data) => {
          const decodedData = decodeGitRepo(data);
          if (decodedData) {
            result.push(decodedData);
          }
        });
      }
      return result;
    }
  );

  try {
    logger.logExternalApiRequest("getGithubRepos", {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    allRepos.push(...(result.body ?? []));

    logger.logExternalApiResponse("getGithubRepos", {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException("getGithubRepos", String(err));
  }

  return allRepos;
}

// TODO: add decoder for readme things
export async function getReadme(project: GitRepo) {
  const readMeJson = await getRawJsonData(
    `${githubApiUrl}/repos/${project.full_name}/readme`
  );
  return readMeJson;
}
