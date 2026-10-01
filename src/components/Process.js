import { howIWorkSteps } from '../data/portfolio.js';

export function createProcess() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'process';
  section.setAttribute('aria-labelledby', 'process-title');

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Process</span>
        <h2 id="process-title" class="section-title">How a project moves</h2>
        <p class="section-description">
          A short path from brief to delivery. Scope stays written. Nothing starts as a contract
          until both sides agree.
        </p>
      </header>
      <ol class="process-grid">
        ${howIWorkSteps.map(step => `
          <li class="process-card reveal">
            <span class="process-num">${step.number}</span>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </li>
        `).join('')}
      </ol>
    </div>
  `;

  return section;
}
