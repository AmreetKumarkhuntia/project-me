<script>
  import Contact from "$pages/Contact.svelte";
  import { setLoader } from "$stores/site";

  import { onMount } from "svelte";

  onMount(() => {
    setLoader(false);
  });
</script>

<Contact />
