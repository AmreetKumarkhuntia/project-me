<script lang="ts">
  import { onMount } from "svelte";

  import { getGameAchievements, getGameDetails, getGames } from "$client/info";
  import { setLoader } from "$stores/site";
  import { skillStore } from "$stores/skills";
  import GameComponent from "./Game.svelte";
  import type { Achievement, Game, SteamGameDetails } from "$generated/types";
  import { logger } from "$services/logger";
  import { Header } from "vergins";
  import GameAchievement from "./GameAchievement.svelte";

  let allGames: Game[] = [];
  let duplicatedGames: Game[] = [];
  let activeGame: Game | null = null;
  // TODO: refactor to one GameDetails
  let activeGameDetails: SteamGameDetails | null = null;
  let currentGamesAchievements: Achievement[] = [];

  $: allGames = $skillStore.games ?? [];
  $: duplicatedGames = [...allGames, ...allGames];
  $: loadGameDetails(), activeGame;

  async function getCurrentGameAchievements() {
    try {
      if (activeGame) {
        currentGamesAchievements = await getGameAchievements(activeGame.id);
      }
    } catch (err) {
      logger.logException("getCurrentGameAchievements", String(err));
    }
  }

  async function handleGameClick(game: Game) {
    try {
      activeGame = game;
      currentGamesAchievements = await getGameAchievements(activeGame.id);
    } catch (err) {
      logger.logException("handleGameClick", String(err));
    }
  }

  async function loadGameDetails() {
    if (activeGame !== null) {
      activeGameDetails = await getGameDetails(activeGame.id);
    }
  }

  onMount(async () => {
    setLoader(true);
    await getGames();

    for (let i = 0; i < allGames.length; i++) {
      activeGame = allGames[i];
      await getCurrentGameAchievements();
      if (currentGamesAchievements.length > 0) {
        break;
      }
    }

    setLoader(false);
  });
</script>

<div class="game-container">
  <div class="game-slide-track" style="--game-slide-count: {allGames.length}">
    {#each duplicatedGames as game}
      <div class="game-slide">
        <GameComponent
          onClick={() => {
            handleGameClick(game);
          }}
          {game}
        />
      </div>
    {/each}
  </div>
  {#if activeGameDetails}
    <Header hLevel={4}>{activeGameDetails.name}</Header>
    <div class="game-image display-flex display-flex-center">
      <img src={activeGameDetails.header_image} alt="game-data" />
    </div>
    <div class="game-details-container">
      {@html activeGameDetails.detailed_description}
    </div>
  {/if}
  <Header hLevel={4}>Achievements</Header>
  {#if currentGamesAchievements.length > 0}
    <div
      class="game-achievements display-flex display-flex-wrap display-justify-even display-align-center"
    >
      {#each currentGamesAchievements as achievement}
        <GameAchievement {achievement} />
      {/each}
    </div>
  {:else if activeGame !== null}
    No Achievements Present for {activeGame.name}
  {:else}
    Unable to find active game click on any game to set active game.
  {/if}
</div>

<style lang="scss">
  $animationSpeed: 60s;

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

  .game-container {
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

  .game-image {
    margin: 32px 0;
    img {
      border-radius: 8px;
      width: 100%;
      max-width: 480px;
      height: auto;
    }
  }
</style>
