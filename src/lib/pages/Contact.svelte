<script lang="ts">
  import { Header, LazyLoader } from "vergins";
</script>

<div class="contact">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>CONTACT ME</LazyLoader>
  </Header>
</div>

<style lang="scss">
  .contact {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }
</style>
