<script lang="ts">
  import type { Postmortem } from "$generated/types/Configuration";
  import LifebuoyIcon from "$components/icons/LifebuoyIcon.svelte";
  import SectionHeader from "$components/ui/SectionHeader.svelte";
  import Accordion from "$components/ui/Accordion.svelte";

  export let postmortem: Postmortem | null = null;
</script>

{#if postmortem && postmortem.items.length > 0}
  <section class="postmortem-section" id="postmortem">
    <div class="content-container">
      <SectionHeader
        title="Postmortem & Learnings"
        subtitle={postmortem.subtitle ?? ""}
      >
        <svelte:fragment slot="icon">
          <LifebuoyIcon size={24} color="var(--color-primary)" />
        </svelte:fragment>
      </SectionHeader>

      <Accordion items={postmortem.items} />
    </div>
  </section>
{/if}

<style>
  .postmortem-section {
    width: 100%;
    color: var(--color-text-primary);
  }

  .content-container {
    width: 100%;
  }

  @media (max-width: 1024px) {
    .content-container {
      width: 90%;
    }
  }
</style>
