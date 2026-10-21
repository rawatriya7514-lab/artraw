/**
 * ARTRAW — Cinematic Route Transitions
 *
 * A fixed viewport overlay with 4 staggered slabs + accent slivers that
 * sweeps over the screen while route content swaps underneath, with the
 * destination route name scrambling in on the cover label.
 *
 * - Headless/JSDOM + reduced-motion fall back to instant content swaps.
 * - The content swap always happens while the screen is fully covered,
 *   so there is never a flash of route change.
 */

import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollTo } from './scroll.js';
import { prefersReducedMotion, isHeadlessEnv } from './helpers.js';

gsap.registerPlugin(ScrambleTextPlugin);

const ROUTE_ORDER = ['home', 'services', 'work', 'contact', 'privacy', 'terms'];

const ROUTE_COVER_TITLES = {
  home: 'ARTRAW / HOME',
  services: 'SERVICES',
  work: 'SELECTED WORK',
  contact: 'START A PROJECT',
  privacy: 'PRIVACY',
  terms: 'TERMS',
};

const SCRATCH_CHARS = '01#_/\\<>.x4ARTRAW';

export function canAnimateRoutes() {
  return !isHeadlessEnv() && !prefersReducedMotion();
}

export function createRouteTransition() {
  const fx = document.createElement('div');
  fx.className = 'route-fx';
  fx.setAttribute('aria-hidden', 'true');

  fx.innerHTML = `
    <div class="route-fx-slab route-fx-slab-1"></div>
    <div class="route-fx-slab route-fx-slab-2"></div>
    <div class="route-fx-slab route-fx-slab-3"></div>
    <div class="route-fx-slab route-fx-slab-4"></div>
    <div class="route-fx-slab route-fx-slab-accent-a"></div>
    <div class="route-fx-slab route-fx-slab-accent-b"></div>
    <div class="route-fx-label">
      <span class="route-fx-index">>> ROUTE</span>
      <span class="route-fx-name">ARTRAW</span>
    </div>
  `;

  return fx;
}

/**
 * Runs a transition: covers the viewport, runs `swapFn()` under cover,
 * then uncovers. Settles scroll to top on arrival. Resolves on completion.
 */
export function runRouteTransition(fx, fromRoute, toRoute, swapFn) {
  if (!fx || !canAnimateRoutes()) {
    swapFn();
    if (fx) fx.style.display = 'none';
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const slabs = fx.querySelectorAll('.route-fx-slab:not(.route-fx-slab-accent-a):not(.route-fx-slab-accent-b)');
    const accentA = fx.querySelector('.route-fx-slab-accent-a');
    const accentB = fx.querySelector('.route-fx-slab-accent-b');
    const nameEl = fx.querySelector('.route-fx-name');
    const label = fx.querySelector('.route-fx-label');

    const from = ROUTE_ORDER.indexOf(fromRoute);
    const to = ROUTE_ORDER.indexOf(toRoute);
    const dir = to >= from ? 1 : -1; // 1 = sweeps up, -1 = sweeps down

    const targetTitle = ROUTE_COVER_TITLES[toRoute] || 'ARTRAW';
    if (nameEl) nameEl.textContent = ROUTE_COVER_TITLES[fromRoute] || 'ARTRAW';
    const indexEl = fx.querySelector('.route-fx-index');
    if (indexEl) indexEl.textContent = `>> 0${ROUTE_ORDER.indexOf(toRoute) + 1} ROUTE`;

    gsap.set(fx, { display: 'block', pointerEvents: 'auto' });

    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => {
        gsap.set(fx, { display: 'none', pointerEvents: 'none' });
        resolve();
      },
    });

    /* -- In: slabs cover the screen (staggered, directional) -- */
    tl.fromTo(
      slabs,
      { yPercent: dir * 103 },
      { yPercent: 0, duration: 0.52, stagger: 0.065 },
      0
    );
    tl.fromTo(accentA, { yPercent: dir * 103 }, { yPercent: 0, duration: 0.46 }, 0.02);
    tl.fromTo(accentB, { yPercent: dir * 103 }, { yPercent: 0, duration: 0.46 }, 0.09);

    /* -- Label arrives with the cover -- */
    tl.fromTo(
      label,
      { opacity: 0, y: 14 * dir },
      { opacity: 1, y: 0, duration: 0.26, ease: 'power3.out' },
      0.3
    );

    /* -- Under full cover: swap the route content -- */
    tl.add(() => {
      swapFn();
      scrollTo(0, { duration: 0 });
      if (nameEl) {
        nameEl.textContent = '';
        gsap.to(nameEl, {
          duration: 0.4,
          scrambleText: { text: targetTitle, speed: 1.4, chars: SCRATCH_CHARS },
          ease: 'none',
        });
      }
    }, 0.42);

    /* -- Out: slabs keep travelling to fully reveal the new page -- */
    tl.to(label, { opacity: 0, y: -16 * dir, duration: 0.24, ease: 'power2.in' }, '+=0.28');
    tl.to(slabs, { yPercent: -dir * 103, duration: 0.56, stagger: 0.065 }, '<');
    tl.to(accentA, { yPercent: -dir * 103, duration: 0.48 }, '<+=0.02');
    tl.to(accentB, { yPercent: -dir * 103, duration: 0.48 }, '<+=0.07');
    tl.add(() => ScrollTrigger.refresh(), '-=0.1');
  });
}
