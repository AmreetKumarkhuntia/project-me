<script lang="ts">
  import { identity } from "$configuration";

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  function top() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<nav class="nav">
  <div class="wrap">
    <button class="brand" onclick={top}>
      <span class="brand__monogram">A</span>
      <span class="brand__name">Amreet <span class="reg">Khuntia</span></span>
    </button>
    <div class="nav__links">
      <button class="nav__a" onclick={() => go("work")}>Work</button>
      <button class="nav__a" onclick={() => go("stack")}>Stack</button>
      <button class="nav__a" onclick={() => go("experience")}>Experience</button
      >
      <button class="nav__a" onclick={() => go("ethos")}>Ethos</button>
      <a class="nav__cta" href={"mailto:" + identity.links.email}
        >Get in touch</a
      >
    </div>
  </div>
</nav>
