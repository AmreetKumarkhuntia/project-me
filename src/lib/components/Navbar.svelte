<script lang="ts">
  import { goto } from "$app/navigation";
  import { openInANewWindow } from "$client/navigation";
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
      id: "work",
      title: "WORK",
      navigationURL: "/work",
    },
    {
      id: "contact",
      title: "CONTACT",
      navigationURL: "/contact",
    },
    {
      id: "linkedin",
      title: "LINKEDIN",
      navigationURL: "https://www.linkedin.com/in/amreet-khuntia-15193220b/",
    },
    {
      id: "github",
      title: "GITHUB",
      navigationURL: "https://github.com/AmreetKumarkhuntia",
    },
  ];

  const navbarProps: NavbarProps = {
    showLeftImage: false,
    leftImageURL: null,
    navigationOptions: navigationOptions,
    showRightImage: false,
    rightImageURL: null,
  };

  function onClick(e: NavigationOptions) {
    if (e.id !== "linkedin" && e.id !== "github") goto(e.navigationURL);
    else openInANewWindow(e.navigationURL);
  }
</script>

<div class="navbar">
  <Navbar {navbarProps} {onClick} />
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
