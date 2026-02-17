<script lang="ts">
  import ArrowRight from "$components/icons/ArrowRight.svelte";
  import GithubIcon from "$components/icons/GithubIcon.svelte";
  import DocumentIcon from "$components/icons/DocumentIcon.svelte";
  import AnimatedSystemNode from "$components/icons/AnimatedSystemNode.svelte";
  import Badge from "$components/ui/Badge.svelte";
  import Button from "$components/ui/Button.svelte";
  import Collaborations from "$components/sections/Collaborations.svelte";
  import Projects from "$components/sections/Projects.svelte";
  import Technical from "$components/sections/Technical.svelte";
  import Timeline from "$components/sections/Timeline.svelte";
  import Philosophy from "$components/sections/Philosophy.svelte";
  import Contact from "$components/sections/Contact.svelte";
  import { resumeLink } from "$configuration/index";
</script>

<div class="landing-container">
  <div class="landing-content">
    <!-- Left side: Main heading and text -->
    <div class="landing-left">
      <div class="landing-badge">
        <Badge>System Architect v1.0.2</Badge>
      </div>

      <h1 class="landing-title">
        Building<br />
        Scalable<br />
        <span class="highlight">Systems</span><br />
        That<br />
        Don't<br />
        Break.
      </h1>

      <p class="landing-description">
        Backend Engineer | Distributed Systems |<br />
        Cloud Infrastructure. Optimizing<br />
        high-throughput architectures for<br />
        mission-critical reliability.
      </p>

      <div class="landing-actions">
        <Button variant="primary">
          View Systems
          <ArrowRight />
        </Button>

        <Button variant="secondary">
          <GithubIcon />
          GitHub
        </Button>
      </div>

      <Button variant="link" href={resumeLink} target="_blank">
        <DocumentIcon />
        Resume
      </Button>
    </div>

    <!-- Right side: Animated icon -->
    <div class="landing-right">
      <div class="status-badge-wrapper">
        <Badge variant="status">MASTER NODE: ACTIVE</Badge>
      </div>
      <AnimatedSystemNode />
    </div>
  </div>

  <Collaborations />
  <Projects />
  <Technical />
  <Timeline />
  <Philosophy />
  <Contact />
</div>

<style>
  .landing-container {
    min-height: 100vh;
    color: var(--color-text-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font-primary);
  }

  .landing-content {
    max-width: var(--container-xl);
    width: 70%;
    margin: 0 auto;
    margin-top: var(--space-32);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
  }

  .landing-badge {
    margin-bottom: var(--space-8);
  }

  .landing-title {
    font-size: var(--font-size-7xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    margin: 0;
    margin-bottom: var(--space-4);
    letter-spacing: var(--letter-spacing-tight);
    font-family: var(--font-secondary);
  }

  .landing-title .highlight {
    color: var(--color-primary);
    z-index: 5;
    position: relative;
  }

  .landing-description {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary);
    margin: 0 0 var(--space-10) 0;
    font-weight: var(--font-weight-regular);
    font-family: var(--font-secondary);
  }

  .landing-actions {
    display: flex;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  /* Right side - Icon animation */
  .landing-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .status-badge-wrapper {
    position: absolute;
    top: 20px;
    right: 20%;
    z-index: 10;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .landing-content {
      grid-template-columns: 1fr;
      gap: var(--space-12);
    }

    .landing-title {
      font-size: var(--font-size-5xl);
    }

    .status-badge-wrapper {
      right: 10%;
    }
  }

  @media (max-width: 768px) {
    .landing-title {
      font-size: var(--font-size-4xl);
    }

    .landing-actions {
      flex-direction: column;
    }
  }
</style>
