import {
  isJSON,
  decodeNumber,
  decodeString,
  decodeBoolean,
  decodeArray,
} from "type-decoder";

/**
 * @type { GitRepo }
 */
export type GitRepo = {
  /**
   * @description Unique identifier for the repository.
   * @type { number }
   * @memberof GitRepo
   * @example 12345678
   */
  id: number;
  /**
   * @description Name of the repository.
   * @type { string }
   * @memberof GitRepo
   * @example example-repo
   */
  name: string;
  /**
   * @description Name of the repository.
   * @type { string }
   * @memberof GitRepo
   * @example example-repo
   */
  full_name: string;
  /**
   * @description Indicates whether the repository is private.
   * @type { boolean }
   * @memberof GitRepo
   */
  private: boolean;
  /**
   * @description URL to access the repository on GitHub.
   * @type { string }
   * @memberof GitRepo
   * @example https://github.com/example/example-repo
   */
  html_url: string;
  /**
   * @description Description of the repository.
   * @type { string }
   * @memberof GitRepo
   * @example This is an example repository.
   */
  description: string | null;
  /**
   * @description API URL for the repository.
   * @type { string }
   * @memberof GitRepo
   * @example https://api.github.com/repos/example/example-repo
   */
  url: string;
  /**
   * @description API URL template for branches in the repository.
   * @type { string }
   * @memberof GitRepo
   * @example https://api.github.com/repos/example/example-repo/branches{/branch}
   */
  branches_url: string | null;
  /**
   * @description API URL to fetch languages used in the repository.
   * @type { string }
   * @memberof GitRepo
   * @example https://api.github.com/repos/example/example-repo/languages
   */
  languages_url: string | null;
  /**
   * @description API URL template for commits in the repository.
   * @type { string }
   * @memberof GitRepo
   * @example https://api.github.com/repos/example/example-repo/commits{/sha}
   */
  git_commits_url: string | null;
  /**
   * @description API URL template for issues in the repository.
   * @type { string }
   * @memberof GitRepo
   * @example https://api.github.com/repos/example/example-repo/issues{/number}
   */
  issues_url: string;
  /**
   * @description API URL template for contents in the repository.
   * @type { string }
   * @memberof GitRepo
   * @example https://api.github.com/repos/example/example-repo/contents/{+path}
   */
  contents_url: string | null;
  /**
   * @description Git URL for the repository.
   * @type { string }
   * @memberof GitRepo
   * @example git://github.com/example/example-repo.git
   */
  git_url: string | null;
  /**
   * @description SSH URL for the repository.
   * @type { string }
   * @memberof GitRepo
   * @example git@github.com:example/example-repo.git
   */
  ssh_url: string | null;
  /**
   * @description Primary language of the repository.
   * @type { string }
   * @memberof GitRepo
   * @example Python
   */
  language: string | null;
  /**
   * @description List of topics associated with the repository.
   * @type { string[] }
   * @memberof GitRepo
   */
  topics: string[] | null;
  /**
   * @type { GitLicense }
   * @memberof GitRepo
   */
  license: GitLicense | null;
  /**
   * @type { GitOwner }
   * @memberof GitRepo
   */
  owner: GitOwner;
  /**
   * @description tells when a repo was created
   * @type { string }
   * @memberof GitRepo
   * @example 2022-01-29T16:32:38
   */
  created_at: string;
};

