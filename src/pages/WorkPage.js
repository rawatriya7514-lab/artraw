import { getIcon } from '../utils/icons.js';
import { workProjects, creativeWorks, howIWorkSteps, getProjectById } from '../data/portfolio.js';

export function createWorkPage() {
  const section = document.createElement('section');
  section.className = 'work-page section';
  section.setAttribute('aria-labelledby', 'work-page-title');

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Selected work</span>
        <h1 id="work-page-title" class="section-title">Projects</h1>
        <p class="section-description">
          Lucy AI, OpenClaw / OmniRoute, Zafiro, Ayur Veda Global, HF RECORD, and this ARTRAW site.
          Only work that exists in this practice. No client metrics.
        </p>
      </header>
      <div class="project-list" id="project-list">
        ${workProjects.map(project => renderProject(project)).join('')}
      </div>
      <header class="section-header reveal" id="creative-work">
        <span class="section-label">Creative / technology</span>
        <h2 class="section-title">Studio notes</h2>
      </header>
      <div class="grid grid-3">
        ${creativeWorks.map(work => `
          <article class="card reveal">
            <div class="project-visual project-visual-${work.accent}" aria-hidden="true"><span>${work.mark}</span></div>
            <div class="card-content">
              <p class="project-kicker">${work.kind}</p>
              <h3 class="card-title">${work.title}</h3>
              <p class="card-description">${work.description}</p>
            </div>
          </article>
        `).join('')}
      </div>
      <header class="section-header reveal" id="how-i-work">
        <span class="section-label">Process</span>
        <h2 class="section-title">How I work</h2>
      </header>
      <ol class="process-grid">
        ${howIWorkSteps.map(step => `
          <li class="process-card reveal">
            <span class="process-num">${step.number}</span>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </li>
        `).join('')}
      </ol>
      <div class="section-cta reveal">
        <a href="/contact" class="btn btn-primary btn-lg" data-route="true">Start a Project</a>
      </div>
    </div>
    <dialog class="project-dialog" id="project-dialog">
      <div class="project-dialog-body" id="project-dialog-body"></div>
    </dialog>
  `;

  return section;
}

function renderProject(project) {
  return `
    <article class="work-row reveal" id="${project.id}">
      <div class="project-visual project-visual-${project.accent}" aria-hidden="true"><span>${project.mark}</span></div>
      <div>
        <p class="project-kicker">${project.category}</p>
        <h2>${project.title}</h2>
        <p>${project.summary}</p>
        <p class="project-status">${project.statusLabel}</p>
        <ul class="tag-list">
          ${project.stack.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button type="button" class="btn btn-ghost" data-open-project="${project.id}">
          Project notes ${getIcon('arrowRight')}
        </button>
      </div>
    </article>
  `;
}

export function initWorkPage(page) {
  if (!page) return { destroy() {} };
  const dialog = page.querySelector('#project-dialog');
  const body = page.querySelector('#project-dialog-body');

  function open(id) {
    const project = getProjectById(id);
    if (!project || !dialog) return;
    body.innerHTML = `
      <button type="button" class="modal-close" data-close-project aria-label="Close">${getIcon('close')}</button>
      <p class="project-kicker">${project.category}</p>
      <h2 id="project-dialog-title">${project.title}</h2>
      <p>${project.summary}</p>
      <h3>What exists</h3>
      <ul>${project.built.map(item => `<li>${item}</li>`).join('')}</ul>
      <p class="project-status">${project.statusLabel}</p>
      <a href="/contact" class="btn btn-primary" data-route="true">Start a related project</a>
    `;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function close() {
    if (dialog?.open && dialog.close) dialog.close();
    else dialog?.removeAttribute('open');
  }

  function onClick(e) {
    const openBtn = e.target.closest('[data-open-project]');
    if (openBtn) open(openBtn.dataset.openProject);
    if (e.target.closest('[data-close-project]')) close();
  }

  page.addEventListener('click', onClick);
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  dialog?.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });

  return { destroy() { page.removeEventListener('click', onClick); } };
}
