/**
 * ARTRAW — Magnetic button
 * Vanilla JS magnetic hover effect for [data-magnetic] buttons.
 * Uses transforms/opacity only; disabled under prefers-reduced-motion and touch devices.
 * `scope` limits query to a subtree (default: document) so route-specific buttons
 * can be (re)initialized without duplicating listeners on persistent chrome.
 */

export function initMagnetic(scope = document) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  if (prefersReduced || isTouch) return () => {};

  const buttons = scope.querySelectorAll('[data-magnetic]');
  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', handleMove);
    btn.addEventListener('mouseleave', handleLeave);
  });

  function handleMove(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  }

  function handleLeave() {
    this.style.transform = 'translate(0, 0)';
    this.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
  }

  return () => {
    buttons.forEach((btn) => {
      btn.removeEventListener('mousemove', handleMove);
      btn.removeEventListener('mouseleave', handleLeave);
      btn.style.transform = '';
    });
  };
}
