<script lang="ts">
  import { stack } from "$configuration";

  const half = Math.ceil(stack.length / 2);
  const rowA = stack.slice(0, half).flatMap((g) => g.items);
  const rowB = stack.slice(half).flatMap((g) => g.items);
</script>

<section class="stack" id="stack">
  <div class="wrap">
    <div class="sect__head r">
      <h2 class="sect__title">Technical <em>inventory</em></h2>
      <span class="sect__index">04 / THE TOOLKIT</span>
    </div>
  </div>
  <div class="marquee r">
    <div class="marquee__track">
      {#each [...rowA, ...rowA] as item}
        <span class="marquee__item">{item}</span>
      {/each}
    </div>
  </div>
  <div class="marquee marquee--rev r">
    <div class="marquee__track">
      {#each [...rowB, ...rowB] as item}
        <span class="marquee__item dim">{item}</span>
      {/each}
    </div>
  </div>
  <div class="wrap">
    <div class="stack__legend r">
      {#each stack as g}
        <span><b>{g.group}</b> — {g.items.length}</span>
      {/each}
    </div>
  </div>
</section>
