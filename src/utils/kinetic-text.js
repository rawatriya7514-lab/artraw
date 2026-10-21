/**
 * ARTRAW — Kinetic Text (ScrambleText lifecycle helpers)
 *
 * Section label scrambles driven by ScrollTrigger enter (once).
 * Elements opt in with a `data-scramble` attribute. The final text is
 * read from the DOM so markup stays the single source of truth.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { prefersReducedMotion, isHeadlessEnv } from './helpers.js';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const SCRATCH_CHARS = '01#_/\\<>.x4ARTRAW';

/**
 * Scramble-animate every `[data-scramble]` element as it enters the
 * viewport. Returns a destroy() killer.
 */
export function initLabelScrambles(container = document) {
  if (!container || isHeadlessEnv() || prefersReducedMotion()) return () => {};

  const targets = Array.from(container.querySelectorAll('[data-scramble]'));
  const killFns = [];

  targets.forEach((el) => {
    if (!el || el.dataset.scrambleArmed) return;
    const finalText = el.textContent.trim();
    if (!finalText) return;

    el.dataset.scrambleArmed = '1';
    el.textContent = '';

    const anim = gsap.fromTo(
      el,
      {},
      {
        duration: 0.6,
        ease: 'power2.out',
        scrambleText: {
          text: finalText,
          speed: 1.2,
          chars: SCRATCH_CHARS,
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
          toggleActions: 'play none none none',
        },
      }
    );

    killFns.push(() => {
      anim.scrollTrigger?.kill();
      anim.kill();
      el.textContent = finalText;
      delete el.dataset.scrambleArmed;
    });
  });

  return () => killFns.forEach((fn) => fn());
}

/**
 * One-shot scramble for an element currently in the viewport
 * (no scroll trigger) — used inside composed boot timelines.
 */
export function scrambleTo(el, finalText, { duration = 0.55, speed = 1.1, delay = 0 } = {}) {
  if (!el) return () => {};
  if (isHeadlessEnv() || prefersReducedMotion()) {
    el.textContent = finalText;
    return () => {};
  }
  const tween = gsap.fromTo(
    el,
    {},
    {
      duration,
      delay,
      ease: 'none',
      scrambleText: { text: finalText, speed, chars: SCRATCH_CHARS },
    }
  );
  return () => tween.kill();
}
