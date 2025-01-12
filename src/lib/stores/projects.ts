import type { GitRepo } from "$generated/types";
import { writable } from "svelte/store";

export type ProjectsStore = {
  githubProjects: GitRepo[];
};

const initStore: ProjectsStore = {
  githubProjects: [],
};

export const projectStore = writable<ProjectsStore>(initStore);

export function updateGithubProjects(projects: GitRepo[]) {
  projectStore.update((previousState) => ({
    ...previousState,
    githubProjects: projects,
  }));
}
