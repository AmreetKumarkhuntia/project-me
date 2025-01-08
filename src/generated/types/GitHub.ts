import {
  isJSON,
  decodeNumber,
  decodeString,
  decodeBoolean,
  decodeArray,
} from "type-decoder";

/**
 * @type { GitRepos }
 */
export type GitRepos = {
  /**
   * @description Unique identifier for the repository.
   * @type { number }
   * @memberof GitRepos
   * @example 12345678
   */
  id: number;
  /**
   * @description Name of the repository.
   * @type { string }
   * @memberof GitRepos
   * @example example-repo
   */
  name: string;
  /**
   * @description Name of the repository.
   * @type { string }
   * @memberof GitRepos
   * @example example-repo
   */
  full_name: string;
  /**
   * @description Indicates whether the repository is private.
   * @type { boolean }
   * @memberof GitRepos
   */
  private: boolean;
  /**
   * @description URL to access the repository on GitHub.
   * @type { string }
   * @memberof GitRepos
   * @example https://github.com/example/example-repo
   */
  html_url: string;
  /**
   * @description Description of the repository.
   * @type { string }
   * @memberof GitRepos
   * @example This is an example repository.
   */
  description: string;
  /**
   * @description API URL for the repository.
   * @type { string }
   * @memberof GitRepos
   * @example https://api.github.com/repos/example/example-repo
   */
  url: string;
  /**
   * @description API URL template for branches in the repository.
   * @type { string }
   * @memberof GitRepos
   * @example https://api.github.com/repos/example/example-repo/branches{/branch}
   */
  branches_url: string;
  /**
   * @description API URL to fetch languages used in the repository.
   * @type { string }
   * @memberof GitRepos
   * @example https://api.github.com/repos/example/example-repo/languages
   */
  languages_url: string;
  /**
   * @description API URL to fetch contributors for the repository.
   * @type { string }
   * @memberof GitRepos
   * @example https://api.github.com/repos/example/example-repo/contributors
   */
  contributors: string | null;
  /**
   * @description API URL template for commits in the repository.
   * @type { string }
   * @memberof GitRepos
   * @example https://api.github.com/repos/example/example-repo/commits{/sha}
   */
  git_commits_url: string;
  /**
   * @description API URL template for issues in the repository.
   * @type { string }
   * @memberof GitRepos
   * @example https://api.github.com/repos/example/example-repo/issues{/number}
   */
  issues_url: string;
  /**
   * @description API URL template for contents in the repository.
   * @type { string }
   * @memberof GitRepos
   * @example https://api.github.com/repos/example/example-repo/contents/{+path}
   */
  contents_url: string;
  /**
   * @description Git URL for the repository.
   * @type { string }
   * @memberof GitRepos
   * @example git://github.com/example/example-repo.git
   */
  git_url: string | null;
  /**
   * @description SSH URL for the repository.
   * @type { string }
   * @memberof GitRepos
   * @example git@github.com:example/example-repo.git
   */
  ssh_url: string | null;
  /**
   * @description Primary language of the repository.
   * @type { string }
   * @memberof GitRepos
   * @example Python
   */
  language: string | null;
  /**
   * @description List of topics associated with the repository.
   * @type { string[] }
   * @memberof GitRepos
   */
  topics: string[] | null;
  /**
   * @description License information for the repository.
   * @type { GitLicense }
   * @memberof GitRepos
   */
  license: GitLicense | null;
  /**
   * @type { GitOwner }
   * @memberof GitRepos
   */
  owner: GitOwner;
};

export function decodeGitRepos(rawInput: unknown): GitRepos | null {
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
    const decodedContributors = decodeString(rawInput["contributors"]);
    const decodedGitCommitsUrl = decodeString(rawInput["git_commits_url"]);
    const decodedIssuesUrl = decodeString(rawInput["issues_url"]);
    const decodedContentsUrl = decodeString(rawInput["contents_url"]);
    const decodedGitUrl = decodeString(rawInput["git_url"]);
    const decodedSshUrl = decodeString(rawInput["ssh_url"]);
    const decodedLanguage = decodeString(rawInput["language"]);
    const decodedTopics = decodeArray(rawInput["topics"], decodeString);
    const decodedLicense = decodeGitLicense(rawInput["license"]);
    const decodedOwner = decodeGitOwner(rawInput["owner"]);

    if (
      decodedId === null ||
      decodedName === null ||
      decodedFullName === null ||
      decodedPrivate === null ||
      decodedHtmlUrl === null ||
      decodedDescription === null ||
      decodedUrl === null ||
      decodedBranchesUrl === null ||
      decodedLanguagesUrl === null ||
      decodedGitCommitsUrl === null ||
      decodedIssuesUrl === null ||
      decodedContentsUrl === null ||
      decodedOwner === null
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
      contributors: decodedContributors,
      git_commits_url: decodedGitCommitsUrl,
      issues_url: decodedIssuesUrl,
      contents_url: decodedContentsUrl,
      git_url: decodedGitUrl,
      ssh_url: decodedSshUrl,
      language: decodedLanguage,
      topics: decodedTopics,
      license: decodedLicense,
      owner: decodedOwner,
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
