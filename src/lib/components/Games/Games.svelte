<script lang="ts">
  import { onMount } from "svelte";
  import { getGames } from "$client/info";
  import { setLoader } from "$stores/site";
  import { skillStore } from "$stores/skills";
  import GameComponent from "./Game.svelte";
  import type { Game } from "$generated/types";

  // State variables
  let allGames: Game[] = [];
  let duplicatedGames: Game[] = [];

  // Subscribe to the store reactively
  $: allGames = $skillStore.games ?? [];
  $: duplicatedGames = [...allGames, ...allGames]; // Duplicate for seamless scroll

  // Initial Load
  onMount(() => {
    getGames();
    setLoader(false);
  });
</script>

<div class="game-slider">
  <div class="game-slide-track" style="--game-slide-count: {allGames.length}">
    {#each duplicatedGames as game}
      <div class="game-slide">
        <GameComponent {game} />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  $animationSpeed: 50s;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(
        calc(-1 * var(--game-slide-width) * var(--game-slide-count))
      );
    }
  }

  .game-slider {
    height: auto;
    margin: auto;
    overflow: hidden;
    position: relative;

    --game-slide-width: 300px;

    .game-slide-track {
      animation: scroll $animationSpeed linear infinite;
      display: flex;
      width: calc(var(--game-slide-width) * 2 * var(--game-slide-count));
    }

    .game-slide {
      height: auto;
      width: var(--game-slide-width);
      flex-shrink: 0;
    }
  }
</style>
