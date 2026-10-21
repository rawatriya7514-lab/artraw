/**
 * ARTRAW — Capabilities / Skills
 * Editorial letter-grouped index with staggered reveals.
 * Real skill data preserved from src/data/skills.js.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealOnEnter } from '../utils/scroll.js';
import { skillGroups } from '../data/skills.js';

gsap.registerPlugin(ScrollTrigger);

export function createSkills() {
  const section = document.createElement('section');
  section.className = 'section skills-index';
  section.id = 'skills';
  section.setAttribute('aria-labelledby', 'skills-title');

  section.innerHTML = `
    <div class="container">
      <header class="skills-header reveal">
        <span class="skills-label reveal" data-scramble>Capabilities</span>
        <h2 id="skills-title" class="skills-title reveal">Skills, A to Z</h2>
        <p class="skills-description reveal">
          The same practice, grouped so a brief can start from the right letter.
        </p>
      </header>

      <div class="skills-list" role="list" aria-label="Skill groups">
        ${skillGroups.map((group) => `
          <article class="skills-group reveal" role="listitem">
            <div class="skills-group-head">
              <span class="skills-letter" aria-hidden="true">${group.letter}</span>
              <h3 class="skills-group-title">${group.title}</h3>
            </div>
            <p class="skills-group-summary">${group.summary}</p>
            <ul class="skills-items" role="list" aria-hidden="true">
              ${group.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}

export function initSkillsIndex(section) {
  if (!section) return { destroy() {} };

  const groups = Array.from(section.querySelectorAll('.skills-group'));

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const killReveal = revealOnEnter(groups, { once: true, start: 'top 85%', stagger: 0.1 });
    return () => killReveal();
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    groups.forEach((el) => {
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
      gsap.set(groups, { clearProps: 'opacity,transform' });
    },
  };
}
