import { getIcon } from '../utils/icons.js';

export function createLabPreview() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'lab';
  section.setAttribute('aria-labelledby', 'lab-title');

  const builds = [
    {
      title: 'artraw-cli',
      description: 'Zero-config CLI for scaffolding AI-powered projects with built-in best practices.',
      status: 'v2.1.0',
      stars: '2.4k',
      language: 'TypeScript',
      link: '#',
      accent: 'green'
    },
    {
      title: 'neural-config',
      description: 'Type-safe configuration system for ML pipelines with schema validation and hot-reload.',
      status: 'v1.3.0',
      stars: '890',
      language: 'Go',
      link: '#',
      accent: 'red'
    },
    {
      title: 'creative-coding-starter',
      description: 'Batteries-included template for WebGL/Canvas creative coding with live reload and deploy.',
      status: 'v0.9.0',
      stars: '1.1k',
      language: 'TypeScript',
      link: '#',
      accent: 'gold'
    },
    {
      title: 'auto-docs',
      description: 'AI-powered documentation generator that stays in sync with your codebase automatically.',
      status: 'v0.5.0',
      stars: '340',
      language: 'Python',
      link: '#',
      accent: 'green'
    }
  ];

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Lab</span>
        <h2 id="lab-title" class="section-title">Build Lab</h2>
        <p class="section-description">
          Open-source tools, libraries, and frameworks I maintain. Built for developers who care
          about developer experience, type safety, and clean abstractions.
        </p>
      </header>
      <div class="grid grid-4">
        ${builds.map((build, index) => `
          <article class="card reveal reveal-delay-${index + 1}" data-accent="${build.accent}">
            <div class="card-content">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
                <span style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-${build.accent});">${build.status}</span>
                <span style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-fg-subtle);">${build.language}</span>
              </div>
              <h3 class="card-title" style="font-family: var(--font-mono); font-size: var(--fs-lg);">${build.title}</h3>
              <p class="card-description">${build.description}</p>
              <div style="display: flex; align-items: center; gap: var(--space-lg); margin-top: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--color-border);">
                <span style="display: flex; align-items: center; gap: var(--space-xs); font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-fg-subtle);">
                  ${getIcon('sparkles')}
                  <span>${build.stars}</span>
                </span>
                <a href="${build.link}" class="btn btn-ghost btn-sm">
                  View on GitHub
                  ${getIcon('external')}
                </a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="reveal" style="margin-top: var(--space-3xl); text-align: center;">
        <a href="#lab" class="btn btn-secondary btn-lg">Explore All Repositories</a>
      </div>
    </div>
  `;

  return section;
}