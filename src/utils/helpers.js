export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
