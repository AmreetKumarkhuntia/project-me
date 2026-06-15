<script lang="ts">
  import { capabilities } from "$configuration";
</script>

<section class="sect" id="capabilities">
  <div class="wrap">
    <div class="sect__head r">
      <h2 class="sect__title">Outcome-driven <em>engineering</em></h2>
      <span class="sect__index">02 / METRICS</span>
    </div>
    <div class="ledger">
      {#each capabilities as c}
        <div class="ledger__row r">
          <div class="ledger__metric">{c.metric}</div>
          <div class="ledger__mid">
            <div class="ledger__unit">{c.unit}</div>
            <div class="ledger__label">{c.label}</div>
          </div>
          <div class="ledger__note">{c.note}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
