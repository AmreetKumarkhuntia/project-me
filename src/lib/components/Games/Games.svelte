<script lang="ts">
  import { setLoader } from "$stores/site";
  import { onMount } from "svelte";

  onMount(() => {
    setLoader(false);
  });
</script>

<div class="games">HELLO GAMES</div>
