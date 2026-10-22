/**
 * ARTRAW — Portfolio Gallery
 * Asymmetrical project composition with deliberate hover/touch states.
 * Real project data only — no fabricated case studies.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealOnEnter } from '../utils/scroll.js';
import { getIcon } from '../utils/icons.js';
import { asset } from '../utils/helpers.js';
import { workProjects } from '../data/portfolio.js';

gsap.registerPlugin(ScrollTrigger);

export function createWorkPreview() {
  const section = document.createElement('section');
  section.className = 'section portfolio-gallery';
  section.id = 'work';
  section.setAttribute('aria-labelledby', 'work-title');

  const featured = workProjects.slice(0, 6);

  section.innerHTML = `
    <div class="container">
      <header class="gallery-header reveal">
        <span class="gallery-label reveal" data-scramble>Selected projects</span>
        <h2 id="work-title" class="gallery-title reveal" data-words>Work that exists</h2>
        <p class="gallery-description reveal">
          Real projects from this practice. Status is stated as it is — no invented clients,
          launch numbers, or testimonials.
        </p>
      </header>

      <div class="gallery-grid" role="list" aria-label="Selected projects" data-stagger-reveal>
        ${featured.map((project) => `
          <article class="gallery-item reveal" role="listitem" data-accent="${project.accent}">
            <div class="project-visual-wrap" data-aspect="${project.aspect || 'landscape'}">
              <div class="project-poster-wrapper" data-aspect="${project.aspect || 'landscape'}">
                <img src="${asset(project.image)}" alt="${project.title} Architectural Poster" class="project-card-poster" loading="lazy" decoding="async" width="${project.aspect === 'portrait' ? 600 : project.aspect === 'landscape' ? 800 : 600}" height="${project.aspect === 'portrait' ? 800 : project.aspect === 'landscape' ? 600 : 600}" />
                <div class="project-poster-badge accent-${project.accent}">
                  <span class="badge-icon">${getIcon(project.icon || 'layers')}</span>
                  <span>${project.category}</span>
                </div>
              </div>
              <div class="project-overlay" aria-hidden="true"></div>
            </div>
            <div class="gallery-copy">
              <p class="project-kicker">${project.category}</p>
              <h3 class="gallery-title">${project.title}</h3>
              <p class="project-tagline">${project.tagline}</p>
              <span class="project-status accent-${project.accent}">${project.statusLabel}</span>
              <a href="/work#${project.id}" class="btn btn-ghost btn-sm" data-route="true" data-project="${project.id}">
                View project ${getIcon('arrowRight')}
              </a>
            </div>
          </article>
        `).join('')}
      </div>

      <div class="gallery-cta reveal">
        <a href="/work" class="btn btn-secondary btn-lg" data-route="true">View all work</a>
      </div>
    </div>
  `;

  return section;
}

export function initPortfolioGallery(section) {
  if (!section) return { destroy() {} };

  const items = Array.from(section.querySelectorAll('.gallery-item'));
  const posters = section.querySelectorAll('.project-card-poster');

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const mm = gsap.matchMedia();

  const hoverHandlers = items.map((item) => {
    const poster = item.querySelector('.project-card-poster');
    const overlay = item.querySelector('.project-overlay');
    const onEnter = () => {
      if (poster) gsap.to(poster, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 0.15, duration: 0.3 });
    };
    const onLeave = () => {
      if (poster) gsap.to(poster, { scale: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
    };
    const onTouchStart = () => {
      if (poster) gsap.to(poster, { scale: 1.03, duration: 0.2 });
    };
    const onTouchEnd = () => {
      if (poster) gsap.to(poster, { scale: 1, duration: 0.2 });
    };

    item.addEventListener('mouseenter', onEnter);
    item.addEventListener('mouseleave', onLeave);
    item.addEventListener('touchstart', onTouchStart, { passive: true });
    item.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      item.removeEventListener('mouseenter', onEnter);
      item.removeEventListener('mouseleave', onLeave);
      item.removeEventListener('touchstart', onTouchStart);
      item.removeEventListener('touchend', onTouchEnd);
    };
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const killReveal = revealOnEnter(items, { once: true, start: 'top 82%', stagger: 0.1 });
    return () => {
      killReveal();
      hoverHandlers.forEach((h) => h());
    };
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    items.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
    return () => {};
  });

  return {
    destroy() {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      hoverHandlers.forEach((h) => h());
      gsap.set(items, { clearProps: 'opacity,transform' });
      gsap.set(posters, { clearProps: 'scale' });
    },
  };
}
