<script>
  import Contact from "$pages/Contact.svelte";
  import { setLoader } from "$stores/projects";
  import { onMount } from "svelte";

  onMount(() => {
    setLoader(false);
  });
</script>

<Contact />
