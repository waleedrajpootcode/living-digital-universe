import { store } from './store.js';
import { Scene3D } from './3d/scene.js';
import { Router } from './router.js';
import { CyberCursor } from './utils/cursor.js';
import { sound } from './utils/audioFx.js';
import { initCinematicIntro } from './utils/cinematicIntro.js'; // 👈 Import Intro

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => drawer.classList.add('open');
  const closeDrawer = () => drawer.classList.remove('open');

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function initAudioToggleButton() {
  const telemetry = document.querySelector('.header-telemetry');
  if (!telemetry) return;

  const audioBtn = document.createElement('button');
  audioBtn.id = 'audio-toggle-btn';
  audioBtn.innerHTML = `[ AUDIO: <span id="audio-state">MUTED</span> ]`;
  audioBtn.style.cssText = `
    background: transparent;
    border: 1px solid rgba(0, 240, 255, 0.3);
    color: var(--accent-cyan);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 3px 8px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 12px;
  `;

  audioBtn.addEventListener('click', () => {
    const isUnmuted = sound.toggle();
    document.getElementById('audio-state').innerText = isUnmuted ? 'ACTIVE' : 'MUTED';
    document.getElementById('audio-state').style.color = isUnmuted ? '#00ff66' : '#ffb703';
  });

  telemetry.parentNode.insertBefore(audioBtn, telemetry);
}

async function bootstrap() {
  console.log('⚡ Initializing AETHERIS // 01...');

  await store.init();
  new Scene3D('canvas3d');
  new Router({}, store);
  new CyberCursor();
  initMobileMenu();
  initAudioToggleButton();

  // 👈 Play the Cyber-Magic Bag Intro on Launch!
  initCinematicIntro();
}

bootstrap();