/**
 * ARTRAW — Studio Introduction
 * Editorial split layout with kinetic text and interactive craft highlights.
 * Responsive for both PC and Android mobile.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parallax } from '../utils/scroll.js';

gsap.registerPlugin(ScrollTrigger);

export function createAboutPreview() {
  const section = document.createElement('section');
  section.className = 'section studio-intro';
  section.id = 'about';
  section.setAttribute('aria-labelledby', 'about-title');

  section.innerHTML = `
    <div class="container">
      <div class="studio-grid">
        <div class="studio-copy reveal">
          <div class="studio-kicker-pill">
            <span class="pill-dot"></span>
            <span>THE PRACTICE</span>
          </div>
          <h2 id="about-title" class="studio-title reveal">ARTRAW — Creative, Digital & Technology</h2>
          <p class="studio-description reveal">
            ARTRAW is an autonomous engineering studio and creative laboratory.
            The work bridges on-device AI agent architectures, edge computation, cinematic media,
            and high-speed web systems — built with uncompromising technical rigor.
          </p>

          <div class="studio-meta-grid reveal">
            <div class="studio-meta-card">
              <span class="meta-card-label">CORE FOCUS</span>
              <span class="meta-card-val">Autonomous AI & Systems</span>
            </div>
            <div class="studio-meta-card">
              <span class="meta-card-label">LOCALE & TIME</span>
              <span class="meta-card-val">Remote · India (IST UTC+5:30)</span>
            </div>
            <div class="studio-meta-card">
              <span class="meta-card-label">ARCHITECTURE</span>
              <span class="meta-card-val">Termux, Android AI, Vite ES</span>
            </div>
            <div class="studio-meta-card">
              <span class="meta-card-label">DELIVERY</span>
              <span class="meta-card-val">Production-Ready & Verified</span>
            </div>
          </div>
        </div>

        <div class="studio-visual reveal" aria-hidden="true">
          <div class="studio-mark-wrap">
            <div class="studio-mark" data-depth="0.04">A</div>
            <div class="studio-ring" style="--accent: var(--color-accent-cyan);"></div>
            <div class="studio-glow-orb" style="--accent: var(--color-accent-magenta);"></div>
          </div>
          <div class="studio-grid-dots" aria-hidden="true">
            <div class="dot dot-1" style="--accent: var(--color-accent-red);"></div>
            <div class="dot dot-2" style="--accent: var(--color-accent-magenta);"></div>
            <div class="dot dot-3" style="--accent: var(--color-accent-cyan);"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}

export function initStudioIntro(section) {
  if (!section || typeof window === 'undefined') return { destroy() {} };

  const copyEls = section.querySelectorAll('.studio-copy > *');
  const visual = section.querySelector('.studio-visual');
  const mark = section.querySelector('.studio-mark');
  const ring = section.querySelector('.studio-ring');

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.set([...copyEls, visual], { opacity: 1, y: 0, x: 0 });
    gsap.set(mark, { scale: 1 });
    return { destroy() {} };
  }

  // Smooth GPU reveal for both PC and Android mobile
  gsap.set(copyEls, { opacity: 0, y: 30 });
  gsap.set(visual, { opacity: 0, scale: 0.95 });
  gsap.set(mark, { scale: 0.85 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      once: true,
      toggleActions: 'play none none none',
    },
  });

  tl.to(copyEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' })
    .to(visual, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, 0.2)
    .to(mark, { scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 0.4);

  // Subtle rotation on the accent ring on scroll
  const ringAnim = gsap.to(ring, {
    rotate: 180,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  const parallaxKill = parallax([mark, ...section.querySelectorAll('[data-depth]')]);

  return {
    destroy() {
      tl.kill();
      ringAnim.scrollTrigger?.kill();
      ringAnim.kill();
      parallaxKill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      gsap.set([...copyEls, visual], { clearProps: 'opacity,y,scale,transform' });
      gsap.set(mark, { clearProps: 'scale,transform' });
    },
  };
}
