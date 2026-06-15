<script lang="ts">
  import { projects } from "$configuration";
  import ArUp from "$components/ArUp.svelte";

  let open = $state(0);

  function toggle(i: number) {
    open = open === i ? -1 : i;
  }
</script>

<section class="sect" id="work">
  <div class="wrap">
    <div class="sect__head r">
      <h2 class="sect__title">Selected <span class="acid">work</span></h2>
      <span class="sect__index">03 / FOUR PROJECTS</span>
    </div>
    <div class="work r">
      {#each projects as p, i}
        <div class="work__item" class:is-open={open === i}>
          <button
            class="work__bar"
            onclick={() => toggle(i)}
            aria-expanded={open === i}
          >
            <span class="work__no">0{i + 1}</span>
            <span class="work__name">{p.name}</span>
            <span class="work__meta">
              <span class="work__kind">{p.kind} · {p.year}</span>
              <span class="work__tagline">{p.summary}</span>
            </span>
            <span class="work__plus"></span>
          </button>
          <div class="work__panel">
            <div class="work__panelinner">
              <div>
                <div class="work__block">
                  <h4>The problem</h4>
                  <p>{p.problem}</p>
                </div>
                <div class="work__block">
                  <h4>What I built</h4>
                  <p>{p.engineering}</p>
                </div>
                <a
                  class="work__repo"
                  href={p.repo}
                  target="_blank"
                  rel="noopener"
                >
                  View repository <ArUp />
                </a>
              </div>
              <div class="work__aside">
                <h4 class="work__block work__aside-label">Impact</h4>
                <div class="work__impact">{p.impact.value}</div>
                <div class="work__impactunit">{p.impact.unit}</div>
                <div class="work__chips">
                  {#each p.stack as s}
                    <span class="chip">{s}</span>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .work__aside-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--faint);
    margin-bottom: 14px;
  }
</style>
