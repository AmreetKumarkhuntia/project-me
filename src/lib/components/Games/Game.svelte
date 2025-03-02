<script lang="ts">
  import { Card } from "vergins";
  import { formatTimeStampToDateStamp } from "$client";
  import type { Game } from "$generated/types";

  export let game: Game | null = null;
  export let onClick: () => void = () => {};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="game-card" on:click={onClick}>
  {#if game !== null}
    <Card>
      <div class="game-card-container display-flex display-flex-center">
        <img class="game-icon" src={game.iconUrl} alt="{game.name} Icon" />
        <div class="game-description">
          <div class="game-name">{game.name}</div>
          <div class="game-info">
            Playtime: {game.playTime} minutes
          </div>
          <div class="last-played">
            Last played: {formatTimeStampToDateStamp(game.lastPlayed)}
          </div>
        </div>
      </div>
    </Card>
  {/if}
</div>

<style>
  .game-card {
    --card-margin: 20px;
    --card-padding: 10px 20px;
    --card-width: auto;
    --card-height: 70px;
    --card-text-color: var(--primary-color);
  }

  .game-card-container {
    height: inherit;
  }

  .game-icon {
    width: 40px;
    height: auto;
    border-radius: 20%;
    align-self: center;
    margin-right: 20px;
  }

  .game-name {
    font-size: var(--font-xs);
    font-weight: bold;
    margin-bottom: 5px;
  }

  .game-info {
    font-size: calc(var(--font-xxs) - 1px);
    margin-bottom: 10px;
  }

  .last-played {
    font-size: calc(var(--font-xxxs) - 1px);
  }
</style>
