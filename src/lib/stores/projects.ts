import type { GitProjectDetails, GitRepo } from "$generated/types";
import { writable } from "svelte/store";

export type ProjectsStore = {
  githubProjects: GitProjectDetails[];
};

const initStore: ProjectsStore = {
  githubProjects: [],
};

export const projectStore = writable<ProjectsStore>(initStore);

export function updateGithubProjects(projects: GitProjectDetails[]) {
  projectStore.update((previousState) => ({
    ...previousState,
    githubProjects: projects,
  }));
}
