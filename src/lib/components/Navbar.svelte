<script lang="ts">
  import { Navbar } from "vergins";
  import type { NavigationOptions, NavbarProps } from "vergins";

  const navigationOptions: NavigationOptions[] = [
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
      id: "github",
      title: "GITHUB",
      navigationURL: "/github",
    },
    {
      id: "linkedin",
      title: "LINKEDIN",
      navigationURL: "/github",
    },
    {
      id: "dev-to",
      title: "DEV.TO",
      navigationURL: "/github",
    },
  ];

  const navbarProps: NavbarProps = {
    showLeftImage: false,
    leftImageURL: null,
    navigationOptions: navigationOptions,
    showRightImage: false,
    rightImageURL: null,
  };
</script>

<div class="navbar">
  <Navbar {navbarProps} />
</div>

<style>
  .navbar {
    height: var(--navbar-height);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
</style>
