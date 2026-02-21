<script lang="ts">
  import SystemIcon from "./SystemIcon.svelte";
</script>

<div class="icon-container">
  <div class="circle-outer"></div>
  <div class="circle-middle"></div>
  <div class="circle-inner">
    <SystemIcon height="70%" width="auto" />
  </div>
</div>

<style>
  .icon-container {
    position: relative;
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle-outer,
  .circle-middle,
  .circle-inner {
    position: absolute;
    border-radius: 50%;
    /* Using a subtle distinct color for borders if needed, or stick to variables */
    border: 1.5px solid rgba(255, 215, 0, 0.2);
  }

  .circle-outer {
    width: 500px;
    height: 500px;
    animation: rotate 20s linear infinite;
  }

  .circle-middle {
    width: 400px;
    height: 400px;
    border-color: rgba(255, 215, 0, 0.3);
    animation: rotate 15s linear infinite reverse;
  }

  .circle-inner {
    width: 300px;
    height: 300px;
    background: rgba(255, 215, 0, 0.05);
    border-color: rgba(255, 215, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .icon-container {
      width: 300px;
      height: 300px;
    }

    .circle-outer {
      width: 300px;
      height: 300px;
    }

    .circle-middle {
      width: 220px;
      height: 220px;
    }

    .circle-inner {
      width: 150px;
      height: 150px;
    }
  }
</style>
