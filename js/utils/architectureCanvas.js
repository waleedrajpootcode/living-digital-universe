// Interactive System Architecture Simulation
export class ArchitectureSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.packets = [];

    this.nodes = [
      { id: 'client', name: 'TENANT CLIENT', x: 0.15, y: 0.5, color: '#ffb703' },
      { id: 'jwt', name: 'JWT AUTH GATE', x: 0.40, y: 0.5, color: '#00f0ff' },
      { id: 'rls', name: 'POSTGRES RLS KERNEL', x: 0.65, y: 0.5, color: '#00ff66' },
      { id: 'db', name: 'ISOLATED DATA STORE', x: 0.88, y: 0.5, color: '#ffb703' }
    ];

    this.spawnPacket();
    this.render();
  }

  spawnPacket() {
    setInterval(() => {
      this.packets.push({ progress: 0, speed: 0.008 });
    }, 1400);
  }

  render = () => {
    const w = this.canvas.width = this.canvas.parentElement.clientWidth;
    const h = this.canvas.height = 140;

    this.ctx.clearRect(0, 0, w, h);

    // Draw Bus Lines
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(w * this.nodes[0].x, h * 0.5);
    this.ctx.lineTo(w * this.nodes[3].x, h * 0.5);
    this.ctx.stroke();

    // Draw Nodes
    this.nodes.forEach(node => {
      const nx = w * node.x;
      const ny = h * node.y;

      // Glow circle
      this.ctx.fillStyle = node.color;
      this.ctx.shadowColor = node.color;
      this.ctx.shadowBlur = 12;
      this.ctx.beginPath();
      this.ctx.arc(nx, ny, 7, 0, Math.PI * 2);
      this.ctx.fill();

      // Node Label
      this.ctx.shadowBlur = 0;
      this.ctx.font = '10px "JetBrains Mono"';
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(node.name, nx, ny + 24);
    });

    // Animate Traveling Packets
    this.packets.forEach((p, idx) => {
      p.progress += p.speed;
      const startX = w * this.nodes[0].x;
      const endX = w * this.nodes[3].x;
      const currentX = startX + (endX - startX) * p.progress;

      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = 15;
      this.ctx.beginPath();
      this.ctx.arc(currentX, h * 0.5, 4, 0, Math.PI * 2);
      this.ctx.fill();

      if (p.progress >= 1) this.packets.splice(idx, 1);
    });

    requestAnimationFrame(this.render);
  };
}