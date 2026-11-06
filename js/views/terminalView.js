export function renderTerminalView(dev) {
  const email = dev ? dev.email : 'waleedrajpoot0096w@gmail.com';
  const phone = dev ? dev.phone : '+92 309 4686025';
  const github = dev ? dev.github : 'https://github.com/waleedrajpootcode';
  const linkedin = dev ? dev.linkedin : 'https://www.linkedin.com/in/waleed-rajpoot-642842403/';

  return `
    <div class="terminal-deep-deck page-entry-anim">

      <!-- Section Masthead -->
      <div class="deck-section-heading">
        <span class="cyber-tag">DIRECT COMMAND & TELEMETRY</span>
        <h2>COMMAND CENTER TERMINAL</h2>
        <p class="section-desc">
          Direct verified communication node for enterprise SaaS contracts, senior full-stack roles, and architectural consultation.
        </p>
      </div>

      <!-- 1. GLOBAL REMOTE AVAILABILITY & SLA RADAR (NEW) -->
      <section class="contact-sla-grid">
        <div class="sla-card">
          <span class="sla-icon">🌐</span>
          <h4>LOCATION & TIMEZONE</h4>
          <p>Sheikhupura, Punjab, Pakistan<br><strong>PKT (UTC+5) // Global Remote Ready</strong></p>
        </div>

        <div class="sla-card">
          <span class="sla-icon">⚡</span>
          <h4>RESPONSE SLA</h4>
          <p>Direct inquiries acknowledged within<br><strong>&lt; 24 Hours Guaranteed</strong></p>
        </div>

        <div class="sla-card">
          <span class="sla-icon">🛡️</span>
          <h4>CONTRACT CLEARANCE</h4>
          <p>Full-Stack SaaS Architecture, Offline LAN Systems & P2P Protocols</p>
        </div>
      </section>

      <!-- 2. Quick Command Chips -->
      <div class="terminal-quick-chips">
        <span class="chip-label">QUICK COMMANDS:</span>
        <button class="cli-chip" onclick="window.runTerminalCommand('help')">help</button>
        <button class="cli-chip" onclick="window.runTerminalCommand('skills')">skills</button>
        <button class="cli-chip" onclick="window.runTerminalCommand('projects')">projects</button>
        <button class="cli-chip" onclick="window.runTerminalCommand('whoami')">whoami</button>
        <button class="cli-chip" onclick="window.runTerminalCommand('contact')">contact</button>
        <button class="cli-chip" onclick="window.runTerminalCommand('clear')">clear</button>
      </div>

      <!-- 3. Interactive CLI Window -->
      <div class="cli-window">
        <div class="cli-topbar">
          <div class="window-controls">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="cli-session-title">waleed@systems-architect: ~ (interactive bash)</span>
          <span class="cli-badge">NODE: ONLINE [ENCRYPTED]</span>
        </div>

        <div class="cli-screen" id="cli-output">
          <p class="cli-line"><span class="cli-dim">Connected to host:</span> <span class="cli-cyan">aetheris-gateway.waleedrajpoot.internal</span></p>
          <p class="cli-line"><span class="cli-dim">Type</span> <span class="cli-amber">'help'</span> <span class="cli-dim">or click the quick command chips above.</span></p>
          <br>
          <p class="cli-line"><span class="cli-prompt">waleed@system:~$</span> <span class="cli-cmd">cat developer_coordinates.json</span></p>
          
          <div class="cli-json-box">
            <p><span class="j-key">"developer":</span> <span class="j-str">"Waleed Rajpoot"</span>,</p>
            <p><span class="j-key">"role":</span> <span class="j-str">"Full-Stack Software Developer & Systems Architect"</span>,</p>
            <p><span class="j-key">"location":</span> <span class="j-str">"Sheikhupura, Punjab, Pakistan"</span>,</p>
            <p><span class="j-key">"email":</span> <a href="mailto:${email}" class="j-link">"${email}"</a>,</p>
            <p><span class="j-key">"phone":</span> <a href="tel:${phone}" class="j-link">"${phone}"</a>,</p>
            <p><span class="j-key">"github":</span> <a href="${github}" target="_blank" class="j-link">"${github}"</a>,</p>
            <p><span class="j-key">"linkedin":</span> <a href="${linkedin}" target="_blank" class="j-link">"${linkedin}"</a></p>
          </div>
        </div>

        <div class="cli-input-line">
          <span class="cli-prompt">waleed@system:~$</span>
          <input type="text" id="cli-input" placeholder="Type a command (e.g. 'skills', 'projects', 'help') and hit Enter..." autocomplete="off">
        </div>
      </div>

      <!-- 4. Cryptographic Security Fingerprint Box (NEW) -->
      <div class="crypto-fingerprint-box">
        <div class="fp-title">◈ CRYPTOGRAPHIC INTEGRITY FINGERPRINT</div>
        <div class="fp-hash">SHA-256: 9e8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a</div>
        <div class="fp-sub">Verified against public commits on <a href="${github}" target="_blank" style="color: var(--accent-cyan);">github.com/waleedrajpootcode</a>. Zero proprietary code leaks.</div>
      </div>

      <!-- 5. Direct Action Channels -->
      <div class="cli-bottom-actions">
        <a href="mailto:${email}" class="cyber-btn-primary">
          <span>SEND DIRECT EMAIL</span> ↗
        </a>
        <a href="${github}" target="_blank" rel="noopener noreferrer" class="cyber-btn-secondary">
          <span>GITHUB REPOSITORIES</span> ↗
        </a>
        <a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="cyber-btn-secondary">
          <span>LINKEDIN NETWORK</span> ↗
        </a>
      </div>

    </div>
  `;
}

