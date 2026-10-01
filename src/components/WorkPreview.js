import { getIcon } from '../utils/icons.js';
import { workProjects } from '../data/portfolio.js';

export function createWorkPreview() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'work';
  section.setAttribute('aria-labelledby', 'work-title');

  const featured = workProjects.slice(0, 6);

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Selected projects</span>
        <h2 id="work-title" class="section-title">Work that exists</h2>
        <p class="section-description">
          Real projects from this practice. Status is stated as it is — no invented clients,
          launch numbers, or testimonials.
        </p>
      </header>
      <div class="grid grid-3">
        ${featured.map(project => `
          <article class="card project-card reveal">
            <div class="project-visual project-visual-${project.accent}" aria-hidden="true">
              <span>${project.mark}</span>
            </div>
            <div class="card-content">
              <p class="project-kicker">${project.category}</p>
              <h3 class="card-title">${project.title}</h3>
              <p class="card-description">${project.tagline}</p>
              <p class="project-status">${project.statusLabel}</p>
              <a href="/work#${project.id}" class="btn btn-ghost" data-route="true" data-project="${project.id}">
                View project
                ${getIcon('arrowRight')}
              </a>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="section-cta reveal">
        <a href="/work" class="btn btn-secondary btn-lg" data-route="true">View all work</a>
      </div>
    </div>
  `;

  return section;
}
