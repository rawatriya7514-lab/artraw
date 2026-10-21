/**
 * ARTRAW — High-Contrast Off-White Editorial Capability Spec Section & Portal Transition
 *
 * - High-Contrast Editorial Styling: #F4F4F6 background with #070709 text for striking visual drama.
 * - 3-Column Architectural Capability Spec Table.
 * - Portal Zoom-In Transition: Dark architectural portal at the bottom that smoothly scales
 *   from scale(0.78) -> scale(1.0) on scroll, seamlessly entering the Dark Flagship Project Showcase.
 * - Responsive for both PC and Android mobile.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createEditorialSpec() {
  const section = document.createElement('section');
  section.className = 'section editorial-spec-section';
  section.id = 'spec-section';
  section.setAttribute('aria-labelledby', 'spec-title');

  section.innerHTML = `
    <!-- Anchor link compatibility for #about -->
    <div id="about" style="position: absolute; top: -80px;"></div>

    <div class="spec-container">
      <!-- Section Header -->
      <header class="spec-header reveal">
        <div class="spec-kicker-tag">
          <span class="spec-mono-badge">02 // ARCHITECTURAL DIRECTORY</span>
          <span class="spec-live-chip">AUTHENTIC SPECIFICATION</span>
        </div>

        <h2 id="spec-title" class="spec-headline">
          Engineered For The Edge. <br />
          <span class="spec-serif-italic">Crafted For The Screen.</span>
        </h2>

        <p class="spec-lead-summary">
          ARTRAW is an autonomous creative and technical practice. No fabricated agency
          myths, no marketing fluff — just practical, high-performance systems spanning autonomous mobile
          AI, web architectures, and cinematic visual design.
        </p>
      </header>

      <!-- 3-Column High-Contrast Capability Spec Table -->
      <div class="spec-table-grid" role="list" aria-label="Capabilities Directory">
        <!-- Column 1 -->
        <article class="spec-col reveal" role="listitem">
          <div class="spec-col-header">
            <span class="spec-col-num">[SPEC-01]</span>
            <span class="spec-col-discipline">AUTONOMOUS INTELLIGENCE</span>
          </div>
          <h3 class="spec-col-title">Edge AI & Agent Routing</h3>
          <p class="spec-col-desc">
            On-device assistant structures, local LLM control scripts, and model dispatch pipelines
            designed to run autonomously on edge devices without cloud friction.
          </p>

          <div class="spec-col-specs">
            <h4 class="spec-mini-title">Key Implementations:</h4>
            <ul class="spec-list">
              <li><strong>Lucy AI:</strong> Android 16 voice assistant, Shizuku IPC, local on-device LLM</li>
              <li><strong>ARTRAW OS:</strong> Snapdragon 8-core Termux workstation & Powerlevel10k crimson zsh</li>
              <li><strong>Artfiles:</strong> Production Kotlin native storage utility (API 36) with R8 obfuscation</li>
              <li><strong>OpenClaw / OmniRoute:</strong> CLI routing scripts and autonomous model dispatch</li>
            </ul>
          </div>
          <div class="spec-col-footer">
            <span class="spec-tag-mono">STACK: ANDROID 16 · KOTLIN · TERMUX · SHIZUKU · LOCAL LLM</span>
          </div>
        </article>

        <!-- Column 2 -->
        <article class="spec-col reveal" role="listitem">
          <div class="spec-col-header">
            <span class="spec-col-num">[SPEC-02]</span>
            <span class="spec-col-discipline">WEB & COMMERCE ENGINEERING</span>
          </div>
          <h3 class="spec-col-title">High-Velocity Digital Hubs</h3>
          <p class="spec-col-desc">
            Modern ES module architecture, bespoke GSAP scrollytelling, and robust storefronts.
            Built for instantaneous load times and locked 60-120fps motion.
          </p>

          <div class="spec-col-specs">
            <h4 class="spec-mini-title">Key Implementations:</h4>
            <ul class="spec-list">
              <li><strong>RAMART Store:</strong> High-conversion commerce catalog & fast mobile checkout</li>
              <li><strong>Ayur Veda Global:</strong> Next.js storefront, dynamic cart, and botanical index</li>
              <li><strong>ARTRAW Platform:</strong> Vite ES, Lenis inertia, and GSAP 3D scrollytelling</li>
            </ul>
          </div>
          <div class="spec-col-footer">
            <span class="spec-tag-mono">STACK: VITE · VANILLA ES · GSAP 3 · NEXT.JS · REACT · TAILWIND</span>
          </div>
        </article>

        <!-- Column 3 -->
        <article class="spec-col reveal" role="listitem">
          <div class="spec-col-header">
            <span class="spec-col-num">[SPEC-03]</span>
            <span class="spec-col-discipline">VISUAL CRAFT & AUDIO</span>
          </div>
          <h3 class="spec-col-title">Cinematic Brand & Media</h3>
          <p class="spec-col-desc">
            Tight geometric typography, photographic compositing, video editing, and generative visualizers
            crafted for artists, music labels, and discerning digital products.
          </p>

          <div class="spec-col-specs">
            <h4 class="spec-mini-title">Key Implementations:</h4>
            <ul class="spec-list">
              <li><strong>HF RECORD:</strong> Official distressed metallic insignia, crimson skull, and release visuals</li>
              <li><strong>ARTRAW Editz Studio:</strong> 8-stage cyberpunk creative pipeline ("Art Is My Code")</li>
              <li><strong>Zafiro:</strong> Creative technology experiments for interactive canvas and GL shaders</li>
            </ul>
          </div>
          <div class="spec-col-footer">
            <span class="spec-tag-mono">STACK: DESIGN · VIDEO · AUDIO DSP · MOTION · CREATIVE CODING</span>
          </div>
        </article>
      </div>

      <!-- Architectural Specs Metadata Bar -->
      <div class="spec-meta-strip reveal">
        <div class="spec-meta-item">
          <span class="spec-meta-key">PRACTICE LEAD</span>
          <span class="spec-meta-val">ARTRAW Core</span>
        </div>
        <div class="spec-meta-item">
          <span class="spec-meta-key">LOCATION</span>
          <span class="spec-meta-val">Remote · India (IST / UTC+5:30)</span>
        </div>
        <div class="spec-meta-item">
          <span class="spec-meta-key">CORE HARDWARE</span>
          <span class="spec-meta-val">Android Edge AI · Linux · Termux</span>
        </div>
        <div class="spec-meta-item">
          <span class="spec-meta-key">ENGAGEMENT</span>
          <span class="spec-meta-val">Structured Briefs · Direct Engineering</span>
        </div>
      </div>

      <!-- Portal Zoom-In Transition to Dark Flagship Projects -->
      <div class="spec-portal-stage" id="spec-portal-stage">
        <div class="spec-portal-window" id="spec-portal-window">
          <div class="portal-inner-glow"></div>
          <div class="portal-content">
            <div class="portal-badge">
              <span class="portal-dot"></span>
              <span>03 // PORTAL TRANSITION</span>
            </div>
            <div class="portal-emblem-center" style="margin: 0.75rem 0;">
              <svg class="portal-emblem-img" width="76" height="76" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%; border: 2px solid var(--color-accent-red); box-shadow: 0 0 25px rgba(255, 30, 66, 0.5); margin: 0 auto;"><rect width="32" height="32" rx="7" fill="#070709"/><path d="M8 23 L16 7 L24 23" fill="none" stroke="#ff2d4a" stroke-width="2"/><path d="M11 18 H21" stroke="#3ee0ff" stroke-width="2"/></svg>
            </div>
            <h3 class="portal-title">Enter System Architecture</h3>
            <p class="portal-subtitle">
              Scroll down to inspect live 3D decomposed builds, hardware layers, and flagship codebases.
            </p>
            <div class="portal-indicator">
              <span class="portal-arrow">↓</span>
              <span>INSPECTING FLAGSHIP PROJECTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}

export function initEditorialSpec(section) {
  if (!section || typeof window === 'undefined') return { destroy() {} };

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;

  const revealElements = Array.from(section.querySelectorAll('.reveal'));
  const portalStage = section.querySelector('#spec-portal-stage');
  const portalWindow = section.querySelector('#spec-portal-window');

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const cleanups = [];

  // Content reveal on enter
  if (!prefersReduced) {
    revealElements.forEach((el) => {
      if (el.classList.contains('spec-lead-summary')) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    // Kinetic Word-by-Word Scroll Scrub Illuminator
    const summaryEl = section.querySelector('.spec-lead-summary');
    if (summaryEl) {
      const originalText = summaryEl.textContent.trim();
      const words = originalText.split(/\s+/);
      summaryEl.innerHTML = words.map((w) => `<span class="scrub-word">${w}</span> `).join('');
      const wordSpans = summaryEl.querySelectorAll('.scrub-word');

      const scrubAnim = gsap.fromTo(
        wordSpans,
        { opacity: 0.22, color: '#52525b' },
        {
          opacity: 1,
          color: '#ffffff',
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: summaryEl,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );
      cleanups.push(() => {
        scrubAnim.scrollTrigger?.kill();
        scrubAnim.kill();
      });
    }

    // Interactive mouse spotlight tracking on bento spec cards (PC Desktop)
    if (isDesktop) {
      const specCols = section.querySelectorAll('.spec-col');
      specCols.forEach((col) => {
        const onMouseMove = (e) => {
          const rect = col.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          col.style.setProperty('--mouse-x', `${x}px`);
          col.style.setProperty('--mouse-y', `${y}px`);
        };
        col.addEventListener('mousemove', onMouseMove);
        cleanups.push(() => col.removeEventListener('mousemove', onMouseMove));
      });
    }

    // Portal Zoom-In Transition
    if (portalStage && portalWindow) {
      if (isDesktop) {
        // Desktop: framed dark window scales up smoothly from 0.78 to 1.0 to swallow the viewport
        const portalTween = gsap.fromTo(
          portalWindow,
          {
            scale: 0.78,
            borderRadius: '28px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          },
          {
            scale: 1.0,
            borderRadius: '0px',
            boxShadow: 'none',
            ease: 'none',
            scrollTrigger: {
              trigger: portalStage,
              start: 'top 70%',
              end: 'bottom bottom',
              scrub: 0.8,
            },
          }
        );
        cleanups.push(() => {
          portalTween.scrollTrigger?.kill();
          portalTween.kill();
        });
      } else {
        // Mobile / Android: gentle scale and fade
        const mobilePortal = gsap.fromTo(
          portalWindow,
          { scale: 0.92, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: portalStage,
              start: 'top 80%',
              once: true,
            },
          }
        );
        cleanups.push(() => {
          mobilePortal.scrollTrigger?.kill();
          mobilePortal.kill();
        });
      }
    }
  } else {
    revealElements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    if (portalWindow) {
      portalWindow.style.transform = 'none';
    }
  }

  return {
    destroy() {
      cleanups.forEach((fn) => fn?.());
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      gsap.set(revealElements, { clearProps: 'opacity,y,transform' });
      if (portalWindow) gsap.set(portalWindow, { clearProps: 'scale,borderRadius,boxShadow,transform' });
    },
  };
}
