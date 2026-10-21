/**
 * ARTRAW — Cinematic Cold Boot Preloader
 *
 * A full-screen boot sequence shown once per browser session (first paint):
 * - Massive counter 00 → 100 with eased meter fill
 * - "ARTRAW" wordmark letter-stagger reveal with accent glitch pulse
 * - Boot log lines typed out via ScrambleText
 * - Exit: content drops away, 4 slabs sweep up revealing the page
 *
 * Fully guarded: headless/JSDOM, prefers-reduced-motion, and missing
 * session storage all skip straight to instantly-resolved.
 */

import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { lockLenis } from '../utils/scroll.js';
import { prefersReducedMotion, isHeadlessEnv } from '../utils/helpers.js';

gsap.registerPlugin(ScrambleTextPlugin);

const SESSION_KEY = 'artraw-booted';

const BOOT_LINES = [
  '> initializing core systems_',
  '> linking android ai substrate_',
  '> mounting creative engine_',
  '> system online — welcome_'
];

const WORD = 'ARTRAW';

/** Whether the preloader is allowed to run in this context. */
export function preloaderEligible() {
  if (isHeadlessEnv() || prefersReducedMotion()) return false;
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    const params = new URLSearchParams(window.location.search);
    if (params.has('noboot')) return false;
    return true;
  } catch {
    return false;
  }
}

/** Set once when the boot starts so refreshes don't repeat the full intro. */
export function markSessionBoot() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* storage unavailable — preloader simply replays each load */
  }
}

export function createPreloader() {
  const el = document.createElement('div');
  el.className = 'preloader';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-label', 'ARTRAW is loading');

  el.innerHTML = `
    <div class="pre-slab pre-slab-1" aria-hidden="true"></div>
    <div class="pre-slab pre-slab-2" aria-hidden="true"></div>
    <div class="pre-slab pre-slab-3" aria-hidden="true"></div>
    <div class="pre-slab pre-slab-4" aria-hidden="true"></div>

    <div class="pre-core">
      <div class="pre-topline">
        <span class="pre-topline-item">ARTRAW//BOOT.SYS</span>
        <span class="pre-topline-item">V3.15 — CREATIVE TECHNOLOGY</span>
        <span class="pre-topline-item pre-geo">28.61°N · 77.20°E</span>
      </div>

      <div class="pre-word" aria-hidden="true">
        <span class="pre-word-flank"></span>
        <div class="pre-wordmark">${WORD.split('').map((ch, i) => `<span class="pre-char${i === 0 ? ' pre-char-first' : ''}">${ch}</span>`).join('')}</div>
        <span class="pre-word-flank"></span>
      </div>

      <div class="pre-log" aria-hidden="true">
        ${BOOT_LINES.map((line) => `<p class="pre-log-line">${line}</p>`).join('')}
      </div>

      <div class="pre-meter">
        <div class="pre-meter-track" aria-hidden="true"><div class="pre-meter-fill"></div></div>
        <div class="pre-meter-meta">
          <span class="pre-meter-value">00</span>
          <span class="pre-meter-tone">LOADING / CREATIVE TECHNOLOGY</span>
        </div>
      </div>
    </div>
  `;

  return el;
}

/**
 * Run the boot cinematic. Resolves after the slabs have fully swept away.
 * `opts.ionDone` fires right as the reveal begins.
 */
export function initPreloader(el, { onReveal } = {}) {
  if (!el || isHeadlessEnv() || prefersReducedMotion()) {
    return () => {};
  }

  lockLenis(true);
  document.documentElement.classList.add('is-booting');

  const counter = el.querySelector('.pre-meter-value');
  const fill = el.querySelector('.pre-meter-fill');
  const logLines = el.querySelectorAll('.pre-log-line');
  const topline = el.querySelector('.pre-topline');
  const meter = el.querySelector('.pre-meter');
  const word = el.querySelector('.pre-word');
  const wordmark = el.querySelector('.pre-wordmark');
  const slabs = el.querySelectorAll('.pre-slab');

  const progress = { value: 0 };
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      el.remove();
      document.documentElement.classList.remove('is-booting');
      lockLenis(false);
    },
  });

  /* -- 01 · Wordmark letters rise from a masked line -- */
  tl.from(
    wordmark,
    { opacity: 0, duration: 0.5, ease: 'none' },
    0.05
  );

  const charTweens = gsap.utils
    .toArray(el.querySelectorAll('.pre-char'))
    .map((char, i) =>
      gsap.from(char, {
        yPercent: 118,
        duration: 0.85,
        ease: 'power4.out',
        delay: 0.05 + i * 0.075,
      })
    );

  /* -- 02 · Counter + meter fill (eased, with stepped surf usage) -- */
  const countTween = gsap.to(progress, {
    value: 100,
    duration: 2.05,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (counter) counter.textContent = String(Math.floor(progress.value)).padStart(2, '0');
      if (fill) gsap.set(fill, { scaleX: progress.value / 100 });
    },
  });

  /* -- 03 · Boot log lines scramble in sequence -- */
  logLines.forEach((line, i) => {
    tl.fromTo(
      line,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.05,
        ease: 'none',
        onStart: () => {
          gsap.fromTo(
            line,
            { duration: 0.6 },
            {
              duration: 0.6,
              scrambleText: {
                text: BOOT_LINES[i],
                speed: 1.1,
                chars: '01#_/\\<>.x4a',
              },
              ease: 'none',
            }
          );
        },
      },
      0.25 + i * 0.42
    );
  });

  /* -- 04 · Topline draws itself in -- */
  tl.fromTo(
    topline,
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.4 },
    0.1
  );
  tl.fromTo(
    meter,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.4 },
    0.15
  );

  /* -- 05 · Hold a beat at 100, then sweep everything away -- */
  tl.add('sweep', '>+=0.35');
  if (onReveal) tl.add(() => onReveal(), 'sweep+=0.05');

  tl.to(
    [topline, word, logLines, meter],
    { opacity: 0, y: -14, duration: 0.35, stagger: 0.03, ease: 'power2.in' },
    'sweep'
  );

  const slabDur = 0.62;
  tl.to(slabs, {
    yPercent: -102,
    duration: slabDur,
    stagger: 0.075,
    ease: 'power4.inOut',
  }, 'sweep+=0.1');

  tl.add(() => {
    charTweens.forEach((t) => t.kill());
    countTween.kill();
  }, 'sweep');

  return {
    destroy() {
      charTweens.forEach((t) => t.kill());
      countTween.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
      el.remove();
      document.documentElement.classList.remove('is-booting');
      lockLenis(false);
    },
  };
}
