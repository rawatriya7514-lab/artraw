/**
 * ARTRAW — Working Process Pipeline
 *
 * An interactive scroll-driven pipeline:
 * - Animated laser progress line drawing downwards as user scrolls.
 * - Glowing milestone nodes (01, 02, 03, 04) that ignite when reached.
 * - Fully responsive for both PC and Android mobile.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howIWorkSteps } from '../data/portfolio.js';

gsap.registerPlugin(ScrollTrigger);

export function createProcess() {
  const section = document.createElement('section');
  section.className = 'section process-line';
  section.id = 'process';
  section.setAttribute('aria-labelledby', 'process-title');

  section.innerHTML = `
    <div class="container">
      <header class="process-header reveal">
        <div class="process-badge-pill">
          <span class="pill-dot"></span>
          <span>EXECUTION ROADMAP</span>
        </div>
        <h2 id="process-title" class="process-title reveal" data-words>How A Project Moves</h2>
        <p class="process-description reveal">
          From initial discovery to production deployment. Clear milestones, transparent tooling,
          and uncompromising build precision.
        </p>
      </header>

      <div class="process-wrap">
        <!-- Vertical Animated Laser Beam -->
        <div class="process-beam-track" aria-hidden="true">
          <div class="process-beam-fill" id="process-beam-fill"></div>
        </div>

        <ol class="process-steps" role="list" aria-label="Project process steps" data-stagger-reveal>
          ${howIWorkSteps.map((step) => `
            <li class="process-step reveal" data-step="${step.number}">
              <div class="step-marker-box">
                <div class="step-number">${step.number}</div>
                <div class="step-marker-pulse"></div>
              </div>
              <div class="step-card-glass">
                <h3 class="step-title">${step.title}</h3>
                <p class="step-description">${step.description}</p>
              </div>
            </li>
          `).join('')}
        </ol>
      </div>
    </div>
  `;

  return section;
}

export function initProcessLine(section) {
  if (!section || typeof window === 'undefined') return { destroy() {} };

  const steps = Array.from(section.querySelectorAll('.process-step'));
  const beamFill = section.querySelector('#process-beam-fill');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  if (prefersReduced) {
    steps.forEach((s) => {
      s.style.opacity = '1';
      s.style.transform = 'none';
      s.classList.add('step-active');
    });
    if (beamFill) beamFill.style.height = '100%';
    return { destroy() {} };
  }

  // Laser beam fill scroll trigger
  let beamTrigger = null;
  if (beamFill) {
    beamTrigger = ScrollTrigger.create({
      trigger: section.querySelector('.process-wrap'),
      start: 'top 70%',
      end: 'bottom 70%',
      scrub: 0.5,
      onUpdate: (self) => {
        beamFill.style.height = `${self.progress * 100}%`;

        // Activate step cards as beam reaches them
        steps.forEach((step, idx) => {
          const stepRatio = (idx + 0.3) / steps.length;
          if (self.progress >= stepRatio) {
            step.classList.add('step-active');
          } else {
            step.classList.remove('step-active');
          }
        });
      },
    });
  }

  // Individual step reveal animation
  const stepAnims = steps.map((step) => {
    return gsap.fromTo(
      step,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  return {
    destroy() {
      beamTrigger?.kill();
      stepAnims.forEach((a) => {
        a.scrollTrigger?.kill();
        a.kill();
      });
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      steps.forEach((s) => s.classList.remove('step-active'));
    },
  };
}