export function decodeGitRepo(rawInput: unknown): GitRepo | null {
  if (isJSON(rawInput)) {
    const decodedId = decodeNumber(rawInput["id"]);
    const decodedName = decodeString(rawInput["name"]);
    const decodedFullName = decodeString(rawInput["full_name"]);
    const decodedPrivate = decodeBoolean(rawInput["private"]);
    const decodedHtmlUrl = decodeString(rawInput["html_url"]);
    const decodedDescription = decodeString(rawInput["description"]);
    const decodedUrl = decodeString(rawInput["url"]);
    const decodedBranchesUrl = decodeString(rawInput["branches_url"]);
    const decodedLanguagesUrl = decodeString(rawInput["languages_url"]);
    const decodedGitCommitsUrl = decodeString(rawInput["git_commits_url"]);
    const decodedIssuesUrl = decodeString(rawInput["issues_url"]);
    const decodedContentsUrl = decodeString(rawInput["contents_url"]);
    const decodedGitUrl = decodeString(rawInput["git_url"]);
    const decodedSshUrl = decodeString(rawInput["ssh_url"]);
    const decodedLanguage = decodeString(rawInput["language"]);
    const decodedTopics = decodeArray(rawInput["topics"], decodeString);
    const decodedLicense = decodeGitLicense(rawInput["license"]);
    const decodedOwner = decodeGitOwner(rawInput["owner"]);
    const decodedCreatedAt = decodeString(rawInput["created_at"]);

    if (
      decodedId === null ||
      decodedName === null ||
      decodedFullName === null ||
      decodedPrivate === null ||
      decodedHtmlUrl === null ||
      decodedUrl === null ||
      decodedIssuesUrl === null ||
      decodedOwner === null ||
      decodedCreatedAt === null
    ) {
      return null;
    }

    return {
      id: decodedId,
      name: decodedName,
      full_name: decodedFullName,
      private: decodedPrivate,
      html_url: decodedHtmlUrl,
      description: decodedDescription,
      url: decodedUrl,
      branches_url: decodedBranchesUrl,
      languages_url: decodedLanguagesUrl,
      git_commits_url: decodedGitCommitsUrl,
      issues_url: decodedIssuesUrl,
      contents_url: decodedContentsUrl,
      git_url: decodedGitUrl,
      ssh_url: decodedSshUrl,
      language: decodedLanguage,
      topics: decodedTopics,
      license: decodedLicense,
      owner: decodedOwner,
      created_at: decodedCreatedAt,
    };
  }
  return null;
}

/**
 * @type { GitLicense }
 */
export type GitLicense = {
  /**
   * @description Key identifier for the license.
   * @type { string }
   * @memberof GitLicense
   * @example mit
   */
  key: string | null;
  /**
   * @description Full name of the license.
   * @type { string }
   * @memberof GitLicense
   * @example MIT License
   */
  name: string | null;
  /**
   * @description SPDX identifier for the license.
   * @type { string }
   * @memberof GitLicense
   * @example MIT
   */
  spdx_id: string | null;
  /**
   * @description URL to the license details.
   * @type { string }
   * @memberof GitLicense
   * @example https://api.github.com/licenses/mit
   */
  url: string | null;
};

export function decodeGitLicense(rawInput: unknown): GitLicense | null {
  if (isJSON(rawInput)) {
    const decodedKey = decodeString(rawInput["key"]);
    const decodedName = decodeString(rawInput["name"]);
    const decodedSpdxId = decodeString(rawInput["spdx_id"]);
    const decodedUrl = decodeString(rawInput["url"]);

    return {
      key: decodedKey,
      name: decodedName,
      spdx_id: decodedSpdxId,
      url: decodedUrl,
    };
  }
  return null;
}

/**
 * @type { GitOwner }
 */
