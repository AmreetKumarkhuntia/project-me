import type { Source } from "$generated/types";
import type { NavbarProps, NavigationOptions } from "vergins";

export const githubNavigationOptions: NavigationOptions[] = [
  {
    id: "home",
    title: "HOME",
    navigationURL: "/",
  },
  {
    id: "about",
    title: "ABOUT",
    navigationURL: "/about",
  },
  {
    id: "work",
    title: "WORK",
    navigationURL: "/skills",
  },
  {
    id: "contact",
    title: "CONTACT",
    navigationURL: "/contact",
  },
  {
    id: "configureSite",
    title: "CONFIGURE",
    navigationURL: "/configure",
  },
];

export const spotifyNavigationOptions: NavigationOptions[] = [
  {
    id: "home",
    title: "HOME",
    navigationURL: "/",
  },
  {
    id: "about",
    title: "ABOUT",
    navigationURL: "/about",
  },
  {
    id: "albums",
    title: "ALBUMS",
    navigationURL: "/skills",
  },
  {
    id: "contact",
    title: "CONTACT",
    navigationURL: "/contact",
  },
  {
    id: "configureSite",
    title: "CONFIGURE",
    navigationURL: "/configure",
  },
];

export const gamingNavigationOptions: NavigationOptions[] = [
  {
    id: "home",
    title: "HOME",
    navigationURL: "/",
  },
  {
    id: "about",
    title: "ABOUT",
    navigationURL: "/about",
  },
  {
    id: "games",
    title: "GAMES",
    navigationURL: "/skills",
  },
  {
    id: "contact",
    title: "CONTACT",
    navigationURL: "/contact",
  },
  {
    id: "configureSite",
    title: "CONFIGURE",
    navigationURL: "/configure",
  },
];

export function getHorizontalNavigation(source: Source): NavbarProps {
  if (source === "spotify") {
    return {
      showLeftImage: false,
      leftImageURL: null,
      navigationOptions: spotifyNavigationOptions,
      showRightImage: true,
      rightImageURL: null,
    };
  }

  if (source === "games") {
    return {
      showLeftImage: false,
      leftImageURL: null,
      navigationOptions: gamingNavigationOptions,
      showRightImage: true,
      rightImageURL: null,
    };
  }

  return {
    showLeftImage: false,
    leftImageURL: null,
    navigationOptions: githubNavigationOptions,
    showRightImage: true,
    rightImageURL: null,
  };
}

export function getVerticalNavigation(source: Source): NavbarProps {
  if (source === "spotify") {
    return {
      showLeftImage: false,
      leftImageURL: null,
      navigationOptions: spotifyNavigationOptions,
      showRightImage: true,
      rightImageURL: "/icons/cross.svg",
    };
  }

  if (source === "games") {
    return {
      showLeftImage: false,
      leftImageURL: null,
      navigationOptions: gamingNavigationOptions,
      showRightImage: true,
      rightImageURL: "/icons/cross.svg",
    };
  }

  return {
    showLeftImage: false,
    leftImageURL: null,
    navigationOptions: githubNavigationOptions,
    showRightImage: true,
    rightImageURL: "/icons/cross.svg",
  };
}
