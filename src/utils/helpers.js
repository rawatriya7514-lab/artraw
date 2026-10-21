export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detect test/headless environments (JSDOM & friends) where cinematic
 * animations should be skipped so DOM state applies synchronously.
 * Mirrors the detection used in utils/scroll.js.
 */
export function isHeadlessEnv() {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  const ua = window.navigator?.userAgent || '';
  return ua.includes('jsdom') || ua.includes('Node');
}

function observeElements(selector, callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { ...defaultOptions, ...options });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
  return observer;
}

export function observeElementsOnce(selector, callback, options = {}) {
  return observeElements(selector, callback, options);
}

/**
 * Resolve a root-relative asset path against the build base URL, so the site
 * works identically when served from GitHub Pages (/artraw/) or a root
 * domain or the GitHub Pages root (rawatriya7514-lab.github.io/artraw/). Usage: `asset('/assets/images/foo.png')`.
 */
export function asset(path) {
  if (!path) return path;
  if (!path.startsWith('/')) return path;
  const base = import.meta.env?.BASE_URL ?? '/';
  return base.replace(/\/$/, '') + path;
}
