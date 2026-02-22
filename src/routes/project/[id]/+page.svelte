<script lang="ts">
  import type { PageData } from "./$types";
  import LightningIcon from "$components/icons/LightningIcon.svelte";
  import ArrowUpRight from "$components/icons/ArrowUpRight.svelte";
  import CpuIcon from "$components/icons/CpuIcon.svelte";
  import ShieldCheckIcon from "$components/icons/ShieldCheckIcon.svelte";
  import DocumentIcon from "$components/icons/DocumentIcon.svelte";
  import ServerIcon from "$components/icons/ServerIcon.svelte";
  import BarChartIcon from "$components/icons/BarChartIcon.svelte";
  import LifebuoyIcon from "$components/icons/LifebuoyIcon.svelte";
  import TechnicalDecisions from "$components/sections/project/TechnicalDecisions.svelte";
  import SystemArchitecture from "$components/sections/project/SystemArchitecture.svelte";
  import MeasurableImpact from "$components/sections/project/MeasurableImpact.svelte";
  import Postmortem from "$components/sections/project/Postmortem.svelte";
  import EngineeringStack from "$components/sections/project/EngineeringStack.svelte";
  import GenericSection from "$components/sections/project/GenericSection.svelte";
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
                    {#if section.id === "executive-summary"}
                      <DocumentIcon size={14} color="currentColor" />
                    {:else if section.id === "system-architecture"}
                      <ServerIcon size={14} color="currentColor" />
                    {:else if section.id === "engineering-stack"}
                      <CpuIcon size={14} color="currentColor" />
                    {:else if section.id === "technical-decisions"}
                      <ShieldCheckIcon size={14} color="currentColor" />
                    {:else if section.id === "measurable-impact"}
                      <BarChartIcon size={14} color="currentColor" />
                    {:else if section.id === "postmortem"}
                      <LifebuoyIcon size={14} color="currentColor" />
                    {:else}
                      <LightningIcon size={14} color="currentColor" />
                    {/if}
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
            {#if section.id === "engineering-stack" && project.engineeringStack}
              <EngineeringStack
                title={section.title}
                stack={project.engineeringStack}
              />
            {:else if section.id === "technical-decisions" && project.technicalDecisions}
              <TechnicalDecisions
                technicalDecisions={project.technicalDecisions}
              />
            {:else if section.id === "system-architecture" && project.architecture}
              <SystemArchitecture architecture={project.architecture} />
            {:else if section.id === "measurable-impact" && project.measurableImpact}
              <MeasurableImpact measurableImpact={project.measurableImpact} />
            {:else if section.id === "postmortem" && project.postmortem}
              <Postmortem postmortem={project.postmortem} />
            {:else}
              <GenericSection {section} />
            {/if}
          </section>
        {/each}
      {/if}
    </main>
  </div>
</div>
