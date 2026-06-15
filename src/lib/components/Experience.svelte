<script lang="ts">
  import { timeline } from "$configuration";
</script>

<section class="sect" id="experience">
  <div class="wrap">
    <div class="sect__head r">
      <h2 class="sect__title">Where I've <em>been</em></h2>
      <span class="sect__index">05 / EXPERIENCE</span>
    </div>
    {#each timeline as t, i}
      <div class="exp__item r">
        <div>
          <div class="exp__period" class:exp__now={i === 0}>{t.period}</div>
          <div class="exp__org">{t.org}</div>
        </div>
        <div>
          <h3 class="exp__role">{t.role}</h3>
          <ul class="exp__points">
            {#each t.points as pt}
              <li>{pt}</li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
</section>
