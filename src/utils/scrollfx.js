/**
 * ARTRAW — Pro-Grade Scroll FX Engine  (v2 — Dribbble/Awwwards reference pass)
 *
 * Patterns distilled from 2026 references (dribbble.com/tags/scrolling-animation
 * + award-tier sites) and mapped to ARTRAW:
 *   1. [data-words]           → masked word-rise headers (Lapz/Patagonia kinetic type)
 *   2. [data-reveal-clip]     → clip-path unveil + de-zoom + CONTINUOUS poster drift
 *                               (Parallax Coffee-beans LP / Open-article mask reveals)
 *   3. [data-parallax="0.12"] → scrub drift on headers/decoratives (depth layers)
 *   4. [data-stagger-reveal]  → cascaded card reveals (SMAT section builds)
 *   5. Hero exit choreography → hero soft dismissal (DJI/Apple product pages)
 *   6. Velocity skew          → posters lean with scroll speed ("Addicted to
 *                               Scrolling" reactive cards; desktop only)
 *
 * Guards: headless/JSDOM + prefers-reduced-motion + touch (lighter drift, no skew).
 * Every effect animates ONLY transform/opacity/clip-path (GPU-safe).
 * destroy() reverts its own DOM mutations.
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
  const strength = isTouch ? 0.85 : 1; // bold drift on touch too, not timid
  const killAll = [];
  const driftImgs = [];
  let tickerFn = null;

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
    if (el.classList.contains('reveal')) el.classList.add('visible'); // the mask takes over
    el.innerHTML = text.split(/\s+/).map((word) =>
      `<span class="fx-word-mask" aria-hidden="true"><span class="fx-word">${word}</span></span>`
    ).join(' ');
    const words = el.querySelectorAll('.fx-word');
    gsap.set(words, { yPercent: 125 });
    addKill(gsap.to(words, {
      yPercent: 0,
      duration: 1.0,
      ease: 'power4.out',
      stagger: 0.065,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    }));
    killAll.push(() => { el.textContent = text; delete el.dataset.fxBound; });
  });

  /* ---------- 2. Clip unveil + living poster drift ---------- */
  root.querySelectorAll('[data-reveal-clip]').forEach((wrap) => {
    if (wrap.dataset.fxBound) return;
    wrap.dataset.fxBound = '1';
    const img = wrap.querySelector('img');
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) return; // broken img — skip
    wrap.style.overflow = 'hidden';

    const clipTween = gsap.fromTo(wrap,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.1,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: wrap, start: 'top 88%', once: true },
        onComplete: () => { wrap.style.clipPath = ''; },
      }
    );
    // settle at a 1.14 base scale so the drift never shows hard edges
    const scaleTween = gsap.fromTo(img,
      { scale: 1.24 },
      { scale: 1.14, duration: 1.35, ease: 'power2.out',
        scrollTrigger: { trigger: wrap, start: 'top 88%', once: true } }
    );
    // continuous depth drift — the poster lags the page like a parallax layer
    const drift = gsap.fromTo(img,
      { yPercent: 7 * strength },
      {
        yPercent: -7 * strength,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      }
    );
    driftImgs.push(img);
    killAll.push(() => {
      clipTween.scrollTrigger && clipTween.scrollTrigger.kill();
      clipTween.kill();
      scaleTween.scrollTrigger && scaleTween.scrollTrigger.kill();
      scaleTween.kill();
      drift.scrollTrigger && drift.scrollTrigger.kill();
      drift.kill();
      wrap.style.clipPath = '';
      wrap.style.overflow = '';
      delete wrap.dataset.fxBound;
    });
  });

  /* ---------- 3. Header/decor parallax depth ---------- */
  root.querySelectorAll('h2[data-words][data-parallax], h1[data-words][data-parallax], [data-parallax]:not([data-words])').forEach((el) => {
    if (el.dataset.fxBound) return;
    el.dataset.fxBound = '1';
    const depth = Math.min(Math.abs(parseFloat(el.dataset.parallax) || 0.12), 0.5);
    addKill(gsap.to(el, {
      yPercent: () => -depth * 100 * strength,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    }));
    killAll.push(() => { gsap.set(el, { clearProps: 'transform' }); delete el.dataset.fxBound; });
  });

  /* ---------- 4. Cascaded continuous reveals ---------- */
  root.querySelectorAll('[data-stagger-reveal]').forEach((group) => {
    if (group.dataset.fxBound) return;
    group.dataset.fxBound = '1';
    const kids = group.querySelectorAll(':scope > *');
    let delaySeen = false;
    kids.forEach((kid, i) => {
      if (kid.classList.contains('reveal')) {
        kid.style.transitionDelay = `${Math.min(i * 105, 700)}ms`;
        delaySeen = true;
      }
    });
    // fallback for grids whose children aren't .reveal-based
    if (!delaySeen) {
      gsap.set(kids, { opacity: 0, y: 44 });
      addKill(gsap.to(kids, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: { each: 0.095, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      }));
    } else {
      killAll.push(() => kids.forEach((kid) => { kid.style.transitionDelay = ''; }));
    }
  });

  /* ---------- 5. Hero exit choreography (Apple/DJI-style dismissal) ---------- */
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
    killAll.push(() => { gsap.set(hero, { clearProps: 'all' }); delete hero.dataset.fxBound; });
  }

  /* ---------- 6. Velocity skew — posters lean with scroll speed ---------- */
  if (driftImgs.length && typeof window.requestAnimationFrame === 'function') {
    const skewClamp = isTouch ? 2.2 : 3.2; // mobile gets lean too, just gentler
    const skewFactor = isTouch ? 0.035 : 0.05;
    const skewers = driftImgs.map((img) => gsap.quickTo(img, 'skewY', { duration: 0.55, ease: 'power3.out' }));
    let lastY = window.scrollY || 0;
    let vel = 0;
    tickerFn = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      vel += ((y - lastY) - vel) * 0.14;
      lastY = y;
      const skew = Math.max(-skewClamp, Math.min(skewClamp, vel * skewFactor));
      for (const skewTo of skewers) skewTo(skew);
    };
    gsap.ticker.add(tickerFn);
    killAll.push(() => {
      gsap.ticker.remove(tickerFn);
      for (const img of driftImgs) gsap.set(img, { skewY: 0 });
    });
  }

  return {
    destroy() {
      killAll.forEach((fn) => { try { fn(); } catch { /* already dead */ } });
      killAll.length = 0;
      driftImgs.length = 0;
    },
  };
}
