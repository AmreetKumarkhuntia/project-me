<div class="typing">404</div>

<style lang="scss">
  .typing {
    display: inline-block;
    font-family: monospace;
    font-size: 102px;
    font-weight: bold;
  }

  .typing::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 1em;
    border-right: 3px solid white;
    vertical-align: middle;
    animation:
      typing 2s steps(3) infinite,
      blink 0.6s infinite;
  }

  @keyframes typing {
    0% {
      width: 0ch;
    }
    50% {
      width: 3ch;
    }
    100% {
      width: 0ch;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
</style>
