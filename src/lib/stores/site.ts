import { writable } from "svelte/store";

import type { FlyerProperties, Source, Theme } from "$generated/types";

export type ThemeStore = {
  showLoader: boolean;
  flyerProperties: FlyerProperties | null;
  theme: Theme;
  source: Source;
};

const initStore: ThemeStore = {
  showLoader: true,
  flyerProperties: null,
  theme: "default",
  source: "github",
};

export const siteStore = writable<ThemeStore>(initStore);

export function setLoader(showLoader: boolean) {
  siteStore.update((previousState) => ({
    ...previousState,
    showLoader: showLoader,
  }));
}

export function setFlyer(flyerProperties: FlyerProperties) {
  siteStore.update((previousState) => ({
    ...previousState,
    flyerProperties,
  }));
}

export function setTheme(theme: Theme) {
  siteStore.update((previousState) => ({
    ...previousState,
    theme,
  }));
}

export function setSource(source: Source) {
  siteStore.update((previousState) => ({
    ...previousState,
    source,
  }));
}
