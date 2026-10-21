/**
 * ARTRAW — Creative / Technology
 * Editorial studio notes preview with staggered reveals.
 * Real creative work data from src/data/portfolio.js.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealOnEnter } from '../utils/scroll.js';
import { asset } from '../utils/helpers.js';
import { creativeWorks } from '../data/portfolio.js';

gsap.registerPlugin(ScrollTrigger);

export function createCreativePreview() {
  const section = document.createElement('section');
  section.className = 'section creative-preview';
  section.id = 'creative';
  section.setAttribute('aria-labelledby', 'creative-title');

  section.innerHTML = `
    <div class="container">
      <header class="creative-header reveal">
        <span class="creative-label reveal" data-scramble>Creative / technology</span>
        <h2 id="creative-title" class="creative-title reveal">How the work shows up</h2>
        <p class="creative-description reveal">
          Directions tied to real ARTRAW projects. Visuals here are original marks for those
          projects — not stock case studies and not unpublished client campaigns.
        </p>
      </header>

      <div class="creative-grid" role="list" aria-label="Creative works">
        ${creativeWorks.map((work) => `
          <article class="creative-item reveal" role="listitem" data-accent="${work.accent}">
            <div class="creative-poster-thumb-wrap">
              <img src="${asset(work.image)}" alt="${work.title} Visual Poster" class="creative-poster-thumb-img" loading="lazy" decoding="async" width="${work.aspect === 'portrait' ? 600 : work.aspect === 'landscape' ? 800 : 600}" height="${work.aspect === 'portrait' ? 800 : work.aspect === 'landscape' ? 600 : 600}" />
              <div class="creative-thumb-overlay"></div>
              <span class="creative-mark-badge">${work.mark}</span>
            </div>
            <div class="creative-copy">
              <p class="project-kicker">${work.kind}</p>
              <h3 class="creative-item-title">${work.title}</h3>
              <p class="creative-item-text">${work.description}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}

export function initCreativePreview(section) {
  if (!section) return { destroy() {} };

  const items = Array.from(section.querySelectorAll('.creative-item'));

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const killReveal = revealOnEnter(items, { once: true, start: 'top 85%', stagger: 0.1 });
    return () => killReveal();
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
      gsap.set(items, { clearProps: 'opacity,transform' });
    },
  };
}
