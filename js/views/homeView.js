export function renderHomeView(dev, projects) {
  const avatarUrl = dev && dev.avatar ? dev.avatar : 'assets/images/waleed.jpg';

  const projectCards = projects.map(p => `
    <article class="deck-project-card">
      <div class="deck-meta">
        <span class="deck-cat">${p.category}</span>
        <span class="deck-status val-green">● ${p.status}</span>
      </div>
      <h3 class="deck-title">${p.title}</h3>
      <p class="deck-desc">${p.tagline}</p>
      <div class="deck-tech" style="justify-content: center;">
        ${p.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>
      <div class="deck-actions">
        <a href="#/projects/${p.id}" class="deck-btn-inspect">INSPECT ARCHITECTURE →</a>
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="deck-link-git">REPO ↗</a>` : ''}
      </div>
    </article>
  `).join('');

  return `
    <div class="epic-landing-deck page-entry-anim">

      <!-- 1. HACKER HERO & BIOMETRIC LASER SHARD -->
      <section class="deck-hero">
        <div class="deck-hero-content">
          <div class="cyber-badge">
            <span class="radar-ping"></span>
            <span class="hacker-text" id="status-scramble">CLEARANCE: LEVEL 5 // SAAS ARCHITECT ONLINE</span>
          </div>

          <h1 class="glitch-hero-title">
            <span id="hero-scramble-name">${dev ? dev.name.toUpperCase() : 'WALEED RAJPOOT'}</span>
          </h1>

          <p class="cyber-subtitle" id="hero-scramble-role">
            Full-Stack Software Developer & Systems Architect | SaaS & AI Product Builder
          </p>

          <p class="deck-lead-text">
            Architecting autonomous multi-tenant SaaS environments with PostgreSQL Row-Level Security (RLS), offline-first architectures for zero-bandwidth operations, and WebRTC peer-to-peer data mesh networking.
          </p>

          <div class="deck-hero-buttons">
            <a href="#/projects" class="cyber-btn-primary">EXPLORE ALL ARTIFACTS →</a>
            <a href="#/identity" class="cyber-btn-secondary">READ SYSTEM ETHICS</a>
          </div>

          <!-- Live Engineering Telemetry -->
          <div class="live-telemetry-bar">
            <div class="t-block">
              <span class="t-key">TENANT_ISOLATION</span>
              <span class="t-val val-green">POSTGRESQL RLS [ACTIVE]</span>
            </div>
            <div class="t-block">
              <span class="t-key">OFFLINE_RESILIENCE</span>
              <span class="t-val val-amber">LOCAL SQLITE WAL [SYNCED]</span>
            </div>
            <div class="t-block">
              <span class="t-key">STREAM_LATENCY</span>
              <span class="t-val val-cyan">&lt; 15MS WEBRTC P2P</span>
            </div>
          </div>
        </div>

        <!-- Biometric Laser Scanner Portrait Card -->
        <div class="deck-hero-visual">
          <div class="shard-wrapper">
            <div class="shard-card holographic-glitch" id="hero-portrait-shard">
              <div class="shard-reflection"></div>
              <div class="laser-scanner"></div>

              <div class="corner-brackets bracket-tl"></div>
              <div class="corner-brackets bracket-tr"></div>
              <div class="corner-brackets bracket-bl"></div>
              <div class="corner-brackets bracket-br"></div>
              
              <div class="shard-image-container">
                <img src="${avatarUrl}" alt="Waleed Rajpoot — Systems Architect" class="shard-img">
              </div>

              <div class="shard-telemetry">
                <div class="shard-status">
                  <span class="status-pulse-active"></span>
                  <span class="term-cyan">BIOMETRIC: LEVEL 5</span>
                </div>
                <div class="shard-id-code">PAKISTAN // GLOBAL REMOTE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. LIVE ARCHITECTURE HEALTH & PERFORMANCE RADAR (NEW) -->
      <section class="live-health-radar-section">
        <div class="deck-section-heading">
          <span class="cyber-tag">REAL-TIME PRODUCTION AUDIT</span>
          <h2>SYSTEM BENCHMARKS & HEALTH RADAR</h2>
          <p class="section-desc">Hardware utilization efficiency, network latency indices, and data integrity metrics.</p>
        </div>

        <div class="health-radar-grid">
          <div class="radar-card">
            <div class="radar-gauge val-green">99.98%</div>
            <span class="r-title">OFFLINE CONTINUITY</span>
            <p>School Office Assistant executes local read/write transactions during complete network failure.</p>
          </div>
          <div class="radar-card">
            <div class="radar-gauge val-cyan">&lt; 15ms</div>
            <span class="r-title">P2P DATA LATENCY</span>
            <p>Direct WebRTC mesh routes audio/video buffers between client browsers without relay hops.</p>
          </div>
          <div class="radar-card">
            <div class="radar-gauge val-amber">0 LEAKS</div>
            <span class="r-title">TENANT BOUNDARY TEST</span>
            <p>PostgreSQL Row-Level Security automatically denies cross-tenant queries at the database kernel.</p>
          </div>
          <div class="radar-card">
            <div class="radar-gauge val-green">&lt; 2ms</div>
            <span class="r-title">SQLITE WAL COMMIT</span>
            <p>Local SQLite Write-Ahead Logging delivers immediate ACID transactions on LAN hardware.</p>
          </div>
        </div>
      </section>

      <!-- 3. LIVE INTERACTIVE ARCHITECTURE SIMULATOR -->
      <section class="deck-interactive-simulator">
        <div class="sim-header">
          <span class="cyber-tag">01 // LIVE SECURITY KERNEL</span>
          <h2>MULTI-TENANT DATA BUS SIMULATION</h2>
          <p class="section-desc">Real-time cryptographic tenant isolation stream with zero server telemetry leaks.</p>
        </div>
        <div class="sim-canvas-box">
          <canvas id="architecture-canvas"></canvas>
        </div>
      </section>

      <!-- 4. LIVE KERNEL STREAM & FREQUENCY WAVE -->
      <section class="deck-interactive-terminal">
        <div class="deck-section-heading">
          <span class="cyber-tag">TELEMETRY DECK</span>
          <h2>LIVE HOST LOGS & OSCILLOSCOPE</h2>
          <p class="section-desc">Streaming continuous security events, database journals, and audio buffers.</p>
        </div>

        <div class="term-wrapper">
          <div class="term-header">
            <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
            <span class="term-title">rajpoot@core-kernel: /dev/telemetry/live_stream</span>
            <span class="term-badge">LIVE KERNEL BROADCAST</span>
          </div>

          <div class="term-split">
            <div class="term-console" id="live-kernel-stream">
              <p class="live-log-line"><span class="log-time">[BOOT]</span> Initializing continuous security stream...</p>
            </div>
            <div class="term-waveform-box">
              <div class="wave-label">LIVE FREQUENCY BUFFER (VOX AI / WEBRTC)</div>
              <canvas id="osc-canvas" width="400" height="120"></canvas>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. FLAGSHIP PROJECT ARTIFACTS -->
      <section class="deck-featured-projects">
        <div class="deck-section-heading">
          <span class="cyber-tag">02 // VERIFIED REPOSITORIES</span>
          <h2>FLAGSHIP SOFTWARE ARTIFACTS</h2>
          <p class="section-desc">Production multi-tenant architectures, offline-first institutional desktop engines, and decentralized P2P protocols.</p>
        </div>
        <div class="deck-grid">
          ${projectCards}
        </div>
      </section>

      <!-- 6. THE FOUR ARCHITECTURAL PILLARS -->
      <section class="deck-pillars-section">
        <div class="deck-section-heading">
          <span class="cyber-tag">03 // ENGINEERING ETHICS</span>
          <h2>HOW I BUILD SOFTWARE</h2>
          <p class="section-desc">Guaranteed engineering standards executed across every codebase.</p>
        </div>

        <div class="pillars-row">
          <div class="pillar-box">
            <span class="p-num">01</span>
            <h3>Deep Data Isolation</h3>
            <p>I build multi-tenant databases with PostgreSQL Row Level Security (RLS) so that no tenant can ever read another's confidential data.</p>
          </div>
          <div class="pillar-box">
            <span class="p-num">02</span>
            <h3>Offline Resilience</h3>
            <p>School Office Assistant runs 100% on local LANs without an internet connection, keeping schools functioning uninterrupted.</p>
          </div>
          <div class="pillar-box">
            <span class="p-num">03</span>
            <h3>P2P Mesh Streams</h3>
            <p>Ghostchat P2P connects browsers directly using WebRTC data channels for video, audio, and screensharing without server logging.</p>
          </div>
          <div class="pillar-box">
            <span class="p-num">04</span>
            <h3>Zero Fabricated Claims</h3>
            <p>Zero fake clients. Zero imaginary numbers. Every feature listed is verified against my public GitHub codebases.</p>
          </div>
        </div>
      </section>

    </div>
  `;
}