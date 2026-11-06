// Continuous Hacker Telemetry Engine for Waleed Rajpoot
export class HackerEngine {
  constructor() {
    this.logs = [
      "[KERNEL_BOOT] AETHERIS-OS v4.19 initialized on host node.",
      "[RLS_GUARD] Multi-tenant isolation active. Tenant claim verified.",
      "[POSTGRESQL] Executing row security policy on organization_id: 0x8F92.",
      "[OFFLINE_ENGINE] SchoolOfficeAssistant: LAN socket heartbeat received.",
      "[SQLITE_JOURNAL] Transactional WAL mode enabled. Zero data loss verified.",
      "[WEBRTC_CORE] Ghostchat: Generating ICE candidate for peer channel.",
      "[P2P_MESH] Peer connection established. Direct audio/video stream routed.",
      "[VOX_AI] Audio buffer streaming through Web Audio API @ 48kHz.",
      "[SECURITY] Cryptographic token rotation executed successfully.",
      "[IDENTITY] Waleed Rajpoot: Full-Stack Systems Architect status: VERIFIED."
    ];
    this.logIndex = 0;
    this.intervalId = null;
  }

  startLiveTerminal(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      const line = document.createElement('p');
      line.className = 'live-log-line';
      const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
      line.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="log-txt">${this.logs[this.logIndex]}</span>`;
      
      el.appendChild(line);
      el.scrollTop = el.scrollHeight;

      if (el.children.length > 20) {
        el.removeChild(el.firstChild);
      }

      this.logIndex = (this.logIndex + 1) % this.logs.length;
    }, 1500);
  }

  startOscilloscope(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f0ff';

      ctx.beginPath();
      const height = canvas.height;
      const width = canvas.width;

      for (let x = 0; x < width; x++) {
        const y = height / 2 + 
                  Math.sin(x * 0.05 + phase) * 12 + 
                  Math.sin(x * 0.02 + phase * 1.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = '#ffb703';
      ctx.shadowColor = '#ffb703';
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.cos(x * 0.03 - phase * 0.8) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.05;
      requestAnimationFrame(render);
    };
    render();
  }
}