import './styles/main.css';
import './styles/components.css';

import { createNavigation, initNavigation } from './components/Navigation.js';
import { createHero, initHero } from './components/Hero.js';
import { createAboutPreview } from './components/AboutPreview.js';
import { createServicesPreview } from './components/ServicesPreview.js';
import { createSkills } from './components/Skills.js';
import { createWorkPreview } from './components/WorkPreview.js';
import { createCreativePreview } from './components/CreativePreview.js';
import { createProcess } from './components/Process.js';
import { createContactCTA } from './components/ContactCTA.js';
import { createFooter } from './components/Footer.js';
import { createServicesPage, initServicesPage } from './pages/ServicesPage.js';
import { createWorkPage, initWorkPage } from './pages/WorkPage.js';
import { createContactPage, initContactPage } from './pages/ContactPage.js';
import { createLegalPage } from './pages/LegalPage.js';
import { observeElementsOnce, prefersReducedMotion } from './utils/helpers.js';

const routes = {
  home: () => createHomePage(),
  services: () => createServicesPage(),
  work: () => createWorkPage(),
  contact: () => createContactPage(),
  privacy: () => createLegalPage('privacy'),
  terms: () => createLegalPage('terms')
};

let currentRoute = 'home';
let pageController = null;

function createHomePage() {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createHero());
  fragment.appendChild(createAboutPreview());
  fragment.appendChild(createServicesPreview());
  fragment.appendChild(createSkills());
  fragment.appendChild(createWorkPreview());
  fragment.appendChild(createCreativePreview());
  fragment.appendChild(createProcess());
  fragment.appendChild(createContactCTA());
  return fragment;
}

function createApp() {
  const app = document.getElementById('app');
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.className = 'skip-link';
  skip.textContent = 'Skip to main content';
  app.appendChild(skip);
  const nav = createNavigation();
  app.appendChild(nav);
  const main = document.createElement('main');
  main.id = 'main-content';
  // makes the skip link actually land somewhere focusable
  main.setAttribute('tabindex', '-1');
  app.appendChild(main);
  app.appendChild(createFooter());
  return { nav, main };
}

function pathToRoute(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return 'home';
  const name = clean.slice(1);
  return routes[name] ? name : 'home';
}

function routeToPath(route) {
  return route === 'home' ? '/' : `/${route}`;
}

function navigate(route, replace = false) {
  if (!routes[route]) route = 'home';
  const main = document.getElementById('main-content');
  if (!main) return;

  pageController?.destroy?.();
  window.scrollTo(0, 0);
  main.innerHTML = '';
  main.removeAttribute('tabindex');
  main.dataset.route = route;
  main.appendChild(routes[route]());
  currentRoute = route;

  if (route === 'home') {
    pageController = initHero(main.querySelector('.hero'));
    initReveal(main);
  } else if (route === 'services') {
    pageController = initServicesPage(main.querySelector('.services-page'));
  } else if (route === 'work') {
    pageController = initWorkPage(main.querySelector('.work-page'));
  } else if (route === 'contact') {
    pageController = initContactPage(main.querySelector('.contact-page'));
  } else {
    pageController = null;
    initReveal(main);
  }

  setActiveNav(route);
  syncMeta(route);

  // Announce the new page to assistive tech without stealing focus on first load.
  if (!replace) {
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  }

  if (!replace) {
    history.pushState({ route }, '', routeToPath(route) + window.location.search);
  }
}

const SITE_URL = 'https://artraw.dev';

const titles = {
  home: 'Umesh Kumar — ARTRAW | Creative • Digital • Technology',
  services: 'Services — Umesh Kumar / ARTRAW',
  work: 'Selected Work — Umesh Kumar / ARTRAW',
  contact: 'Start a Project — Umesh Kumar / ARTRAW',
  privacy: 'Privacy — Umesh Kumar / ARTRAW',
  terms: 'Terms — Umesh Kumar / ARTRAW'
};

const descriptions = {
  home: 'Umesh Kumar — ARTRAW. Creative • Digital • Technology. Design, video, websites, AI apps, automation, and custom digital projects.',
  services: 'Browse ARTRAW services — AI and automation, websites, design and branding, photo and video, music visuals, ecommerce, and business documentation assistance.',
  work: 'Selected work by Umesh Kumar / ARTRAW — projects that exist in this practice, with status stated as it is.',
  contact: 'Start a project with ARTRAW. Choose a service, describe what you need, and send a structured brief.',
  privacy: 'How ARTRAW handles enquiry data — replies only, no accounts, no selling of personal data.',
  terms: 'Terms for working with ARTRAW — enquiries are not contracts, and documentation help is assistance only.'
};

function syncMeta(route) {
  const title = titles[route] || titles.home;
  const description = descriptions[route] || descriptions.home;
  const path = routeToPath(route);
  const url = `${SITE_URL}${path}`;

  document.title = title;
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:url', url);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

function setMeta(attr, key, content) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setActiveNav(route) {
  document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
    const nav = link.dataset.nav;
    const active = nav === route;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function initReveal(container = document) {
  const nodes = container.querySelectorAll('.reveal');
  if (prefersReducedMotion()) {
    nodes.forEach(el => el.classList.add('visible'));
    return;
  }
  observeElementsOnce('.reveal', (el) => el.classList.add('visible'), { rootMargin: '0px 0px -40px 0px' });
}

function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const nav = document.querySelector('.nav');
  const top = target.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight || 0) - 8;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

function onClick(e) {
  const link = e.target.closest('a');
  if (!link) return;
  if (link.target === '_blank' || link.hasAttribute('download')) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;

  if (href.startsWith('#')) {
    e.preventDefault();
    if (currentRoute !== 'home') {
      navigate('home', false);
      requestAnimationFrame(() => scrollToHash(href));
    } else {
      scrollToHash(href);
    }
    return;
  }

  const url = new URL(href, window.location.origin);
  if (url.origin !== window.location.origin) return;
  const route = pathToRoute(url.pathname);
  if (!routes[route] && url.pathname !== '/') return;
  e.preventDefault();
  if (route === currentRoute && url.hash) {
    scrollToHash(url.hash);
    return;
  }
  navigate(route);
  if (url.hash) requestAnimationFrame(() => scrollToHash(url.hash));
  if (link.dataset.project) requestAnimationFrame(() => openProject(link.dataset.project));
}

function openProject(id) {
  const trigger = [...document.querySelectorAll('[data-open-project]')]
    .find(el => el.dataset.openProject === id);
  trigger?.click();
}

function init() {
  document.documentElement.setAttribute('data-theme', 'dark');
  const { nav } = createApp();
  const navController = initNavigation(nav);
  document.addEventListener('click', onClick);
  window.addEventListener('popstate', () => navigate(pathToRoute(window.location.pathname), true));
  navigate(pathToRoute(window.location.pathname), true);
  if (window.location.hash) requestAnimationFrame(() => scrollToHash(window.location.hash));
  window.addEventListener('beforeunload', () => {
    navController?.destroy();
    pageController?.destroy?.();
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
