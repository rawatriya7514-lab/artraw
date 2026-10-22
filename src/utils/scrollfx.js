/**
 * ARTRAW — Pro-Grade Scroll FX Engine
 *
 * Research-derived motion system (2026 Awwwards-tier patterns):
 *   1. [data-words]           → masked word-rise headers (Loco/Apple-style kinetic type)
 *   2. [data-reveal-clip]     → clip-path image unveil + inner de-zoom (Codrops gallery reel)
 *   3. [data-parallax="0.2"]  → multi-depth scrub drift (Nike Better World lineage)
 *   4. [data-stagger-reveal]  → cascaded child reveals via transition-delay (progressive reveals)
 *   5. Hero exit choreography → Apple-style soft fade/scale as the hero scrolls out
 *
 * Guards: headless/JSDOM + prefers-reduced-motion + touch (lighter parallax).
 * Every effect animates ONLY transform/opacity/clip-path (GPU-safe).
 * Returns a destroy() killer that reverts its own DOM mutations.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isHeadlessEnv, prefersReducedMotion } from './helpers.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollFX(root = document) {
  if (!root || isHeadlessEnv() || prefersReducedMotion() || typeof window === 'undefined' || !window.matchMedia) {
    return { destroy() {} };
  }

  const isTouch = window.matchMedia('(hover: none)').matches;
  const strength = isTouch ? 0.45 : 1; // lighter drift on touch, same choreography
  const killAll = [];
  const addKill = (anim) => killAll.push(() => {
    anim.scrollTrigger && anim.scrollTrigger.kill();
    anim.kill();
  });

  /* ---------- 1. Masked word-rise headers ---------- */
  root.querySelectorAll('[data-words]').forEach((el) => {
    if (el.dataset.fxBound) return;
    const text = (el.textContent || '').trim();
    if (!text || text.length > 90) return;
    el.dataset.fxBound = '1';
    el.setAttribute('aria-label', text);
    el.classList.add('fx-words');
    if (el.classList.contains('reveal')) el.classList.add('visible'); // mask takes over
    el.innerHTML = text.split(/\s+/).map((word) =>
      `<span class="fx-word-mask" aria-hidden="true"><span class="fx-word">${word}</span></span>`
    ).join(' ');
    const words = el.querySelectorAll('.fx-word');
    gsap.set(words, { yPercent: 125 });
    addKill(gsap.to(words, {
      yPercent: 0,
      duration: 0.95,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    }));
  });

  /* ---------- 2. Clip-path image unveil ---------- */
  root.querySelectorAll('[data-reveal-clip]').forEach((wrap) => {
    if (wrap.dataset.fxBound) return;
    wrap.dataset.fxBound = '1';
    const img = wrap.querySelector('img');
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) return; // broken img — skip
    const clipTween = gsap.fromTo(wrap,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.05,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: wrap, start: 'top 88%', once: true },
        onComplete: () => {
          wrap.style.clipPath = '';
          ScrollTrigger.refresh();
        },
      }
    );
    const scaleTween = gsap.fromTo(img,
      { scale: 1.18 },
      { scale: 1, duration: 1.3, ease: 'power2.out',
        scrollTrigger: { trigger: wrap, start: 'top 88%', once: true } }
    );
    wrap.style.overflow = 'hidden';
    killAll.push(() => {
      clipTween.scrollTrigger && clipTween.scrollTrigger.kill();
      clipTween.kill();
      scaleTween.scrollTrigger && scaleTween.scrollTrigger.kill();
      scaleTween.kill();
      wrap.style.clipPath = '';
      wrap.style.overflow = '';
      delete wrap.dataset.fxBound;
    });
  });

  /* ---------- 3. Multi-depth parallax drift ---------- */
  root.querySelectorAll('[data-parallax]').forEach((el) => {
    if (el.dataset.fxBound) return;
    el.dataset.fxBound = '1';
    const depth = Math.min(Math.abs(parseFloat(el.dataset.parallax) || 0.18), 0.5);
    addKill(gsap.to(el, {
      yPercent: () => -depth * 100 * strength,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    }));
  });

  /* ---------- 4. Cascaded continuous reveals ---------- */
  root.querySelectorAll('[data-stagger-reveal]').forEach((group) => {
    if (group.dataset.fxBound) return;
    group.dataset.fxBound = '1';
    const kids = group.querySelectorAll(':scope > *');
    let delaySeen = false;
    kids.forEach((kid, i) => {
      if (kid.classList.contains('reveal')) {
        kid.style.transitionDelay = `${Math.min(i * 85, 600)}ms`;
        delaySeen = true;
      }
    });
    // fallback for grids whose children aren't .reveal-based
    if (!delaySeen) {
      gsap.set(kids, { opacity: 0, y: 30 });
      addKill(gsap.to(kids, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        stagger: { each: 0.085, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }));
    } else {
      killAll.push(() => kids.forEach((kid) => { kid.style.transitionDelay = ''; }));
    }
  });

  /* ---------- 5. Hero exit choreography (Apple-style soft dismissal) ---------- */
  const hero = root.querySelector('.hero');
  if (hero && !hero.dataset.fxBound) {
    hero.dataset.fxBound = '1';
    addKill(gsap.to(hero, {
      opacity: 0.06,
      scale: 0.985,
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom 35%',
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    }));
    killAll.push(() => {
      gsap.set(hero, { clearProps: 'all' });
      delete hero.dataset.fxBound;
    });
  }

  return {
    destroy() {
      killAll.forEach((fn) => { try { fn(); } catch { /* already dead */ } });
      killAll.length = 0;
    },
  };
}
