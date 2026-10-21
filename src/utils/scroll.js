/**
 * ARTRAW — Animation & Smooth Scroll Foundation
 *
 * Coordinated animation loop: Lenis (smooth scroll) + GSAP ScrollTrigger.
 * - PC / Desktop: inertia smooth scrolling with Lenis.
 * - Mobile / Android: native momentum scroll with synchronized ScrollTrigger updates.
 * - Universal fallback for JSDOM / test runners.
 * - Respects prefers-reduced-motion.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Global state ---------------- */
let lenis = null;
let tickerFn = null;
let isInitialized = false;
let currentController = null;
let scrollListener = null;

/* ---------------- Init / teardown ---------------- */

/**
 * Initialize Lenis + ScrollTrigger with a single coordinated animation loop.
 * Returns { destroy, lenis, refresh, prefersReduced }.
 */
export function initScroll() {
  if (isInitialized && currentController) {
    return currentController;
  }

  // Graceful fallback for non-browser / test environments
  const isJSDOM =
    typeof window === 'undefined' ||
    !window.matchMedia ||
    window.navigator?.userAgent?.includes('jsdom') ||
    window.navigator?.userAgent?.includes('Node');

  if (isJSDOM) {
    currentController = {
      destroy() { isInitialized = false; },
      lenis: () => null,
      refresh() {},
      prefersReduced: true,
    };
    isInitialized = true;
    return currentController;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(2, -10 * t), // smooth ease-out
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false, // native momentum scrolling on Android / iOS
        touchMultiplier: 1.8,
        infinite: false,
      });

      // Lenis tells ScrollTrigger to update each frame
      lenis.on('scroll', ScrollTrigger.update);

      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(500, 33);
    } catch {
      lenis = null;
    }

    // Touch device native scroll listener to ensure ScrollTrigger updates on Android
    scrollListener = () => ScrollTrigger.update();
    window.addEventListener('scroll', scrollListener, { passive: true });
  }

  ScrollTrigger.config({ ignoreMobileResize: true });

  const refresh = () => ScrollTrigger.refresh();

  if (!prefersReduced) {
    requestAnimationFrame(refresh);
  } else {
    refresh();
  }

  isInitialized = true;

  currentController = {
    destroy() {
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
        lenis = null;
      }
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      if (scrollListener) {
        window.removeEventListener('scroll', scrollListener);
        scrollListener = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      isInitialized = false;
      currentController = null;
    },
    lenis: () => lenis,
    refresh,
    prefersReduced,
  };
  return currentController;
}

/**
 * Lock / unlock Lenis smooth scrolling (used by the preloader & route FX).
 * A CSS class fallback guarantees the lock even when Lenis is unavailable.
 */
export function lockLenis(locked) {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('is-scroll-locked', !!locked);
  }
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
}

/**
 * Scroll to a position via Lenis (smooth) or natively (fallback).
 */
export function scrollTo(target, options = {}) {
  const offset = options.offset || 0;
  let top = 0;

  if (typeof target === 'number') {
    top = target;
  } else if (target instanceof HTMLElement) {
    const nav = document.querySelector('.nav');
    top =
      target.getBoundingClientRect().top +
      window.scrollY -
      (nav ? nav.offsetHeight : 0) -
      offset;
  }

  if (lenis) {
    lenis.scrollTo(top, { duration: options.duration || 1, ...options });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top, behavior: options.behavior || 'smooth' });
  }
}

/* ---------------- Reusable animation factories ---------------- */

function toElementsArray(elements) {
  if (!elements) return [];
  if (Array.isArray(elements)) return elements;
  if (typeof elements.forEach === 'function') return Array.from(elements);
  if (typeof elements === 'string' && typeof document !== 'undefined') {
    return Array.from(document.querySelectorAll(elements));
  }
  return [elements];
}

/**
 * Fade-up GPU-accelerated reveal for elements.
 */
export function revealOnEnter(elements, { once = true, start = 'top 85%', stagger = 0 } = {}) {
  if (typeof window === 'undefined') return () => {};

  const nodeList = toElementsArray(elements);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodeList.forEach((el) => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
      }
    });
    return () => {};
  }

  const kills = [];
  nodeList.forEach((el, i) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 30, force3D: true });
    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      delay: i * stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        once,
        toggleActions: 'play none none none',
      },
    });
    kills.push(() => anim.scrollTrigger?.kill(), () => anim.kill());
  });

  return () => {
    kills.forEach((kill) => kill());
  };
}

/**
 * Staggered text reveal: splits target text into spans and animates on enter.
 */
export function staggerText(elementOrSelector, {
  split = 'chars',
  once = true,
  start = 'top 85%',
  stagger = 0.04,
  duration = 0.6,
} = {}) {
  if (typeof window === 'undefined') return () => {};

  const el =
    typeof elementOrSelector === 'string' && typeof document !== 'undefined'
      ? document.querySelector(elementOrSelector)
      : elementOrSelector;
  if (!el) return () => {};

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.style.opacity = '1';
    return () => {};
  }

  const originalText = el.textContent;
  const parts = split === 'words' ? originalText.split(/\s+/) : split === 'lines' ? originalText.split(/\n/) : originalText.split('');

  el.innerHTML = '';
  parts.forEach((part, i) => {
    const span = document.createElement('span');
    span.textContent = split === 'words' ? part + (i < parts.length - 1 ? ' ' : '') : part;
    span.style.display = 'inline-block';
    gsap.set(span, { opacity: 0, y: 24, force3D: true });
    el.appendChild(span);
  });

  const spans = el.querySelectorAll('span');
  const kills = [];
  spans.forEach((span, i) => {
    const anim = gsap.to(span, {
      opacity: 1,
      y: 0,
      duration,
      delay: i * stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        once,
        toggleActions: 'play none none none',
      },
    });
    kills.push(() => anim.scrollTrigger?.kill(), () => anim.kill());
  });

  return () => {
    kills.forEach((kill) => kill());
    el.innerHTML = originalText;
  };
}

/**
 * Layered parallax.
 */
export function parallax(elementsOrSelector, { ease = 'none' } = {}) {
  if (typeof window === 'undefined') return () => {};

  const nodeList = toElementsArray(elementsOrSelector);

  const kills = [];
  nodeList.forEach((el) => {
    if (!el) return;
    const depth = parseFloat(el.dataset.depth || '0.1');
    const anim = gsap.to(el, {
      yPercent: () => -depth * 100,
      ease,
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    kills.push(() => anim.scrollTrigger?.kill(), () => anim.kill());
  });

  return () => {
    kills.forEach((kill) => kill());
  };
}

/**
 * gsap.matchMedia wrapper.
 */
export function matchMedia() {
  const mm = gsap.matchMedia();
  return {
    add: (query, fn) => mm.add(query, fn),
    revert: () => mm.revert(),
  };
}

/**
 * Scrubbed GSAP timeline helper.
 */
export function scrubTimeline(opts = {}) {
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    pin = false,
    anticipatePin = 0,
  } = opts;

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      pin,
      anticipatePin,
      invalidateOnRefresh: true,
    },
  });

  return {
    timeline: tl,
    kill: () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    },
  };
}
