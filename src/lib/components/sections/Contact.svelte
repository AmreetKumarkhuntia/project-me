<script lang="ts">
  import Button from "$components/ui/Button.svelte";
  import { contact } from "$configuration/contact";
</script>

<section class="contact-section">
  <div class="content">
    <h2 class="subtitle">{contact.subtitle}</h2>
    <h1 class="title">
      {@html contact.title}
    </h1>

    <p class="description">
      {contact.description}
    </p>

    <div class="cta-wrapper">
      <Button variant="primary" size="lg" href="mailto:amreetleo123@gmail.com"
        >{contact.ctaText}</Button
      >
    </div>

    <footer class="footer">
      {#each contact.socials as social}
        <a href={social.url} target="_blank" rel="noopener noreferrer"
          >{social.label}</a
        >
      {/each}
    </footer>
  </div>
</section>

<style>
  .contact-section {
    color: var(--color-text-primary);
    padding: var(--space-32) 0 var(--space-16) 0;
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .content {
    max-width: var(--container-lg);
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-4);
    font-family: var(--font-secondary);
  }

  .title {
    font-size: var(--font-size-6xl);
    font-family: var(--font-secondary);
    font-weight: var(--font-weight-bold);
    margin: 0 0 var(--space-6) 0;
    line-height: var(--line-height-tight);
  }

  .title :global(.highlight) {
    color: var(--color-primary);
    text-decoration: underline;
    text-decoration-color: var(--color-primary);
    text-decoration-thickness: 4px;
    text-underline-offset: 8px;
  }

  .description {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    max-width: 60ch;
    margin: 0 0 var(--space-10) 0;
    line-height: var(--line-height-relaxed);
  }

  .cta-wrapper {
    margin-bottom: var(--space-20);
  }

  .footer {
    display: flex;
    gap: var(--space-8);
    margin-top: auto;
    border-top: 1px solid var(--color-border-subtle);
    padding-top: var(--space-8);
    width: 100%;
    justify-content: center;
  }

  .footer a {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer a:hover {
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .title {
      font-size: var(--font-size-4xl);
    }

    .footer {
      flex-direction: column;
      gap: var(--space-4);
    }
  }
</style>
