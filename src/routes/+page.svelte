<script lang="ts">
  import Home from "$pages/Home.svelte";
  import About from "$pages/About.svelte";
  import Work from "$pages/Work.svelte";
  import Contact from "$pages/Contact.svelte";
  import { projectStore } from "$stores/projects";
  import { setLoader } from "$stores/site";

  $: changeLoader(), $projectStore.githubProjects;

  function changeLoader() {
    const projects = $projectStore.githubProjects;

    if (projects !== null && projects.length > 0) {
      setLoader(false);
    }
  }
</script>

<Home />
<About />
<Work />
<Contact />
