<script lang="ts">
  import { identity } from "$configuration";
  import WireObject from "$components/WireObject.svelte";
  import ArUp from "$components/ArUp.svelte";

  const f = identity;
</script>

<header class="hero" id="top">
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <div class="hero__kick stag">
        <span class="kicker">01 <b>/</b> {f.name}</span>
      </div>
      <h1 class="hero__headline">
        <span class="stag">I build </span>
        <span class="stag"><em>resilient</em> systems</span>
        <span class="stag"> &amp; automate the </span>
        <span class="stag"><span class="acid">infrastructure</span></span>
        <span class="stag"> they run on.</span>
      </h1>
      <p class="hero__sub stag">
        <b>{f.role}. </b>{f.intro}
      </p>
      <div class="hero__cta stag">
        <a class="btn btn--fill" href="#work">See the work <ArUp /></a>
        <a
          class="btn btn--line"
          href={f.links.site}
          target="_blank"
          rel="noopener">Read the blog</a
        >
      </div>
      <div class="scrollcue stag"><span class="bar"></span>Scroll to begin</div>
    </div>
    <div class="hero__side stag">
      <WireObject />
      <dl class="hero__facts">
        <div class="hero__fact">
          <dt>Role</dt>
          <dd>SWE · DevOps</dd>
        </div>
        <div class="hero__fact">
          <dt>Based</dt>
          <dd>{f.location}</dd>
        </div>
        <div class="hero__fact">
          <dt>Focus</dt>
          <dd>Backend · Platform</dd>
        </div>
        <div class="hero__fact">
          <dt>Status</dt>
          <dd><span class="ok">◦ Available</span></dd>
        </div>
      </dl>
    </div>
  </div>
</header>
