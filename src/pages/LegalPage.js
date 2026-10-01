const pages = {
  privacy: {
    title: 'Privacy',
    body: `
      <p>Project enquiries are used only to reply to you. The contact form opens your own email app. This site does not run an account system and does not sell personal data.</p>
      <p>If you email a brief, that message stays in your mail client and mine. Do not send passwords, payment card numbers, or government ID scans in the first message.</p>
    `
  },
  terms: {
    title: 'Terms',
    body: `
      <p>Sending an enquiry is not a contract. Work starts only after scope, timeline, and payment are agreed in writing.</p>
      <p>ARTRAW provides creative, digital, and technical services. Documentation help for business processes is assistance only — not legal, tax, or government filing.</p>
      <p>Portfolio items describe work that exists. They are not a promise that the same result, timeline, or outcome will apply to your project.</p>
    `
  }
};

export function createLegalPage(id) {
  const page = pages[id] || pages.privacy;
  const section = document.createElement('section');
  section.className = 'section legal-page';
  section.innerHTML = `
    <div class="container legal-copy">
      <p class="section-label">ARTRAW</p>
      <h1 class="section-title">${page.title}</h1>
      ${page.body}
      <p><a href="/" data-route="home">Back home</a></p>
    </div>
  `;
  return section;
}
