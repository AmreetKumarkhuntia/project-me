<script>
  import Work from "$pages/Work.svelte";
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

<Work />
