import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIcon } from '../utils/icons.js';
import { asset } from '../utils/helpers.js';
import { workProjects, creativeWorks, howIWorkSteps, getProjectById } from '../data/portfolio.js';

gsap.registerPlugin(ScrollTrigger);

export function createWorkPage() {
  const section = document.createElement('section');
  section.className = 'work-page cinematic-page';
  section.setAttribute('data-progress-line', '');
  section.setAttribute('aria-labelledby', 'work-page-title');

  section.innerHTML = `
    <div class="container">
      <header class="work-hero reveal">
        <span class="work-kicker reveal">Selected work</span>
        <h1 id="work-page-title" class="work-title reveal" data-words data-parallax="0.08"Projects</h1>
        <p class="work-description reveal" data-scrub-words>
          Lucy AI, ARTRAW OS, Artfiles, OpenClaw / OmniRoute, HF RECORD, RAMART Store, and Ayur Veda Global.
          Authentic systems and codebases built in this practice.
        </p>
      </header>

      <div class="work-gallery" role="list" aria-label="Selected projects">
        ${workProjects.map(project => renderProject(project)).join('')}
      </div>

      <header class="section-header reveal" id="creative-work">
        <span class="section-label reveal">Creative / technology</span>
        <h2 class="section-title reveal" data-words>Studio notes</h2>
      </header>
      <div class="grid grid-3" data-stagger-reveal>
        ${creativeWorks.map(work => `
          <article class="card reveal cinematic-card" data-accent="${work.accent}">
            <div class="creative-card-poster-wrap" data-reveal-clip>
              <img src="${asset(work.image)}" alt="${work.title} Artwork" class="creative-card-poster-img" loading="lazy" decoding="async" width="${work.aspect === 'portrait' ? 600 : work.aspect === 'landscape' ? 800 : 600}" height="${work.aspect === 'portrait' ? 800 : work.aspect === 'landscape' ? 600 : 600}" />
            </div>
            <div class="card-content">
              <p class="project-kicker">${work.kind}</p>
              <h3 class="card-title">${work.title}</h3>
              <p class="card-description">${work.description}</p>
            </div>
          </article>
        `).join('')}
      </div>

      <header class="section-header reveal" id="how-i-work">
        <span class="section-label reveal">Process</span>
        <h2 class="section-title reveal" data-words>How I work</h2>
      </header>
      <ol class="process-grid cinematic-process">
        ${howIWorkSteps.map(step => `
          <li class="process-card reveal cinematic-process-step" data-step="${step.number}">
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
    <dialog class="project-dialog cinematic-dialog" id="project-dialog">
      <div class="project-dialog-body cinematic-dialog-body" id="project-dialog-body"></div>
    </dialog>
  `;

  return section;
}

function renderProject(project) {
  return `
    <article class="work-row cinematic-work-row reveal" id="${project.id}" data-accent="${project.accent}">
      <div class="project-visual-wrap" data-aspect="${project.aspect || 'landscape'}">
        <div class="project-poster-wrapper" data-aspect="${project.aspect || 'landscape'}">
          <img src="${asset(project.image)}" alt="${project.title} Architectural Poster" class="project-card-poster" loading="lazy" decoding="async" width="${project.aspect === 'portrait' ? 600 : project.aspect === 'landscape' ? 800 : 600}" height="${project.aspect === 'portrait' ? 800 : project.aspect === 'landscape' ? 600 : 600}" />
          <div class="project-poster-badge accent-${project.accent}">
            <span class="badge-icon">${getIcon(project.icon || 'layers')}</span>
            <span>${project.category}</span>
          </div>
        </div>
      </div>
      <div class="work-row-copy">
        <p class="project-kicker">${project.category}</p>
        <h2 class="project-title">${project.title}</h2>
        <p class="project-summary">${project.summary}</p>
        <p class="project-status accent-${project.accent}">${project.statusLabel}</p>
        <ul class="tag-list">
          ${project.stack.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="work-row-actions" style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-ghost btn-sm project-notes-btn" data-open-project="${project.id}">
            Project notes ${getIcon('arrowRight')}
          </button>
          ${project.links?.github ? `
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm project-gh-btn">
              ${getIcon('github')} GitHub
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}

export function initWorkPage(page) {
  if (!page) return { destroy() {} };
  const dialog = page.querySelector('#project-dialog');
  const body = page.querySelector('#project-dialog-body');
  const rows = Array.from(page.querySelectorAll('.cinematic-work-row'));
  const posters = page.querySelectorAll('.project-card-poster');

  // GSAP reveal for project rows on enter
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(rows, { opacity: 0, y: 20 });
    rows.forEach((row, i) => {
      ScrollTrigger.create({
        trigger: row,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(row, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out' });
        },
      });
    });

    // Poster hover scale
    rows.forEach((row) => {
      const poster = row.querySelector('.project-card-poster');
      const onEnter = () => {
        if (poster) gsap.to(poster, { scale: 1.04, duration: 0.35, ease: 'power2.out' });
      };
      const onLeave = () => {
        if (poster) gsap.to(poster, { scale: 1, duration: 0.35, ease: 'power2.out' });
      };
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
      row._cleanup = () => {
        row.removeEventListener('mouseenter', onEnter);
        row.removeEventListener('mouseleave', onLeave);
      };
    });
  }

  function open(id) {
    const project = getProjectById(id);
    if (!project || !dialog) return;
    body.innerHTML = `
      <button type="button" class="modal-close" data-close-project aria-label="Close">${getIcon('close')}</button>
      <div class="project-dialog-media" data-aspect="${project.aspect || 'landscape'}" style="margin-bottom: 1rem; border-radius: 8px; overflow: hidden; border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, rgba(255,30,66,0.06), #09090d 70%);">
        <img src="${asset(project.image)}" alt="${project.title}" style="max-width: 100%; max-height: 280px; object-fit: contain;" loading="lazy" decoding="async" width="${project.aspect === 'portrait' ? 400 : project.aspect === 'landscape' ? 600 : 400}" height="${project.aspect === 'portrait' ? 600 : project.aspect === 'landscape' ? 400 : 400}" />
      </div>
      <p class="project-kicker">${project.category}</p>
      <h2 id="project-dialog-title">${project.title}</h2>
      <p>${project.summary}</p>
      <h3>What exists</h3>
      <ul>${project.built.map(item => `<li>${item}</li>`).join('')}</ul>
      <p class="project-status accent-${project.accent}">${project.statusLabel}</p>
      <div class="dialog-actions" style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-top: 1.25rem;">
        <a href="/contact?service=${project.id}" class="btn btn-primary" data-route="true">Start a related project</a>
        ${project.links?.github ? `
          <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            ${getIcon('github')} GitHub Repository
          </a>
        ` : ''}
      </div>
    `;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else {
      gsap.set(dialog, { opacity: 0 });
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        gsap.to(dialog, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      } else {
        dialog.setAttribute('open', '');
        gsap.to(dialog, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      }
    }
  }

  function close() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (dialog?.open && dialog.close) dialog.close();
      else dialog?.removeAttribute('open');
      return;
    }
    gsap.to(dialog, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        if (dialog?.open && dialog.close) dialog.close();
        else dialog?.removeAttribute('open');
      },
    });
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

  return {
    destroy() {
      page.removeEventListener('click', onClick);
      rows.forEach((row) => row._cleanup?.());
      gsap.set(rows, { clearProps: 'opacity,y' });
      gsap.set(posters, { clearProps: 'scale' });
    },
  };
}
