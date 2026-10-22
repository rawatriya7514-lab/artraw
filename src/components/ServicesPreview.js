/**
 * ARTRAW — Services Preview
 * Clear service hierarchy with staggered reveals & interactive 3D cards.
 * Responsive for both PC and Android mobile.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealOnEnter } from '../utils/scroll.js';
import { getIcon } from '../utils/icons.js';

const services = [
  { icon: 'cpu', title: 'Autonomous AI & Agents', text: 'On-device LLMs, autonomous Termux workflows, and intelligent mobile routing.' },
  { icon: 'globe', title: 'Website Engineering', text: 'Ultra-fast Vite ES web applications, interactive landing pages, and web tooling.' },
  { icon: 'palette', title: 'Graphic & Identity', text: 'Brand systems, logos, typography, composites, and high-impact visual design.' },
  { icon: 'film', title: 'Cinematic Video & Reels', text: 'Cinematic editing, YouTube production, shorts, and narrative motion graphics.' },
  { icon: 'sparkles', title: 'AI Video & Motion', text: 'Generative AI visual workflows, synthetic media, and product films.' },
  { icon: 'box', title: '3D & Creative Tech', text: 'WebGL, 3D visual concepts, motion graphics, and interactive experiments.' },
  { icon: 'youtube', title: 'Social & Channel Systems', text: 'Thumbnails, visual identities, and multi-platform media strategy.' },
  { icon: 'music', title: 'Music & Release Visuals', text: 'Album artwork, artist branding, visualizers, and stage visual design.' },
  { icon: 'zap', title: 'Automation Pipelines', text: 'End-to-end task automation, web scraping, data pipelines, and CLI tooling.' },
  { icon: 'brain', title: 'Custom AI Assistants', text: 'Task-specific assistant agents, memory orchestration, and prompt engineering.' },
  { icon: 'image', title: 'Photo Retouching & Art', text: 'High-end color grading, commercial retouching, and photographic art.' },
  { icon: 'badge', title: 'Documentation & Strategy', text: 'Technical specification, architecture diagrams, and structured briefs.' },
];

gsap.registerPlugin(ScrollTrigger);

export function createServicesPreview() {
  const section = document.createElement('section');
  section.className = 'section services-preview';
  section.id = 'services';
  section.setAttribute('aria-labelledby', 'services-title');

  section.innerHTML = `
    <div class="container">
      <header class="service-header reveal">
        <div class="service-badge-pill">
          <span class="pill-dot"></span>
          <span>CAPABILITIES & DISCIPLINE</span>
        </div>
        <h2 id="services-title" class="service-title reveal" data-words>What ARTRAW Builds</h2>
        <p class="service-description reveal">
          From autonomous mobile AI systems to award-winning creative direction.
          Explore capabilities designed for high performance.
        </p>
      </header>

      <div class="service-grid" role="list" aria-label="Service preview" data-stagger-reveal>
        ${services.map((service, index) => `
          <article class="service-item reveal" role="listitem" data-index="${index}">
            <div class="service-item-glass">
              <div class="service-card-top-bar">
                <div class="service-visual" aria-hidden="true">${getIcon(service.icon)}</div>
                <span class="service-index-tag">0${index < 9 ? '0' : ''}${index + 1} // SPEC</span>
              </div>
              <div class="service-copy">
                <h3 class="service-item-title">${service.title}</h3>
                <p class="service-item-text">${service.text}</p>
              </div>
              <div class="service-card-footer">
                <span class="service-pill-tag"><span class="pill-dot-sm"></span> ACTIVE</span>
                <a href="/services" class="btn btn-ghost btn-sm service-link" data-route="true">
                  Explore Spec ${getIcon('arrowRight')}
                </a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>

      <div class="service-cta reveal">
        <a href="/services" class="btn btn-primary btn-lg" data-route="true" data-magnetic>
          Browse Full Catalog & Rates
          ${getIcon('arrowRight')}
        </a>
      </div>
    </div>
  `;

  return section;
}

export function initServicesPreview(section) {
  if (!section || typeof window === 'undefined') return { destroy() {} };

  const items = Array.from(section.querySelectorAll('.service-item'));
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const cleanups = [];

  if (!prefersReduced) {
    const killReveal = revealOnEnter(items, { once: true, start: 'top 85%', stagger: 0.05 });
    cleanups.push(killReveal);

    // 3D Tilt on Desktop
    if (isDesktop) {
      items.forEach((item) => {
        const card = item.querySelector('.service-item-glass');
        if (!card) return;

        const onMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotateX = -(y / rect.height) * 12;
          const rotateY = (x / rect.width) * 12;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        };

        const onMouseLeave = () => {
          card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
          card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        };

        const onMouseEnter = () => {
          card.style.transition = 'none';
        };

        card.addEventListener('mousemove', onMouseMove, { passive: true });
        card.addEventListener('mouseleave', onMouseLeave);
        card.addEventListener('mouseenter', onMouseEnter);

        cleanups.push(() => {
          card.removeEventListener('mousemove', onMouseMove);
          card.removeEventListener('mouseleave', onMouseLeave);
          card.removeEventListener('mouseenter', onMouseEnter);
        });
      });
    }
  }

  return {
    destroy() {
      cleanups.forEach((fn) => fn?.());
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      items.forEach((item) => {
        const card = item.querySelector('.service-item-glass');
        if (card) card.style.transform = '';
      });
    },
  };
}
