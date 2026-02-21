<script lang="ts">
  import { page } from "$app/stores";
  import { navbarLinks } from "$configuration/navigation";

  import GithubIcon from "$components/icons/GithubIcon.svelte";
  import LinkedinIcon from "$components/icons/LinkedinIcon.svelte";

  // Helper to check active state
  $: isActive = (path: string) => $page.url.pathname === path;
</script>

<nav class="navbar">
  <!-- Left: Logo -->
  <div class="nav-left">
    <a href="/" class="logo">
      <span class="amreet-logo-text">Amreet K</span>
    </a>
  </div>

  <!-- Center: Navigation Links -->
  <div class="nav-center">
    <ul>
      {#each navbarLinks as link}
        <li>
          <a
            class:active={isActive(link.navigationURL)}
            href={link.navigationURL}
          >
            {link.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Right: Icons -->
  <div class="nav-right">
    <a
      href="https://github.com"
      target="_blank"
      rel="noreferrer"
      class="icon-link"
    >
      <GithubIcon size={20} />
    </a>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noreferrer"
      class="icon-link"
    >
      <LinkedinIcon size={20} />
    </a>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px; /* Fixed height match design */
    padding: 0 48px; /* Approx spacing from screenshot */
    background-color: var(--color-bg-primary, #000);
    border-bottom: 1px solid
      var(--color-border-secondary, rgba(255, 255, 255, 0.1));
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  /* Left: Logo */
  .nav-left .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  /* Center: Links */
  .nav-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .nav-center ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 40px; /* Generous spacing */
    align-items: center;
  }

  .nav-center ul li a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
    transition: color 0.2s ease;
  }

  .nav-center ul li a:hover {
    color: var(--color-text-primary, #fff);
  }

  .nav-center ul li a.active {
    color: var(--color-primary, #f4b942);
  }

  /* Right: Icons */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .nav-right .icon-link {
    color: var(--color-text-secondary, #999);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 0.2s,
      color 0.2s;
  }

  .nav-right .icon-link:hover {
    opacity: 0.8;
    color: var(--color-text-primary);
  }

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    .nav-center {
      display: none; /* Hide links on mobile/tablet for now */
    }

    .navbar {
      padding: 0 24px;
    }
  }
</style>
