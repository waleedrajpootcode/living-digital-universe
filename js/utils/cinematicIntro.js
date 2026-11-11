// ============================================================
// AETHERIS :: CINEMATIC INTRO ENGINE v3 · FINAL
// Story · Redesigned Character · Black Table · Bag Implosion · Slow-Mo Blast
// Mobile Responsive · Web Audio SFX · Frame-Rate Independent · Clean Cleanup
// ============================================================

export function initCinematicIntro(onComplete) {
  if (document.getElementById('cinematic-intro-stage')) return;

  // ==========================================================
  // 1. DOM + STYLES
  // ==========================================================
  const overlay = document.createElement('div');
  overlay.id = 'cinematic-intro-stage';
  overlay.innerHTML = `
    <canvas id="intro-canvas"></canvas>
    <div id="intro-hologram-ui">
      <div class="h-badge">// AETHERIS :: CYBER-MAGIC PROTOCOL</div>
      <h1 class="h-title">WALEED RAJPOOT</h1>
      <p class="h-desc">SYSTEMS ARCHITECT · AUTONOMOUS PRODUCT BUILDER</p>
      <div class="h-status">
        <span class="h-dot"></span>
        <span id="intro-status-text">DECRYPTING ARCHITECT CODES...</span>
      </div>
      <button id="intro-enter-btn" class="h-btn" type="button">
        <span class="h-btn-text">INITIALIZE SYSTEM</span>
        <span class="h-btn-shine"></span>
      </button>
    </div>
  `;

  const style = document.createElement('style');
  style.id = 'aetheris-intro-styles';
  style.textContent = `
    #cinematic-intro-stage {
      position: fixed; inset: 0; background: #000;
      z-index: 100000; overflow: hidden; margin: 0; padding: 0;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      -webkit-tap-highlight-color: transparent;
    }
    #intro-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
    #intro-hologram-ui {
      position: absolute; left: 50%; top: 38%;
      transform: translate(-50%, -50%) translateY(28px);
      text-align: center; z-index: 10; opacity: 0; pointer-events: none;
      transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
      padding: 0 20px; max-width: 92vw;
    }
    #intro-hologram-ui.active { opacity: 1; transform: translate(-50%,-50%) translateY(0); pointer-events: auto; }
    .h-badge { font-size: .72rem; color: #00ff66; letter-spacing: .22em; margin-bottom: 14px;
      text-shadow: 0 0 12px #00ff66; }
    .h-title { font-family: 'Syne','Inter',sans-serif; font-size: clamp(2.2rem, 6.5vw, 4rem);
      font-weight: 800; color: #fff; margin: 0 0 10px; letter-spacing: .02em; line-height: 1;
      text-shadow: 0 0 40px rgba(0,240,255,.6), 0 0 80px rgba(0,240,255,.3); }
    .h-desc { font-size: clamp(.72rem, 1.5vw, .95rem); color: #ffb703;
      letter-spacing: .1em; margin: 0 0 22px; text-shadow: 0 0 10px rgba(255,183,3,.5); }
    .h-status { display: inline-flex; align-items: center; gap: 8px;
      font-size: clamp(.68rem, 1.4vw, .82rem); color: #00f0ff; letter-spacing: .14em;
      margin-bottom: 22px; padding: 8px 16px; border: 1px solid rgba(0,240,255,.35);
      border-radius: 3px; background: rgba(0,240,255,.05); text-shadow: 0 0 8px #00f0ff; }
    .h-dot { width: 7px; height: 7px; border-radius: 50%; background: #00ff66;
      box-shadow: 0 0 10px #00ff66; animation: h-pulse 1.4s infinite; }
    @keyframes h-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(.85); } }
    .h-btn { position: relative; background: #ffb703; color: #000; font-family: inherit;
      font-weight: 800; font-size: clamp(.78rem, 1.6vw, 1rem); letter-spacing: .1em;
      padding: 18px 40px; border: none; border-radius: 4px; cursor: pointer; overflow: hidden;
      box-shadow: 0 0 30px rgba(255,183,3,.5), 0 0 60px rgba(255,183,3,.25);
      transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s; }
    .h-btn:hover { transform: scale(1.05); box-shadow: 0 0 45px rgba(255,183,3,.7), 0 0 90px rgba(255,183,3,.35); }
    .h-btn:active { transform: scale(.97); }
    .h-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
    .h-btn-shine { position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent);
      animation: h-shine 2.5s infinite; pointer-events: none; }
    @keyframes h-shine { 0% { left: -100%; } 60%,100% { left: 100%; } }
    @media (max-width: 640px) {
      #intro-hologram-ui { top: 32%; }
      .h-btn { padding: 14px 28px; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // ==========================================================
  // 2. CANVAS + LAYOUT
  // ==========================================================
  const canvas = document.getElementById('intro-canvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, DPR = 1, groundY = 0, centerX = 0, s = 1;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    groundY = H * 0.74;
    centerX = W / 2;
    s = Math.min(W, H * 1.4) / 850;
    s = Math.max(0.55, Math.min(s, 1.2));
  }
  resize();
  window.addEventListener('resize', resize);

  // ==========================================================
  // 3. WEB AUDIO SFX (synthesized)
  // ==========================================================
  const SFX = (() => {
    let ac = null;
    function ensure() {
      try {
        if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
        if (ac.state === 'suspended') ac.resume();
      } catch (e) { /* silent */ }
      return ac;
    }
    function tone(freq, dur, type='sine', vol=.12, slide=null) {
      const a = ensure(); if (!a) return;
      const o = a.createOscillator(), g = a.createGain();
      o.type = type; o.frequency.value = freq;
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, a.currentTime + dur);
      g.gain.setValueAtTime(vol, a.currentTime);
      g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + dur);
      o.connect(g).connect(a.destination);
      o.start(); o.stop(a.currentTime + dur);
    }
    function noise(dur, vol=.15, filt=800) {
      const a = ensure(); if (!a) return;
      const n = Math.floor(a.sampleRate * dur);
      const buf = a.createBuffer(1, n, a.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      const src = a.createBufferSource(); src.buffer = buf;
      const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = filt; f.Q.value = 1.5;
      const g = a.createGain();
      g.gain.setValueAtTime(vol, a.currentTime);
      g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + dur);
      src.connect(f).connect(g).connect(a.destination);
      src.start();
    }
    return {
      unlock: () => ensure(),
      magic:   () => { tone(440, .5, 'sine', .1, 1400); noise(.4, .1, 1200); },
      rise:    () => tone(180, 1.2, 'sawtooth', .08, 320),
      whoosh:  () => noise(.5, .18, 600),
      steam:   () => noise(.9, .15, 2000),
      boot:    () => tone(660, .15, 'square', .07, 880),
      type:    () => tone(1000 + Math.random() * 400, .03, 'square', .05),
      implode: () => { tone(220, .9, 'sawtooth', .18, 30); noise(.9, .22, 500); },
      snap:    () => tone(240, .12, 'square', .25, 120),
      boom:    () => { tone(90, 1.4, 'sine', .32, 28); noise(1.2, .35, 260); tone(60, 1.6, 'sine', .15, 20); }
    };
  })();

  // Unlock audio on first interaction anywhere (browser policy workaround)
  const unlockAudio = () => {
    SFX.unlock();
    overlay.removeEventListener('pointerdown', unlockAudio);
    overlay.removeEventListener('keydown', unlockAudio);
  };
  overlay.addEventListener('pointerdown', unlockAudio);
  overlay.addEventListener('keydown', unlockAudio);

  // ==========================================================
  // 4. STATE
  // ==========================================================
  const anim = {
    state: 'WALKING',
    t: 0,
    total: 0,
    charX: -150,
    charPose: 'carry',
    walkPhase: 0,
    charAlpha: 1,
    sceneAlpha: 1,

    magicCast: 0,
    tableRise: 0,
    bagFly: 0,
    bagOpen: 0,
    terminalRise: 0,

    steam: [],
    sparks: [],
    matrix: [],
    implosion: [],
    blastParticles: [],
    blastRadius: 0,
    blastFlash: 0,
    bagLidClose: 0,
    screenFade: 1,

    buttonReady: false,
    clicked: false,
    snapped: false,
    sfx: {}
  };

  const bagBase = () => ({
    x: centerX + 60 * s,
    y: groundY - 55 * s
  });
  const tableCenterX = () => centerX + 60 * s;

  // Matrix columns
  function initMatrix() {
    anim.matrix = [];
    const colW = 18;
    for (let x = 0; x < W; x += colW) {
      anim.matrix.push({
        x: x + colW / 2,
        y: Math.random() * H,
        speed: 90 + Math.random() * 260,
        chars: Array.from({ length: 30 }, () =>
          Math.random() > 0.5 ? String.fromCharCode(48 + (Math.random() * 10 | 0)) : 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'[Math.random() * 24 | 0]
        )
      });
    }
  }
  initMatrix();

  // ==========================================================
  // 5. UTILITY
  // ==========================================================
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const easeInCubic = t => t * t * t;
  const easeInOutQuad = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // ==========================================================
  // 6. BACKGROUND (with dark fade-in)
  // ==========================================================
  function drawBackground() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    const sa = anim.sceneAlpha ?? 1;
    if (sa <= 0.01) return;

    ctx.save();
    ctx.globalAlpha = sa;

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1;
    const gH = H - groundY;
    for (let i = 0; i < 12; i++) {
      const t = i / 12;
      const y = groundY + Math.pow(t, 1.8) * gH;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    for (let i = -20; i <= 20; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX + i * 40 * s, groundY);
      ctx.lineTo(centerX + i * 260 * s, H);
      ctx.stroke();
    }

    const g = ctx.createLinearGradient(0, groundY - 120 * s, 0, groundY);
    g.addColorStop(0, 'rgba(0,240,255,0)');
    g.addColorStop(1, 'rgba(0,240,255,0.10)');
    ctx.fillStyle = g;
    ctx.fillRect(0, groundY - 120 * s, W, 120 * s);

    ctx.restore();
  }

  // ==========================================================
  // 7. CHARACTER (cleaner redesign)
  // ==========================================================
  function drawCharacter(x, y, scale, opts = {}) {
    const alpha = opts.alpha ?? 1;
    if (alpha <= 0) return;
    const pose = opts.pose || 'idle';
    const wp = opts.walkPhase || 0;
    const castT = opts.castT || 0;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const CYAN = '#00f0ff';
    const COAT = '#0a0f1a';

    // Shadow
    ctx.fillStyle = 'rgba(0,240,255,0.14)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs (with knee bend)
    const legSwing = (pose === 'walk' || pose === 'carry') ? Math.sin(wp) * 14 : 0;
    const lKneeX = -3 + legSwing * 0.4, lFootX = -3 + legSwing;
    const rKneeX = 3 - legSwing * 0.4, rFootX = 3 - legSwing;

    ctx.strokeStyle = COAT;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(-5, -55);
    ctx.quadraticCurveTo(lKneeX, -32, lFootX, -2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(5, -55);
    ctx.quadraticCurveTo(rKneeX, -32, rFootX, -2);
    ctx.stroke();

    // Boots
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(lFootX - 2, -1, 7, 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(rFootX + 2, -1, 7, 3, 0, 0, Math.PI * 2); ctx.fill();

    // Torso / Coat
    ctx.fillStyle = COAT;
    ctx.strokeStyle = 'rgba(0,240,255,0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-14, -108);
    ctx.lineTo(14, -108);
    ctx.quadraticCurveTo(18, -80, 16, -54);
    ctx.lineTo(-16, -54);
    ctx.quadraticCurveTo(-18, -80, -14, -108);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Coat tail
    const tailSway = (pose === 'walk' || pose === 'carry') ? Math.sin(wp) * 2.5 : 0;
    ctx.beginPath();
    ctx.moveTo(-16, -54);
    ctx.quadraticCurveTo(-20 + tailSway, -42, -13 + tailSway, -32);
    ctx.lineTo(-7, -50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center seam
    ctx.strokeStyle = 'rgba(0,240,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -100);
    ctx.lineTo(0, -55);
    ctx.stroke();

    // Belt
    ctx.fillStyle = 'rgba(0,240,255,0.7)';
    ctx.fillRect(-14, -58, 28, 2);

    // Chest emblem
    ctx.fillStyle = CYAN;
    ctx.shadowBlur = 8;
    ctx.shadowColor = CYAN;
    ctx.fillRect(-2, -90, 4, 4);
    ctx.shadowBlur = 0;

    // Neck
    ctx.fillStyle = COAT;
    ctx.fillRect(-3, -112, 6, 5);

    // Head
    ctx.fillStyle = COAT;
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(0, -124, 11, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Visor
    ctx.fillStyle = CYAN;
    ctx.shadowBlur = 12;
    ctx.shadowColor = CYAN;
    ctx.fillRect(-8, -126, 16, 4);
    ctx.shadowBlur = 0;

    // Arms
    ctx.strokeStyle = COAT;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';

    if (pose === 'cast') {
      const lift = Math.min(1, castT / 0.6);
      // Right arm down (holding bag)
      ctx.beginPath();
      ctx.moveTo(13, -104);
      ctx.quadraticCurveTo(16, -84, 20, -62);
      ctx.stroke();
      // Left arm raised with orb
      const hx = -18 - 16 * lift;
      const hy = -90 - 28 * lift;
      ctx.beginPath();
      ctx.moveTo(-13, -104);
      ctx.quadraticCurveTo(-16, -90, hx, hy);
      ctx.stroke();
      if (lift > 0.3) {
        const pulse = 1 + Math.sin(castT * 14) * 0.3;
        ctx.fillStyle = CYAN;
        ctx.shadowBlur = 26; ctx.shadowColor = CYAN;
        ctx.beginPath(); ctx.arc(hx, hy, 5 * pulse, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(0,240,255,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(hx, hy, 10 * pulse, 0, Math.PI * 2); ctx.stroke();
      }
    } else if (pose === 'type') {
      ctx.beginPath();
      ctx.moveTo(-13, -104);
      ctx.quadraticCurveTo(-12, -88, 8, -78);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(13, -104);
      ctx.quadraticCurveTo(14, -88, 8, -74);
      ctx.stroke();
    } else if (pose === 'carry') {
      const armSwing = Math.sin(wp) * 8;
      ctx.beginPath();
      ctx.moveTo(-13, -104);
      ctx.quadraticCurveTo(-16 - armSwing * 0.4, -82, -18 - armSwing, -62);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(13, -104);
      ctx.quadraticCurveTo(16, -84, 20, -62);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-13, -104);
      ctx.quadraticCurveTo(-16, -82, -18, -62);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(13, -104);
      ctx.quadraticCurveTo(16, -82, 18, -62);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ==========================================================
  // 8. BLACK TABLE
  // ==========================================================
  function drawBlackTable(progress) {
    if (progress <= 0) return;
    const eased = easeOutCubic(progress);
    const alpha = Math.min(1, eased * 1.4);
    const offsetY = (1 - eased) * 100 * s;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(tableCenterX(), groundY - 55 * s + offsetY);
    ctx.scale(s, s);

    const pulse = 1 + Math.sin(anim.total * 4) * 0.15;
    ctx.shadowBlur = 22 * pulse;
    ctx.shadowColor = '#00f0ff';

    ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-40, 5); ctx.lineTo(-38, 60); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, 5); ctx.lineTo(38, 60); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,240,255,0.35)';
    ctx.beginPath(); ctx.moveTo(0, 3); ctx.lineTo(-10, 58); ctx.stroke();

    ctx.fillStyle = '#000510';
    ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-50, 0);
    ctx.lineTo(50, 0);
    ctx.lineTo(42, 10);
    ctx.lineTo(-42, 10);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(0,240,255,0.85)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-48, 1); ctx.lineTo(48, 1); ctx.stroke();

    ctx.restore();
  }

  // ==========================================================
  // 9. BRIEFCASE
  // ==========================================================
  function drawBriefcase(x, y, scale, lidOpen = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const w = 32, h = 22;

    ctx.shadowBlur = 18; ctx.shadowColor = '#ffb703';

    ctx.fillStyle = '#0a0a15';
    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-w / 2, -h, w, h);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, -h - 4, 6, Math.PI, 0);
    ctx.stroke();

    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-3, -h / 2 - 2, 6, 3);

    if (lidOpen > 0) {
      const lidH = 6;
      ctx.save();
      ctx.translate(0, -h);
      ctx.rotate(-lidOpen * Math.PI * 0.45);
      ctx.fillStyle = '#0a0a15';
      ctx.strokeStyle = '#ffb703';
      ctx.beginPath();
      ctx.rect(-w / 2, -lidH, w, lidH);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(0,240,255,0.7)';
      ctx.fillRect(-w / 2 + 2, -lidH + 2, w - 4, 1);
      ctx.restore();
    }

    if (lidOpen > 0.3) {
      ctx.fillStyle = `rgba(0,240,255,${(lidOpen - 0.3) * 0.9})`;
      ctx.shadowBlur = 25; ctx.shadowColor = '#00f0ff';
      ctx.fillRect(-w / 2 + 3, -h + 2, w - 6, 3);
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  // ==========================================================
  // 10. HOLOGRAPHIC TERMINAL
  // ==========================================================
  function drawTerminal(progress) {
    if (progress <= 0) return;
    const eased = easeOutCubic(progress);
    const { x, y } = bagBase();
    const rise = (1 - eased) * 40 * s;

    ctx.save();
    ctx.globalAlpha = eased;
    ctx.translate(x, y - 12 * s - rise);
    ctx.scale(s, s);

    ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 1.6;
    ctx.fillStyle = 'rgba(0,240,255,0.08)';
    ctx.shadowBlur = 14; ctx.shadowColor = '#00f0ff';
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 5, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-22, 0);
    ctx.lineTo(22, 0);
    ctx.lineTo(26, -34);
    ctx.lineTo(-26, -34);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,240,255,0.10)';
    ctx.fill(); ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(0,240,255,0.25)'; ctx.lineWidth = 0.7;
    for (let i = 1; i < 8; i++) {
      const yy = -34 * (i / 8);
      const ww = lerp(26, 22, i / 8);
      ctx.beginPath(); ctx.moveTo(-ww, yy); ctx.lineTo(ww, yy); ctx.stroke();
    }

    if (anim.state === 'TERMINAL' || anim.state === 'DEPLOY') {
      const cy = -34 * ((anim.total * 1.3) % 1);
      ctx.fillStyle = 'rgba(0,255,102,0.85)';
      ctx.fillRect(-24, cy, 48, 1);
    }

    ctx.fillStyle = '#00ff66';
    ctx.shadowBlur = 8; ctx.shadowColor = '#00ff66';
    ctx.fillRect(-3, -22, 2, 8);
    ctx.fillRect(3, -22, 2, 8);
    ctx.beginPath();
    ctx.moveTo(-1, -14); ctx.lineTo(1, -14); ctx.lineTo(0, -11); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  // ==========================================================
  // 11. MATRIX RAIN
  // ==========================================================
  function drawMatrix(dt) {
    if (anim.state !== 'TERMINAL' && anim.state !== 'DEPLOY') return;
    if (anim.state === 'DEPLOY' && anim.terminalRise < 0.5) return;

    ctx.save();
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    for (const col of anim.matrix) {
      col.y += col.speed * dt;
      if (col.y > H + 30) col.y = -30;
      for (let i = 0; i < col.chars.length; i++) {
        const cy = col.y - i * 14;
        if (cy < -20 || cy > H + 20) continue;
        const a = Math.max(0, 1 - i / col.chars.length) * 0.55;
        if (i === 0) {
          ctx.fillStyle = `rgba(180,255,200,${a * 1.6})`;
          ctx.shadowBlur = 6; ctx.shadowColor = '#00ff66';
        } else {
          ctx.fillStyle = `rgba(0,255,102,${a})`;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(col.chars[i], col.x, cy);
      }
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  // ==========================================================
  // 12. PARTICLES · STEAM / SPARKS
  // ==========================================================
  function spawnSteam() {
    const { x, y } = bagBase();
    for (let i = 0; i < 20; i++) {
      anim.steam.push({
        x: x + (Math.random() - 0.5) * 24 * s,
        y: y - 20 * s,
        vx: (Math.random() - 0.5) * 40 * s,
        vy: -30 * s - Math.random() * 60 * s,
        r: (2 + Math.random() * 3) * s,
        alpha: 0.8
      });
    }
  }
  function updateSteam(dt) {
    for (let i = anim.steam.length - 1; i >= 0; i--) {
      const p = anim.steam[i];
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy -= 30 * s * dt;
      p.r += 8 * s * dt;
      p.alpha -= 0.9 * dt;
      if (p.alpha <= 0) anim.steam.splice(i, 1);
    }
  }
  function drawSteam() {
    ctx.save();
    for (const p of anim.steam) {
      ctx.fillStyle = `rgba(0,240,255,${p.alpha * 0.5})`;
      ctx.shadowBlur = 10; ctx.shadowColor = '#00f0ff';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function spawnSpark() {
    const { x, y } = bagBase();
    anim.sparks.push({
      x: x + (Math.random() - 0.5) * 30 * s,
      y: y - (10 + Math.random() * 60) * s,
      vx: (Math.random() - 0.5) * 40 * s,
      vy: -(30 + Math.random() * 80) * s,
      r: (1 + Math.random() * 2) * s,
      alpha: 1
    });
  }
  function updateSparks(dt) {
    for (let i = anim.sparks.length - 1; i >= 0; i--) {
      const p = anim.sparks[i];
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.alpha -= 1.2 * dt;
      if (p.alpha <= 0) anim.sparks.splice(i, 1);
    }
  }
  function drawSparks() {
    ctx.save();
    for (const p of anim.sparks) {
      ctx.fillStyle = `rgba(255,183,3,${p.alpha})`;
      ctx.shadowBlur = 10; ctx.shadowColor = '#ffb703';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  // ==========================================================
  // 13. IMPLOSION
  // ==========================================================
  function spawnImplosion() {
    anim.implosion = [];
    const { x: bx, y: by } = bagBase();
    const bY = by - 12 * s;
    const cX = centerX - 80 * s;
    const points = [];

    // Character body
    for (let i = 0; i < 90; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = Math.random() * 90 * s;
      points.push({
        x: cX + Math.cos(ang) * rad * 0.35,
        y: groundY - 60 * s + Math.sin(ang) * rad * 0.7
      });
    }
    // Table
    for (let i = 0; i < 40; i++) {
      points.push({
        x: tableCenterX() + (Math.random() - 0.5) * 100 * s,
        y: groundY - 55 * s + (Math.random() - 0.5) * 60 * s
      });
    }
    // Terminal
    for (let i = 0; i < 40; i++) {
      points.push({
        x: bx + (Math.random() - 0.5) * 50 * s,
        y: by - 30 * s + (Math.random() - 0.5) * 35 * s
      });
    }

    for (const pt of points) {
      const dx = pt.x - bx;
      const dy = pt.y - bY;
      anim.implosion.push({
        bx, by: bY,
        startR: Math.hypot(dx, dy),
        startA: Math.atan2(dy, dx),
        t: 0,
        duration: 0.9 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#00f0ff' : (Math.random() > 0.5 ? '#ffb703' : '#ffffff'),
        size: (1.5 + Math.random() * 2.5) * s
      });
    }
  }
  function updateImplosion(dt) {
    for (const p of anim.implosion) {
      p.t = Math.min(1, p.t + dt / p.duration);
      const e = easeInCubic(p.t);
      const ang = p.startA + e * Math.PI * 5;
      const rad = p.startR * (1 - e);
      p.cx = p.bx + Math.cos(ang) * rad;
      p.cy = p.by + Math.sin(ang) * rad;
    }
  }
  function drawImplosion() {
    ctx.save();
    for (const p of anim.implosion) {
      if (p.cx == null) continue;
      const a = 1 - p.t * 0.4;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = a;
      ctx.shadowBlur = 14; ctx.shadowColor = p.color;
      ctx.beginPath(); ctx.arc(p.cx, p.cy, p.size, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  // ==========================================================
  // 14. BLAST
  // ==========================================================
  function spawnBlast() {
    const { x: bx, y: by } = bagBase();
    const bY = by - 12 * s;
    anim.blastParticles = [];
    for (let i = 0; i < 340; i++) {
      const ang = Math.random() * Math.PI * 2;
      const speed = 90 + Math.random() * 260;
      anim.blastParticles.push({
        x: bx, y: bY,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        size: (2 + Math.random() * 4) * s,
        life: 1,
        color: Math.random() > 0.5 ? '#00f0ff' : (Math.random() > 0.5 ? '#ffb703' : '#ffffff')
      });
    }
  }
  function updateBlast(dt) {
    const speedMul = lerp(0.5, 1.15, Math.min(1, anim.t / 1.0));
    for (const p of anim.blastParticles) {
      p.x += p.vx * dt * speedMul;
      p.y += p.vy * dt * speedMul;
      p.vy += 30 * s * dt * speedMul;
      p.life -= 0.55 * dt;
    }
    // Shockwave reaches edge in ~1.1s, guaranteed full-screen
    const maxR = Math.hypot(W, H) * 1.35;
    anim.blastRadius += (maxR / 1.1) * dt;
  }
  function drawBlast() {
    const { x: bx, y: by } = bagBase();
    const bY = by - 12 * s;
    const maxR = Math.hypot(W, H) * 1.1;
    const fade = Math.max(0, 1 - anim.blastRadius / maxR);

    ctx.strokeStyle = `rgba(0,240,255,${fade})`;
    ctx.lineWidth = 14 * s;
    ctx.shadowBlur = 50; ctx.shadowColor = '#00f0ff';
    ctx.beginPath(); ctx.arc(bx, bY, anim.blastRadius, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = `rgba(255,255,255,${fade * 1.1})`;
    ctx.lineWidth = 6 * s;
    ctx.beginPath(); ctx.arc(bx, bY, anim.blastRadius * 0.75, 0, Math.PI * 2); ctx.stroke();
    ctx.shadowBlur = 0;

    for (const p of anim.blastParticles) {
      if (p.life <= 0) continue;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.shadowBlur = 16; ctx.shadowColor = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    if (anim.blastFlash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${anim.blastFlash * 0.9})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  // ==========================================================
  // 15. UPDATE
  // ==========================================================
  function update(dt) {
    anim.total += dt;
    anim.t += dt;

    if (anim.state === 'WALKING') {
      const dur = 4.5;
      const p = Math.min(1, anim.t / dur);
      const e = easeInOutQuad(p);
      anim.charX = lerp(-150, centerX - 80 * s, e);
      anim.walkPhase += dt * 8;
      anim.charPose = 'carry';
      anim.charAlpha = Math.min(1, anim.t / 1.2);
      anim.sceneAlpha = Math.min(1, anim.t / 2.5);
      if (p >= 1) {
        anim.state = 'DEPLOY';
        anim.t = 0;
        anim.charAlpha = 1;
        anim.sceneAlpha = 1;
      }

    } else if (anim.state === 'DEPLOY') {
      anim.charAlpha = 1;
      anim.sceneAlpha = 1;
      const t = anim.t;

      anim.magicCast    = Math.min(1, t / 0.9);
      anim.tableRise    = Math.max(0, Math.min(1, (t - 0.8) / 1.5));
      anim.bagFly       = Math.max(0, Math.min(1, (t - 2.3) / 0.7));
      anim.bagOpen      = Math.max(0, Math.min(1, (t - 3.0) / 0.9));
      anim.terminalRise = Math.max(0, Math.min(1, (t - 3.9) / 1.3));

      // Pose transitions
      if (t < 2.3) anim.charPose = 'cast';
      else if (t < 3.9) anim.charPose = 'idle';
      else anim.charPose = 'type';

      anim.charX = centerX - 80 * s;

      // Sound (flag-based, never missed)
      if (!anim.sfx.magic  && t > 0.3) { anim.sfx.magic  = true; SFX.magic(); }
      if (!anim.sfx.rise   && t > 0.8) { anim.sfx.rise   = true; SFX.rise(); }
      if (!anim.sfx.whoosh && t > 2.3) { anim.sfx.whoosh = true; SFX.whoosh(); }
      if (!anim.sfx.steam  && t > 3.0) { anim.sfx.steam  = true; SFX.steam(); }
      if (!anim.sfx.boot   && t > 3.9) { anim.sfx.boot   = true; SFX.boot(); }
      if (t > 3.9 && Math.random() < dt * 4) SFX.type();

      // FX
      if (t < 2.3 && Math.random() < 0.5) spawnSpark();
      if (t > 3.0 && t < 3.6 && Math.random() < 0.4) spawnSteam();

      if (t >= 5.2) {
        anim.state = 'TERMINAL';
        anim.t = 0;
        anim.bagOpen = 1;
        anim.terminalRise = 1;
        document.getElementById('intro-hologram-ui').classList.add('active');
        document.getElementById('intro-status-text').textContent = 'WALEED RAJPOOT IDENTIFIED';
      }

    } else if (anim.state === 'TERMINAL') {
      anim.charPose = 'type';
      if (Math.random() < dt * 4) SFX.type();

      if (anim.t > 1.6 && !anim.buttonReady) {
        anim.buttonReady = true;
        document.getElementById('intro-status-text').textContent = 'SYSTEM READY — INITIALIZE?';
      }

    } else if (anim.state === 'IMPLOSION') {
      updateImplosion(dt);
      anim.bagLidClose = Math.min(1, Math.max(0, (anim.t - 1.1) / 0.5));
      if (anim.t > 1.35 && !anim.snapped) { anim.snapped = true; SFX.snap(); }
      if (anim.t >= 1.8) {
        anim.state = 'BLAST';
        anim.t = 0;
        anim.bagLidClose = 1;
        SFX.boom();
        spawnBlast();
        anim.blastFlash = 1;
      }

    } else if (anim.state === 'BLAST') {
      updateBlast(dt);
      anim.blastFlash = Math.max(0, 1 - anim.t * 1.5);
      if (anim.t > 1.2) {
        anim.state = 'FADE';
        anim.t = 0;
      }

    } else if (anim.state === 'FADE') {
      if (anim.t >= 1.3) {
        window.removeEventListener('resize', resize);
        overlay.remove();
        const st = document.getElementById('aetheris-intro-styles');
        if (st) st.remove();
        if (onComplete) onComplete();
      }
    }

    updateSteam(dt);
    updateSparks(dt);
  }

  // ==========================================================
  // 16. RENDER
  // ==========================================================
  function render(dt) {
    drawBackground();
    drawMatrix(dt);

    if (anim.state === 'WALKING') {
      // Bag in character's right hand
      drawBriefcase(anim.charX + 20 * s, groundY - 36 * s, s, 0);
      drawCharacter(anim.charX, groundY, s, {
        pose: anim.charPose,
        walkPhase: anim.walkPhase,
        castT: 0,
        alpha: anim.charAlpha
      });

    } else if (anim.state === 'DEPLOY') {
      // Table
      drawBlackTable(anim.tableRise);

      // Bag: carried, flying, or on table
      const bagTx = centerX + 60 * s;
      const bagTy = groundY - 55 * s;
      const carryX = centerX - 60 * s;
      const carryY = groundY - 36 * s;

      if (anim.bagFly <= 0) {
        drawBriefcase(carryX, carryY, s, 0);
      } else if (anim.bagFly < 1) {
        const e = easeInOutQuad(anim.bagFly);
        const arc = Math.sin(anim.bagFly * Math.PI) * 60 * s;
        drawBriefcase(lerp(carryX, bagTx, e), lerp(carryY, bagTy, e) - arc, s, 0);
      } else {
        drawBriefcase(bagTx, bagTy, s, anim.bagOpen);
      }

      // Terminal
      drawTerminal(anim.terminalRise);

      // Character
      drawCharacter(anim.charX, groundY, s, {
        pose: anim.charPose,
        walkPhase: 0,
        castT: anim.magicCast * 1.5,
        alpha: 1
      });

      drawSteam();
      drawSparks();

    } else if (anim.state === 'TERMINAL') {
      drawBlackTable(1);
      drawBriefcase(centerX + 60 * s, groundY - 55 * s, s, 1);
      drawTerminal(1);
      drawCharacter(anim.charX, groundY, s, {
        pose: 'type',
        walkPhase: 0,
        castT: 0,
        alpha: 1
      });

    } else if (anim.state === 'IMPLOSION') {
      const bagTx = centerX + 60 * s;
      const bagTy = groundY - 55 * s;

      // Table fades quickly
      const tableFade = Math.max(0, 1 - anim.t / 0.5);
      if (tableFade > 0.01) {
        ctx.save();
        ctx.globalAlpha = tableFade;
        drawBlackTable(1);
        ctx.restore();
      }

      // Character dissolves in 0.3s
      const charFade = Math.max(0, 1 - anim.t / 0.3);
      if (charFade > 0.01) {
        drawCharacter(anim.charX, groundY, s, {
          pose: 'type', walkPhase: 0, castT: 0, alpha: charFade
        });
      }

      drawImplosion();

      drawBriefcase(bagTx, bagTy, s, 1 - anim.bagLidClose);

      // Snap flash
      if (anim.snapped && anim.t < 1.55) {
        const fa = Math.max(0, 1 - (anim.t - 1.35) / 0.2) * 0.7;
        ctx.fillStyle = `rgba(180,240,255,${fa})`;
        ctx.fillRect(0, 0, W, H);
      }

    } else if (anim.state === 'BLAST') {
      drawBlast();

    } else if (anim.state === 'FADE') {
      // Freeze blast remnants and fade to black smoothly
      drawBlast();
      const a = Math.min(1, anim.t / 0.4);
      ctx.fillStyle = `rgba(0,0,0,${a})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  // ==========================================================
  // 17. BUTTON HANDLER
  // ==========================================================
  document.getElementById('intro-enter-btn').addEventListener('click', () => {
    if (anim.state !== 'TERMINAL' || anim.clicked) return;
    anim.clicked = true;
    SFX.unlock();
    SFX.implode();

    const ui = document.getElementById('intro-hologram-ui');
    ui.style.transition = 'opacity 0.35s ease';
    ui.style.opacity = '0';
    ui.style.pointerEvents = 'none';

    anim.state = 'IMPLOSION';
    anim.t = 0;
    anim.snapped = false;
    spawnImplosion();
  });

  // ==========================================================
  // 18. LOOP
  // ==========================================================
  let lastTs = 0;
  function loop(ts) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;
    update(dt);
    render(dt);
    if (document.getElementById('cinematic-intro-stage')) {
      requestAnimationFrame(loop);
    }
  }
  requestAnimationFrame(loop);
}