<script lang="ts">
  import type { Achievement } from "$generated/types";
  import { Card } from "vergins";

  export let achievement: Achievement | null;
</script>

{#if achievement}
  <div class="game-achievement">
    <Card>
      <div class="display-flex">
        <div class="game-achievement-image">
          <img src={achievement.iconUrl} alt="game-achievement" />
        </div>
        <div class="game-achievement-text-container">
          <div class="game-achievement-name">
            {achievement.name}
          </div>
          {#if achievement.description}
            <div class="game-achievement-description">
              {achievement.description}
            </div>
          {/if}
          <div class="game-achievement-stats">
            {#if achievement.statEnum === "PERCENT"}
              Completion: {achievement.number} %
            {:else}
              Stats: {achievement.number}
            {/if}
          </div>
        </div>
      </div>
    </Card>
  </div>
{/if}

<style lang="scss">
  .game-achievement {
    --card-margin: 20px;
    --card-padding: 12px;
    --card-width: 320px;
    --card-height: auto;
    --card-text-color: var(--primary-color);
    --card-hover-scale: 1.03;

    --image-width: 120px;
  }

  .game-achievement-text-container {
    width: calc(var(--card-width) - var(--image-width) - 10px);
  }

  .game-achievement-image {
    margin-right: 16px;
    img {
      border-radius: 12px;
      width: auto;
      max-width: var(--image-width);
    }
  }

  .game-achievement-name {
    font-size: 14px;
    color: var(--tertiary-color);
    font-weight: 700;
    margin-bottom: 10px;
  }

  .game-achievement-description {
    font-size: 10px;
    font-weight: 500;
    margin-bottom: 6px;
    word-wrap: break-word;
  }

  .game-achievement-stats {
    font-size: 10px;
  }
</style>
