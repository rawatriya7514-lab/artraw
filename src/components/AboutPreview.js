import { getIcon } from '../utils/icons.js';

export function createAboutPreview() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'about';
  section.setAttribute('aria-labelledby', 'about-title');

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">About</span>
        <h2 id="about-title" class="section-title">Umesh Kumar, working as ARTRAW</h2>
        <p class="section-description">
          Umesh Kumar is the person. ARTRAW is the creative and stage brand.
          The work sits across design, media, websites, apps, and technical builds —
          practical digital projects, not a fake agency story.
        </p>
      </header>
      <div class="grid grid-3">
        <article class="card reveal reveal-delay-1">
          <div class="card-content">
            <div class="card-icon" aria-hidden="true">${getIcon('palette')}</div>
            <h3 class="card-title">Creative</h3>
            <p class="card-description">
              Graphic and Photoshop work, branding, photo and design, music and artist visuals,
              thumbnails, and campaign creatives.
            </p>
          </div>
        </article>
        <article class="card reveal reveal-delay-2">
          <div class="card-content">
            <div class="card-icon" aria-hidden="true">${getIcon('film')}</div>
            <h3 class="card-title">Digital</h3>
            <p class="card-description">
              Video editing, AI and product video, 3D and animation, YouTube and social media,
              e-commerce listings, and content support.
            </p>
          </div>
        </article>
        <article class="card reveal reveal-delay-3">
          <div class="card-content">
            <div class="card-icon" aria-hidden="true">${getIcon('cpu')}</div>
            <h3 class="card-title">Technology</h3>
            <p class="card-description">
              Website development, Android and AI apps, AI automation and assistants,
              Termux and Linux technical work, and custom digital projects.
            </p>
          </div>
        </article>
      </div>
    </div>
  `;

  return section;
}
