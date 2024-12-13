<script lang="ts">
  import { onMount } from "svelte";
  import WrapperText from "vergins/src/lib/components/wrapperText/WrapperText.svelte";
  import { type WrapperTextProps } from "vergins/src/lib/components/wrapperText/props.ts";

  // TODO: move to common components
  const glitchWrapperTextProps: WrapperTextProps = {
    wrapFrom: "top",
    enableWrapOnLoad: true,
    enableHoverGlitch: true,
  };
  const secondSubtitles: string[] = [
    "Coding by Day",
    "Jamming by Night",
    "Crushing Bosses in Between",
  ];
  let onceLoaded: boolean = false;
  let homeLandingSubtitleSecond: HTMLElement;
  let activeIndex = 0;

  onMount(() => {
    setTimeout(() => {
      setInterval(() => {
        onceLoaded = true;
        activeIndex++;
        activeIndex = activeIndex % secondSubtitles.length;
      }, 10000);
    }, 5000);
  });
</script>

<div class="home">
  <!-- Hi, I'm [Your Name]. Coding by Day, Jamming by Night, and Crushing Bosses in Between. -->
  <div class="home-landing display-flex display-flex-center display-align-col">
    <div
      class="home-landing-subtitle"
      style="--wrapper-text-initial-animation-delay: 0.1s"
    >
      <WrapperText text={"Hi, I'm"} />
    </div>
    <div
      class="home-landing-title display-flex display-flex-center"
      style="--wrapper-text-initial-animation-delay: 1.5s"
    >
      <WrapperText
        wrapperTextProps={glitchWrapperTextProps}
        text={"Amreet Khuntia"}
      />
    </div>
    <!-- TODO: remove margin-bottom to add github/linkedin/some catchy info -->
    <div
      class="home-landing-subtitle display-flex display-flex-end {onceLoaded ===
      true
        ? 'home-landing-once-loaded'
        : 'home-landing-never-loaded'}"
      bind:this={homeLandingSubtitleSecond}
      style="margin-bottom: 250px;"
    >
      {#each secondSubtitles as secondSubtitle, index}
        {#if index === activeIndex}
          <WrapperText text={secondSubtitle} />
        {/if}
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .home {
    height: var(--home-height);
    width: var(--home-width);
    padding: var(--home-padding);
  }
  .home-landing {
    width: 70%;
    height: inherit;
  }
  .home-landing-subtitle {
    font-family: var(--tertiary-font-family);
    font-size: 52px;
    height: 60px;
  }

  .home-landing-title {
    font-family: var(--secondary-font-family);
    font-size: 156px;
    height: 200px;

    --wrapper-text-hover-color: var(--active-color-complementary);
  }

  .home-landing-once-loaded {
    --wrapper-text-initial-animation-delay: 0.1s;
  }

  .home-landing-never-loaded {
    --wrapper-text-initial-animation-delay: 1.5s + 2.8s;
  }

  @media only screen and (max-width: 1600px) {
    .home-landing-title {
      font-size: 126px;
    }
    .home-landing-subtitle {
      font-size: 42px;
    }
  }

  @media only screen and (max-width: 1500px) {
    .home-landing {
      width: 100%;
    }
  }

  @media only screen and (max-width: 1200px) {
    .home-landing-title {
      font-size: 108px;
    }
    .home-landing-subtitle {
      font-size: 36px;
    }
  }
  @media only screen and (max-width: 900px) {
    .home-landing-title {
      font-size: 84px;
    }
    .home-landing-subtitle {
      font-size: 28px;
    }
  }

  @media only screen and (max-width: 740px) {
    .home-landing-title {
      font-size: 63px;
      height: 100px;
    }
    .home-landing-subtitle {
      font-size: 21px;
      height: 30px;
    }
  }

  @media only screen and (max-width: 540px) {
    .home-landing-title {
      font-size: 48px;
      height: 100px;
    }
    .home-landing-subtitle {
      font-size: 16px;
      height: 30px;
    }
  }
</style>
