import type { FlyerProperties, GitProjectDetails } from "$generated/types";
import { writable } from "svelte/store";

export type ProjectsStore = {
  githubProjects: GitProjectDetails[] | null;
  showLoader: boolean;
  flyerProperties: FlyerProperties | null;
};

const initStore: ProjectsStore = {
  githubProjects: null,
  showLoader: true,
  flyerProperties: null,
};

export const projectStore = writable<ProjectsStore>(initStore);

export function updateGithubProjects(projects: GitProjectDetails[]) {
  projectStore.update((previousState) => ({
    ...previousState,
    githubProjects: projects,
  }));
}

export function setLoader(showLoader: boolean) {
  projectStore.update((previousState) => ({
    ...previousState,
    showLoader: showLoader,
  }));
}

export function setFlyer(flyerProperties: FlyerProperties) {
  projectStore.update((previousState) => ({
    ...previousState,
    flyerProperties,
  }));
}
