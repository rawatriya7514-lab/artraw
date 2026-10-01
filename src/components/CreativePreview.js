import { getIcon } from '../utils/icons.js';
import { creativeWorks } from '../data/portfolio.js';

export function createCreativePreview() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'creative';
  section.setAttribute('aria-labelledby', 'creative-title');

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Creative / technology</span>
        <h2 id="creative-title" class="section-title">How the work shows up</h2>
        <p class="section-description">
          Directions tied to real ARTRAW projects. Visuals here are original marks for those
          projects — not stock case studies and not unpublished client campaigns.
        </p>
      </header>
      <div class="grid grid-3">
        ${creativeWorks.map(work => `
          <article class="card reveal">
            <div class="project-visual project-visual-${work.accent}" aria-hidden="true">
              <span>${work.mark}</span>
            </div>
            <div class="card-content">
              <p class="project-kicker">${work.kind}</p>
              <h3 class="card-title">${work.title}</h3>
              <p class="card-description">${work.description}</p>
              <a href="/work" class="btn btn-ghost" data-route="true">
                Open in work
                ${getIcon('arrowRight')}
              </a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}
