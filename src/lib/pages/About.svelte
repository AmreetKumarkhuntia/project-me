<script lang="ts">
  import { events } from "$configuration/about.ts";

  import { Header, LazyLoader, TimeLine } from "vergins";
</script>

<div class="about">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>ABOUT ME</LazyLoader>
  </Header>
  <div class="about-timeline">
    <TimeLine {events} />
  </div>
</div>

<style lang="scss">
  .about {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }
</style>
