<script lang="ts">
  import type { PageData } from "./$types";
  import LightningIcon from "$components/icons/LightningIcon.svelte";
  import ArrowUpRight from "$components/icons/ArrowUpRight.svelte";
  import CpuIcon from "$components/icons/CpuIcon.svelte";
  import ShieldIcon from "$components/icons/ShieldIcon.svelte";
  import TechnicalDecisions from "$components/sections/project/TechnicalDecisions.svelte";
  import "$css/pages/project.scss";

  let { data }: { data: PageData } = $props();
  let project = $derived(data.project);
</script>

<div class="page-container">
  <section class="hero-section">
    <div class="category-wrapper">
      <span class="category-line"></span>
      <span class="category-label">
        {#if project.category}
          {project.category}
        {/if}
      </span>
    </div>

    <h1 class="project-title">
      {project.title}
      {#if project.subTitle}
        <span class="project-subtitle">{project.subTitle}</span>
      {/if}
    </h1>

    {#if project.fullDescription}
      <p class="project-description">{project.fullDescription}</p>
    {/if}

    <div class="action-buttons">
      {#if project.links}
        {#each project.links as link, i}
          <a
            href={link.url}
            class="btn-primary {i === 0 ? 'btn-yellow' : 'btn-outline'}"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
            {#if i === 0}
              <span class="btn-icon">&lt;/&gt;</span>
            {:else}
              <ArrowUpRight size={14} />
            {/if}
          </a>
        {/each}
      {/if}
    </div>
  </section>

  <div class="project-detail-layout">
    <aside class="left-column">
      <div class="sticky-container">
        <div class="index-section">
          <h3 class="index-heading">CASE STUDY INDEX</h3>
          <ul class="index-list">
            {#if project.detailedSections}
              {#each project.detailedSections as section, i}
                <li>
                  <a href="#{section.id}" class="index-link">
                    <LightningIcon size={14} color="currentColor" />
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
            {#if section.id !== "technical-decisions"}
              <div class="section-header-wrapper">
                {#if section.id === "engineering-stack"}
                  <CpuIcon size={22} color="var(--color-primary)" />
                {:else}
                  <LightningIcon size={22} color="var(--color-primary)" />
                {/if}
                <h2>{section.title}</h2>
              </div>
            {/if}

            {#if section.id === "engineering-stack" && project.engineeringStack}
              <p class="stack-subtitle">{project.engineeringStack.subtitle}</p>
              <div class="stack-subtitle-line"></div>
              <div class="stack-grid">
                {#each project.engineeringStack.groups as group}
                  <div class="stack-group">
                    <p class="stack-group-label">{group.label}</p>
                    <div class="stack-pills">
                      {#each group.items as item}
                        <span class="stack-pill">{item}</span>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>
            {:else if section.id === "technical-decisions" && project.technicalDecisions}
              <TechnicalDecisions
                technicalDecisions={project.technicalDecisions}
              />
            {:else}
              <div class="section-content">
                <p>{section.content}</p>
              </div>

              {#if section.keyContribution}
                <div class="key-contribution-card">
                  <span class="contribution-label">KEY CONTRIBUTION</span>
                  <p class="contribution-text">{section.keyContribution}</p>
                </div>
              {/if}
            {/if}
          </section>
        {/each}
      {/if}
    </main>
  </div>
</div>
