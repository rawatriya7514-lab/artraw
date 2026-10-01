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
  nav.className = 'nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="nav-brand" aria-label="Umesh Kumar — ARTRAW, home" data-route="home">
        <span class="nav-brand-mark" aria-hidden="true">A</span>
        <span class="nav-brand-text"><strong>ARTRAW</strong><small>Umesh Kumar</small></span>
      </a>
      <ul class="nav-menu" role="menubar">
        ${navLinks.map(link => `
          <li role="none">
            <a href="${link.href}" class="nav-link" ${link.route ? `data-route="true" data-nav="${link.route}"` : ''} role="menuitem">${link.label}</a>
          </li>
        `).join('')}
      </ul>
      <div class="nav-cta">
        <a href="/contact" class="btn btn-primary btn-sm" data-route="true">Start a Project</a>
      </div>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        ${getIcon('menu')}
      </button>
    </div>
    <div class="nav-overlay" hidden></div>
    <div class="nav-mobile-menu" id="mobile-menu" hidden>
      <ul class="nav-mobile-links">
        ${navLinks.map(link => `
          <li>
            <a href="${link.href}" class="nav-mobile-link" ${link.route ? `data-route="true" data-nav="${link.route}"` : ''}>${link.label}</a>
          </li>
        `).join('')}
      </ul>
      <a href="/contact" class="btn btn-primary" data-route="true">Start a Project</a>
    </div>
  `;

  return nav;
}

export function initNavigation(navElement) {
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  const onScroll = () => navElement.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return { closeMenu, destroy: () => window.removeEventListener('scroll', onScroll) };
}
