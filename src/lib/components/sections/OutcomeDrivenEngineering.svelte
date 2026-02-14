<script lang="ts">
  // Icons are defined inline for this specific section design
</script>

<section class="outcome-section">
  <div class="outcome-content">
    <div class="header-container">
      <span class="label">CAPABILITIES</span>
      <h2 class="section-title">Outcome-Driven Engineering</h2>
    </div>

    <div class="cards-grid">
      <!-- Card 1: High-Throughput APIs -->
      <div class="card">
        <div class="card-icon">
          <!-- Lightning Icon -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              stroke="#FFD700"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3 class="card-title">High-Throughput APIs</h3>
        <p class="card-stat">SUB-50MS P95 LATENCY</p>
      </div>

      <!-- Card 2: Distributed State -->
      <div class="card">
        <div class="card-icon">
          <!-- Bars/Stack Icon -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20V10"
              stroke="#FFD700"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 20V4"
              stroke="#FFD700"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 20V16"
              stroke="#FFD700"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3 class="card-title">Distributed State</h3>
        <p class="card-stat">LINEAR SCALABILITY</p>
      </div>

      <!-- Card 3: Infrastructure as Code -->
      <div class="card">
        <div class="card-icon">
          <!-- Cloud Icon -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 10H19C21.2091 10 23 11.7909 23 14C23 16.2091 21.2091 18 19 18H6C3.79086 18 2 16.2091 2 14C2 11.7909 3.79086 10 6 10C6 9.99264 6.00074 9.98529 6.00222 9.97795C6.08298 5.61795 9.61398 2.08381 13.9786 2.00067C14.0494 2 14.1205 2 14.1917 2C17.6322 2 20.5368 4.31686 21.654 7.42259"
              stroke="#FFD700"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3 class="card-title">Infrastructure as Code</h3>
        <p class="card-stat">ZERO-DOWNTIME DEPLOYS</p>
      </div>

      <!-- Card 4: Real-time Processing -->
      <div class="card">
        <div class="card-icon">
          <!-- Shield Icon -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
              stroke="#FFD700"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3 class="card-title">Real-time Processing</h3>
        <p class="card-stat">500K EVENTS / SECOND</p>
      </div>
    </div>
  </div>
</section>

<style>
  .outcome-section {
    padding: var(--space-44) 0 var(--space-32) 0; /* generous padding */
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #000; /* Strict black background */
  }

  .outcome-content {
    max-width: var(--container-xl);
    width: 70%; /* Matches other sections */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header-container {
    text-align: center;
    margin-bottom: var(--space-20);
  }

  .label {
    display: block;
    color: #ffd700; /* Gold */
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.15em;
    margin-bottom: var(--space-6);
  }

  .section-title {
    font-family: "Times New Roman", Times, serif; /* Or use a specific serif variable if available, e.g. Merriweather */
    font-family: var(--font-secondary);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    color: #fff;
    margin: 0;
    line-height: 1.1;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
    width: 100%;
  }

  .card {
    background: #0a0a0a; /* Very dark grey, almost black */
    border: 1px solid #1f1f1f;
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    aspect-ratio: 1 / 1; /* Keep cards square-ish */
    justify-content: space-between;
    transition: all 0.3s ease;
  }

  .card:hover {
    border-color: #333;
    transform: translateY(-5px);
  }

  .card-icon {
    margin-bottom: var(--space-4);
  }

  /* SVG Styling handled inline, but we can ensure size here */
  .card-icon svg {
    width: 32px;
    height: 32px;
  }

  .card-title {
    font-family: var(--font-primary);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    color: #fff;
    margin-bottom: var(--space-2);
    margin-top: auto; /* Push to bottom along with stat */
  }

  .card-stat {
    font-family: var(--font-primary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: #666; /* Muted grey */
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }
  }

  @media (max-width: 768px) {
    .outcome-content {
      width: 90%;
    }

    .section-title {
      font-size: var(--font-size-4xl);
    }

    .cards-grid {
      grid-template-columns: 1fr;
    }

    .card {
      aspect-ratio: auto;
      padding: var(--space-6);
    }
  }
</style>
