export function renderIdentityView(dev) {
  const avatarUrl = dev && dev.avatar ? dev.avatar : 'assets/images/waleed.jpg';

  return `
    <div class="identity-deep-deck page-entry-anim">

      <!-- Top Section: Centered Holographic Shard & Core Mandate -->
      <section class="identity-masthead">
        <div class="deck-section-heading">
          <span class="cyber-tag">EXECUTIVE DOSSIER // VERIFIED ARCHITECT</span>
          <h2>WALEED RAJPOOT</h2>
          <p class="section-desc">
            Full-Stack Software Developer & Systems Architect | Independent SaaS & AI Product Builder
          </p>
        </div>

        <div class="identity-shard-centered">
          <div class="shard-wrapper">
            <div class="shard-card holographic-glitch" id="portrait-shard">
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
                  <span class="term-cyan">STATUS: VERIFIED ARCHITECT</span>
                </div>
                <div class="shard-id-code">SHEIKHUPURA, PAKISTAN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Deep Technical Narrative -->
      <div class="narrative-wrapper">

        <!-- 01: THE ARCHITECTURAL MANIFESTO -->
        <article class="narrative-card">
          <div class="n-tag">01 // THE ARCHITECTURAL MANIFESTO</div>
          <h3 class="n-title">I Treat Software as Industrial Machinery, Not Just Disposable Code</h3>
          <p class="n-text">
            My development philosophy was built on a simple conviction: <strong>Software that fails under real-world conditions is useless, regardless of how modern its landing page looks.</strong>
          </p>
          <p class="n-text">
            I don’t approach engineering as an employee waiting for task tickets. I approach systems as an autonomous product architect. When I develop a multi-tenant platform like <strong>BusinessOS</strong>, I spend days planning Row-Level Security policies, indexing strategies, and tenant migration boundaries before writing frontend components. When I build <strong>School Office Assistant</strong>, I ensure it can survive power cuts and zero-bandwidth conditions on a school LAN without dropping a single rupee in fee records.
          </p>
        </article>

        <!-- 02: VISUAL INCIDENT TRIAGE & RECOVERY DIAGRAM (NEW) -->
        <article class="narrative-card">
          <div class="n-tag">02 // ARCHITECTURAL RECOVERY WORKFLOW</div>
          <h3 class="n-title">How I Debug & Isolate Critical Failures</h3>
          
          <div class="schematic-diagram-box">
            <div class="diagram-tag">CRITICAL INCIDENT RESOLUTION PIPELINE</div>
            <div class="schematic-flow">
              <div class="sch-node node-client">1. Symptom Audit<br><small>Isolate Exception</small></div>
              <div class="sch-arrow">──►</div>
              <div class="sch-node node-guard">2. Kernel Policy Dump<br><small>Verify RLS / Socket</small></div>
              <div class="sch-arrow">──►</div>
              <div class="sch-node node-db">3. Local Mutex Recovery<br><small>Replay WAL Journal</small></div>
              <div class="sch-arrow">──►</div>
              <div class="sch-node node-client">4. Hotfix Verification<br><small>Zero Downtime Rollout</small></div>
            </div>
          </div>
          
          <p class="n-text">
            Every software system eventually faces edge-case failures. My discipline is structured around zero-downtime hotfixes, atomic database rollbacks, and offline local journaling so that end users never experience data corruption.
          </p>
        </article>

        <!-- 03: VERIFIED CHRONOLOGY & PRODUCTION PROOF -->
        <article class="narrative-card">
          <div class="n-tag">03 // VERIFIED PRODUCTION CHRONOLOGY</div>
          <h3 class="n-title">Real Problem Solving Over Theoretical Resumes</h3>
          
          <div class="chronology-list">
            <div class="chrono-item">
              <div class="chrono-year">2026 // CURRENT</div>
              <div class="chrono-content">
                <h4>Multi-Tenant Enterprise SaaS Core (BusinessOS)</h4>
                <p>Architecting complete organization boundaries, Supabase PostgreSQL RLS, billing telemetry, and AI-assisted operational reasoning pipelines.</p>
              </div>
            </div>

            <div class="chrono-item">
              <div class="chrono-year">VERIFIED RUNNING</div>
              <div class="chrono-content">
                <h4>Offline-First School Management Suite (School Office Assistant)</h4>
                <p>Built and deployed an offline LAN system for educational institutions featuring student enrollment, fee journals, receipts, and SQLite local storage with zero internet dependence.</p>
              </div>
            </div>

            <div class="chrono-item">
              <div class="chrono-year">PROTOCOL RESEARCH</div>
              <div class="chrono-content">
                <h4>Decentralized Real-Time Mesh (Ghostchat P2P)</h4>
                <p>Constructed serverless WebRTC audio, video, screen share, and data-channel pipelines ensuring zero metadata retention on intermediary hops.</p>
              </div>
            </div>
          </div>
        </article>

        <!-- 04: HARDWARE WORKSTATION & TOOLCHAIN DISCIPLINE -->
        <article class="narrative-card">
          <div class="n-tag">04 // HARDWARE & TOOLCHAIN DISCIPLINE</div>
          <h3 class="n-title">The Engineering Workstation</h3>
          
          <div class="workstation-grid">
            <div class="ws-box">
              <span class="ws-label">CORE OPERATING SYSTEM</span>
              <span class="ws-val">Windows 11 Pro / WSL2 Ubuntu Linux</span>
            </div>
            <div class="ws-box">
              <span class="ws-label">RUNTIME ENGINES</span>
              <span class="ws-val">Node.js (LTS), Fastify, Express, Python 3.11+, FastAPI</span>
            </div>
            <div class="ws-box">
              <span class="ws-label">DATABASE ENGINES</span>
              <span class="ws-val">PostgreSQL 16, SQLite3 (WAL), Supabase DB, MySQL, IndexedDB</span>
            </div>
            <div class="ws-box">
              <span class="ws-label">LOW-LEVEL NETWORKING</span>
              <span class="ws-val">WebRTC, SDP, STUN, TURN, ICE, NAT Traversal, E2EE</span>
            </div>
            <div class="ws-box">
              <span class="ws-label">AI & MEDIA AUTOMATION</span>
              <span class="ws-val">Ollama (Local LLMs), Piper TTS, STT, FFmpeg CLI, Web Audio</span>
            </div>
            <div class="ws-box">
              <span class="ws-label">SCRIPTING & AUTOMATION</span>
              <span class="ws-val">PowerShell Automation, Git CLI, DSA, Vite, Three.js</span>
            </div>
          </div>
        </article>

        <!-- 05: ZERO-FABRICATION ETHICS -->
        <article class="narrative-card ethics-highlight">
          <div class="n-tag">05 // ZERO-FABRICATION PLEDGE</div>
          <h3 class="n-title">No Inflated Numbers. No Imaginary Employers.</h3>
          <p class="n-text">
            Many developer portfolios are filled with manufactured metrics, fake client logos, and non-existent certifications. <strong>I reject that completely.</strong>
          </p>
          <p class="n-text">
            Every line of code referenced in this portfolio exists in my public GitHub repositories (<a href="https://github.com/waleedrajpootcode" target="_blank" style="color: var(--accent-cyan);">github.com/waleedrajpootcode</a>). If a product is in development, it is marked as such. If a system is running on local LANs, its real architecture is demonstrable. I stand 100% behind what I build.
          </p>
        </article>

      </div>

    </div>
  `;
}

export function initShardTilt() {
  const shard = document.getElementById('portrait-shard');
  if (!shard) return;
  const wrapper = shard.closest('.shard-wrapper');
  if (!wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    shard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

    const reflection = shard.querySelector('.shard-reflection');
    if (reflection) {
      reflection.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.3), transparent 60%)`;
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    shard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const reflection = shard.querySelector('.shard-reflection');
    if (reflection) reflection.style.background = 'transparent';
  });
}