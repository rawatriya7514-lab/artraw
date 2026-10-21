/**
 * ARTRAW — Scroll Progress Indicator & Floating Back-To-Top Navigator
 *
 * - Pinned laser progress line at the very top of the viewport.
 * - Circular progress floating pill with smooth Lenis-powered return to top.
 * - Accessible, ultra-lightweight, zero jank.
 */

import { scrollTo } from '../utils/scroll.js';

export function createScrollProgress() {
  const container = document.createElement('div');
  container.className = 'scroll-ui-container';
  container.setAttribute('aria-hidden', 'true');

  container.innerHTML = `
    <!-- Laser Progress Bar at very top of screen -->
    <div class="scroll-laser-progress" id="scroll-laser-bar"></div>

    <!-- Floating Back to Top Button with Circular Progress -->
    <button class="scroll-top-btn" id="scroll-top-btn" type="button" aria-label="Back to top" title="Back to top">
      <svg class="scroll-top-ring" viewBox="0 0 36 36">
        <path class="scroll-ring-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="scroll-ring-fill" id="scroll-ring-fill"
              stroke-dasharray="100, 100"
              stroke-dashoffset="100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
      <span class="scroll-top-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </span>
    </button>
  `;

  return container;
}

export function initScrollProgress(element) {
  if (!element || typeof window === 'undefined') return () => {};

  const laserBar = element.querySelector('#scroll-laser-bar');
  const topBtn = element.querySelector('#scroll-top-btn');
  const ringFill = element.querySelector('#scroll-ring-fill');

  let ticking = false;

  function update() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;
    const percentage = Math.round(progress * 100);

    if (laserBar) {
      laserBar.style.transform = `scaleX(${progress})`;
    }

    if (ringFill) {
      ringFill.style.strokeDashoffset = `${100 - percentage}`;
    }

    if (topBtn) {
      if (scrollY > 350) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    }

    ticking = false;
  }

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  const onTopClick = (e) => {
    e.preventDefault();
    scrollTo(0, { duration: 1.2, offset: 0 });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  topBtn?.addEventListener('click', onTopClick);

  // Initial update
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    topBtn?.removeEventListener('click', onTopClick);
  };
}
