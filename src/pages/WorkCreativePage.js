import { getIcon } from '../utils/icons.js';
import {
  workProjects,
  workCategories,
  creativeWorks,
  creativeCategories,
  howIWorkSteps,
  buildLabSteps,
  searchProjects,
  searchCreativeWorks,
  getProjectById
} from '../data/portfolio.js';

export function createWorkCreativePage() {
  const section = document.createElement('section');
  section.className = 'work-creative-page';
  section.id = 'work-creative-page';
  section.setAttribute('aria-labelledby', 'wc-page-title');

  const totalProjects = workProjects.length;
  const totalCreative = creativeWorks.length;

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Work & Creative</span>
        <h1 id="wc-page-title" class="section-title">Project Laboratory</h1>
        <p class="section-description">
          ${totalProjects} technical projects • ${totalCreative} creative works.
          Explore the systems built, experiments run, and craft refined.
        </p>
      </header>

      <nav class="wc-tabs reveal reveal-delay-1" role="tablist" aria-label="Work Creative sections">
        <button role="tab" class="wc-tab active" data-tab="work" aria-selected="true" aria-controls="panel-work">
          ${getIcon('cpu')} Work
        </button>
        <button role="tab" class="wc-tab" data-tab="creative" aria-selected="false" aria-controls="panel-creative">
          ${getIcon('palette')} Creative Studio
        </button>
        <button role="tab" class="wc-tab" data-tab="process" aria-selected="false" aria-controls="panel-process">
          ${getIcon('git-branch')} How I Work
        </button>
        <button role="tab" class="wc-tab" data-tab="lab" aria-selected="false" aria-controls="panel-lab">
          ${getIcon('flask')} Build Lab
        </button>
      </nav>

      <div class="wc-tab-panels">
        <div role="tabpanel" id="panel-work" class="wc-panel active" aria-labelledby="work-heading">
          ${renderWorkPanel()}
        </div>
        <div role="tabpanel" id="panel-creative" class="wc-panel" aria-labelledby="creative-heading" hidden>
          ${renderCreativePanel()}
        </div>
        <div role="tabpanel" id="panel-process" class="wc-panel" aria-labelledby="process-heading" hidden>
          ${renderProcessPanel()}
        </div>
        <div role="tabpanel" id="panel-lab" class="wc-panel" aria-labelledby="lab-heading" hidden>
          ${renderLabPanel()}
        </div>
      </div>
    </div>

    <div class="project-modal-overlay" id="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" hidden>
      <div class="project-modal" role="document">
        <button class="modal-close" aria-label="Close project">${getIcon('close')}</button>
        <div class="modal-content" id="project-modal-content"></div>
      </div>
    </div>

    <div class="lightbox-overlay" id="lightbox" role="dialog" aria-modal="true" aria-label="Media lightbox" hidden>
      <button class="lightbox-close" aria-label="Close lightbox">${getIcon('close')}</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">${getIcon('chevron-left')}</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">${getIcon('chevron-right')}</button>
      <div class="lightbox-content" id="lightbox-content"></div>
      <div class="lightbox-caption" id="lightbox-caption"></div>
      <div class="lightbox-counter" id="lightbox-counter" aria-live="polite"></div>
    </div>
  `;

  return section;
}

function renderWorkPanel() {
  return `
    <header class="panel-header" id="work-heading">
      <h2 class="panel-title">Technical Projects</h2>
      <p class="panel-description">Systems, platforms, and automation—built to solve specific problems.</p>
    </header>
    <div class="work-toolbar" role="search" aria-label="Project search and filter">
      <div class="search-wrapper">
        ${getIcon('search')}
        <input type="search" id="work-search" class="search-input" placeholder="Search projects… (try \"voice\", \"routing\", \"Android\")" autocomplete="off" aria-label="Search projects">
        <kbd class="search-hint" aria-hidden="true">⌘K</kbd>
      </div>
      <div class="filter-chips" role="group" aria-label="Project categories">
        ${workCategories.map(cat => `
          <button class="filter-chip ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}" aria-pressed="${cat.id === 'all'}">
            ${cat.label}
            <span class="chip-count">${cat.count}</span>
          </button>
        `).join('')}
      </div>
      <div class="results-summary" aria-live="polite">
        <span class="visible-count">${totalProjects}</span> projects visible
      </div>
    </div>
    <div class="project-grid" id="project-grid" role="list" aria-label="Projects">
      ${renderProjectCards(workProjects)}
    </div>
    <div class="no-results" id="work-no-results" hidden aria-live="polite">
      <div class="no-results-content">
        ${getIcon('search')}
        <h3>No projects match</h3>
        <p>Try a different search term or clear filters.</p>
        <button class="btn btn-ghost" id="clear-work-filters">Clear all filters</button>
      </div>
    </div>
  `;
}

function renderCreativePanel() {
  const cats = getAllCategoriesWithCounts();
  return `
    <header class="panel-header" id="creative-heading">
      <h2 class="panel-title">Creative Studio</h2>
      <p class="panel-description">Photography, design, motion, AI-generated, and multimedia craft.</p>
    </header>
    <div class="creative-toolbar" role="search" aria-label="Creative work search and filter">
      <div class="search-wrapper">
        ${getIcon('search')}
        <input type="search" id="creative-search" class="search-input" placeholder="Search creative works… (try \"branding\", \"AI video\", \"thumbnail\")" autocomplete="off" aria-label="Search creative works">
        <kbd class="search-hint" aria-hidden="true">⌘K</kbd>
      </div>
      <div class="filter-chips creative-chips" role="group" aria-label="Creative categories">
        <button class="filter-chip active" data-category="all" aria-pressed="true">
          All <span class="chip-count">${creativeWorks.length}</span>
        </button>
        ${cats.map(cat => `
          <button class="filter-chip" data-category="${cat.id}" aria-pressed="false">
            ${getIcon(cat.icon)}
            ${cat.label}
            <span class="chip-count">${cat.count}</span>
          </button>
        `).join('')}
      </div>
      <div class="view-toggle" role="group" aria-label="View mode">
        <button class="view-btn active" data-view="grid" aria-pressed="true" title="Grid view">${getIcon('grid')}</button>
        <button class="view-btn" data-view="masonry" aria-pressed="false" title="Masonry view">${getIcon('layout')}</button>
      </div>
    </div>
    <div class="creative-grid" id="creative-grid" role="list" aria-label="Creative works" data-view="grid">
      ${renderCreativeCards(creativeWorks)}
    </div>
    <div class="no-results" id="creative-no-results" hidden aria-live="polite">
      <div class="no-results-content">
        ${getIcon('search')}
        <h3>No works match</h3>
        <p>Try a different search term or clear filters.</p>
        <button class="btn btn-ghost" id="clear-creative-filters">Clear all filters</button>
      </div>
    </div>
  `;
}

function renderProcessPanel() {
  return `
    <header class="panel-header" id="process-heading">
      <h2 class="panel-title">How I Work</h2>
      <p class="panel-description">A repeatable flow from problem to delivery. Each step has gates, not guesswork.</p>
    </header>
    <div class="process-flow" id="process-flow">
      ${howIWorkSteps.map((step, i) => `
        <article class="process-step reveal reveal-delay-${i + 1}" data-step="${step.number}">
          <div class="step-marker">
            <span class="step-number">${step.number}</span>
            <div class="step-connector" aria-hidden="true"></div>
          </div>
          <div class="step-content">
            <div class="step-icon" aria-hidden="true">${getIcon(step.icon)}</div>
            <h3 class="step-title">${step.title}</h3>
            <p class="step-description">${step.description}</p>
            <details class="step-details">
              <summary>Details</summary>
              <ul>
                ${step.details.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </details>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderLabPanel() {
  return `
    <header class="panel-header" id="lab-heading">
      <h2 class="panel-title">ARTRAW Build Lab</h2>
      <p class="panel-description">How experiments become systems. Terminal-native workflow. Measurable gates.</p>
    </header>
    <div class="lab-flow" id="lab-flow">
      ${buildLabSteps.map((step, i) => `
        <article class="lab-step reveal reveal-delay-${i + 1}" data-step="${step.number}">
          <div class="lab-step-header">
            <div class="lab-step-icon" aria-hidden="true">${getIcon(step.icon)}</div>
            <div>
              <span class="lab-step-number">${step.number}</span>
              <h3 class="lab-step-title">${step.title}</h3>
            </div>
            <code class="lab-command" data-command="${escapeHtml(step.command)}">${escapeHtml(step.command)}</code>
          </div>
          <p class="lab-step-description">${step.description}</p>
        </article>
      `).join('')}
    </div>
    <div class="lab-terminal-demo" aria-label="Build Lab terminal demonstration">
      <div class="terminal" role="img" aria-label="Build Lab command sequence">
        <div class="terminal-header">
          <div class="terminal-dots">
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
          </div>
          <span class="terminal-title">artraw-lab ~ $</span>
        </div>
        <div class="terminal-body" id="lab-terminal-body">
          <div class="terminal-line">
            <span class="terminal-prompt">$</span>
            <span class="terminal-command"> lab init --idea "On-device voice AI" --criteria "Offline, <200ms latency"</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-output">[✓] Idea recorded: lab/ideas/voice-ai-001.md</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-prompt">$</span>
            <span class="terminal-command"> lab spike --target "STT latency" --stack "Whisper.cpp + Piper"</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-output">[✓] Spike complete: 180ms p95 on Pixel 8</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-prompt">$</span>
            <span class="terminal-command"> lab build --from "spike/voice-ai" --strict --test --doc</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-output">[✓] Types: pass | Tests: 47/47 | Coverage: 83%</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-prompt">$</span>
            <span class="terminal-command"> lab verify --env staging --canary 5% --monitor 30m</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-output">[✓] Canary healthy | Latency p99: 195ms | Error rate: 0%</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-prompt">$</span>
            <span class="terminal-command"> lab improve --metrics "latency,errors" --retro --next-cycle<span class="terminal-cursor" aria-hidden="true"></span></span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProjectCards(projects) {
  return projects.map((project, index) => `
    <article class="project-card reveal reveal-delay-${(index % 6) + 1}" role="listitem" data-project-id="${project.id}" tabindex="0">
      <div class="project-card-header">
        <span class="project-category" style="--accent-color: var(--color-accent-${project.accent});">${project.category}</span>
        <span class="project-status">${getStatusBadge(project.currentStatus)}</span>
      </div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-tagline">${project.tagline}</p>
      <div class="project-tech" aria-label="Technologies">
        ${project.tags.slice(0, 4).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        ${project.tags.length > 4 ? `<span class="tech-tag more">+${project.tags.length - 4}</span>` : ''}
      </div>
      <div class="project-card-footer">
        <button class="btn btn-primary btn-sm project-detail-btn" data-project-id="${project.id}">
          View Details
          ${getIcon('arrowRight')}
        </button>
        <div class="project-links">
          ${project.links.github ? `<a href="${project.links.github}" class="project-link" aria-label="GitHub" target="_blank" rel="noopener">${getIcon('github')}</a>` : ''}
          ${project.links.demo ? `<a href="${project.links.demo}" class="project-link" aria-label="Demo" target="_blank" rel="noopener">${getIcon('external')}</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');
}

function renderCreativeCards(works) {
  return works.map((work, index) => `
    <article class="creative-card reveal reveal-delay-${(index % 8) + 1}" role="listitem" data-work-id="${work.id}" tabindex="0" data-media-type="${work.mediaType}">
      <div class="creative-card-media" style="--media-type: ${work.mediaType};">
        ${work.mediaType === 'video' ? `
          <video class="creative-media" src="${work.mediaUrl}" poster="${work.posterUrl || work.thumbUrl}" muted playsinline preload="metadata" aria-hidden="true"></video>
          <button class="play-overlay" aria-label="Play video preview">${getIcon('play')}</button>
        ` : `
          <img class="creative-media" src="${work.thumbUrl}" alt="${escapeHtml(work.title)}" loading="lazy" width="400" height="300">
        `}
        <div class="creative-card-overlay">
          <button class="btn btn-primary btn-sm lightbox-trigger" data-work-id="${work.id}" aria-label="View full size">
            ${getIcon('maximize2')}
            View
          </button>
        </div>
      </div>
      <div class="creative-card-info">
        <h3 class="creative-card-title">${work.title}</h3>
        <div class="creative-card-meta">
          <span class="creative-year">${work.year}</span>
          <div class="creative-categories">
            ${work.categories.slice(0, 3).map(c => `<span class="cat-pill">${formatCategory(c)}</span>`).join('')}
            ${work.categories.length > 3 ? `<span class="cat-pill more">+${work.categories.length - 3}</span>` : ''}
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function getStatusBadge(status) {
  if (status.includes('Launched') || status.includes('operational')) return '<span class="status-badge status-live">Live</span>';
  if (status.includes('Prototype') || status.includes('prototype')) return '<span class="status-badge status-prototype">Prototype</span>';
  if (status.includes('Active development') || status.includes('Active')) return '<span class="status-badge status-active">Active</span>';
  return '<span class="status-badge status-experiment">Experiment</span>';
}

function formatCategory(cat) {
  return cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getAllCategoriesWithCounts() {
  const counts = {};
  creativeWorks.forEach(w => w.categories.forEach(c => counts[c] = (counts[c] || 0) + 1));
  return creativeCategories.map(cat => ({ ...cat, count: counts[cat.id] || 0 })).filter(c => c.count > 0);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

export function initWorkCreativePage(pageElement) {
  const tabs = pageElement.querySelectorAll('.wc-tab');
  const panels = pageElement.querySelectorAll('.wc-panel');

  // Work panel elements
  const workSearch = pageElement.querySelector('#work-search');
  const workFilterChips = pageElement.querySelectorAll('#panel-work .filter-chip');
  const workGrid = pageElement.querySelector('#project-grid');
  const workNoResults = pageElement.querySelector('#work-no-results');
  const workVisibleCount = pageElement.querySelector('#panel-work .visible-count');
  const clearWorkFilters = pageElement.querySelector('#clear-work-filters');

  // Creative panel elements
  const creativeSearch = pageElement.querySelector('#creative-search');
  const creativeFilterChips = pageElement.querySelectorAll('#panel-creative .filter-chip');
  const creativeViewBtns = pageElement.querySelectorAll('.view-btn');
  const creativeGrid = pageElement.querySelector('#creative-grid');
  const creativeNoResults = pageElement.querySelector('#creative-no-results');
  const clearCreativeFilters = pageElement.querySelector('#clear-creative-filters');

  // Modals
  const projectModal = pageElement.querySelector('#project-modal');
  const projectModalContent = pageElement.querySelector('#project-modal-content');
  const lightbox = pageElement.querySelector('#lightbox');
  const lightboxContent = pageElement.querySelector('#lightbox-content');
  const lightboxCaption = pageElement.querySelector('#lightbox-caption');
  const lightboxCounter = pageElement.querySelector('#lightbox-counter');
  const lightboxClose = pageElement.querySelector('.lightbox-close');
  const lightboxPrev = pageElement.querySelector('.lightbox-prev');
  const lightboxNext = pageElement.querySelector('.lightbox-next');

  let currentWorkCategory = 'all';
  let workSearchQuery = '';
  let currentCreativeCategory = 'all';
  let creativeSearchQuery = '';
  let creativeViewMode = 'grid';
  let lightboxItems = [];
  let lightboxIndex = 0;

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      tabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab);
      });
      panels.forEach(p => {
        const isActive = p.id === `panel-${tabId}`;
        p.classList.toggle('active', isActive);
        p.hidden = !isActive;
      });
      initRevealAnimations(pageElement.querySelector(`#panel-${tabId}`));
    });
  });

  // Work filtering
  function filterWork() {
    let projects = searchProjects(workSearchQuery);
    if (currentWorkCategory !== 'all') {
      projects = projects.filter(p => p.category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-') === currentWorkCategory);
    }
    renderWorkGrid(projects);
    workVisibleCount.textContent = projects.length;
    workNoResults.hidden = projects.length > 0;
    workGrid.hidden = projects.length === 0;
  }

  function renderWorkGrid(projects) {
    workGrid.innerHTML = renderProjectCards(projects);
    attachProjectCardListeners();
    initRevealAnimations(workGrid);
  }

  function attachProjectCardListeners() {
    workGrid.querySelectorAll('.project-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(btn.dataset.projectId);
      });
    });
    workGrid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(card.dataset.projectId);
        }
      });
    });
  }

  // Creative filtering
  function filterCreative() {
    let works = searchCreativeWorks(creativeSearchQuery);
    if (currentCreativeCategory !== 'all') {
      works = works.filter(w => w.categories.includes(currentCreativeCategory));
    }
    renderCreativeGrid(works);
    creativeNoResults.hidden = works.length > 0;
    creativeGrid.hidden = works.length === 0;
  }

  function renderCreativeGrid(works) {
    creativeGrid.innerHTML = renderCreativeCards(works);
    attachCreativeCardListeners();
    initRevealAnimations(creativeGrid);
  }

  function attachCreativeCardListeners() {
    creativeGrid.querySelectorAll('.lightbox-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(btn.dataset.workId);
      });
    });
    creativeGrid.querySelectorAll('.creative-card').forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(card.dataset.workId);
        }
      });
      // Video preview on hover (desktop only)
      if (!window.matchMedia('(hover: none)').matches) {
        const video = card.querySelector('video');
        if (video) {
          card.addEventListener('mouseenter', () => video.play().catch(() => {}));
          card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
        }
      }
    });
  }

  // View mode toggle
  creativeViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      creativeViewMode = btn.dataset.view;
      creativeViewBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });
      creativeGrid.dataset.view = creativeViewMode;
    });
  });

  // Project modal
  function openProjectModal(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;

    projectModalContent.innerHTML = renderProjectModal(project);
    projectModal.hidden = false;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      projectModal.classList.add('visible');
      projectModalContent.querySelector('.modal-panel').focus();
    });

    attachProjectModalListeners();
  }

  function closeProjectModal() {
    projectModal.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => {
      projectModal.hidden = true;
      projectModalContent.innerHTML = '';
    }, 300);
  }

  function attachProjectModalListeners() {
    const panel = projectModalContent.querySelector('.modal-panel');
    const closeBtn = projectModalContent.querySelector('.modal-close');

    closeBtn?.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });

    const handleKeydown = (e) => {
      if (e.key === 'Escape') { closeProjectModal(); document.removeEventListener('keydown', handleKeydown); }
      if (e.key === 'Tab') trapFocus(e, panel);
    };
    document.addEventListener('keydown', handleKeydown);
  }

  function renderProjectModal(project) {
    return `
      <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" tabindex="0">
        <button class="modal-close" aria-label="Close">${getIcon('close')}</button>
        <div class="modal-header">
          <span class="modal-category" style="color: var(--color-accent-${project.accent});">${project.category}</span>
          <h2 id="project-modal-title" class="modal-title">${project.title}</h2>
          <p class="modal-tagline">${project.tagline}</p>
        </div>
        <div class="modal-body">
          <section class="modal-section">
            <h3>Problem</h3>
            <p>${project.problem}</p>
          </section>
          <section class="modal-section">
            <h3>Concept</h3>
            <p>${project.concept}</p>
          </section>
          <section class="modal-section">
            <h3>Technology</h3>
            <div class="tech-groups">
              ${Object.entries(project.technology).map(([group, tags]) => `
                <div class="tech-group">
                  <h4>${group.charAt(0).toUpperCase() + group.slice(1)}</h4>
                  <div class="tech-tags">${tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                </div>
              `).join('')}
            </div>
          </section>
          <section class="modal-section">
            <h3>What Was Built</h3>
            <ul class="modal-list">${project.whatWasBuilt.map(item => `<li>${item}</li>`).join('')}</ul>
          </section>
          <section class="modal-section">
            <h3>Experimented With</h3>
            <ul class="modal-list">${project.experimentedWith.map(item => `<li>${item}</li>`).join('')}</ul>
          </section>
          <section class="modal-section">
            <h3>Current Status</h3>
            <p>${project.currentStatus}</p>
          </section>
        </div>
        <div class="modal-footer">
          ${project.links.github ? `<a href="${project.links.github}" class="btn btn-secondary" target="_blank" rel="noopener">${getIcon('github')} Code</a>` : ''}
          ${project.links.demo ? `<a href="${project.links.demo}" class="btn btn-ghost" target="_blank" rel="noopener">${getIcon('external')} Demo</a>` : ''}
          <button class="btn btn-ghost modal-close-btn">Close</button>
        </div>
      </div>
    `;
  }

  // Lightbox
  function openLightbox(workId) {
    const filteredWorks = getFilteredCreativeWorks();
    lightboxItems = filteredWorks;
    lightboxIndex = lightboxItems.findIndex(w => w.id === workId);
    if (lightboxIndex === -1) return;
    showLightboxItem(lightboxIndex);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lightbox.classList.add('visible'));
    document.addEventListener('keydown', handleLightboxKeydown);
  }

  function getFilteredCreativeWorks() {
    let works = searchCreativeWorks(creativeSearchQuery);
    if (currentCreativeCategory !== 'all') {
      works = works.filter(w => w.categories.includes(currentCreativeCategory));
    }
    return works;
  }

  function showLightboxItem(index) {
    const work = lightboxItems[index];
    lightboxIndex = index;
    lightboxCounter.textContent = `${index + 1} / ${lightboxItems.length}`;

    if (work.mediaType === 'video') {
      lightboxContent.innerHTML = `
        <video class="lightbox-media" src="${work.mediaUrl}" poster="${work.posterUrl || work.thumbUrl}" controls preload="metadata" playsinline></video>
      `;
    } else {
      lightboxContent.innerHTML = `
        <img class="lightbox-media" src="${work.mediaUrl}" alt="${escapeHtml(work.title)}" loading="eager">
      `;
    }
    lightboxCaption.innerHTML = `
      <h3>${escapeHtml(work.title)}</h3>
      <p>${escapeHtml(work.description)}</p>
      <div class="lightbox-meta">
        <span>${work.year}</span>
        <span>${work.tools.slice(0, 5).join(' • ')}</span>
      </div>
    `;
  }

  function closeLightbox() {
    lightbox.classList.remove('visible');
    document.body.style.overflow = '';
    lightboxContent.innerHTML = '';
    lightboxCaption.innerHTML = '';
    lightboxCounter.textContent = '';
    lightboxItems = [];
    lightboxIndex = 0;
    setTimeout(() => lightbox.hidden = true, 300);
    document.removeEventListener('keydown', handleLightboxKeydown);
  }

  function handleLightboxKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxItem((lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length);
    if (e.key === 'ArrowRight') showLightboxItem((lightboxIndex + 1) % lightboxItems.length);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lightboxPrev.addEventListener('click', () => showLightboxItem((lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length));
  lightboxNext.addEventListener('click', () => showLightboxItem((lightboxIndex + 1) % lightboxItems.length));

  // Search handlers
  workSearch.addEventListener('input', (e) => { workSearchQuery = e.target.value.trim(); filterWork(); });
  creativeSearch.addEventListener('input', (e) => { creativeSearchQuery = e.target.value.trim(); filterCreative(); });

  // Filter chips
  workFilterChips.forEach(chip => chip.addEventListener('click', () => {
    currentWorkCategory = chip.dataset.category;
    workFilterChips.forEach(c => { c.classList.toggle('active', c.dataset.category === currentWorkCategory); c.setAttribute('aria-pressed', c.dataset.category === currentWorkCategory); });
    filterWork();
  }));

  creativeFilterChips.forEach(chip => chip.addEventListener('click', () => {
    currentCreativeCategory = chip.dataset.category;
    creativeFilterChips.forEach(c => { c.classList.toggle('active', c.dataset.category === currentCreativeCategory); c.setAttribute('aria-pressed', c.dataset.category === currentCreativeCategory); });
    filterCreative();
  }));

  // Clear filters
  clearWorkFilters.addEventListener('click', () => {
    workSearch.value = ''; workSearchQuery = ''; currentWorkCategory = 'all';
    workFilterChips.forEach(c => { c.classList.toggle('active', c.dataset.category === 'all'); c.setAttribute('aria-pressed', c.dataset.category === 'all'); });
    workSearch.focus(); filterWork();
  });

  clearCreativeFilters.addEventListener('click', () => {
    creativeSearch.value = ''; creativeSearchQuery = ''; currentCreativeCategory = 'all';
    creativeFilterChips.forEach(c => { c.classList.toggle('active', c.dataset.category === 'all'); c.setAttribute('aria-pressed', c.dataset.category === 'all'); });
    creativeSearch.focus(); filterCreative();
  });

  // Global search shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const activePanel = pageElement.querySelector('.wc-panel.active');
      if (activePanel?.id === 'panel-work') workSearch.focus();
      else if (activePanel?.id === 'panel-creative') creativeSearch.focus();
    }
  });

  // Copy command on click
  pageElement.querySelectorAll('.lab-command').forEach(cmd => {
    cmd.addEventListener('click', async () => {
      await navigator.clipboard.writeText(cmd.dataset.command);
      const original = cmd.textContent;
      cmd.textContent = 'Copied!';
      setTimeout(() => cmd.textContent = original, 1500);
    });
    cmd.title = 'Click to copy';
  });

  // Lab terminal animation
  const labTerminalBody = pageElement.querySelector('#lab-terminal-body');
  if (labTerminalBody && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateLabTerminal(labTerminalBody);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(labTerminalBody);
  }

  // Initial renders
  filterWork();
  filterCreative();

  return {
    destroy: () => {
      document.removeEventListener('keydown', handleLightboxKeydown);
    }
  };
}

function animateLabTerminal(terminalBody) {
  const lines = terminalBody.querySelectorAll('.terminal-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(10px)';
    setTimeout(() => {
      line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, i * 300);
  });
}

function initRevealAnimations(container) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px' });
  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function trapFocus(e, panel) {
  const focusable = panel.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}