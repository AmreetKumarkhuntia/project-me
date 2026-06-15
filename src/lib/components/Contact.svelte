<script lang="ts">
  import { identity } from "$configuration";
  import ArUp from "$components/ArUp.svelte";

  const l = identity.links;
</script>

<section class="contact" id="contact">
  <div class="wrap">
    <div class="sect__head r contact__head">
      <span class="kicker">07 <b>/</b> Contact</span>
    </div>
    <div class="contact__big r">Let's <em>build</em> something.</div>
    <div class="contact__row r">
      <div class="contact__links">
        <a class="clink" href={"mailto:" + l.email}>✦ {l.email}</a>
        <a class="clink" href={l.github} target="_blank" rel="noopener"
          >GitHub <ArUp /></a
        >
        <a class="clink" href={l.linkedin} target="_blank" rel="noopener"
          >LinkedIn <ArUp /></a
        >
        <a class="clink" href={l.twitter} target="_blank" rel="noopener"
          >Twitter <ArUp /></a
        >
      </div>
      <div class="contact__avail">
        <span class="ok">◦ </span>Currently open to backend, platform &amp;
        infrastructure roles.
      </div>
    </div>
  </div>
</section>

<footer class="colophon">
  <div class="wrap">
    <span>© 2026 Amreet Khuntia</span>
    <span>Set in Bodoni Moda · Space Grotesk · Space Mono</span>
    <span>Bengaluru, India</span>
  </div>
</footer>

<style>
  .contact__head {
    margin-bottom: 24px;
  }
</style>
