/**
 * ARTRAW — Dynamic Island Navigation Bar
 *
 * Inspired by Aceternity / Skiper UI Dynamic Island.
 * - Desktop: Morphs smoothly from full header to a floating, centered glassmorphic pill on scroll.
 * - Mobile: Responsive top island with brand monogram, active route badge, and smooth full-sheet drawer.
 * - Preserves all routes, data-nav attributes, accessibility, and hash scroll links.
 */

import { getIcon } from '../utils/icons.js';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '/services', label: 'Services', route: 'services' },
  { href: '#skills', label: 'Capabilities' },
  { href: '/work', label: 'Work', route: 'work' },
  { href: '#process', label: 'Process' },
  { href: '/contact', label: 'Contact', route: 'contact' }
];

export function createNavigation() {
  const nav = document.createElement('nav');
  nav.className = 'nav dynamic-island-nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  nav.innerHTML = `
    <div class="nav-island-container">
      <div class="nav-island-bar" id="nav-island-bar">
        <a href="/" class="nav-brand" aria-label="ARTRAW, home" data-route="home">
          <span class="nav-brand-mark" aria-hidden="true">
            <svg class="nav-brand-avatar" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="7" fill="#070709"/>
              <path d="M8 23 L16 7 L24 23" fill="none" stroke="#ff2d4a" stroke-width="2"/>
              <path d="M11 18 H21" stroke="#3ee0ff" stroke-width="2"/>
            </svg>
          </span>
          <span class="nav-brand-text"><strong>ARTRAW</strong><small>Creative • Digital • Tech</small></span>
        </a>

        <ul class="nav-menu" role="menubar">
          ${navLinks.map(link => `
            <li role="none">
              <a href="${link.href}" class="nav-link" ${link.route ? `data-route="true" data-nav="${link.route}"` : ''} role="menuitem">${link.label}</a>
            </li>
          `).join('')}
        </ul>

        <div class="nav-cta">
          <a href="/contact" class="btn btn-primary btn-sm" data-route="true" data-magnetic>Start a Project</a>
        </div>

        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          ${getIcon('menu')}
        </button>
      </div>
    </div>

    <div class="nav-overlay" hidden></div>
    <div class="nav-mobile-menu" id="mobile-menu" hidden>
      <div class="nav-mobile-header">
        <span class="mobile-island-pill"><span class="pulse-dot"></span> ARTRAW DIRECTORY</span>
      </div>
      <ul class="nav-mobile-links">
        ${navLinks.map(link => `
          <li>
            <a href="${link.href}" class="nav-mobile-link" ${link.route ? `data-route="true" data-nav="${link.route}"` : ''}>${link.label}</a>
          </li>
        `).join('')}
      </ul>
      <div class="nav-mobile-cta">
        <a href="/contact" class="btn btn-primary btn-lg" data-route="true">Start a Project</a>
      </div>
    </div>
  `;

  return nav;
}

export function initNavigation(navElement) {
  if (!navElement || typeof window === 'undefined') return { closeMenu() {}, destroy() {} };

  const islandBar = navElement.querySelector('#nav-island-bar');
  const toggle = navElement.querySelector('.nav-toggle');
  const menu = navElement.querySelector('.nav-mobile-menu');
  const overlay = navElement.querySelector('.nav-overlay');

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = getIcon('menu');
    menu.classList.remove('open');
    menu.hidden = true;
    overlay.hidden = true;
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    toggle.innerHTML = getIcon('close');
    menu.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(() => {
      menu.classList.add('open');
      overlay.classList.add('visible');
    });
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  navElement.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || !navElement.contains(link)) return;
    if (menu.contains(link) || link.classList.contains('nav-mobile-link') || link.closest('.nav-mobile-menu')) {
      closeMenu();
    }
  });

  const onKeydown = (e) => {
    if (e.key === 'Escape') closeMenu();
  };
  document.addEventListener('keydown', onKeydown);

  // Dynamic Island Morphing on scroll
  const onScroll = () => {
    const isScrolled = window.scrollY > 40;
    navElement.classList.toggle('scrolled', isScrolled);
    islandBar?.classList.toggle('island-condensed', isScrolled);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return {
    closeMenu,
    destroy: () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeydown);
    }
  };
}
