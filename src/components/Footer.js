export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('role', 'contentinfo');
  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="footer-logo" data-route="home" aria-label="ARTRAW home">
            <span>ARTRAW</span>
          </a>
          <p class="footer-tagline">Umesh Kumar — Creative • Digital • Technology.</p>
        </div>
        <nav class="footer-nav" aria-label="Explore">
          <h3 class="footer-column-title">Explore</h3>
          <ul class="footer-links">
            <li><a href="#about" class="footer-link">About</a></li>
            <li><a href="/services" class="footer-link" data-route="true">Services</a></li>
            <li><a href="#skills" class="footer-link">Capabilities</a></li>
            <li><a href="/work" class="footer-link" data-route="true">Selected work</a></li>
          </ul>
        </nav>
        <nav class="footer-nav" aria-label="Work with ARTRAW">
          <h3 class="footer-column-title">Work with me</h3>
          <ul class="footer-links">
            <li><a href="#process" class="footer-link">Process</a></li>
            <li><a href="/contact" class="footer-link" data-route="true">Start a Project</a></li>
            <li><a href="#creative" class="footer-link">Creative work</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; ${year} Umesh Kumar — ARTRAW.</p>
        <ul class="footer-legal">
          <li><a href="/privacy" class="footer-link" data-route="true">Privacy</a></li>
          <li><a href="/terms" class="footer-link" data-route="true">Terms</a></li>
        </ul>
      </div>
    </div>
  `;

  return footer;
}
