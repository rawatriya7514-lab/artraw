/**
 * ARTRAW — Multi-Layer Parallax Cinematic Hero
 *
 * 3 distinct scroll velocity depth layers:
 * - Layer 1 (0.2x): Background atmosphere (ambient particle canvas, radial glow, noise texture)
 * - Layer 2 (0.6x + scale): Massive center geometric typography + editorial serif subhead
 * - Layer 3 (1.2x): Floating foreground telemetry HUD chips, live radar pill, and magnetic CTAs
 *
 * Boot sequence uses true SplitText char/word masking and ScrambleText
 * HUD telemetry, and waits for the Preloader reveal (fonts-ready) when
 * the cold boot runs.
 *
 * Fully responsive for PC & Android (100dvh). Respects prefers-reduced-motion.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { initMagnetic } from '../utils/magnetic.js';
import { getIcon } from '../utils/icons.js';
import { createAmbientCanvas, initAmbientCanvas } from './AmbientCanvas.js';
import { isHeadlessEnv, asset } from '../utils/helpers.js';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

/* --- Jagged Torn-Paper Edge Transition linking into Off-White Spec Section --- */
const TORN_EDGE_BOTTOM = `
  <div class="hero-torn-transition" aria-hidden="true">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" class="torn-svg">
      <path d="M0,0 L45,42 L120,8 L195,50 L270,14 L360,65 L430,22 L510,75 L600,18 L680,68 L770,25 L860,80 L940,20 L1020,70 L1110,15 L1200,60 L1290,24 L1370,72 L1440,30 L1440,90 L0,90 Z"
            fill="var(--color-spec-bg)" />
    </svg>
  </div>
`;

export function createHero() {
  const section = document.createElement('section');
  section.className = 'hero scrolly-hero';
  section.setAttribute('aria-labelledby', 'hero-title');
  section.id = 'home';

  const ambientCanvas = createAmbientCanvas();

  section.innerHTML = `
    <!-- Layer 1 (0.2x Depth Parallax Background): Ambient Atmosphere & Particle Dust Canvas -->
    <div class="hero-layer hero-layer-back" data-speed="0.2" aria-hidden="true">
      <div class="hero-atmosphere-gradient"></div>
      <div class="hero-radial-spotlight"></div>
      <div class="hero-noise-overlay"></div>
    </div>

    <!-- Hero Main Content (Natural Vertical Flow — Zero Overlap / Zero Collision) -->
    <div class="hero-content-flow">
      <!-- 01 // System Tag & Radar Chip -->
      <div class="hero-hud-top reveal">
        <div class="hero-sys-index">
          <span class="sys-code">01 // CORE SYSTEM</span>
          <span class="sys-divider">/</span>
          <span class="sys-loc">INDIA · IST (UTC+5:30)</span>
        </div>
        <div class="hero-status-pill">
          <span class="pulse-radar"></span>
          <span>AVAILABLE FOR SELECT BUILDS · Q4/Q1</span>
        </div>
      </div>

      <!-- Brand Emblem Avatar Pill -->
      <div class="hero-brand-emblem-pill reveal">
        <div class="hero-brand-avatar-box">
          <svg class="hero-brand-avatar-img" width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="7" fill="#070709"/>
            <path d="M8 23 L16 7 L24 23" fill="none" stroke="#ff2d4a" stroke-width="2"/>
            <path d="M11 18 H21" stroke="#3ee0ff" stroke-width="2"/>
          </svg>
          <span class="hero-brand-pulse"></span>
        </div>
        <div class="hero-brand-meta">
          <span class="hero-brand-title">ARTRAW // NO SYSTEM IS SAFE</span>
          <span class="hero-brand-sub">ART IS MY CODE · CREATIVE LAB</span>
        </div>
      </div>

      <!-- Massive Center Kinetic Typography -->
      <h1 id="hero-title" class="hero-main-title reveal">
        <span class="title-word title-sans">ARTRAW</span>
        <span class="title-word title-serif-italic">Creative Technology.</span>
      </h1>

      <!-- Editorial Subhead -->
      <p class="hero-editorial-subhead reveal">
        The autonomous engineering & creative practice of ARTRAW. High-speed websites,
        on-device AI systems, video, branding, and custom digital architectures.
      </p>

      <!-- Primary & Secondary Interactive Action CTAs -->
      <div class="hero-cta-group reveal">
        <a href="#contact" class="btn btn-primary btn-lg" data-magnetic>
          Initiate Project
          ${getIcon('arrowRight')}
        </a>
        <a href="#spec-section" class="btn btn-secondary btn-lg" data-magnetic>
          Inspect Capability Spec
        </a>
      </div>

      <!-- Aceternity 3D Container Scroll Stage -->
      <div class="hero-3d-stage" id="hero-3d-stage">
        <div class="hero-3d-card" id="hero-3d-card">
          <div class="hero-hologram-banner reveal" aria-hidden="true">
            <img src="${asset('/assets/images/artraw-ai-artech.png')}" alt="ARTRAW Artech AI Cyber Hologram" class="hero-banner-img" width="800" height="600" loading="eager" decoding="async" />
            <div class="hero-banner-overlay-scanline"></div>
            <div class="hero-banner-caption">
              <span class="caption-dot"></span>
              <span>QUALCOMM SNAPDRAGON 8-CORE · TERMUX CYBER WORKSTATION · LOCAL LLM</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Tech Substrate Badges -->
      <div class="hero-floating-badges reveal">
        <div class="hud-pill"><span class="hud-dot red"></span> On-Device Voice AI (Lucy)</div>
        <div class="hud-pill"><span class="hud-dot red"></span> Termux Cyberpunk Workstation</div>
        <div class="hud-pill"><span class="hud-dot red"></span> Artfiles Native Android (SDK 36)</div>
        <div class="hud-pill"><span class="hud-dot cyan"></span> High-Velocity Web Systems</div>
      </div>
    </div>

    ${TORN_EDGE_BOTTOM}
  `;

  // Place ambient canvas inside background layer
  const backLayer = section.querySelector('.hero-layer-back');
  if (backLayer) backLayer.prepend(ambientCanvas);

  return section;
}

