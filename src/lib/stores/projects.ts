import type { GitProjectDetails } from "$generated/types";
import { writable } from "svelte/store";

export type ProjectsStore = {
  githubProjects: GitProjectDetails[] | null;
};

const initStore: ProjectsStore = {
  githubProjects: null,
};

export const projectStore = writable<ProjectsStore>(initStore);

export function updateGithubProjects(projects: GitProjectDetails[]) {
  projectStore.update((previousState) => ({
    ...previousState,
    githubProjects: projects,
  }));
}
