import { skillGroups } from '../data/skills.js';

export function createSkills() {
  const section = document.createElement('section');
  section.className = 'section section-tight';
  section.id = 'skills';
  section.setAttribute('aria-labelledby', 'skills-title');

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Capabilities</span>
        <h2 id="skills-title" class="section-title">Skills, A to Z</h2>
        <p class="section-description">
          The same practice, grouped so a brief can start from the right letter.
        </p>
      </header>
      <div class="skills-index" role="list">
        ${skillGroups.map(group => `
          <article class="skills-card reveal" role="listitem">
            <span class="skills-letter" aria-hidden="true">${group.letter}</span>
            <div>
              <h3>${group.title}</h3>
              <p>${group.summary}</p>
              <ul>
                ${group.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}