export function initHero(section) {
  if (!section || typeof window === 'undefined') return { destroy() {} };

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;

  const canvas = section.querySelector('.hero-ambient-canvas');
  const canvasKill = initAmbientCanvas(canvas);

  const layerBack = section.querySelector('.hero-layer-back');
  const contentFlow = section.querySelector('.hero-content-flow');
  const card3D = section.querySelector('#hero-3d-card');
  const stage3D = section.querySelector('#hero-3d-stage');
  const magneticKill = initMagnetic(section);

  const cleanups = [canvasKill, magneticKill];

  /* --- Parallax Scroll Choreography (Smooth background drift, zero collisions) --- */
  if (!prefersReduced && isDesktop) {
    const stBack = gsap.to(layerBack, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    cleanups.push(() => {
      stBack.scrollTrigger?.kill();
    });
  }

  /* --- Aceternity 3D Container Scroll: Screen tilts up and scales into view on scroll --- */
  if (!prefersReduced && card3D && stage3D) {
    const cardAnim = gsap.fromTo(
      card3D,
      {
        rotateX: isDesktop ? 22 : 12,
        scale: 0.92,
        transformPerspective: 1200,
      },
      {
        rotateX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: stage3D,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.8,
        },
      }
    );

    cleanups.push(() => {
      cardAnim.scrollTrigger?.kill();
      cardAnim.kill();
    });
  }

  // Cinematic Cold-Boot Entrance Sequence — waits for the Preloader
  // reveal on first paint, then runs a SplitText char/word masked rise
  // with ScrambleText HUD telemetry.
  const hudTop = section.querySelector('.hero-hud-top');
  const emblemPill = section.querySelector('.hero-brand-emblem-pill');
  const mainTitle = section.querySelector('.hero-main-title');
  const titleSans = section.querySelector('.title-sans');
  const titleSerif = section.querySelector('.title-serif-italic');
  const subhead = section.querySelector('.hero-editorial-subhead');
  const ctaGroup = section.querySelector('.hero-cta-group');
  const badges = section.querySelectorAll('.hero-floating-badges .hud-pill');
  const sysCode = section.querySelector('.sys-code');
  const sysLoc = section.querySelector('.sys-loc');

  const headless = isHeadlessEnv();
  const skipBoot = prefersReduced || headless;

  let destroyed = false;
  let bootTl = null;
  const bootKills = [];
  const splits = [];

  const SYS_CODE_FINAL = sysCode ? sysCode.textContent.trim() : '';
  const SYS_LOC_FINAL = sysLoc ? sysLoc.textContent.trim() : '';

  function clearBootElements() {
    gsap.set(
      [hudTop, emblemPill, mainTitle, titleSans, titleSerif, subhead, ctaGroup, card3D, badges],
      { opacity: 1, y: 0, scale: 1, transform: 'none' }
    );
  }

  function runBoot() {
    if (destroyed) return;
    if (skipBoot) {
      clearBootElements();
      return;
    }

    /* True SplitText with masked char/word wrappers (clipping included). */
    try {
      if (titleSans) {
        splits.push(new SplitText(titleSans, { type: 'chars', mask: 'chars' }));
      }
      if (titleSerif) {
        splits.push(new SplitText(titleSerif, { type: 'words', mask: 'words' }));
      }
    } catch {
      splits.length = 0; // Split failure should never block content visibility
    }

    const sansChars = splits[0]?.chars || [];
    const serifWords = splits[1]?.words || [];

    // Initial states — the title wrapper stays visible; its split
    // chars/words carry the reveal from inside the masks.
    gsap.set([hudTop, emblemPill, subhead, ctaGroup], { opacity: 0 });
    gsap.set(mainTitle, { opacity: 1 });
    gsap.set(hudTop, { y: -16, scale: 0.94 });
    gsap.set(emblemPill, { y: -12, scale: 0.9 });
    gsap.set(sansChars, { yPercent: 118, opacity: 1 });
    gsap.set(serifWords, { yPercent: 120, opacity: 1 });
    gsap.set(subhead, { y: 20, opacity: 0 });
    gsap.set(ctaGroup, { y: 20, opacity: 0 });
    if (card3D) gsap.set(card3D, { opacity: 0, y: 35, rotateX: isDesktop ? 22 : 12, scale: 0.92 });
    gsap.set(badges, { opacity: 0, y: 15, scale: 0.92 });

    bootTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    bootTl
      .to(hudTop, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, 0.05)
      .to(emblemPill, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }, '-=0.25')
      .to(sansChars, {
        yPercent: 0,
        duration: 0.8,
        stagger: { each: 0.045, from: 'start' },
        ease: 'power4.out',
      }, '-=0.28')
      .to(serifWords, { yPercent: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out' }, '-=0.4')
      .to(subhead, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .to(ctaGroup, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.3)' }, '-=0.25')
      .to(card3D, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.35')
      .to(badges, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out' }, '-=0.45');

    /* HUD telemetry scrambles into place while the title rises. */
    if (sysCode) {
      bootTl.fromTo(
        sysCode,
        {},
        {
          duration: 0.7,
          scrambleText: { text: SYS_CODE_FINAL, speed: 1.3, chars: '01<>#/\\' },
          ease: 'none',
        },
        0.1
      );
    }
    if (sysLoc) {
      bootTl.fromTo(
        sysLoc,
        {},
        {
          duration: 0.7,
          scrambleText: { text: SYS_LOC_FINAL, speed: 1.3, chars: '01<>#/\\.' },
          ease: 'none',
        },
        0.2
      );
    }

    bootKills.push(() => bootTl?.kill());
  }

  if (!skipBoot) {
    // Wait for the preloader gate (first boot) + webfonts before splitting,
    // with a hard timeout so the hero can never stay hidden.
    const gateWait = window.__artrawBootGate
      ? new Promise((resolve) => {
          window.addEventListener('artraw:preloader:done', () => resolve(), { once: true });
        })
      : Promise.resolve();
    const fontsWait = document.fonts?.ready || Promise.resolve();
    const safety = new Promise((resolve) => setTimeout(resolve, 4000));

    Promise.race([Promise.all([gateWait, fontsWait]), safety]).then(runBoot);
  } else {
    clearBootElements();
  }

  return {
    destroy() {
      destroyed = true;
      cleanups.forEach((fn) => fn?.());
      bootKills.forEach((fn) => fn?.());
      bootTl?.kill();
      splits.forEach((split) => split.revert());
      splits.length = 0;
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      gsap.set([layerBack, contentFlow], { clearProps: 'yPercent,opacity,transform' });
      clearBootElements();
    },
  };
}
