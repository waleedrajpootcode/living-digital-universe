import { renderHomeView } from './views/homeView.js';
import { renderProjectsView, initProjectFilters } from './views/projectsView.js';
import { renderProjectDetailView } from './views/projectDetailView.js';
import { renderIdentityView, initShardTilt } from './views/identityView.js';
import { renderSystemsView } from './views/systemsView.js';
import { renderTerminalView, initInteractiveTerminal } from './views/terminalView.js';
import { TextScrambler } from './utils/scrambler.js';
import { HackerEngine } from './utils/hackerEngine.js';
import { ArchitectureSimulator } from './utils/architectureCanvas.js';
import { sound } from './utils/audioFx.js';

export class Router {
  constructor(routes, store) {
    this.routes = routes;
    this.store = store;
    this.viewContainer = document.getElementById('app-view');
    this.hackerEngine = new HackerEngine();

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('DOMContentLoaded', () => this.handleRoute());
    this.initAudioTriggers();
    this.initHudCoordinates();

    // 👉 YEH LINE ADD KAREIN: Page open hote hi baghair click kiye CORE khol dega!
    this.handleRoute();
  }

  initAudioTriggers() {
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .deck-project-card')) {
        sound.playHover();
      }
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) {
        sound.playClick();
      }
    });
  }

  initHudCoordinates() {
    let hud = document.getElementById('hud-coordinates');
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'hud-coordinates';
      document.body.appendChild(hud);
    }
    window.addEventListener('mousemove', (e) => {
      hud.innerText = `[X: ${e.clientX.toString().padStart(4, '0')} | Y: ${e.clientY.toString().padStart(4, '0')}] // RADAR_LOCK`;
    });
  }

  handleRoute() {
    const hash = window.location.hash || '#/';
    const path = hash.replace('#', '') || '/';

    document.querySelectorAll('.nav-item').forEach(el => {
      const route = el.getAttribute('data-route');
      if (path === route || (route === '/projects' && path.startsWith('/projects'))) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const dev = this.store.getDeveloper();
    const projects = this.store.getProjects();

    // 1. Home War Room Deck
    if (path === '/' || path === '') {
      this.viewContainer.innerHTML = renderHomeView(dev, projects);
      this.initDynamicTilt('hero-portrait-shard');

      // Start Hacker Scrambler Text
      setTimeout(() => {
        const nameEl = document.getElementById('hero-scramble-name');
        if (nameEl) new TextScrambler(nameEl).setText(dev ? dev.name.toUpperCase() : 'WALEED RAJPOOT');

        const statusEl = document.getElementById('status-scramble');
        if (statusEl) new TextScrambler(statusEl).setText('CLEARANCE: LEVEL 5 // SAAS ARCHITECT ONLINE');
      }, 100);

      // Start Engines
      this.hackerEngine.startLiveTerminal('live-kernel-stream');
      this.hackerEngine.startOscilloscope('osc-canvas');
      new ArchitectureSimulator('architecture-canvas');
    } 
    // 2. Identity
    else if (path === '/identity') {
      this.viewContainer.innerHTML = renderIdentityView(dev);
      initShardTilt();
    }
    // 3. Systems Matrix
    else if (path === '/systems') {
      this.viewContainer.innerHTML = renderSystemsView();
    }
    // 4. Command Terminal
    else if (path === '/terminal') {
      this.viewContainer.innerHTML = renderTerminalView(dev);
      initInteractiveTerminal(); // Activate runnable command input!
    }
    // 5. Project Detail
    else if (path.startsWith('/projects/')) {
      const projectId = path.replace('/projects/', '');
      const project = this.store.getProjectById(projectId);
      this.viewContainer.innerHTML = renderProjectDetailView(project);
    } 
    // 6. Projects Universe
    else if (path === '/projects') {
      this.viewContainer.innerHTML = renderProjectsView(projects);
      initProjectFilters(); // Activate real-time category filtering!
    }
  }

  initDynamicTilt(elementId) {
    const shard = document.getElementById(elementId);
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
}