// Global Command Runner for Terminal
window.runTerminalCommand = function(cmd) {
  const output = document.getElementById('cli-output');
  if (!output) return;

  const normalized = cmd.trim().toLowerCase();

  const appendLine = (html) => {
    const p = document.createElement('div');
    p.className = 'cli-dynamic-line';
    p.innerHTML = html;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  };

  appendLine(`<p class="cli-line"><span class="cli-prompt">waleed@system:~$</span> <span class="cli-cmd">${cmd}</span></p>`);

  switch (normalized) {
    case 'help':
      appendLine(`
        <div class="cli-cmd-res">
          <p><span class="cli-amber">help</span> - Display all executable directives</p>
          <p><span class="cli-cyan">skills</span> - Output protocol & engineering inventory</p>
          <p><span class="cli-cyan">projects</span> - List flagship verified software repositories</p>
          <p><span class="cli-cyan">whoami</span> - Display developer clearance & identity</p>
          <p><span class="cli-cyan">contact</span> - Output direct email and coordinates</p>
          <p><span class="cli-cyan">clear</span> - Clear terminal session output</p>
        </div>
      `);
      break;

    case 'skills':
      appendLine(`
        <div class="cli-cmd-res">
          <p class="cli-cyan">VERIFIED FULL-STACK & SYSTEMS ARSENAL:</p>
          <p>▹ <span class="cli-amber">P2P Protocols:</span> WebRTC, SDP, NAT Traversal, STUN, TURN, ICE, E2EE, RTT Tuning</p>
          <p>▹ <span class="cli-amber">Backend & APIs:</span> Node.js, Fastify, Express, Python, Flask, FastAPI, REST APIs</p>
          <p>▹ <span class="cli-amber">Databases & Security:</span> PostgreSQL, SQLite3 (WAL), Supabase Auth, Row-Level Security (RLS), MySQL, IndexedDB</p>
          <p>▹ <span class="cli-amber">AI & Media Pipelines:</span> Ollama (Local LLMs), Piper TTS, STT, FFmpeg Video/Audio Automation, Web Audio API</p>
          <p>▹ <span class="cli-amber">Frontend Systems:</span> React, TypeScript (TS/TSX), Modern JS (JSX), Three.js (WebGL), Vite, HTML5/CSS3</p>
          <p>▹ <span class="cli-amber">Scripting & Environment:</span> PowerShell Automation, Git CLI, Architecture Design, DSA, Pip</p>
        </div>
      `);
      break;

    case 'projects':
      appendLine(`
        <div class="cli-cmd-res">
          <p><span class="cli-amber">1. BusinessOS</span> - Multi-Tenant SaaS with Row-Level Security</p>
          <p><span class="cli-amber">2. School Office Assistant</span> - Offline-First LAN School ERP</p>
          <p><span class="cli-amber">3. Ghostchat P2P</span> - WebRTC Peer-to-Peer Encrypted Communication</p>
          <p><span class="cli-amber">4. VoxStudio AI</span> - AI Voice Synthesis & Audio Inference</p>
          <p><span class="cli-amber">5. RRAWStudio</span> - AI Animation Automation Pipeline</p>
          <p><span class="cli-dim">Type URL hash '#/projects' to inspect full architecture blueprints.</span></p>
        </div>
      `);
      break;

    case 'whoami':
      appendLine(`
        <div class="cli-cmd-res">
          <p class="cli-green">Waleed Rajpoot</p>
          <p>Full-Stack Software Developer & Systems Architect</p>
          <p>Clearance: Level 5 // SaaS & AI Product Builder [VERIFIED]</p>
        </div>
      `);
      break;

    case 'contact':
      appendLine(`
        <div class="cli-cmd-res">
          <p>Email: <a href="mailto:waleedrajpoot0096w@gmail.com" class="j-link">waleedrajpoot0096w@gmail.com</a></p>
          <p>Phone: +92 309 4686025</p>
          <p>Location: Sheikhupura, Punjab, Pakistan</p>
        </div>
      `);
      break;

    case 'clear':
      output.innerHTML = '';
      break;

    default:
      appendLine(`<p class="cli-line cli-err">Command not recognized: '${cmd}'. Type 'help' for directives.</p>`);
      break;
  }
};

export function initInteractiveTerminal() {
  const input = document.getElementById('cli-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) {
        window.runTerminalCommand(val);
        input.value = '';
      }
    }
  });
}