/**
 * ARTRAW — Horizontal Scroll Showcase (Pinned Cinema Track)
 *
 * On desktop the section pins and a film-strip of project panels travels
 * horizontally on scroll (scrubbed), with an inner per-panel parallax on
 * posters driven by containerAnimation.
 *
 * On mobile / reduced-motion the track degrades to a vertical stacked
 * layout with plain reveal-on-enter — no pin, no horizontal transform.
 *
 * Real project data from src/data/portfolio.js.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIcon } from '../utils/icons.js';
import { workProjects } from '../data/portfolio.js';
import { asset } from '../utils/helpers.js';

gsap.registerPlugin(ScrollTrigger);

const COUNT = 8;

export function createShowcase() {
  const section = document.createElement('section');
  section.className = 'section showcase-hscroll';
  section.id = 'showcase';
  section.setAttribute('aria-labelledby', 'showcase-title');

  const projects = workProjects.slice(0, COUNT);

  section.innerHTML = `
    <div class="container showcase-head">
      <span class="showcase-label reveal" data-scramble>Cinema reel // horizontal</span>
      <h2 id="showcase-title" class="showcase-title reveal">Work in motion</h2>
      <p class="showcase-description reveal">
        A pinned horizontal pass through the build catalog. Scroll drifts the
        reel sideways — every panel links to the same real project record.
      </p>
    </div>

    <div class="showcase-viewport">
      <div class="showcase-track" role="list" aria-label="Project film reel">
        ${projects.map((project, index) => `
          <article class="showcase-panel reveal" role="listitem" data-aspect="${project.aspect || 'landscape'}" data-accent="${project.accent}">
            <span class="showcase-ghost-index" aria-hidden="true">0${index + 1}</span>
            <div class="showcase-poster" data-aspect="${project.aspect || 'landscape'}">
              <img src="${asset(project.image)}" alt="${project.title} Showcase Poster" loading="lazy" decoding="async" width="800" height="600" />
              <div class="showcase-poster-scan" aria-hidden="true"></div>
              <span class="showcase-mark accent-${project.accent}" aria-hidden="true">${project.mark}</span>
            </div>
            <div class="showcase-copy">
              <p class="project-kicker">${project.category}</p>
              <h3 class="showcase-panel-title">${project.title}</h3>
              <p class="showcase-panel-text">${project.tagline}</p>
              <div class="showcase-chips" aria-label="Technology stack">
                ${project.stack.slice(0, 4).map((tech) => `<span class="showcase-chip">${tech}</span>`).join('')}
              </div>
              <div class="showcase-foot">
                <span class="project-status accent-${project.accent}">${project.statusLabel}</span>
                <a href="/work#${project.id}" class="btn btn-ghost btn-sm" data-route="true" data-project="${project.id}">
                  Open project ${getIcon('arrowRight')}
                </a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>

    <div class="showcase-progressbar" aria-hidden="true">
      <div class="showcase-progress-fill"></div>
    </div>
  `;

  return section;
}

export function initShowcase(section) {
  if (!section) return { destroy() {} };

  const viewport = section.querySelector('.showcase-viewport');
  const track = section.querySelector('.showcase-track');
  const fill = section.querySelector('.showcase-progress-fill');
  const posters = section.querySelectorAll('.showcase-poster img');
  const panels = Array.from(section.querySelectorAll('.showcase-panel'));

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const mm = gsap.matchMedia();

  /* --- Desktop: pinned horizontal scrub with inner poster parallax --- */
  mm.add(
    '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
    () => {
      const distance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 48);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: viewport,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: section,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill) gsap.set(fill, { scaleX: self.progress });
          },
        },
      });

      const parallaxKills = posters.map((img) => {
        const p = gsap.to(img, {
          xPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.showcase-panel'),
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        });
        return () => {
          p.scrollTrigger?.kill();
          p.kill();
        };
      });

      const ghostKills = panels.map((panel) => {
        const ghost = panel.querySelector('.showcase-ghost-index');
        if (!ghost) return () => {};
        const g = gsap.to(ghost, {
          xPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        });
        return () => {
          g.scrollTrigger?.kill();
          g.kill();
        };
      });

      return () => {
        parallaxKills.forEach((k) => k());
        ghostKills.forEach((k) => k());
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
  );

  /* Mobile + reduced-motion: `.reveal` reveals are owned by initReveal
     in main.js — no horizontal transform is applied under 1024px. */

  return {
    destroy() {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      gsap.set(track, { clearProps: 'x,force3D' });
      gsap.set(posters, { clearProps: 'x' });
      panels.forEach((el) => gsap.set(el, { clearProps: 'opacity,transform' }));
    },
  };
}
