/**
 * ARTRAW — Velocity-Responsive Cyber Marquee Ticker
 * Inspired by Awwwards Site of the Day / Studio Freight scrollytelling tickers.
 *
 * - Dual-track opposing infinite marquee.
 * - Reactive to scroll velocity: accelerating dynamically when the user scrolls faster.
 * - Hardware accelerated with translate3d and CSS transform.
 * - Respects prefers-reduced-motion.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TRACK_1_ITEMS = [
  '01 // AUTONOMOUS EDGE AI',
  '02 // HIGH-VELOCITY WEB SYSTEMS',
  '03 // QUALCOMM 8-CORE DSP',
  '04 // KOTLIN NATIVE SDK 36',
  '05 // NO SYSTEM IS SAFE',
  '06 // ART IS MY CODE · UMESH KUMAR',
  '07 // LOCKED 60-120FPS CHOREOGRAPHY',
  '08 // ZERO FABRICATION · REAL CODE',
];

const TRACK_2_ITEMS = [
  'LUCY ON-DEVICE VOICE AI',
  'ARTRAW OS TERMUX WORKSTATION',
  'ARTFILES STORAGE UTILITY (API 36)',
  'OPENCLAW / OMNIROUTE MODEL DISPATCH',
  'HF RECORD CRIMSON EMBLEM',
  'RAMART COMMERCE CATALOG',
  'AYURVEDA GLOBAL NEXT.JS STORE',
  'ZAFIRO GL SHADER EXPERIMENTS',
];

export function createTicker() {
  const section = document.createElement('aside');
  section.className = 'cyber-ticker-section';
  section.setAttribute('aria-label', 'System Capabilities and Practice Ticker');

  // Double items for seamless loop
  const t1Html = [...TRACK_1_ITEMS, ...TRACK_1_ITEMS, ...TRACK_1_ITEMS].map((item) => `
    <span class="ticker-item t1-item">
      <span class="ticker-dot red"></span>
      <span class="ticker-text">${item}</span>
    </span>
  `).join('');

  const t2Html = [...TRACK_2_ITEMS, ...TRACK_2_ITEMS, ...TRACK_2_ITEMS].map((item) => `
    <span class="ticker-item t2-item">
      <span class="ticker-dot cyan"></span>
      <span class="ticker-text-outline">${item}</span>
    </span>
  `).join('');

  section.innerHTML = `
    <div class="ticker-wrapper">
      <div class="ticker-track-wrap track-left-wrap">
        <div class="ticker-track track-left" id="ticker-track-1">
          ${t1Html}
        </div>
      </div>
      <div class="ticker-track-wrap track-right-wrap">
        <div class="ticker-track track-right" id="ticker-track-2">
          ${t2Html}
        </div>
      </div>
    </div>
  `;

  return section;
}

export function initTicker(section) {
  if (!section || typeof window === 'undefined') return { destroy() {} };

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return { destroy() {} };

  const track1 = section.querySelector('#ticker-track-1');
  const track2 = section.querySelector('#ticker-track-2');
  if (!track1 || !track2) return { destroy() {} };

  let currentSpeed1 = 1;
  let currentSpeed2 = -1;
  let baseVelocity = 1;
  let xPos1 = 0;
  let xPos2 = 0;

  // Velocity clamp for ultra smooth acceleration
  const velClamp = gsap.utils.clamp(-8, 8);

  const scrollTrigger = ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const v = velClamp(self.getVelocity() / 300);
      baseVelocity = v !== 0 ? v : 1;
    },
  });

  let animFrameId = null;

  function renderLoop() {
    // Smoothly decay velocity back to baseline 1
    currentSpeed1 += (baseVelocity - currentSpeed1) * 0.08;
    currentSpeed2 += (-baseVelocity - currentSpeed2) * 0.08;

    xPos1 -= (0.8 + Math.abs(currentSpeed1) * 0.6) * (currentSpeed1 >= 0 ? 1 : -1);
    xPos2 += (0.8 + Math.abs(currentSpeed2) * 0.6) * (currentSpeed2 >= 0 ? 1 : -1);

    // Loop seamless wrapping at 50%
    const halfWidth1 = track1.scrollWidth / 2;
    if (Math.abs(xPos1) >= halfWidth1) xPos1 = 0;

    const halfWidth2 = track2.scrollWidth / 2;
    if (Math.abs(xPos2) >= halfWidth2) xPos2 = 0;

    track1.style.transform = `translate3d(${xPos1}px, 0, 0)`;
    track2.style.transform = `translate3d(${xPos2}px, 0, 0)`;

    // Reset base velocity towards 1 if stationary
    baseVelocity += (1 - baseVelocity) * 0.05;

    animFrameId = requestAnimationFrame(renderLoop);
  }

  animFrameId = requestAnimationFrame(renderLoop);

  return {
    destroy() {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      scrollTrigger.kill();
      gsap.set([track1, track2], { clearProps: 'transform' });
    },
  };
}
