// 3D Master Cyber-HyperCore Engine for Waleed Rajpoot
export class Scene3D {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 8;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.initLights();
    this.createHyperCore();
    this.createCyberGrid();
    this.createParticleStorm();
    this.bindEvents();
    this.animate();
  }

  initLights() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const amberLight = new THREE.PointLight(0xffb703, 4, 40);
    amberLight.position.set(5, 5, 4);
    this.scene.add(amberLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4, 40);
    cyanLight.position.set(-5, -4, 3);
    this.scene.add(cyanLight);
  }

  createHyperCore() {
    this.coreGroup = new THREE.Group();

    // 1. Inner Obsidian Dodecahedron
    const innerGeo = new THREE.DodecahedronGeometry(1.5, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x050811,
      roughness: 0.1,
      metalness: 0.95,
      flatShading: true
    });
    this.innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.coreGroup.add(this.innerMesh);

    // 2. Cyan Outer Wireframe Lattice
    const wireGeo = new THREE.EdgesGeometry(innerGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7 });
    this.wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    this.coreGroup.add(this.wireMesh);

    // 3. Double Pulsing Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffb703, transparent: true, opacity: 0.6 });
    this.ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    this.ring1.rotation.x = Math.PI / 3;
    this.coreGroup.add(this.ring1);

    const ring2Geo = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.5 });
    this.ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    this.ring2.rotation.y = Math.PI / 4;
    this.coreGroup.add(this.ring2);

    this.coreGroup.position.set(2, 0, 0);
    this.scene.add(this.coreGroup);
  }

  createCyberGrid() {
    const grid = new THREE.GridHelper(50, 40, 0x00f0ff, 0x081320);
    grid.position.y = -4;
    grid.material.transparent = true;
    grid.material.opacity = 0.35;
    this.scene.add(grid);
  }

  createParticleStorm() {
    const count = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cAmber = new THREE.Color(0xffb703);
    const cCyan = new THREE.Color(0x00f0ff);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 26;
      positions[i + 1] = (Math.random() - 0.5) * 22;
      positions[i + 2] = (Math.random() - 0.5) * 18;

      const c = Math.random() > 0.5 ? cAmber : cCyan;
      colors[i] = c.r;
      colors[i + 1] = c.g;
      colors[i + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });

    this.storm = new THREE.Points(geometry, material);
    this.scene.add(this.storm);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      if (window.innerWidth < 1024) {
        this.coreGroup.position.set(0, 1.5, -2);
      } else {
        this.coreGroup.position.set(2, 0, 0);
      }
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    if (window.innerWidth < 1024) this.coreGroup.position.set(0, 1.5, -2);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.innerMesh.rotation.y += 0.003;
    this.innerMesh.rotation.x += 0.002;
    this.wireMesh.rotation.y += 0.003;
    this.wireMesh.rotation.x += 0.002;
    this.ring1.rotation.z += 0.005;
    this.ring2.rotation.x += 0.004;

    if (this.storm) {
      this.storm.rotation.y += 0.0006;
      this.storm.rotation.x += 0.0003;
    }

    this.targetX += (this.mouseX * 0.5 - this.targetX) * 0.05;
    this.targetY += (this.mouseY * 0.5 - this.targetY) * 0.05;

    this.coreGroup.rotation.y = this.targetX;
    this.coreGroup.rotation.x = -this.targetY;

    this.renderer.render(this.scene, this.camera);
  };
}