import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIcon } from '../utils/icons.js';
import {
  serviceCategories,
  searchServicesSorted,
  getAllServices
} from '../data/services.js';

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 12;
const GROUP_PAGE_SIZE = 6;

const SORTS = [
  { id: 'relevance', label: 'Most relevant' },
  { id: 'az', label: 'A–Z' },
  { id: 'za', label: 'Z–A' },
  { id: 'category', label: 'By category' }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function truncate(text, limit) {
  const value = String(text);
  if (value.length <= limit) return value;
  const cut = value.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function createServicesPage() {
  const section = document.createElement('section');
  section.className = 'services-page cinematic-page';
  section.id = 'services-page';
  section.setAttribute('aria-labelledby', 'services-page-title');

  const totalServices = getAllServices().length;

  section.innerHTML = `
    <div class="container">
      <header class="services-hero reveal">
        <span class="services-kicker reveal">Services</span>
        <h1 id="services-page-title" class="services-title reveal" data-words>Services Catalog</h1>
        <p class="services-description reveal">
          ${totalServices} services across ${serviceCategories.length} categories. Search or filter to narrow
          the list—each service covers description, what ARTRAW helps with, what you provide, and what you receive.
        </p>
      </header>

      <div class="services-toolbar reveal" role="search" aria-label="Service search and filter">
        <div class="search-wrapper">
          ${getIcon('search')}
          <input
            type="search"
            id="service-search"
            class="search-input"
            placeholder="Search services… try “logo”, “GST”, “Reels”, “thumbnail”"
            autocomplete="off"
            aria-label="Search services"
            aria-describedby="search-help"
          >
          <kbd class="search-hint" aria-hidden="true">⌘K</kbd>
        </div>
        <p id="search-help" class="visually-hidden">
          Results filter as you type. Press the down arrow key to move into the results list.
        </p>

        <div class="services-controls">
          <div class="control-group" role="group" aria-label="Change view">
            <span class="control-label" id="view-label">View</span>
            <div class="segmented" role="group" aria-labelledby="view-label">
              <button class="segment active" data-view="grouped" aria-pressed="true">
                ${getIcon('layers')} Grouped
              </button>
              <button class="segment" data-view="grid" aria-pressed="false">
                ${getIcon('layout')} Grid
              </button>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="service-sort">Sort</label>
            <select id="service-sort" class="sort-select">
              ${SORTS.map(s => `<option value="${s.id}">${s.label}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="filter-chips" role="group" aria-label="Category filters">
          <button class="filter-chip active" data-category="all" aria-pressed="true">
            All <span class="chip-count">${totalServices}</span>
          </button>
          ${serviceCategories.map(cat => `
            <button class="filter-chip" data-category="${cat.id}" aria-pressed="false">
              ${getIcon(cat.icon)}
              <span class="chip-label">${cat.label}</span>
              <span class="chip-count">${cat.services.length}</span>
            </button>
          `).join('')}
        </div>

        <div class="results-summary" aria-live="polite" aria-atomic="true">
          <span class="visible-count">${totalServices}</span>
          <span class="results-word"> services visible</span>
          <button class="clear-inline" id="clear-filters-inline" hidden>Clear</button>
        </div>
      </div>

      <div class="services-results" id="services-results"></div>

      <div class="no-results" id="no-results" hidden aria-live="polite">
        <div class="no-results-content">
          ${getIcon('search')}
          <h3>No services match</h3>
          <p>Try a different search term, or clear filters to see all ${totalServices} services.</p>
          <button class="btn btn-ghost" id="clear-filters">Clear all filters</button>
        </div>
      </div>
    </div>

    <div class="service-modal-overlay cinematic-modal" id="service-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
      <div class="service-modal cinematic-modal-panel" role="document">
        <button class="modal-close" aria-label="Close modal">${getIcon('close')}</button>
        <div class="modal-content" id="modal-content"></div>
      </div>
    </div>
  `;

  return section;
}

function serviceCard(svc, index) {
  return `
    <article class="service-card cinematic-card reveal" data-service-id="${svc.id}" data-category="${svc.categoryId}" style="--reveal-delay:${(index % 6) * 80}ms">
      <div class="service-card-header">
        <span class="service-category-tag cinematic-tag" style="--accent-color: var(--color-accent-${svc.categoryAccent});">
          ${getIcon(svc.categoryIcon)}
          <span class="tag-label">${svc.categoryLabel}</span>
        </span>
      </div>
      <h3 class="service-card-title">${escapeHtml(svc.title)}</h3>
      <p class="service-card-description">${escapeHtml(truncate(svc.description, 132))}</p>
      <ul class="service-card-highlights" aria-label="What ARTRAW helps with">
        ${svc.helpsWith.slice(0, 3).map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        ${svc.helpsWith.length > 3 ? `<li class="more-count">+${svc.helpsWith.length - 3} more</li>` : ''}
      </ul>
      <div class="service-card-footer">
        <button class="btn btn-primary btn-sm service-detail-btn" data-service-id="${svc.id}">
          View Details
          ${getIcon('arrowRight')}
        </button>
        <a href="/contact?service=${encodeURIComponent(svc.id)}" class="btn btn-ghost btn-sm service-cta-btn" data-service-id="${svc.id}" data-route="true">
          Start Project
        </a>
      </div>
    </article>
  `;
}

function serviceRow(svc) {
  return `
    <li class="service-row cinematic-row" data-service-id="${svc.id}" data-category="${svc.categoryId}">
      <button class="service-row-main service-detail-btn" data-service-id="${svc.id}" aria-expanded="false">
        <span class="service-row-title">${escapeHtml(svc.title)}</span>
        <span class="service-row-desc">${escapeHtml(truncate(svc.description, 96))}</span>
      </button>
      <span class="service-row-actions">
        <a href="/contact?service=${encodeURIComponent(svc.id)}" class="service-row-cta service-cta-btn" data-service-id="${svc.id}" data-route="true">
          Start Project
        </a>
        <span class="service-row-chevron" aria-hidden="true">${getIcon('arrowRight')}</span>
      </span>
    </li>
  `;
}

function categoryGroup(cat, services, totalInCategory) {
  const hidden = Math.max(0, (totalInCategory ?? services.length) - services.length);
  return `
    <section class="service-group cinematic-group reveal" data-group="${cat.id}" aria-labelledby="group-title-${cat.id}" style="--reveal-delay:120ms">
      <header class="service-group-header cinematic-group-header">
        <span class="service-group-icon cinematic-group-icon" style="--accent-color: var(--color-accent-${cat.accent});" aria-hidden="true">
          ${getIcon(cat.icon)}
        </span>
        <div class="service-group-text">
          <h2 class="service-group-title" id="group-title-${cat.id}">${escapeHtml(cat.label)}</h2>
          <p class="service-group-meta">
            <span class="group-count">${totalInCategory ?? services.length}</span>
            ${(totalInCategory ?? services.length) === 1 ? 'service' : 'services'}
            ${hidden ? `<span class="group-hidden-note">· ${hidden} not shown</span>` : ''}
          </p>
        </div>
      </header>
      <ul class="service-rows" role="list" aria-label="${escapeHtml(cat.label)} services">
        ${services.map(serviceRow).join('')}
      </ul>
    </section>
  `;
}

function getServiceById(id) {
  for (const cat of serviceCategories) {
    const svc = cat.services.find(s => s.id === id);
    if (svc) {
      return { ...svc, categoryId: cat.id, categoryLabel: cat.label, categoryIcon: cat.icon, categoryAccent: cat.accent };
    }
  }
  return null;
}

function hasAssistanceDisclaimer(categoryId) {
  return categoryId === 'business-documentation';
}

function renderModalContent(svc) {
  const accentColor = `var(--color-accent-${svc.categoryAccent})`;

  return `
    <div class="modal-panel cinematic-modal-panel-inner" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="0">
      <div class="modal-header cinematic-modal-header">
        <span class="modal-category cinematic-modal-category" style="color: ${accentColor};">
          ${getIcon(svc.categoryIcon)} ${escapeHtml(svc.categoryLabel)}
        </span>
        <h2 id="modal-title" class="modal-title cinematic-modal-title">${escapeHtml(svc.title)}</h2>
      </div>

      <div class="modal-body cinematic-modal-body">
        <section class="modal-section cinematic-modal-section">
          <h3>Description</h3>
          <p>${escapeHtml(svc.description)}</p>
        </section>

        <section class="modal-section cinematic-modal-section">
          <h3>What ARTRAW helps with</h3>
          <ul class="modal-list cinematic-modal-list">
            ${svc.helpsWith.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        <section class="modal-section cinematic-modal-section">
          <h3>What you'll need to provide</h3>
          <ul class="modal-list cinematic-modal-list">
            ${svc.requirements.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        <section class="modal-section cinematic-modal-section">
          <h3>What you'll receive</h3>
          <ul class="modal-list cinematic-modal-list">
            ${svc.deliverables.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        ${hasAssistanceDisclaimer(svc.categoryId) ? `
          <section class="modal-section modal-disclaimer cinematic-modal-disclaimer">
            <h3>Important note</h3>
            <p>
              This service covers <strong>process, application, and documentation assistance only</strong>.
              ARTRAW is not a government authority, licensed tax advisor, legal counsel, or certified
              compliance professional, and is not affiliated with any government or platform body.
              Approvals, filings, and regulatory outcomes are not guaranteed. Clients review all
              submissions and consult qualified professionals where required.
            </p>
          </section>
        ` : ''}

        ${svc.categoryId === 'food-local-business' ? `
          <section class="modal-section modal-disclaimer cinematic-modal-disclaimer">
            <h3>Platform note</h3>
            <p>
              This is <strong>listing and setup assistance</strong> for platforms such as Zomato and Swiggy.
              ARTRAW is an independent service provider, not an official partner, representative, or
              authorised agent of any platform. Platform onboarding, review, and approval decisions
              rest with the platform.
            </p>
          </section>
        ` : ''}
      </div>

      <div class="modal-footer cinematic-modal-footer">
        <button class="btn btn-primary modal-cta" data-service-id="${svc.id}">
          Start a Project
          ${getIcon('arrowRight')}
        </button>
        <button class="btn btn-ghost modal-close-btn">Close</button>
      </div>
    </div>
  `;
}

function trapFocus(event, panel) {
  const focusable = panel.querySelectorAll(
    'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function initServicesPage(pageElement) {
  if (!pageElement) return { destroy() {} };

  const searchInput = pageElement.querySelector('#service-search');
  const sortSelect = pageElement.querySelector('#service-sort');
  const resultsRoot = pageElement.querySelector('#services-results');
  const noResults = pageElement.querySelector('#no-results');
  const visibleCount = pageElement.querySelector('.visible-count');
  const resultsWord = pageElement.querySelector('.results-word');
  const clearFiltersBtn = pageElement.querySelector('#clear-filters');
  const clearInlineBtn = pageElement.querySelector('#clear-filters-inline');
  const filterChips = pageElement.querySelectorAll('.filter-chip');
  const segments = pageElement.querySelectorAll('.segment');
  const modalOverlay = pageElement.querySelector('#service-modal');
  const modalContent = pageElement.querySelector('#modal-content');

  let currentCategory = 'all';
  let currentView = 'grouped';
  let searchQuery = '';
  let visibleLimit = PAGE_SIZE;
  let expandedCategories = new Set();
  let pendingCategories = [];
  let activeServiceId = null;
  let activePanel = null;
  let lastFocusedEl = null;
  let revealObserver = null;

  function currentResults() {
    const matched = searchServicesSorted(searchQuery, sortSelect.value);
    if (currentCategory === 'all') return matched;
    return matched.filter(s => s.categoryId === currentCategory);
  }

  function isFiltered() {
    return currentCategory !== 'all' || searchQuery.length > 0;
  }

  function syncUrl() {
    if (!window.history?.replaceState) return;
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (currentCategory !== 'all') params.set('category', currentCategory);
    if (currentView !== 'grouped') params.set('view', currentView);
    if (sortSelect.value !== 'relevance') params.set('sort', sortSelect.value);
    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState({ route: 'services' }, '', url);
  }

  function readUrl() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const category = params.get('category');
    const view = params.get('view');
    const sort = params.get('sort');

    if (q) {
      searchQuery = q;
      searchInput.value = q;
    }
    if (category && serviceCategories.some(c => c.id === category)) currentCategory = category;
    if (view === 'grouped' || view === 'grid') currentView = view;
    if (sort && SORTS.some(s => s.id === sort)) sortSelect.value = sort;
  }

  function updateFilterChips() {
    filterChips.forEach(chip => {
      const active = chip.dataset.category === currentCategory;
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  }

  function updateSegmentButtons() {
    segments.forEach(segment => {
      const active = segment.dataset.view === currentView;
      segment.classList.toggle('active', active);
      segment.setAttribute('aria-pressed', String(active));
    });
    resultsRoot.dataset.view = currentView;
  }

  function limitFor(categoryId) {
    if (currentView === 'grid') return Number.POSITIVE_INFINITY;
    if (expandedCategories.has(categoryId)) return Number.POSITIVE_INFINITY;
    return GROUP_PAGE_SIZE;
  }

  function buildGroups(services) {
    if (currentView === 'grid') {
      const shown = services.slice(0, visibleLimit);
      return { html: `
        <div class="services-grid" role="list" aria-label="Services" data-stagger-reveal>
          ${shown.map((svc, i) => `<div role="listitem">${serviceCard(svc, i)}</div>`).join('')}
        </div>
      `, shown: shown.length, expand: null };
    }

    let shown = 0;
    const pending = [];
    pendingCategories = [];
    const html = serviceCategories
      .map(cat => {
        const inCategory = services.filter(s => s.categoryId === cat.id);
        if (!inCategory.length) return '';
        const limit = limitFor(cat.id);
        const slice = inCategory.slice(0, limit);
        shown += slice.length;
        if (slice.length < inCategory.length) {
          const entry = { categoryId: cat.id, remaining: inCategory.length - slice.length, cat };
          pending.push(entry);
          pendingCategories.push(entry.categoryId);
        }
        return categoryGroup(cat, slice, inCategory.length);
      })
      .join('');

    const expand = pending.length
      ? {
        categoryId: pending[0].categoryId,
        remaining: pending.reduce((sum, item) => sum + item.remaining, 0),
        cat: pending[0].cat
      }
      : null;

    return { html, shown, expand };
  }

  function render() {
    const results = currentResults();
    const hasResults = results.length > 0;

    noResults.hidden = hasResults;
    resultsRoot.hidden = !hasResults;
    visibleCount.textContent = String(results.length);
    if (resultsWord) {
      resultsWord.textContent = results.length === 1 ? ' service visible' : ' services visible';
    }
    clearInlineBtn.hidden = !isFiltered();

    if (!hasResults) {
      resultsRoot.innerHTML = '';
      return;
    }

    const { html, shown, expand } = buildGroups(results);

    let more = '';
    if (expand) {
      more = `
        <div class="load-more-wrap">
          <p class="load-more-meta">Showing ${shown} of ${results.length} in this view</p>
          <button class="btn btn-secondary load-more-btn" id="load-more" data-category-expand="${expand.categoryId}">
            Load more ${escapeHtml(expand.cat.label)} (${expand.remaining} left)
          </button>
        </div>
      `;
    } else if (currentView === 'grid' && shown < results.length) {
      more = `
        <div class="load-more-wrap">
          <p class="load-more-meta">Showing ${shown} of ${results.length}</p>
          <button class="btn btn-secondary load-more-btn" id="load-more">
            Load ${Math.min(PAGE_SIZE, results.length - shown)} more
          </button>
        </div>
      `;
    }

    resultsRoot.innerHTML = html + more;
    attachCardListeners();
    observeReveals();
  }

  function observeReveals() {
    revealObserver?.disconnect();
    const nodes = resultsRoot.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    gsap.set(nodes, { opacity: 0, y: 20 });
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: parseFloat(entry.target.style.getPropertyValue('--reveal-delay') || '0') / 1000,
            once: true,
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    nodes.forEach((el) => revealObserver.observe(el));
  }

  function applyFilters() {
    visibleLimit = PAGE_SIZE;
    expandedCategories = new Set();
    updateFilterChips();
    render();
    syncUrl();
  }

  function handleSearch(event) {
    searchQuery = event.target.value.trim();
    applyFilters();
  }

  function handleFilterClick(event) {
    currentCategory = event.currentTarget.dataset.category;
    applyFilters();
  }

  function handleSegmentClick(event) {
    currentView = event.currentTarget.dataset.view;
    visibleLimit = PAGE_SIZE;
    expandedCategories = new Set();
    updateSegmentButtons();
    render();
    syncUrl();
  }

  function handleSortChange() {
    visibleLimit = PAGE_SIZE;
    expandedCategories = new Set();
    render();
    syncUrl();
  }

  function clearFilters() {
    searchInput.value = '';
    searchQuery = '';
    currentCategory = 'all';
    sortSelect.value = 'relevance';
    expandedCategories = new Set();
    updateFilterChips();
    render();
    syncUrl();
  }

  function handleLoadMore(event) {
    if (event.currentTarget.dataset.categoryExpand) {
      pendingCategories.forEach(id => expandedCategories.add(id));
    } else {
      visibleLimit += PAGE_SIZE;
    }
    render();
    const next = resultsRoot.querySelector('#load-more');
    if (next) next.focus();
    else resultsRoot.querySelector('.service-group')?.scrollIntoView?.({ block: 'nearest' });
  }

  function attachCardListeners() {
    resultsRoot.querySelectorAll('.service-detail-btn').forEach(btn => {
      btn.addEventListener('click', event => {
        event.stopPropagation();
        openModal(btn.dataset.serviceId);
      });
    });

    resultsRoot.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.serviceId));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(card.dataset.serviceId);
        }
      });
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    });

    resultsRoot.querySelector('#load-more')?.addEventListener('click', handleLoadMore);
  }

  function goToContact(svc) {
    closeModal();
    const link = document.createElement('a');
    link.href = svc ? `/contact?service=${encodeURIComponent(svc.id)}` : '/contact';
    link.dataset.route = 'true';
    link.click();
  }


  function openModal(serviceId) {
    const svc = getServiceById(serviceId);
    if (!svc) return;

    lastFocusedEl = document.activeElement;
    activeServiceId = serviceId;
    modalContent.innerHTML = renderModalContent(svc);
    modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      modalOverlay.classList.add('visible');
      modalContent.querySelector('.modal-panel')?.focus();
    } else {
      gsap.fromTo(modalOverlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        modalContent.querySelector('.modal-panel'),
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => modalContent.querySelector('.modal-panel')?.focus(),
        }
      );
    }

    activePanel = modalContent.querySelector('.modal-panel');
    const closeBtn = modalContent.querySelector('.modal-close-btn, .modal-close');
    closeBtn?.addEventListener('click', closeModal);
    const ctaBtn = modalContent.querySelector('.modal-cta');
    ctaBtn?.addEventListener('click', () => goToContact(svc));

    modalContent.addEventListener('click', onModalContentClick);
  }

  function onModalContentClick(event) {
    if (event.target.closest('.modal-close-btn, .modal-close')) closeModal();
  }

  function closeModal() {
    if (!modalOverlay || modalOverlay.hidden) return;
    document.body.style.overflow = '';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      modalOverlay.classList.remove('visible');
      modalOverlay.hidden = true;
      modalOverlay.classList.remove('visible');
      modalContent.innerHTML = '';
      activeServiceId = null;
      activePanel = null;
      if (lastFocusedEl && document.contains(lastFocusedEl)) lastFocusedEl.focus();
      lastFocusedEl = null;
    } else {
      gsap.to(modalOverlay, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          modalOverlay.classList.remove('visible');
          modalOverlay.hidden = true;
          modalContent.innerHTML = '';
          activeServiceId = null;
          activePanel = null;
          if (lastFocusedEl && document.contains(lastFocusedEl)) lastFocusedEl.focus();
          lastFocusedEl = null;
        },
      });
    }
  }

  function handleModalKeydown(event) {
    if (activeServiceId === null) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    }
    if (event.key === 'Tab' && activePanel) trapFocus(event, activePanel);
  }

  function handleGlobalKeys(event) {
    const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    if (isShortcut) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (event.key === '/' && !isTypingTarget(event.target)) {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === 'Escape' && document.activeElement === searchInput && searchQuery) {
      searchInput.value = '';
      searchQuery = '';
      applyFilters();
    }
  }

  function isTypingTarget(target) {
    return target instanceof HTMLElement &&
      (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable);
  }

  searchInput.addEventListener('input', handleSearch);
  sortSelect.addEventListener('change', handleSortChange);
  filterChips.forEach(chip => chip.addEventListener('click', handleFilterClick));
  segments.forEach(segment => segment.addEventListener('click', handleSegmentClick));
  clearFiltersBtn.addEventListener('click', clearFilters);
  clearInlineBtn.addEventListener('click', clearFilters);
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', handleGlobalKeys);
  document.addEventListener('keydown', handleModalKeydown);

  readUrl();
  updateFilterChips();
  updateSegmentButtons();
  render();

  // Page-entry reveal for header and toolbar
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const header = pageElement.querySelector('.services-hero');
    const toolbar = pageElement.querySelector('.services-toolbar');
    if (header || toolbar) {
      gsap.set([header, toolbar].filter(Boolean), { opacity: 0, y: 30 });
      gsap.to([header, toolbar].filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }
  }

  return {
    destroy() {
      document.removeEventListener('keydown', handleGlobalKeys);
      document.removeEventListener('keydown', handleModalKeydown);
      revealObserver?.disconnect();
      closeModal();
    }
  };
}
