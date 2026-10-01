import { getIcon } from '../utils/icons.js';
import {
  enquiryCategories,
  faqs,
  disclaimers,
  projectBudgets,
  deadlineOptions,
  enquiryStatusNotice,
  isAssistanceCategory,
  assistanceNotice,
  contactConfig,
  CONTACT_READY
} from '../data/contact.js';
import { getServiceById } from '../data/services.js';

const MAX_REFERENCE_BYTES = 8 * 1024 * 1024;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function strip(value) {
  return String(value).replace(/\*\*/g, '');
}

const CATEGORY_TO_ENQUIRY = {
  'ai-technology': 'AI / Automation',
  'website-digital': 'Website',
  'design-branding': 'Logo / Branding',
  'photo-video': 'Video Editing',
  'music-creative': 'Music Creative',
  'social-youtube': 'YouTube',
  'ecommerce': 'Ecommerce',
  'food-local-business': 'Zomato / Swiggy',
  'business-documentation': 'Documentation / Application Assistance',
  'other-digital': 'Other'
};

function normalizeLabel(value) {
  return String(value)
    .toLowerCase()
    .replace(/\b(assistance|setup|service|services|system|support|work)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function resolveEnquiryGroup(serviceId, categoryId) {
  const direct = enquiryCategories.find(cat =>
    (cat.services || []).some(entry => entry.id === serviceId)
  );
  if (direct) return direct.label;

  const mapped = CATEGORY_TO_ENQUIRY[categoryId];
  if (!mapped) return null;
  return enquiryCategories.some(cat => cat.label === mapped) ? mapped : null;
}

const STOP_WORDS = new Set([
  'and', 'the', 'for', 'with', 'from', 'into', 'your', 'you', 'are', 'not',
  'based', 'custom', 'other', 'related', 'process', 'assistance', 'setup',
  'service', 'services', 'system', 'support', 'work', 'online', 'digital',
  'creative', 'style', 'level', 'using', 'via', 'plus'
]);

function tokenize(value) {
  return normalizeLabel(value)
    .split(' ')
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

function findServiceOption(category, serviceId, serviceTitle) {
  const entries = category.services || [];
  if (!entries.length) return null;

  const byId = entries.find(entry => entry.id === serviceId);
  if (byId) return byId;

  const targetTokens = tokenize(serviceTitle);
  if (!targetTokens.length) return entries[0];

  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    const labelTokens = new Set(tokenize(entry.label));
    if (!labelTokens.size) continue;
    const hits = targetTokens.filter(token => labelTokens.has(token)).length;
    if (!hits) continue;
    const score = hits / Math.max(labelTokens.size, targetTokens.length);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 0.34 ? best : entries[0];
}

export function createContactPage() {
  const section = document.createElement('section');
  section.className = 'contact-page section';
  section.setAttribute('aria-labelledby', 'contact-page-title');

  section.innerHTML = `
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Work with me</span>
        <h1 id="contact-page-title" class="section-title">Build Something Different.</h1>
        <p class="section-description">
          Pick a service, describe what you need, and send a structured brief. This is an enquiry,
          not a contract — nothing is submitted anywhere until you review it and press send.
        </p>
      </header>

      <section class="brief-steps reveal reveal-delay-1" aria-label="How the brief works">
        ${['Choose a category', 'Add the details', 'Review and send'].map((label, index) => `
          <div class="brief-step">
            <span class="brief-step-num">0${index + 1}</span>
            <span class="brief-step-label">${label}</span>
          </div>
        `).join('')}
      </section>

      <div class="quick-categories reveal reveal-delay-1" role="group" aria-label="Quick categories">
        ${enquiryCategories.map(cat => `
          <button type="button" class="quick-chip" data-quick-category="${cat.id}">
            ${getIcon(cat.icon)}
            <span>${escapeHtml(cat.label)}</span>
          </button>
        `).join('')}
      </div>

      <div class="contact-layout">
        <form class="contact-form reveal" id="contact-form" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name <span class="required-mark">*</span></label>
              <input id="name" name="name" type="text" required autocomplete="name" placeholder="Your name">
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="phone">Phone / WhatsApp <span class="required-mark">*</span></label>
              <input id="phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+91 98XXX XXXXX">
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email <span class="required-mark">*</span></label>
              <input id="email" name="email" type="email" required autocomplete="email" inputmode="email" placeholder="you@email.com">
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="business">Business / Brand</label>
              <input id="business" name="business" type="text" autocomplete="organization" placeholder="Optional — your business name">
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category">Service category <span class="required-mark">*</span></label>
              <select id="category" name="category" required>
                <option value="">Select a service area</option>
                ${enquiryCategories.map(cat => `<option value="${cat.id}">${escapeHtml(cat.label)}</option>`).join('')}
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="service">Specific service <span class="required-mark">*</span></label>
              <select id="service" name="service" required disabled>
                <option value="">Select a category first</option>
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <p class="assistance-notice" id="assistance-notice" hidden>
            ${getIcon('alertTriangle')}
            <span>${escapeHtml(assistanceNotice)}</span>
          </p>

          <div class="form-group">
            <label for="description">Project description <span class="required-mark">*</span></label>
            <textarea id="description" name="description" required rows="6" placeholder="What are you trying to achieve? What already exists, and what should the finished work do?"></textarea>
            <span class="field-hint">The more specific, the more useful the reply.</span>
            <span class="field-error" aria-live="polite"></span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="budget">Budget <span class="optional-mark">Optional</span></label>
              <select id="budget" name="budget">
                <option value="">Prefer not to say</option>
                ${projectBudgets.map(b => `<option value="${b.label}">${escapeHtml(b.label)}</option>`).join('')}
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <label for="deadline">Deadline <span class="optional-mark">Optional</span></label>
              <select id="deadline" name="deadline">
                <option value="">No fixed deadline</option>
                ${deadlineOptions.map(d => `<option value="${d.label}">${escapeHtml(d.label)}</option>`).join('')}
              </select>
              <span class="field-error" aria-live="polite"></span>
            </div>
          </div>

          <div class="form-group">
            <label for="reference">Reference file <span class="optional-mark">Optional</span></label>
            <div class="file-drop" id="file-drop">
              <input id="reference" name="reference" type="file" class="file-input"
                     accept="image/*,application/pdf,.doc,.docx,.txt,.zip">
              <label for="reference" class="file-label">
                ${getIcon('upload')}
                <span id="file-name">Attach a reference — image, PDF, or document (max 8 MB)</span>
              </label>
              <button type="button" class="file-clear" id="file-clear" hidden aria-label="Remove attached file">
                ${getIcon('close')}
              </button>
            </div>
            <span class="field-hint" id="file-hint">The file is not uploaded anywhere. It is only named here so you can mention it in your brief.</span>
            <span class="field-error" aria-live="polite"></span>
          </div>

          <label class="check-row">
            <input type="checkbox" id="consent" name="consent" required>
            <span>I understand this is an enquiry, not a contract, and that my details are used only to reply. See the <a href="/privacy" data-route="true">privacy note</a>.</span>
          </label>
          <span class="field-error" id="consent-error" aria-live="polite"></span>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-lg" id="submit-btn">
              Review my brief ${getIcon('arrowRight')}
            </button>
          </div>

          <p class="form-status" id="form-status" role="status" hidden></p>
        </form>

        <aside class="contact-aside reveal">
          <div class="aside-block">
            <h2>Before you write</h2>
            <ul class="aside-list">
              <li>${escapeHtml(strip(disclaimers.government))}</li>
              <li>${escapeHtml(strip(disclaimers.noGuarantee))}</li>
              <li>${escapeHtml(strip(disclaimers.platforms))}</li>
            </ul>
          </div>

          <div class="aside-block">
            <h2>Working details</h2>
            <dl class="aside-details">
              <div>
                <dt>Email</dt>
                <dd>${CONTACT_READY
                  ? `<a href="mailto:${escapeHtml(contactConfig.email)}">${escapeHtml(contactConfig.email)}</a>`
                  : '<span class="pending-value">Not set yet</span>'}</dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>${contactConfig.whatsapp
                  ? escapeHtml(contactConfig.whatsapp)
                  : '<span class="pending-value">Not set yet</span>'}</dd>
              </div>
              <div><dt>Based in</dt><dd>${escapeHtml(contactConfig.location)}</dd></div>
              <div><dt>Timezone</dt><dd>${escapeHtml(contactConfig.timezone)}</dd></div>
            </dl>
            ${CONTACT_READY ? '' : `
              <p class="aside-note">
                Contact details are not configured on this build, so the form cannot send anything.
                Use <strong>Copy brief</strong> and send it from your own mail app.
              </p>
            `}
          </div>
        </aside>
      </div>

      <section class="faq-section reveal" aria-labelledby="faq-title">
        <header class="section-header">
          <span class="section-label">Questions</span>
          <h2 id="faq-title" class="section-title">Services, explained honestly</h2>
          <p class="section-description">
            What ARTRAW does, what it does not do, and what happens after you send a brief.
          </p>
        </header>
        <div class="faq-groups">
          ${faqs.map(group => `
            <section class="faq-group">
              <h3 class="faq-group-title">${escapeHtml(group.category)}</h3>
              ${group.questions.map(q => `
                <details class="faq-item">
                  <summary>${escapeHtml(q.q)}</summary>
                  <div class="faq-answer">${escapeHtml(strip(q.a))}</div>
                </details>
              `).join('')}
            </section>
          `).join('')}
        </div>
      </section>
    </div>

    <div class="brief-review-overlay" id="brief-review" role="dialog" aria-modal="true" aria-labelledby="brief-review-title" hidden>
      <div class="brief-review-panel">
        <button type="button" class="modal-close" id="brief-review-close" aria-label="Close review">${getIcon('close')}</button>
        <h2 id="brief-review-title" class="brief-review-title">${escapeHtml(enquiryStatusNotice.title)}</h2>
        <p class="brief-review-body">${escapeHtml(CONTACT_READY
          ? enquiryStatusNotice.body
          : 'Nothing was sent anywhere. Contact details are not configured on this build, so copy the brief below and send it from your own mail app.')}</p>
        <pre class="brief-preview" id="brief-preview" tabindex="0" aria-label="Your brief"></pre>
        <div class="brief-review-actions">
          ${CONTACT_READY ? '<button type="button" class="btn btn-primary" id="brief-send">Open in email app</button>' : ''}
          <button type="button" class="btn ${CONTACT_READY ? 'btn-ghost' : 'btn-primary'} btn-copy-lead" id="brief-copy">Copy brief</button>
        </div>
        <p class="brief-review-status" id="brief-review-status" role="status"></p>
      </div>
    </div>
  `;

  return section;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d][\d\s().-]{6,19}$/;

export function initContactPage(page) {
  if (!page) return { destroy() {} };

  const form = page.querySelector('#contact-form');
  const status = page.querySelector('#form-status');
  const consentError = page.querySelector('#consent-error');
  const categorySelect = form.querySelector('#category');
  const serviceSelect = form.querySelector('#service');
  const assistanceNoticeEl = page.querySelector('#assistance-notice');
  const quickChips = page.querySelectorAll('[data-quick-category]');
  const fileInput = form.querySelector('#reference');
  const fileName = page.querySelector('#file-name');
  const fileClear = page.querySelector('#file-clear');

  const reviewOverlay = page.querySelector('#brief-review');
  const reviewClose = page.querySelector('#brief-review-close');
  const reviewPreview = page.querySelector('#brief-preview');
  const reviewSend = page.querySelector('#brief-send');
  const reviewCopy = page.querySelector('#brief-copy');
  const reviewStatus = page.querySelector('#brief-review-status');

  let attachedFile = null;
  let briefText = '';
  let briefMailto = '';
  let lastFocusedEl = null;

  function fieldErrorEl(field) {
    const group = field.closest('.form-group') || field.parentElement;
    return group.querySelector('.field-error') || (field.id === 'consent' ? consentError : null);
  }

  function showError(field, message) {
    const error = fieldErrorEl(field);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message || '';
  }

  function clearError(field) {
    showError(field, '');
  }

  function populateServices(categoryId, preferredServiceId) {
    const category = enquiryCategories.find(cat => cat.id === categoryId);
    const previous = preferredServiceId || serviceSelect.value;

    serviceSelect.innerHTML = category
      ? `<option value="">Select a service</option>${category.services
          .map(svc => `<option value="${escapeHtml(svc.id)}">${escapeHtml(svc.label)}</option>`)
          .join('')}`
      : '<option value="">Select a category first</option>';

    serviceSelect.disabled = !category;

    if (category && previous) {
      const exists = category.services.some(svc => svc.id === previous);
      if (exists) serviceSelect.value = previous;
    }
  }

  function updateAssistanceNotice() {
    const show = isAssistanceCategory(categorySelect.value);
    assistanceNoticeEl.hidden = !show;
  }

  function onCategoryChange() {
    populateServices(categorySelect.value);
    updateAssistanceNotice();
    clearError(categorySelect);
    if (serviceSelect.disabled) clearError(serviceSelect);
  }

  function onQuickChip(event) {
    const id = event.currentTarget.dataset.quickCategory;
    categorySelect.value = id;
    onCategoryChange();
    categorySelect.focus();
  }

  function onFileChange() {
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      attachedFile = null;
      fileName.textContent = 'Attach a reference — image, PDF, or document (max 8 MB)';
      fileClear.hidden = true;
      return;
    }
    if (file.size > MAX_REFERENCE_BYTES) {
      attachedFile = null;
      fileInput.value = '';
      fileName.textContent = 'Attach a reference — image, PDF, or document (max 8 MB)';
      fileClear.hidden = true;
      const error = fieldErrorEl(fileInput);
      if (error) error.textContent = 'That file is larger than 8 MB. Attach a smaller one or skip it.';
      fileInput.setAttribute('aria-invalid', 'true');
      return;
    }
    attachedFile = file;
    fileInput.setAttribute('aria-invalid', 'false');
    fileName.textContent = file.name;
    fileClear.hidden = false;
    const error = fieldErrorEl(fileInput);
    if (error) error.textContent = '';
  }

  function onFileClear() {
    fileInput.value = '';
    attachedFile = null;
    fileName.textContent = 'Attach a reference — image, PDF, or document (max 8 MB)';
    fileClear.hidden = true;
    fileInput.setAttribute('aria-invalid', 'false');
    const error = fieldErrorEl(fileInput);
    if (error) error.textContent = '';
  }

  function validate() {
    let valid = true;
    const firstInvalid = [];

    const name = form.querySelector('#name');
    if (!name.value.trim()) { valid = false; showError(name, 'This field is required.'); firstInvalid.push(name); }
    else clearError(name);

    const phone = form.querySelector('#phone');
    if (!phone.value.trim()) { valid = false; showError(phone, 'This field is required.'); firstInvalid.push(phone); }
    else if (!PHONE_RE.test(phone.value.trim())) { valid = false; showError(phone, 'Enter a valid phone number.'); firstInvalid.push(phone); }
    else clearError(phone);

    const email = form.querySelector('#email');
    if (!email.value.trim()) { valid = false; showError(email, 'This field is required.'); firstInvalid.push(email); }
    else if (!EMAIL_RE.test(email.value.trim())) { valid = false; showError(email, 'Enter a valid email.'); firstInvalid.push(email); }
    else clearError(email);

    if (!categorySelect.value) { valid = false; showError(categorySelect, 'Choose a service category.'); firstInvalid.push(categorySelect); }
    else clearError(categorySelect);

    if (serviceSelect.disabled) {
      valid = false;
      showError(serviceSelect, 'Choose a category first.');
      firstInvalid.push(serviceSelect);
    } else if (!serviceSelect.value) {
      valid = false;
      showError(serviceSelect, 'Choose a specific service.');
      firstInvalid.push(serviceSelect);
    } else {
      clearError(serviceSelect);
    }

    const description = form.querySelector('#description');
    if (!description.value.trim()) { valid = false; showError(description, 'Describe what you need.'); firstInvalid.push(description); }
    else if (description.value.trim().length < 20) { valid = false; showError(description, 'A little more detail helps — at least a couple of sentences.'); firstInvalid.push(description); }
    else clearError(description);

    const consent = form.querySelector('#consent');
    if (!consent.checked) { valid = false; showError(consent, 'Please confirm before sending.'); firstInvalid.push(consent); }
    else clearError(consent);

    return { valid, firstInvalid };
  }

  function buildBrief() {
    const data = new FormData(form);
    const categoryLabel = enquiryCategories.find(c => c.id === data.get('category'))?.label || data.get('category');
    const serviceEntry = enquiryCategories
      .find(c => c.id === data.get('category'))
      ?.services.find(s => s.id === data.get('service'));

    const lines = [
      'ARTRAW — PROJECT ENQUIRY',
      '',
      `Name: ${data.get('name')}`,
      `Phone / WhatsApp: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Business / Brand: ${data.get('business') || '—'}`,
      '',
      `Service category: ${categoryLabel}`,
      `Specific service: ${serviceEntry?.label || data.get('service')}`,
      `Budget: ${data.get('budget') || 'Not specified'}`,
      `Deadline: ${data.get('deadline') || 'Not specified'}`,
      attachedFile ? `Reference file: ${attachedFile.name} (not attached — sending separately)` : 'Reference file: none',
      '',
      'PROJECT DESCRIPTION',
      '----------------',
      String(data.get('description')).trim(),
      '',
      '---',
      'Sent from the ARTRAW website enquiry form. This is an enquiry, not a contract.'
    ];

    if (!CONTACT_READY) return { text: lines.join('\n'), mailto: '' };

    const subject = `ARTRAW enquiry — ${serviceEntry?.label || categoryLabel}`;
    const body = lines.join('\n');
    return {
      text: body,
      mailto: `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    };
  }

  function openReview() {
    const { valid, firstInvalid } = validate();
    if (!valid) {
      status.hidden = false;
      status.className = 'form-status is-error';
      status.textContent = 'Some details need fixing before the brief can be built.';
      firstInvalid[0]?.focus();
      return;
    }

    status.hidden = true;
    const brief = buildBrief();
    briefText = brief.text;
    briefMailto = brief.mailto;
    reviewPreview.textContent = briefText;
    reviewStatus.textContent = '';
    reviewOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    lastFocusedEl = document.activeElement;
    requestAnimationFrame(() => reviewClose.focus());
  }

  function closeReview() {
    reviewOverlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedEl && document.contains(lastFocusedEl)) lastFocusedEl.focus();
    lastFocusedEl = null;
  }

  function onSubmit(event) {
    event.preventDefault();
    openReview();
  }

  function onSend() {
    if (!briefMailto) {
      reviewStatus.textContent = 'Sending is not configured on this build — use “Copy brief” instead.';
      return;
    }
    window.location.href = briefMailto;
    reviewStatus.textContent = 'Your email app should be opening. If it did not, use “Copy brief” instead.';
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(briefText);
      reviewStatus.textContent = 'Brief copied. Paste it into any mail app.';
    } catch {
      reviewStatus.textContent = 'Copying was blocked by the browser — select the text above and copy it manually.';
      reviewPreview.focus();
    }
  }

  function onReviewKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeReview();
    }
  }

  function prefillFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('service');
    if (!serviceId) return;
    const svc = getServiceById(serviceId);
    if (!svc) return;

    const groupLabel = resolveEnquiryGroup(serviceId, svc.categoryId);
    const group = enquiryCategories.find(cat => cat.label === groupLabel);
    if (group) {
      categorySelect.value = group.id;
      populateServices(group.id);

      const entry = findServiceOption(group, serviceId, svc.title);
      if (entry) serviceSelect.value = entry.id;

      updateAssistanceNotice();
    }

    const brief = form.querySelector('#description');
    if (brief && !brief.value.trim()) {
      brief.value = `I'd like to discuss: ${svc.title}.\n\nWhat I'm looking for:\n`;
    }
  }

  categorySelect.addEventListener('change', onCategoryChange);
  form.querySelector('#service').addEventListener('change', e => clearError(e.currentTarget));
  form.querySelector('#name').addEventListener('input', e => clearError(e.currentTarget));
  form.querySelector('#phone').addEventListener('input', e => clearError(e.currentTarget));
  form.querySelector('#email').addEventListener('input', e => clearError(e.currentTarget));
  form.querySelector('#description').addEventListener('input', e => clearError(e.currentTarget));
  form.querySelector('#consent').addEventListener('change', e => clearError(e.currentTarget));
  quickChips.forEach(chip => chip.addEventListener('click', onQuickChip));
  fileInput.addEventListener('change', onFileChange);
  fileClear.addEventListener('click', onFileClear);
  form.addEventListener('submit', onSubmit);
  reviewClose.addEventListener('click', closeReview);
  reviewOverlay.addEventListener('click', e => { if (e.target === reviewOverlay) closeReview(); });
  reviewSend?.addEventListener('click', onSend);
  reviewCopy.addEventListener('click', onCopy);
  document.addEventListener('keydown', onReviewKeydown);

  prefillFromQuery();

  return {
    destroy() {
      document.removeEventListener('keydown', onReviewKeydown);
      categorySelect.removeEventListener('change', onCategoryChange);
      form.removeEventListener('submit', onSubmit);
      reviewClose.removeEventListener('click', closeReview);
      reviewSend?.removeEventListener('click', onSend);
      reviewCopy.removeEventListener('click', onCopy);
      fileInput.removeEventListener('change', onFileChange);
      fileClear.removeEventListener('click', onFileClear);
      quickChips.forEach(chip => chip.removeEventListener('click', onQuickChip));
      document.body.style.overflow = '';
    }
  };
}
