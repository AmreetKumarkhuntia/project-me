<script lang="ts">
  import { events, timeLineProps } from "$configuration/about.ts";

  import { Header, LazyLoader, TimeLine } from "vergins";
</script>

<div class="about">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>About Me</LazyLoader>
  </Header>
  <div class="about-timeline">
    <TimeLine {timeLineProps} {events} />
  </div>
</div>

<style>
  .about {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }
</style>
