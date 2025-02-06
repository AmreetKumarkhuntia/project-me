<script>
  import { onMount } from "svelte";

  import About from "$pages/About.svelte";
  import { setLoader } from "$stores/site";

  onMount(() => {
    setLoader(false);
  });
</script>

<About />
