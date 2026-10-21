/**
 * ARTRAW — Dynamic Atmospheric Background Lighting
 * Real-time scroll-synchronized ambient aura and radial lighting shifts.
 * 60fps locked on mobile & desktop via GPU-accelerated opacity & transforms.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createAtmosphere() {
  const container = document.createElement('div');
  container.className = 'ambient-atmosphere';
  container.id = 'ambient-atmosphere';
  container.setAttribute('aria-hidden', 'true');

  container.innerHTML = `
    <div class="ambient-orb ambient-orb-1"></div>
    <div class="ambient-orb ambient-orb-2"></div>
    <div class="ambient-noise-layer"></div>
  `;

  return container;
}

export function initAtmosphere(atmosphere) {
  if (!atmosphere || typeof window === 'undefined') return { destroy() {} };

  const orb1 = atmosphere.querySelector('.ambient-orb-1');
  const orb2 = atmosphere.querySelector('.ambient-orb-2');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    return { destroy() {} };
  }

  // Section aura configurations: (Crimson, Cyan, Magenta on deep Obsidian)
  const auraConfigs = [
    {
      trigger: '.hero',
      orb1: { background: 'radial-gradient(circle, rgba(255, 30, 66, 0.24) 0%, transparent 70%)', x: '50%', y: '22%', scale: 1 },
      orb2: { background: 'radial-gradient(circle, rgba(255, 10, 40, 0.12) 0%, transparent 65%)', x: '85%', y: '68%', scale: 1 }
    },
    {
      trigger: '.editorial-spec-section',
      orb1: { background: 'radial-gradient(circle, rgba(0, 240, 255, 0.14) 0%, transparent 70%)', x: '25%', y: '35%', scale: 1.1 },
      orb2: { background: 'radial-gradient(circle, rgba(255, 30, 66, 0.10) 0%, transparent 65%)', x: '80%', y: '65%', scale: 0.95 }
    },
    {
      trigger: '.flagship',
      orb1: { background: 'radial-gradient(circle, rgba(0, 240, 255, 0.16) 0%, transparent 70%)', x: '35%', y: '48%', scale: 1.2 },
      orb2: { background: 'radial-gradient(circle, rgba(255, 30, 66, 0.15) 0%, transparent 65%)', x: '75%', y: '45%', scale: 1.1 }
    },
    {
      trigger: '.services-preview',
      orb1: { background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)', x: '50%', y: '38%', scale: 1 },
      orb2: { background: 'radial-gradient(circle, rgba(255, 0, 127, 0.12) 0%, transparent 65%)', x: '85%', y: '75%', scale: 1 }
    },
    {
      trigger: '.portfolio-gallery',
      orb1: { background: 'radial-gradient(circle, rgba(255, 30, 66, 0.15) 0%, transparent 70%)', x: '40%', y: '40%', scale: 1 },
      orb2: { background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 65%)', x: '75%', y: '60%', scale: 1 }
    },
    {
      trigger: '.process-line',
      orb1: { background: 'radial-gradient(circle, rgba(0, 240, 255, 0.18) 0%, transparent 70%)', x: '45%', y: '52%', scale: 1.15 },
      orb2: { background: 'radial-gradient(circle, rgba(255, 30, 66, 0.10) 0%, transparent 65%)', x: '70%', y: '35%', scale: 0.95 }
    },
    {
      trigger: '.contact-cta',
      orb1: { background: 'radial-gradient(circle, rgba(255, 30, 66, 0.28) 0%, transparent 70%)', x: '50%', y: '50%', scale: 1.3 },
      orb2: { background: 'radial-gradient(circle, rgba(255, 10, 40, 0.16) 0%, transparent 65%)', x: '30%', y: '70%', scale: 1.1 }
    }
  ];

  const triggers = [];

  function applyAura(cfg) {
    if (orb1) {
      orb1.style.background = cfg.orb1.background;
      gsap.to(orb1, {
        duration: 1.2,
        ease: 'power2.out',
        left: cfg.orb1.x,
        top: cfg.orb1.y,
        scale: cfg.orb1.scale,
        overwrite: 'auto'
      });
    }
    if (orb2) {
      orb2.style.background = cfg.orb2.background;
      gsap.to(orb2, {
        duration: 1.4,
        ease: 'power2.out',
        left: cfg.orb2.x,
        top: cfg.orb2.y,
        scale: cfg.orb2.scale,
        overwrite: 'auto'
      });
    }
  }

  auraConfigs.forEach((cfg) => {
    const el = document.querySelector(cfg.trigger);
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => applyAura(cfg),
      onEnterBack: () => applyAura(cfg)
    });
    triggers.push(st);
  });

  // Subtle mouse tracking for desktop viewports
  let mouseMoveHandler = null;
  if (window.matchMedia('(min-width: 1024px)').matches) {
    mouseMoveHandler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 28;
      gsap.to([orb1, orb2], {
        x,
        y,
        duration: 2.2,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    };
    window.addEventListener('mousemove', mouseMoveHandler, { passive: true });
  }

  return {
    destroy() {
      triggers.forEach((t) => t.kill());
      if (mouseMoveHandler) {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }
    }
  };
}
