<script lang="ts">
  export let width: number = 64;
  export let height: number = 64;
</script>

<svg
  class="icon"
  {width}
  {height}
  viewBox="0 0 64 64"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect
    x="20"
    y="20"
    width="24"
    height="24"
    stroke="#FFD700"
    stroke-width="2.5"
  />
  <path
    d="M32 14L32 20M32 44L32 50M14 32L20 32M44 32L50 32"
    stroke="#FFD700"
    stroke-width="2.5"
    stroke-linecap="round"
  />
  <circle cx="32" cy="32" r="4" fill="#FFD700" />
</svg>

<style>
  .icon {
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.4));
  }
</style>
