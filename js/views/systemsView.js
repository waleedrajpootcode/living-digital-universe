export function renderSystemsView() {
  return `
    <div class="systems-deep-deck page-entry-anim">

      <!-- Section Header -->
      <div class="deck-section-heading">
        <span class="cyber-tag">VERIFIED PROTOCOL & KERNEL SPECIFICATIONS</span>
        <h2>SYSTEMS, PROTOCOLS & TOOLCHAINS</h2>
        <p class="section-desc">
          Low-level networking handshakes, neural audio inference pipelines, distributed database engines, and automation scripts verified across my software builds.
        </p>
      </div>

      <!-- PART 1: MASTER PROTOCOL & ENGINEERING DOMAINS -->
      <div class="manual-container">

        <!-- SPEC 01: P2P NETWORKING, NAT, STUN/TURN & ICE -->
        <article class="spec-card">
          <div class="spec-header">
            <div class="spec-num">PROTOCOL // 01</div>
            <h3>Decentralized WebRTC, NAT Traversal & Media Mesh</h3>
            <span class="spec-status-tag status-active">NETWORK ENFORCED</span>
          </div>

          <p class="spec-lead">
            In <strong>Ghostchat P2P</strong>, peer connections do not magically connect. I architected the complete lifecycle: SDP offer/answer negotiation, STUN candidate binding for NAT hole-punching, TURN relay fallbacks, and DTLS-SRTP end-to-end encryption (E2EE) with RTT latency optimization.
          </p>

          <!-- Visual Schematic Diagram -->
          <div class="schematic-diagram-box">
            <div class="diagram-tag">WEBRTC SIGNALING & NAT HOLE-PUNCHING TOPOLOGY</div>
            <div class="schematic-flow">
              <div class="sch-node node-client">Peer A (Browser)<br><small>SDP Offer + Host ICE</small></div>
              <div class="sch-arrow">──( STUN Request )──►</div>
              <div class="sch-node node-guard">STUN / TURN Server<br><small>Public IP:Port Mapping</small></div>
              <div class="sch-arrow">──( ICE Candidates )──►</div>
              <div class="sch-node node-db">Peer B (Browser)<br><small>Direct P2P E2EE Mesh</small></div>
            </div>
            <div class="diagram-subnote">Zero intermediary audio/video retention. If direct NAT traversal fails, fallback to TURN relay maintains connection continuity.</div>
          </div>

          <div class="spec-breakdown-grid">
            <div class="breakdown-item">
              <span class="b-key">NETWORKING & PROTOCOLS</span>
              <p>WebRTC, SDP (Session Description Protocol), NAT, STUN, TURN, ICE, E2EE, RTT Monitoring, RTCDataChannel.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">REAL-WORLD IMPLEMENTATION</span>
              <p>Constructed complete audio, video, screen share, and raw chunked file transfer pipelines without media storage on signaling nodes.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">ENGINEERING ADVANTAGE</span>
              <p>Direct peer mesh reduces infrastructure server bandwidth costs to almost zero while delivering sub-15ms streaming latency.</p>
            </div>
          </div>
        </article>

        <!-- SPEC 02: LOCAL AI, PIPER TTS, OLLAMA & FFMPEG -->
        <article class="spec-card">
          <div class="spec-header">
            <div class="spec-num">PROTOCOL // 02</div>
            <h3>Local AI Inference, Neural Speech (Piper TTS) & FFmpeg Pipelines</h3>
            <span class="spec-status-tag status-dev">NEURAL PIPELINE</span>
          </div>

          <p class="spec-lead">
            In <strong>VoxStudio AI</strong> and <strong>RRAWStudio</strong>, AI is not a third-party paid API wrapper. It executes local models (Ollama LLM inference, Piper neural text-to-speech, speech-to-text models) and automated FFmpeg media transcoding for frame-by-frame asset synthesis.
          </p>

          <div class="spec-breakdown-grid">
            <div class="breakdown-item">
              <span class="b-key">TOOLCHAIN & RUNTIMES</span>
              <p>Python 3.11+, Flask, FastAPI, Ollama (Local LLMs), Piper TTS, STT Pipelines, FFmpeg CLI, Web Audio API.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">REAL-WORLD IMPLEMENTATION</span>
              <p>Engineered streaming neural speech rendering and audio processing pipelines that transform text to speech and transcribe voice to structured text with local inference.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">MEDIA PROCESSING</span>
              <p>Harnessing FFmpeg for automated audio normalization, format conversion, and procedural frame assembly pipelines.</p>
            </div>
          </div>
        </article>

        <!-- SPEC 03: MULTI-TENANT POSTGRESQL RLS & SUPABASE AUTH -->
        <article class="spec-card">
          <div class="spec-header">
            <div class="spec-num">PROTOCOL // 03</div>
            <h3>Multi-Tenant PostgreSQL Isolation, Supabase Auth & RLS</h3>
            <span class="spec-status-tag status-active">PRODUCTION ENFORCED</span>
          </div>

          <p class="spec-lead">
            In <strong>BusinessOS</strong>, data isolation is enforced at the database kernel level using PostgreSQL Row-Level Security (RLS) linked to cryptographically signed Supabase Auth JWT claims.
          </p>

          <div class="spec-breakdown-grid">
            <div class="breakdown-item">
              <span class="b-key">DATABASE STACK</span>
              <p>PostgreSQL 16, Supabase Auth, Row-Level Security (RLS), SQL, MySQL, Relational Schema Normalization.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">REAL-WORLD IMPLEMENTATION</span>
              <p>Constructed multi-tenant business schemas where every database query mathematically guarantees isolation of tenant records.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">SECURITY SPECIFICATION</span>
              <p>JWT claims extract <code>organization_id</code> automatically at session creation, blocking all cross-tenant access attempts.</p>
            </div>
          </div>
        </article>

        <!-- SPEC 04: OFFLINE-FIRST SQLite WAL & INDEXEDDB MUTEX -->
        <article class="spec-card">
          <div class="spec-header">
            <div class="spec-num">PROTOCOL // 04</div>
            <h3>Offline-First Systems, Fastify LAN & SQLite WAL</h3>
            <span class="spec-status-tag status-active">DEPLOYED & RUNNING</span>
          </div>

          <p class="spec-lead">
            In <strong>School Office Assistant</strong>, zero-bandwidth resilience is achieved by pairing client-side IndexedDB local persistence with a high-throughput Fastify Node backend writing to local SQLite in WAL (Write-Ahead Logging) mode.
          </p>

          <div class="spec-breakdown-grid">
            <div class="breakdown-item">
              <span class="b-key">STORAGE & API RUNTIME</span>
              <p>Node.js, Fastify, SQLite3 (PRAGMA journal_mode = WAL), IndexedDB, TypeScript, REST APIs.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">REAL-WORLD IMPLEMENTATION</span>
              <p>Ensures that student fees, attendance, and exam marks can be created and queried on a local school LAN without active internet access.</p>
            </div>
            <div class="breakdown-item">
              <span class="b-key">TRANSACTION SAFETY</span>
              <p>ACID guarantees prevent database corruption during sudden power failures or system restarts.</p>
            </div>
          </div>
        </article>

      </div>

      <!-- PART 2: COMPLETE VERIFIED TECHNICAL INVENTORY (CATEGORIZED BY DOMAIN) -->
      <section class="tech-inventory-section">
        <div class="deck-section-heading">
          <span class="cyber-tag">FULL-STACK ARSENAL</span>
          <h2>VERIFIED TECHNICAL TOOLCHAIN</h2>
          <p class="section-desc">Every technology listed has been utilized in real, working software codebases.</p>
        </div>

        <div class="inventory-grid">
          
          <div class="inventory-card">
            <span class="inv-category">REAL-TIME NETWORKING & P2P</span>
            <div class="inv-tags">
              <span class="tech-pill">WebRTC</span>
              <span class="tech-pill">P2P Mesh</span>
              <span class="tech-pill">SDP</span>
              <span class="tech-pill">NAT Traversal</span>
              <span class="tech-pill">STUN Server</span>
              <span class="tech-pill">TURN Relay</span>
              <span class="tech-pill">ICE Candidates</span>
              <span class="tech-pill">E2EE</span>
              <span class="tech-pill">RTT Tuning</span>
            </div>
          </div>

          <div class="inventory-card">
            <span class="inv-category">BACKEND ENGINES & APIS</span>
            <div class="inv-tags">
              <span class="tech-pill">Node.js</span>
              <span class="tech-pill">Fastify</span>
              <span class="tech-pill">Express</span>
              <span class="tech-pill">Python</span>
              <span class="tech-pill">FastAPI</span>
              <span class="tech-pill">Flask</span>
              <span class="tech-pill">REST APIs</span>
              <span class="tech-pill">WebSockets</span>
            </div>
          </div>

          <div class="inventory-card">
            <span class="inv-category">DATABASES & SECURITY</span>
            <div class="inv-tags">
              <span class="tech-pill">PostgreSQL</span>
              <span class="tech-pill">Supabase Auth</span>
              <span class="tech-pill">Supabase RLS</span>
              <span class="tech-pill">SQLite3 (WAL)</span>
              <span class="tech-pill">MySQL</span>
              <span class="tech-pill">SQL</span>
              <span class="tech-pill">IndexedDB</span>
              <span class="tech-pill">JWT Cryptography</span>
            </div>
          </div>

          <div class="inventory-card">
            <span class="inv-category">AI, VOICE & MEDIA PIPELINES</span>
            <div class="inv-tags">
              <span class="tech-pill">Local LLMs</span>
              <span class="tech-pill">Ollama</span>
              <span class="tech-pill">Piper TTS</span>
              <span class="tech-pill">STT (Speech-to-Text)</span>
              <span class="tech-pill">Text-to-Voice</span>
              <span class="tech-pill">FFmpeg</span>
              <span class="tech-pill">Web Audio API</span>
            </div>
          </div>

          <div class="inventory-card">
            <span class="inv-category">FRONTEND ARCHITECTURE</span>
            <div class="inv-tags">
              <span class="tech-pill">React</span>
              <span class="tech-pill">TypeScript (TS)</span>
              <span class="tech-pill">TSX / JSX</span>
              <span class="tech-pill">JavaScript (ESNext)</span>
              <span class="tech-pill">Vite</span>
              <span class="tech-pill">Three.js</span>
              <span class="tech-pill">HTML5 / CSS3</span>
            </div>
          </div>

          <div class="inventory-card">
            <span class="inv-category">SYSTEMS, SCRIPTS & AUTOMATION</span>
            <div class="inv-tags">
              <span class="tech-pill">PowerShell Scripting</span>
              <span class="tech-pill">System Architecture</span>
              <span class="tech-pill">DSA</span>
              <span class="tech-pill">Git CLI</span>
              <span class="tech-pill">Pip / VirtualEnv</span>
              <span class="tech-pill">WSL2 Linux</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  `;
}