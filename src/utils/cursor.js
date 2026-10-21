/**
 * ARTRAW — Luxury Interactive Cursor & Ambient Pointer Follower
 *
 * Silky smooth 60-120fps tracking using GSAP quickTo.
 * Active exclusively on pointer:fine (desktop mouse).
 * Completely disabled on touch / mobile devices (Android / iOS) to preserve
 * native touch performance and battery life.
 */

import { gsap } from 'gsap';

export function initCursor() {
  // Never run on touch devices or under reduced motion
  if (typeof window === 'undefined') return () => {};
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) return () => {};

  // Create cursor DOM elements if not already present
  let cursorDot = document.querySelector('.custom-cursor-dot');
  let cursorRing = document.querySelector('.custom-cursor-ring');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorDot);
  }

  if (!cursorRing) {
    cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';
    cursorRing.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorRing);
  }

  // Use gsap.quickTo for instant, zero-lag interpolation
  const setDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power3.out' });
  const setDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power3.out' });

  const setRingX = gsap.quickTo(cursorRing, 'x', { duration: 0.35, ease: 'power2.out' });
  const setRingY = gsap.quickTo(cursorRing, 'y', { duration: 0.35, ease: 'power2.out' });

  let isVisible = false;

  const onMouseMove = (e) => {
    if (!isVisible) {
      isVisible = true;
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    }

    setDotX(e.clientX);
    setDotY(e.clientY);
    setRingX(e.clientX);
    setRingY(e.clientY);

    const card = e.target.closest('.spec-col, .service-item-glass, .flagship-card-glass, .step-card-glass, .gallery-item, .skills-group');
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
  };

  const onMouseLeave = () => {
    isVisible = false;
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  };

  const onMouseEnter = () => {
    isVisible = true;
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  };

  const onMouseDown = () => {
    cursorRing.classList.add('cursor-active');
  };

  const onMouseUp = () => {
    cursorRing.classList.remove('cursor-active');
  };

  const onElementOver = (e) => {
    const target = e.target.closest('a, button, [data-magnetic], .service-item, .gallery-item, .flagship-scene, input, textarea, select');
    if (target) {
      cursorRing.classList.add('cursor-hover');
      cursorDot.classList.add('cursor-hover-dot');
    }
  };

  const onElementOut = (e) => {
    const target = e.target.closest('a, button, [data-magnetic], .service-item, .gallery-item, .flagship-scene, input, textarea, select');
    if (target) {
      cursorRing.classList.remove('cursor-hover');
      cursorDot.classList.remove('cursor-hover-dot');
    }
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onMouseLeave);
  document.documentElement.addEventListener('mouseenter', onMouseEnter);
  window.addEventListener('mousedown', onMouseDown, { passive: true });
  window.addEventListener('mouseup', onMouseUp, { passive: true });
  document.addEventListener('mouseover', onElementOver, { passive: true });
  document.addEventListener('mouseout', onElementOut, { passive: true });

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mouseover', onElementOver);
    document.removeEventListener('mouseout', onElementOut);
    cursorDot?.remove();
    cursorRing?.remove();
  };
}
