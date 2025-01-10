import type { GitRepos } from "$generated/types/GitHub.ts";
import { writable } from "svelte/store";

export type ProjectsStore = {
  githubProjects: GitRepos[];
};

const initStore: ProjectsStore = {
  githubProjects: [],
};

export const projectStore = writable<ProjectsStore>(initStore);

export function updateGithubProjects(projects: GitRepos[]) {
  projectStore.update((previousState) => ({
    ...previousState,
    githubProjects: projects,
  }));
}
