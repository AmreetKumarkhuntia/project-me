import type { FlyerProperties, Theme } from "$generated/types";
import { writable } from "svelte/store";

export type ThemeStore = {
  showLoader: boolean;
  flyerProperties: FlyerProperties | null;
  theme: Theme;
};

const initStore: ThemeStore = {
  showLoader: true,
  flyerProperties: null,
  theme: "default",
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
