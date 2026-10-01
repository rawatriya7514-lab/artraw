import { getIcon } from '../utils/icons.js';

export function createHero() {
  const section = document.createElement('section');
  section.className = 'hero';
  section.setAttribute('aria-labelledby', 'hero-title');
  section.id = 'home';

  section.innerHTML = `
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
    </div>
    <div class="hero-content">
      <div class="hero-copy">
        <p class="hero-kicker reveal">Umesh Kumar — ARTRAW</p>
        <h1 id="hero-title" class="hero-title reveal reveal-delay-1">
          <span class="hero-title-line">Creative work.</span>
          <span class="hero-title-line hero-title-accent">Digital systems.</span>
          <span class="hero-title-line">Built to ship.</span>
        </h1>
        <p class="hero-position reveal reveal-delay-2">Creative • Digital • Technology</p>
        <p class="hero-subtitle reveal reveal-delay-3">
          ARTRAW is the creative and stage brand of Umesh Kumar. Design, photo, video,
          branding, websites, AI apps, automation, and custom digital projects — one practice,
          made for people who need the work done properly.
        </p>
        <div class="hero-cta-group reveal reveal-delay-4">
          <a href="#contact" class="btn btn-primary btn-lg" data-magnetic>
            Start a Project
            ${getIcon('arrowRight')}
          </a>
          <a href="#work" class="btn btn-secondary btn-lg">View Work</a>
        </div>
      </div>
      <aside class="hero-panel reveal reveal-delay-5" aria-label="What ARTRAW covers">
        <p class="hero-panel-label">Practice</p>
        <ul class="hero-panel-list">
          <li><span>01</span> Graphic, photo &amp; brand</li>
          <li><span>02</span> Video, AI video &amp; 3D</li>
          <li><span>03</span> YouTube &amp; social</li>
          <li><span>04</span> Websites &amp; e-commerce</li>
          <li><span>05</span> Android, AI &amp; automation</li>
        </ul>
      </aside>
    </div>
  `;

  return section;
}

export function initHero() {
  return { destroy: () => {} };
}
