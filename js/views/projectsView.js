export function renderProjectsView(projects) {
  const cardsHtml = projects.map(project => {
    const techBadges = project.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('');
    const statusClass = project.status.toLowerCase().includes('verified') ? 'val-green' : 'val-amber';

    return `
      <article class="deck-project-card" data-category="${project.category.toLowerCase()}">
        <div class="deck-meta">
          <span class="deck-cat">${project.category}</span>
          <span class="deck-status ${statusClass}">● ${project.status}</span>
        </div>

        <h3 class="deck-title">${project.title}</h3>
        <p class="deck-desc">${project.tagline}</p>

        <div class="deck-tech">
          ${techBadges}
        </div>

        <div class="deck-actions">
          <a href="#/projects/${project.id}" class="deck-btn-inspect">INSPECT ARCHITECTURE →</a>
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="deck-link-git">
              <span>GITHUB</span> ↗
            </a>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');

  return `
    <div class="projects-master-deck page-entry-anim">

      <!-- 1. Centered Majestic Section Header -->
      <div class="deck-section-heading">
        <span class="cyber-tag">VERIFIED SOFTWARE REPOSITORY</span>
        <h2>THE PROJECT UNIVERSE</h2>
        <p class="section-desc">
          Autonomous production software entities, local LAN offline systems, and real-time P2P protocols. Every project solves verified technical friction.
        </p>
      </div>

      <!-- 2. Interactive Filter Chips -->
      <div class="project-filter-bar">
        <button class="filter-chip active" data-filter="all">ALL SYSTEMS (${projects.length})</button>
        <button class="filter-chip" data-filter="saas">SAAS & ENTERPRISE</button>
        <button class="filter-chip" data-filter="offline">OFFLINE-FIRST LAN</button>
        <button class="filter-chip" data-filter="real-time">REAL-TIME P2P</button>
        <button class="filter-chip" data-filter="ai">AI & AUDIO</button>
      </div>

      <!-- 3. PERMANENT SYSTEM TOPOLOGY MAP (VISUAL INFOGRAPHIC) -->
      <section class="permanent-topology-card">
        <div class="topology-header">
          <span class="cyber-tag">CROSS-SYSTEM ECOSYSTEM</span>
          <h3>PERMANENT ARCHITECTURAL BUS TOPOLOGY</h3>
          <p class="section-desc">How data, security tokens, and local offline engines interconnect across my software systems.</p>
        </div>

        <div class="topology-diagram-grid">
          <div class="topo-layer">
            <span class="topo-layer-label">CLIENT INTERFACE LAYER</span>
            <div class="topo-box topo-client">
              <strong>React / TypeScript / Vite</strong>
              <small>Sub-Second Bundle | Web Audio API</small>
            </div>
          </div>

          <div class="topo-arrow-down">▼ [ Cryptographic Token / LAN Socket ] ▼</div>

          <div class="topo-layer">
            <span class="topo-layer-label">SYSTEM BOUNDARY & GATEWAY</span>
            <div class="topo-split">
              <div class="topo-box topo-cloud">
                <strong>Supabase JWT Gateway</strong>
                <small>PostgreSQL Row-Level Security</small>
              </div>
              <div class="topo-box topo-lan">
                <strong>Fastify Local Host</strong>
                <small>LAN Node (Zero-Internet Sync)</small>
              </div>
            </div>
          </div>

          <div class="topo-arrow-down">▼ [ ACID Transactions / P2P ICE Traversal ] ▼</div>

          <div class="topo-layer">
            <span class="topo-layer-label">STORAGE & PROTOCOL LAYER</span>
            <div class="topo-split">
              <div class="topo-box topo-db">
                <strong>PostgreSQL 16 (BusinessOS)</strong>
                <small>Isolated Multi-Tenant Tables</small>
              </div>
              <div class="topo-box topo-sqlite">
                <strong>SQLite3 WAL (School Office)</strong>
                <small>Sub-2ms Local Journaling</small>
              </div>
              <div class="topo-box topo-p2p">
                <strong>WebRTC Mesh (Ghostchat)</strong>
                <small>Direct Browser DataChannels</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. PERMANENT PRODUCTION STANDARDS GUARANTEE -->
      <div class="standards-banner">
        <div class="standard-item">
          <span class="std-num">01</span>
          <div>
            <strong>PostgreSQL RLS Enforced</strong>
            <small>Database-level tenant boundaries. Zero application-level leakage.</small>
          </div>
        </div>
        <div class="standard-item">
          <span class="std-num">02</span>
          <div>
            <strong>Offline Mutex Continuity</strong>
            <small>Guaranteed zero transaction loss during sudden power or internet outages.</small>
          </div>
        </div>
        <div class="standard-item">
          <span class="std-num">03</span>
          <div>
            <strong>End-to-End P2P Privacy</strong>
            <small>Zero intermediate audio/video data retention on external servers.</small>
          </div>
        </div>
        <div class="standard-item">
          <span class="std-num">04</span>
          <div>
            <strong>100% Verifiable Source Code</strong>
            <small>Every software capability backed by public GitHub repositories.</small>
          </div>
        </div>
      </div>

      <!-- 5. DYNAMIC PROJECT ARTIFACTS GRID -->
      <div class="deck-grid" id="projects-container">
        ${cardsHtml}
      </div>

    </div>
  `;
}

// Interactive Category Filter Logic
export function initProjectFilters() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.deck-project-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}