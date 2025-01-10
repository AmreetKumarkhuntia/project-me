import { githubPageIterations } from "$configuration/github.ts";
import { decodeGitRepos, type GitRepos } from "$generated/types/GitHub.ts";
import { APICaller } from "$services/apiCaller/index.ts";
import { updateGithubProjects } from "$stores/projects.ts";
import { logger } from "$services/logger/index.ts";

export async function getGitRepos() {
  const allRepos = await getReposFromBackend();
  updateGithubProjects(allRepos);
}

export async function getReposFromBackend(): Promise<GitRepos[]> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.href + "api/github/repos";
  const queryParams: Map<string, string> = new Map([
    ["pages", String(githubPageIterations)],
  ]);
  const apiCaller = new APICaller<GitRepos[]>();

  const allRepos: GitRepos[] = [];

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (body) => {
      const result: GitRepos[] = [];
      const data = body?.data?.repos ?? [];
      if (Array.isArray(data)) {
        data.map((data) => {
          const decodedData = decodeGitRepos(data);
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

    logger.logExternalApiResponse("getGithubRepos", { result });
  } catch (err) {
    logger.logException("getGithubRepos", String(err));
  }

  return allRepos;
}
