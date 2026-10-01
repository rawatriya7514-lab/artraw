import { getIcon } from '../utils/icons.js';

export function createContactCTA() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'contact';
  section.setAttribute('aria-labelledby', 'contact-title');

  section.innerHTML = `
    <div class="container">
      <div class="contact-panel reveal">
        <p class="section-label">Work with me</p>
        <h2 id="contact-title">Build Something Different.</h2>
        <p>
          Design, video, a website, an app, automation, or a custom digital job — tell me what
          you need and get a structured brief you can review before sending. This is an enquiry,
          not a contract.
        </p>
        <div class="hero-cta-group">
          <a href="/contact" class="btn btn-primary btn-lg" data-route="true">
            Start a Project
            ${getIcon('arrowRight')}
          </a>
          <a href="/work" class="btn btn-secondary btn-lg" data-route="true">View Work</a>
        </div>
        <p class="contact-note">Based remotely in India · IST (UTC+5:30). Social profiles are added when they are live.</p>
      </div>
    </div>
  `;

  return section;
}
