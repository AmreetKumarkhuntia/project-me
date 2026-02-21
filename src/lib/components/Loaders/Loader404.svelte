<div class="typing">404 NOT FOUND</div>

<style>
  .typing {
    display: inline-block;
    height: 70vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-secondary);
    font-size: var(--font-size-8xl);
    font-weight: bold;

    color: var(--color-text-primary);
  }

  .typing::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 1em;
    margin-left: 0.5rem;
    border-right: 3px solid var(--color-text-primary);
    vertical-align: middle;
    animation: blink 0.6s infinite;
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
</style>
