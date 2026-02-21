<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let project = $derived(data.project);
</script>

<div class="project-detail-layout">
  <aside class="left-column">
    <div class="sticky-container">
      <div>
        <span class="category-label">
          {#if project.category}
            {project.category}
          {/if}
        </span>
        <h1 class="project-title">
          {project.title}
          {#if project.subTitle}
            <span class="project-subtitle"><br />{project.subTitle}</span>
          {/if}
        </h1>
        {#if project.fullDescription}
          <p class="project-description">{project.fullDescription}</p>
        {/if}

        <div class="action-buttons">
          {#if project.links}
            {#each project.links as link}
              <a
                href={link.url}
                class="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            {/each}
          {/if}
        </div>
      </div>

      <div class="index-section">
        <h3 class="index-heading">CASE STUDY INDEX</h3>
        <ul class="index-list">
          {#if project.detailedSections}
            {#each project.detailedSections as section}
              <li>
                <a href="#{section.id}" class="index-link">
                  <span class="index-icon">⚡</span>
                  {section.title}
                </a>
              </li>
            {/each}
          {/if}
        </ul>
      </div>

      <div class="stats-section">
        <h3 class="stats-heading">Project Stats</h3>
        {#if project.stats}
          {#each project.stats as stat}
            <div class="stat-item">
              <span class="stat-label">{stat.label}</span>
              <span class="stat-value">{stat.value}</span>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </aside>

  <main class="right-column">
    {#if project.detailedSections}
      {#each project.detailedSections as section}
        <section id={section.id} class="detail-section">
          <h2>
            <!-- <span class="section-icon">⚡</span> -->
            {section.title}
          </h2>
          <div class="section-content">
            <p>{section.content}</p>
          </div>

          {#if section.keyContribution}
            <div class="key-contribution-card">
              <span class="contribution-label">KEY CONTRIBUTION</span>
              <p class="contribution-text">{section.keyContribution}</p>
            </div>
          {/if}
        </section>
      {/each}
    {/if}
  </main>
</div>

<style lang="scss">
  .project-detail-layout {
    display: flex;
    max-width: var(--layout-max-width, 1400px);
    margin: 0 auto;
    padding: var(--space-8, 4rem) var(--space-4, 2rem);
    gap: var(--space-12, 6rem);
    min-height: 100vh;
    color: var(--color-text-primary, #ffffff);
  }

  /* Left Column Styling */
  .left-column {
    flex: 0 0 350px;
  }

  .sticky-container {
    position: sticky;
    top: var(--space-8, 4rem);
    display: flex;
    flex-direction: column;
    gap: var(--space-8, 4rem);
  }

  .category-label {
    display: inline-block;
    color: var(--color-primary, #fadb5f); // fallback yellow
    font-size: var(--text-xs, 0.75rem);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-4, 1rem);
    font-weight: 600;
  }

  /* Just a small dash before category like in design */
  .category-label::before {
    content: "— ";
  }

  .project-title {
    font-size: var(--text-4xl, 3rem);
    line-height: 1.1;
    margin: 0 0 var(--space-4, 1.5rem) 0;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .project-subtitle {
    color: var(--color-text-secondary, #a1a1aa);
  }

  .project-description {
    color: var(--color-text-secondary, #a1a1aa);
    font-size: var(--text-base, 1rem);
    line-height: 1.6;
    margin-bottom: var(--space-6, 2rem);
  }

  .action-buttons {
    display: flex;
    gap: var(--space-4, 1rem);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: var(--space-3, 0.75rem) var(--space-6, 1.5rem);
    cursor: pointer;
    font-size: var(--text-sm, 0.875rem);
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    border-radius: var(--rounded-sm, 4px);

    &:first-child {
      background: var(--color-primary, #fadb5f);
      color: var(--color-bg-primary, #000);
      border: 1px solid var(--color-primary, #fadb5f);

      &:hover {
        opacity: 0.9;
      }
    }

    &:not(:first-child) {
      background: transparent;
      color: var(--color-text-primary, #fff);
      border: 1px solid var(--color-border, #333);

      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }

  /* Index Section */
  .index-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-4, 1rem);
  }

  .index-heading {
    font-size: var(--text-xs, 0.75rem);
    color: var(--color-text-muted, #71717a);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0;
    font-weight: 600;
  }

  .index-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 0.75rem);
  }

  .index-link {
    color: var(--color-text-secondary, #a1a1aa);
    text-decoration: none;
    font-size: var(--text-sm, 0.875rem);
    display: flex;
    align-items: center;
    gap: var(--space-3, 0.75rem);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-text-primary, #fff);
    }
  }

  /* Project Stats */
  .stats-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--rounded-md, 8px);
    padding: var(--space-6, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: var(--space-5, 1.25rem);
  }

  .stats-heading {
    font-size: var(--text-base, 1rem);
    color: var(--color-text-primary, #fff);
    margin: 0;
    font-weight: 600;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 0.25rem);
  }

  .stat-label {
    font-size: var(--text-xs, 0.75rem);
    color: var(--color-text-muted, #71717a);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-value {
    font-size: var(--text-sm, 0.875rem);
    color: var(--color-text-primary, #fff);
    font-weight: 500;
  }

  /* Right Column Styling */
  .right-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-12, 6rem);
    padding-top: var(--space-8, 4rem);
  }

  .detail-section {
    h2 {
      display: flex;
      align-items: center;
      gap: var(--space-3, 0.75rem);
      font-size: var(--text-2xl, 1.5rem);
      color: var(--color-text-primary, #fff);
      margin: 0 0 var(--space-6, 1.5rem) 0;
      font-weight: 700;
    }

    .section-content {
      color: var(--color-text-secondary, #a1a1aa);
      font-size: var(--text-lg, 1.125rem);
      line-height: 1.7;
      p {
        margin: 0;
        white-space: pre-line;
      }
    }
  }

  .key-contribution-card {
    margin-top: var(--space-8, 2.5rem);
    background: rgba(250, 219, 95, 0.05); // slightly tinted yellow background
    border: 1px solid rgba(250, 219, 95, 0.2);
    border-radius: var(--rounded-md, 8px);
    padding: var(--space-6, 1.5rem) var(--space-8, 2rem);

    .contribution-label {
      display: block;
      color: var(--color-primary, #fadb5f);
      font-size: var(--text-xs, 0.75rem);
      font-weight: 600;
      letter-spacing: 0.1em;
      margin-bottom: var(--space-4, 1rem);
    }

    .contribution-text {
      color: var(--color-text-primary, #fff);
      font-size: var(--text-lg, 1.125rem);
      font-style: italic;
      line-height: 1.6;
      margin: 0;
    }
  }

  @media (max-width: 1024px) {
    .project-detail-layout {
      flex-direction: column;
      gap: var(--space-8, 3rem);
    }

    .left-column {
      flex: none;
      width: 100%;
    }

    .sticky-container {
      position: static;
    }

    .right-column {
      padding-top: 0;
    }
  }
</style>
