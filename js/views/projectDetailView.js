export function renderProjectDetailView(project) {
  if (!project) {
    return `
      <div class="detail-stage page-entry-anim">
        <div class="error-box" style="text-align: center; padding: 100px 20px;">
          <h2 style="font-family: var(--font-display); font-size: 2.5rem; color: #ff1e42;">PROJECT NOT FOUND</h2>
          <p style="color: var(--text-secondary); margin: 16px 0 24px 0;">The requested architectural artifact does not exist or has been relocated.</p>
          <a href="#/projects" class="cyber-btn-secondary">← RETURN TO UNIVERSE</a>
        </div>
      </div>
    `;
  }

  const techBadges = project.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('');
  const statusColor = project.status.toLowerCase().includes('verified') ? 'val-green' : 'val-amber';

  // Video embed section if YouTube ID exists
  const videoSection = project.youtubeId ? `
    <div class="detail-video-wrapper">
      <div class="deck-section-heading" style="margin-bottom: 24px;">
        <span class="cyber-tag">WALKTHROUGH DEMONSTRATION</span>
        <h3 style="font-family: var(--font-display); font-size: 1.8rem; color: #fff;">PRODUCTION VIDEO WALKTHROUGH</h3>
      </div>
      <div class="video-responsive-frame">
        <iframe 
          src="https://www.youtube.com/embed/${project.youtubeId}" 
          title="${project.title} Video Walkthrough" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  ` : '';

  return `
    <div class="project-detail-deck page-entry-anim">

      <!-- Back Navigation Button -->
      <div class="detail-nav-back">
        <a href="#/projects" class="cyber-btn-secondary">← BACK TO ALL SYSTEMS</a>
      </div>

      <!-- Masthead Header -->
      <header class="detail-masthead">
        <div class="detail-meta-strip">
          <span class="cyber-tag">${project.category}</span>
          <span class="detail-status ${statusColor}">● ${project.status}</span>
        </div>
        <h1 class="detail-title">${project.title}</h1>
        <p class="detail-tagline">${project.tagline}</p>
        <div class="deck-tech" style="justify-content: center;">
          ${techBadges}
        </div>
      </header>

      <!-- Main Deep Technical Grid -->
      <div class="detail-content-grid">
        
        <!-- Left: Core Engineering Analysis -->
        <div class="detail-main-col">
          
          <div class="spec-card">
            <span class="b-key">THE REAL-WORLD PROBLEM</span>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: #fff; margin-bottom: 12px;">Operational Friction Being Solved</h3>
            <p class="spec-lead">${project.problem}</p>
          </div>

          <div class="spec-card">
            <span class="b-key">ENGINEERED ARCHITECTURE</span>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: #fff; margin-bottom: 12px;">How the System Was Architected</h3>
            <p class="spec-lead">${project.solution}</p>
          </div>

          <!-- Video Walkthrough if present -->
          ${videoSection}

        </div>

        <!-- Right: Verification & System Metadata -->
        <aside class="detail-sidebar">
          
          <div class="spec-card">
            <span class="b-key">VERIFIED SOURCE CODE</span>
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn-primary" style="width: 100%; display: flex; justify-content: center; margin-top: 14px;">
                <span>INSPECT GITHUB REPO</span> ↗
              </a>
            ` : '<p style="color: var(--text-muted); margin-top: 10px;">Repository currently private.</p>'}

            ${project.demoUrl ? `
              <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn-secondary" style="width: 100%; display: flex; justify-content: center; margin-top: 12px;">
                <span>LAUNCH LIVE DEMO</span> ↗
              </a>
            ` : ''}
          </div>

          <div class="spec-card">
            <span class="b-key">SECURITY & COMPLIANCE</span>
            <ul class="spec-checklist">
              <li><span class="check-icon">✓</span> Zero cross-tenant data leakage</li>
              <li><span class="check-icon">✓</span> Cryptographically verified claims</li>
              <li><span class="check-icon">✓</span> Transactional ACID safety</li>
              <li><span class="check-icon">✓</span> 100% Verified public codebase</li>
            </ul>
          </div>

          <div class="spec-card">
            <span class="b-key">SYSTEM ARCHITECT</span>
            <h4 style="font-family: var(--font-display); color: #fff; font-size: 1.1rem; margin-top: 6px;">Waleed Rajpoot</h4>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px;">Independent Software Engineer & Product Architect</p>
          </div>

        </aside>

      </div>

    </div>
  `;
}