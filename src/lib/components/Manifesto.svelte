<script lang="ts">
  import { philosophy } from "$configuration";
</script>

<section class="sect manifesto" id="ethos">
  <div class="wrap">
    <div class="sect__head r manifesto__head">
      <span class="kicker">06 <b>/</b> Ethos</span>
    </div>
    <blockquote class="manifesto__quote r">
      The best system is the one you can <em>hold in your head</em> — and the
      <span class="hl">boring deploy</span> is the good deploy.
    </blockquote>
    <div class="manifesto__grid">
      {#each philosophy as p, i}
        <div class="manifesto__cell r r-{i + 1}">
          <div class="manifesto__num">0{i + 1}</div>
          <div class="manifesto__t">{p.title}</div>
          <div class="manifesto__b">{p.body}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .manifesto__head {
    margin-bottom: clamp(28px, 4vh, 48px);
  }
</style>
