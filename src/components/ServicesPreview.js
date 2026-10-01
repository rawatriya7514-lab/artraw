import { getIcon } from '../utils/icons.js';

const services = [
  { icon: 'palette', title: 'Graphic / Photoshop', text: 'Layouts, compositing, retouch, posters, banners, and print-ready files.' },
  { icon: 'badge', title: 'Branding', text: 'Logos, identity systems, business cards, and brand application.' },
  { icon: 'image', title: 'Photo / Design', text: 'Photo editing, product images, backgrounds, and visual presentation.' },
  { icon: 'film', title: 'Video Editing', text: 'Long-form, reels, shorts, YouTube edits, and cinematic cuts.' },
  { icon: 'sparkles', title: 'AI Video / Product Video', text: 'AI-assisted video, product films, and motion-ready exports.' },
  { icon: 'box', title: '3D / Animation', text: '3D concepts, CGI-style visuals, 2D animation, and motion graphics.' },
  { icon: 'youtube', title: 'YouTube / Thumbnail / Social', text: 'Thumbnails, channel art, posts, and social creative systems.' },
  { icon: 'music', title: 'Music / Artist Creative', text: 'Cover art, song posters, visualizers, and artist branding.' },
  { icon: 'globe', title: 'Website Development', text: 'Business sites, portfolios, landing pages, and redesigns.' },
  { icon: 'cpu', title: 'Android / AI Apps', text: 'Android concepts, on-device AI ideas, and app prototypes.' },
  { icon: 'zap', title: 'AI Automation', text: 'Workflows that replace repetitive document and data tasks.' },
  { icon: 'brain', title: 'AI Assistants', text: 'Assistant concepts, chatbot setup, and conversation design.' },
  { icon: 'shoppingCart', title: 'E-commerce', text: 'Stores, catalogs, and product presentation for selling online.' },
  { icon: 'layers', title: 'Product Listing', text: 'Listing copy, images, and catalog prep for marketplaces.' },
  { icon: 'layout', title: 'Digital Business Setup', text: 'Profiles, forms, QR menus, catalogs, and online presence.' },
  { icon: 'fileText', title: 'Content / Marketing', text: 'Creatives and content support for campaigns and channels.' },
  { icon: 'code', title: 'Termux / Linux / Dev', text: 'Scripts, developer tooling, and technical environment work.' },
  { icon: 'send', title: 'Custom Digital Projects', text: 'Scoped builds that do not fit a single service line.' }
];

export function createServicesPreview() {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'services';
  section.setAttribute('aria-labelledby', 'services-title');

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Services</span>
        <h2 id="services-title" class="section-title">What ARTRAW does</h2>
        <p class="section-description">
          Creative, digital, and technical work — organized so you can see the range
          before starting a project.
        </p>
      </header>
      <div class="service-az" role="list">
        ${services.map((service, index) => `
          <article class="service-az-item reveal" role="listitem" style="transition-delay:${Math.min(index, 8) * 40}ms">
            <div class="service-az-icon" aria-hidden="true">${getIcon(service.icon)}</div>
            <h3>${service.title}</h3>
            <p>${service.text}</p>
          </article>
        `).join('')}
      </div>
      <div class="section-cta reveal">
        <a href="/services" class="btn btn-primary btn-lg" data-route="true">Browse the full service list</a>
      </div>
    </div>
  `;

  return section;
}