export type GitOwner = {
  /**
   * @description Login username of the repository owner.
   * @type { string }
   * @memberof GitOwner
   * @example example-user
   */
  login: string;
  /**
   * @description API URL for the owner's details.
   * @type { string }
   * @memberof GitOwner
   * @example https://api.github.com/users/example-user
   */
  url: string;
  /**
   * @description API URL to fetch followers of the owner.
   * @type { string }
   * @memberof GitOwner
   * @example https://api.github.com/users/example-user/followers
   */
  followers_url: string;
  /**
   * @description URL of the owner's avatar image.
   * @type { string }
   * @memberof GitOwner
   * @example https://avatars.githubusercontent.com/u/1234567?v=4
   */
  avatar_url: string;
  /**
   * @description API URL to fetch organizations the owner belongs to.
   * @type { string }
   * @memberof GitOwner
   * @example https://api.github.com/users/example-user/orgs
   */
  organizations_url: string;
  /**
   * @description API URL template for users the owner is following.
   * @type { string }
   * @memberof GitOwner
   * @example https://api.github.com/users/example-user/following{/other_user}
   */
  following_url: string;
  /**
   * @description API URL to fetch events the owner has received.
   * @type { string }
   * @memberof GitOwner
   * @example https://api.github.com/users/example-user/received_events
   */
  received_events_url: string;
};

export function decodeGitOwner(rawInput: unknown): GitOwner | null {
  if (isJSON(rawInput)) {
    const decodedLogin = decodeString(rawInput["login"]);
    const decodedUrl = decodeString(rawInput["url"]);
    const decodedFollowersUrl = decodeString(rawInput["followers_url"]);
    const decodedAvatarUrl = decodeString(rawInput["avatar_url"]);
    const decodedOrganizationsUrl = decodeString(rawInput["organizations_url"]);
    const decodedFollowingUrl = decodeString(rawInput["following_url"]);
    const decodedReceivedEventsUrl = decodeString(
      rawInput["received_events_url"],
    );

    if (
      decodedLogin === null ||
      decodedUrl === null ||
      decodedFollowersUrl === null ||
      decodedAvatarUrl === null ||
      decodedOrganizationsUrl === null ||
      decodedFollowingUrl === null ||
      decodedReceivedEventsUrl === null
    ) {
      return null;
    }

    return {
      login: decodedLogin,
      url: decodedUrl,
      followers_url: decodedFollowersUrl,
      avatar_url: decodedAvatarUrl,
      organizations_url: decodedOrganizationsUrl,
      following_url: decodedFollowingUrl,
      received_events_url: decodedReceivedEventsUrl,
    };
  }
  return null;
}

/**
 * @type { GitReadme }
 */
export type GitReadme = {
  /**
   * @type { string }
   * @memberof GitReadme
   */
  download_url: string;
  /**
   * @type { string }
   * @memberof GitReadme
   */
  content: string;
  /**
   * @type { string }
   * @memberof GitReadme
   */
  encoding: string;
  /**
   * @type { string }
   * @memberof GitReadme
   */
  file: string | null;
};

export function decodeGitReadme(rawInput: unknown): GitReadme | null {
  if (isJSON(rawInput)) {
    const decodedDownloadUrl = decodeString(rawInput["download_url"]);
    const decodedContent = decodeString(rawInput["content"]);
    const decodedEncoding = decodeString(rawInput["encoding"]);
    const decodedFile = decodeString(rawInput["file"]);

    if (
      decodedDownloadUrl === null ||
      decodedContent === null ||
      decodedEncoding === null
    ) {
      return null;
    }

    return {
      download_url: decodedDownloadUrl,
      content: decodedContent,
      encoding: decodedEncoding,
      file: decodedFile,
    };
  }
  return null;
}

/**
 * @type { GitProjectDetails }
 */
export type GitProjectDetails = {
  /**
   * @type { GitRepo }
   * @memberof GitProjectDetails
   */
  repo: GitRepo;
  /**
   * @type { GitReadme }
   * @memberof GitProjectDetails
   */
  readme: GitReadme | null;
};

export function decodeGitProjectDetails(
  rawInput: unknown,
): GitProjectDetails | null {
  if (isJSON(rawInput)) {
    const decodedRepo = decodeGitRepo(rawInput["repo"]);
    const decodedReadme = decodeGitReadme(rawInput["readme"]);

    if (decodedRepo === null) {
      return null;
    }

    return {
      repo: decodedRepo,
      readme: decodedReadme,
    };
  }
  return null;
}
