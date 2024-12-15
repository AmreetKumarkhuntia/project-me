<script lang="ts">
  import { onMount } from "svelte";
  import WrapperText from "vergins/src/lib/components/wrapperText/WrapperText.svelte";
  import Avatar from "vergins/src/lib/components/avatar/Avatar.svelte";
  import LazyLoader from "vergins/src/lib/components/lazyLoader/LazyLoader.svelte";
  import type { LazyLoaderProps } from "vergins/src/lib/components/lazyLoader/props.ts";
  import {
    contactLinks,
    glitchWrapperTextProps,
    linkSize,
    secondSubtitles,
    constantAvatarLazyLoaderDelay,
  } from "$configuration/home.ts";

  // TODO: move to common components
  let onceLoaded: boolean = false;
  let activeIndex = 0;

  function getAvatarLazyLoaderWithDelay(index: number): LazyLoaderProps {
    return {
      inTransition: {
        transitionType: "fly",
        transition: {
          delay: index * 700 + constantAvatarLazyLoaderDelay,
          duration: 800,
          x: 0,
          y: 200,
          opacity: 0,
        },
      },
      outTransition: {
        transitionType: "fly",
        transition: {
          delay: 200,
          duration: 800,
          x: 0,
          y: 200,
          opacity: 0,
        },
      },
    };
  }

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
    >
      {#each secondSubtitles as secondSubtitle, index}
        {#if index === activeIndex}
          <WrapperText text={secondSubtitle} />
        {/if}
      {/each}
    </div>
    <div class="home-landing-links">
      <div><WrapperText text={"Contact Here:"} /></div>
      <div>
        <!-- implement click here -->
        {#each contactLinks as contactLink, index}
          <span class="avatar-links">
            <LazyLoader
              lazyLoaderProps={getAvatarLazyLoaderWithDelay(index)}
              maxCount={1}
            >
              <Avatar dataType={"svg"} size={linkSize}>
                {@html contactLink.imgSrc}
              </Avatar>
            </LazyLoader>
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .home {
    height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }
  .home-landing {
    width: 70%;
    height: inherit;
  }
  .home-landing-subtitle {
    font-family: var(--tertiary-font-family);
    font-size: 52px;
    height: 60px;
    overflow: hidden;
    filter: drop-shadow(5px 5px 253px var(--highlight-color));
  }

  .home-landing-title {
    font-family: var(--secondary-font-family);
    font-size: 156px;
    height: 200px;

    --wrapper-text-hover-color: var(--active-color-complementary);

    filter: drop-shadow(5px 5px 20px var(--highlight-color));
  }

  .home-landing-links {
    width: 100%;
    margin: 100px;

    font-size: 16px;
  }

  .home-landing-once-loaded {
    --wrapper-text-initial-animation-delay: 0.1s;
  }

  .home-landing-never-loaded {
    --wrapper-text-initial-animation-delay: 1.5s + 2.8s;
  }

  @media only screen and (max-width: 1850px) {
    .home-landing-title {
      font-size: 135px;
    }
    .home-landing-subtitle {
      font-size: 45px;
    }
  }

  @media only screen and (max-width: 1650px) {
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

    .home-landing-links {
      font-size: 12px;
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

  @media only screen and (max-width: 540px) {
    .home-landing-title {
      font-size: 42px;
      height: 100px;
    }
    .home-landing-subtitle {
      font-size: 14px;
      height: 30px;
    }
  }
</style>
