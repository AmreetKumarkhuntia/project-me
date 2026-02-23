<script lang="ts">
  import ArrowRight from "$components/icons/ArrowRight.svelte";
  import PackageIcon from "$components/icons/PackageIcon.svelte"; // Assuming this icon exists or I'll use a generic one/text for now if not
  import Badge from "$components/ui/Badge.svelte";
  import { projects } from "$lib/configuration/projects";

  // Placeholder data for the case study
</script>

<section class="projects-section">
  <div class="content-container">
    <div class="section-header">
      <div class="header-left">
        <span class="label">Projects</span>
        <h2 class="section-title">Engineering Portfolio</h2>
      </div>
      <a href="/archive" class="browse-archive">
        Browse Archive
        <span class="icon-arrow">↗</span>
      </a>
    </div>

    {#each projects as project}
      <div class="project-card">
        <div class="project-content">
          <h3 class="project-title">{project.title}</h3>

          <div class="tags">
            {#each project.tags as tag}
              <Badge variant="tech">{tag}</Badge>
            {/each}
          </div>

          <div class="project-details">
            <div class="detail-column">
              <h4 class="label">
                {project.problem.title}
              </h4>
              <p class="detail-text">
                {project.problem.description}
              </p>
            </div>
            <div class="detail-column">
              <h4 class="label">
                {project.engineering.title}
              </h4>
              <p class="detail-text">
                {project.engineering.description}
              </p>
            </div>
          </div>

          <div class="impact-section">
            <span class="impact-label">IMPACT</span>
            <div class="impact-value-container">
              <span class="impact-value">{project.impact.value}</span>
              <span class="impact-desc">{project.impact.description}</span>
            </div>
            <a href="/project/{project.id}" class="view-project-btn"
              >View Full Project <span class="btn-arrow">→</span></a
            >
          </div>
        </div>

        <div class="project-visual">
          <div class="architecture-visual">
            <div class="arch-header">
              <span class="arch-title">{project.architecture.title}</span>
              <span class="arch-icon">⌄</span>
            </div>

            <div class="arch-diagram">
              {#if project.architecture.controlPlane && project.architecture.dataPlane}
                <div class="arch-box control-plane">
                  <div class="box-label">
                    {project.architecture.controlPlane.label}
                  </div>
                  {#each project.architecture.controlPlane.items as item}
                    <div class="box-item">
                      ▶ {item}
                    </div>
                  {/each}
                </div>

                <div class="arch-box data-plane">
                  <div class="box-label">
                    {project.architecture.dataPlane.label}
                  </div>
                  <div class="nodes-container">
                    {#each project.architecture.dataPlane.nodes as node}
                      <div class="node">{node}</div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .projects-section {
    padding: var(--space-32) 0;
    width: 100%;
    display: flex;
    justify-content: center;
    color: var(--color-text-primary);
  }

  .content-container {
    max-width: var(--container-xl);
    width: 70%;
  }

  /* Header */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--space-16);
  }

  .browse-archive {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition: color 0.2s;
  }

  .browse-archive:hover {
    color: var(--color-primary);
  }

  /* Project Card */
  .project-card {
    background: var(--color-bg-tertiary); /* Darker background */
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border-subtle);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    margin-bottom: var(--space-12);
  }

  .project-content {
    padding: var(--space-12);
  }

  /* Left Side Content */
  .project-title {
    font-family: var(--font-secondary);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    margin-top: 0;
    margin-bottom: var(--space-6);
    line-height: 1.2;
  }

  .tags {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-10);
  }

  .project-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
    margin-bottom: var(--space-10);
  }

  .detail-text {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  .impact-section {
    border-top: 1px solid var(--color-border-subtle);
    padding-top: var(--space-6);
    display: flex;
    flex-direction: column;
  }

  .impact-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-tertiary);
    letter-spacing: 0.1em;
    margin-bottom: var(--space-2);
    text-transform: uppercase;
  }

  .impact-value-container {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
  }

  .impact-value {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }

  .impact-desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  .view-project-btn {
    background: transparent;
    border: 1px solid var(--color-border-subtle);
    color: var(--color-text-primary);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--font-size-sm);
    width: fit-content;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition: all 0.2s;
    text-decoration: none;
  }

  .view-project-btn:hover {
    background: var(--color-bg-tertiary);
    border-color: var(--color-text-secondary);
  }

  /* Right Side Visual */
  .project-visual {
    background: var(
      --color-bg-secondary
    ); /* Very dark background for the terminal/diagram look */
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .architecture-visual {
    width: 100%;
  }

  .arch-header {
    display: flex;
    justify-content: space-between;
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-6);
  }

  .arch-diagram {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .arch-box {
    border: 1px dashed var(--color-border-subtle-dashed);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    background: var(--color-bg-panel-dark);
  }

  .box-label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    margin-bottom: var(--space-3);
    font-family: monospace;
  }

  .box-label::before {
    content: "// ";
  }

  .box-item {
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
    margin-bottom: var(--space-1);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .nodes-container {
    display: flex;
    gap: var(--space-3);
  }

  .node {
    border: 1px solid var(--color-border-subtle-white);
    background: var(--color-bg-card-darker);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
    text-align: center;
    flex: 1;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .project-card {
      grid-template-columns: 1fr;
    }

    .content-container {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);
    }

    .project-details {
      grid-template-columns: 1fr;
    }
  }
</style>
