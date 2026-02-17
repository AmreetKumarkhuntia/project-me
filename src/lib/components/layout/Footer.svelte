<script lang="ts">
  import { footer } from "$configuration/footer";
  import Button from "$components/ui/Button.svelte";
  import BoltIcon from "$components/icons/BoltIcon.svelte";
</script>

<footer class="footer-section">
  <div class="container">
    <div class="top-section">
      <!-- Brand Column -->
      <div class="brand-col">
        <div class="brand-header">
          <span class="amreet-logo-text">{footer.brand.title}</span>
        </div>
        <p class="brand-desc">{footer.brand.description}</p>
        <div class="cta-buttons">
          <Button variant="secondary" size="sm" href="mailto:contact@amreet.io"
            >Email me</Button
          >
          <Button variant="secondary" size="sm" href="/cv.pdf"
            >Download CV</Button
          >
        </div>
      </div>

      <!-- Navigation Column -->
      <div class="links-col">
        <h4 class="col-title">Navigation</h4>
        <nav class="links-list">
          {#each footer.navLinks as link}
            <a href={link.url} class="footer-link">{link.label}</a>
          {/each}
        </nav>
      </div>

      <!-- Connect Column -->
      <div class="links-col">
        <h4 class="col-title">Connect</h4>
        <nav class="links-list">
          {#each footer.connectLinks as link}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link">{link.label}</a
            >
          {/each}
        </nav>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="copyright">{footer.copyright}</div>
      <div class="metrics">
        {#each footer.metrics as metric}
          <div class="metric-item">
            <span class="metric-label">{metric.label}:</span>
            <span class="metric-value">{metric.value}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-section {
    padding: var(--space-32) 0 var(--space-8) 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 1px solid var(--color-border-subtle);
  }

  .container {
    max-width: var(--container-xl);
    width: 90%;
    display: flex;
    flex-direction: column;
  }

  /* Top Section */
  .top-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--space-16);
    margin-bottom: var(--space-32);
  }

  /* Brand Column */
  .brand-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    max-width: 400px;
  }

  .brand-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .brand-desc {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary); /* Light grey on dark bg */
    margin: 0;
  }

  .cta-buttons {
    display: flex;
    gap: var(--space-4);
  }

  /* Links Columns */
  .links-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .col-title {
    font-family: var(--font-secondary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin: 0;
  }

  .links-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .footer-link {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    color: var(--color-text-tertiary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--color-primary);
  }

  /* Bottom Bar */
  .bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-8);
    border-top: 1px solid var(--color-border-subtle);
    font-family: var(--font-primary);
    font-size: 0.625rem; /* 10px */
    letter-spacing: 0.1em;
    color: var(--color-text-tertiary);
    text-transform: uppercase;
  }

  .metrics {
    display: flex;
    gap: var(--space-6);
  }

  .metric-item {
    display: flex;
    gap: var(--space-1);
  }

  .metric-value {
    color: var(--color-text-primary);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .top-section {
      grid-template-columns: 1fr;
      gap: var(--space-12);
    }

    .bottom-bar {
      flex-direction: column;
      gap: var(--space-4);
      align-items: flex-start;
    }

    .metrics {
      flex-wrap: wrap;
    }
  }
</style>
