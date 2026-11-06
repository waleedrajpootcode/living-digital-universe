// High-Precision Magnetic Cyber Reticle
export class CyberCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.id = 'cyber-reticle';
    this.dot = document.createElement('div');
    this.dot.id = 'reticle-dot';
    this.ring = document.createElement('div');
    this.ring.id = 'reticle-ring';

    this.cursor.appendChild(this.dot);
    this.cursor.appendChild(this.ring);
    document.body.appendChild(this.cursor);

    this.mouseX = -100;
    this.mouseY = -100;
    this.ringX = -100;
    this.ringY = -100;

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.dot.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
    });

    // Expand reticle on hoverable items
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .deck-project-card, .shard-card, .pillar-box')) {
        this.ring.classList.add('reticle-locked');
      } else {
        this.ring.classList.remove('reticle-locked');
      }
    });
  }

  render = () => {
    // Smooth spring trailing physics
    this.ringX += (this.mouseX - this.ringX) * 0.18;
    this.ringY += (this.mouseY - this.ringY) * 0.18;
    this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
    requestAnimationFrame(this.render);
  };
}