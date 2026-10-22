/**
 * ARTRAW — Pinned 3D Scrollytelling & Exploded Layer Inspection (Flagship Projects)
 *
 * Cinematic scroll choreography for all 4 core projects:
 * 1. Lucy AI (Technical Flagship: 3D perspective rotation + exploded floating layers)
 * 2. OpenClaw / OmniRoute (Technical Flagship: 3D perspective routing matrix + exploded substrate)
 * 3. Ayur Veda Global (E-Commerce: Next.js storefront architecture & layered catalog mockups)
 * 4. HF RECORD (Music Creative: Visual release direction & audio wave visualizer)
 *
 * Runs at 60fps on both PC (Lenis + GSAP scrub) and Android Mobile (native touch + GPU reveals).
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workProjects } from '../data/portfolio.js';
import { asset } from '../utils/helpers.js';
import { getIcon } from '../utils/icons.js';
import { scrollTo } from '../utils/scroll.js';

gsap.registerPlugin(ScrollTrigger);

// Core flagship projects strictly preserved
const FLAGSHIP_IDS = ['lucy-ai', 'openclaw-omniroute', 'artraw-os', 'ayur-veda-global', 'hf-record'];
const FLAGSHIP_PROJECTS = FLAGSHIP_IDS.map(id => workProjects.find(p => p.id === id)).filter(Boolean);

export function createFlagshipScene() {
  const section = document.createElement('section');
  section.className = 'section flagship flagship-scrolly';
  section.id = 'flagship';
  section.setAttribute('aria-label', 'Flagship projects scrollytelling');

  section.innerHTML = `
    <div class="flagship-wrapper">
      <!-- Section Header -->
      <header class="flagship-header reveal">
        <div class="flagship-badge-pill">
          <span class="live-pulse-dot"></span>
          <span>04 // 3D ARCHITECTURAL INSPECTION</span>
        </div>
        <h2 class="flagship-title display-serif">Flagship Systems & Creative Direction</h2>
        <p class="flagship-description">
          Scroll to inspect active codebases, 3D decomposed architectures, and creative systems.
          All projects represent authentic work built in this workspace.
        </p>

        <!-- Interactive Scene Progress Tabs (01 - 06) -->
        <div class="flagship-nav-tabs" role="tablist" aria-label="Project Scenes">
          ${FLAGSHIP_PROJECTS.map((proj, idx) => `
            <button class="flagship-tab ${idx === 0 ? 'active' : ''}" type="button" data-index="${idx}" role="tab" aria-selected="${idx === 0}">
              <span class="tab-num">0${idx + 1}</span>
              <span class="tab-label">${proj.title}</span>
              <span class="tab-progress-bar"><span class="tab-progress-fill"></span></span>
            </button>
          `).join('')}
        </div>
      </header>

      <!-- Pinned 3D Stage Container -->
      <div class="flagship-stage-container" id="flagship-stage-container">
        <div class="flagship-stage" id="flagship-stage">
          <div class="flagship-deck">
            ${FLAGSHIP_PROJECTS.map((project, index) => {
              const isTechFlagship = project.id === 'lucy-ai' || project.id === 'openclaw-omniroute' || project.id === 'artraw-os' || project.id === 'artraw-files';
              const substrateMap = {
                'lucy-ai': 'Android 16 · Shizuku IPC · Local LLM DSP',
                'artraw-os': 'Qualcomm 8-Core · Linux 5.15 · Termux zsh',
                'artraw-files': 'Kotlin Native · SDK 36 · AAPT2 / D8 / R8',
                'openclaw-omniroute': 'Node Daemon · openclaw-ctl · Model Routing',
                
                'ayur-veda-global': 'Next.js 14 SSR · React Server Components · Tailwind',
                'hf-record': 'Audio DSP · Waveform Visualizer · Editorial Packaging'
              };
              const substrateCode = substrateMap[project.id] || 'ARTRAW Core Substrate';
              return `
                <article class="flagship-scene ${index === 0 ? 'active' : ''}" data-scene="${index + 1}" data-accent="${project.accent}" data-id="${project.id}">
                  <div class="flagship-card-glass">
                    <!-- Left: Interactive 3D Exploded / Visual Column -->
                    <div class="flagship-visual-wrap" data-aspect="${project.aspect || 'landscape'}">
                      ${isTechFlagship ? `
                        <!-- 3D Exploded Perspective Stage for Technical Flagships -->
                        <div class="exploded-stage" data-project="${project.id}" data-aspect="${project.aspect || 'landscape'}">
                          <div class="exploded-card-3d" data-aspect="${project.aspect || 'landscape'}">
                            <!-- Layer 1: Base Substrate / Kernel -->
                            <div class="exploded-layer layer-base">
                              <div class="layer-header">
                                <span class="layer-tag">LAYER 01 // SUBSTRATE</span>
                                <span class="layer-status">ACTIVE</span>
                              </div>
                              <div class="layer-body">
                                <code>${substrateCode}</code>
                              </div>
                            </div>

                            <!-- Layer 2: Core Processing & Poster Layer -->
                            <div class="exploded-layer layer-mid">
                              <div class="exploded-poster-preview">
                                <img src="${asset(project.image)}" alt="${project.title} System Poster" class="exploded-poster-img" loading="lazy" decoding="async" width="${project.aspect === 'portrait' ? 600 : project.aspect === 'landscape' ? 800 : 600}" height="${project.aspect === 'portrait' ? 800 : project.aspect === 'landscape' ? 600 : 600}" />
                              </div>
                            </div>

                            <!-- Layer 3: Top Telemetry & Interface Glass -->
                            <div class="exploded-layer layer-top">
                              <div class="layer-top-inner">
                                <div class="layer-icon-badge">${getIcon(project.icon || 'cpu')}</div>
                                <div class="layer-mark">${project.mark}</div>
                                <div class="layer-title-sm">${project.title}</div>
                                <div class="layer-status-pill accent-${project.accent}">
                                  <span class="status-pulse-dot"></span>
                                  <span>${project.statusLabel}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ` : `
                        <!-- High-Impact Creative Poster Stage for Ayur Veda Global / HF RECORD -->
                        <div class="creative-stage" data-project="${project.id}" data-aspect="${project.aspect || 'landscape'}">
                          <div class="creative-poster-card" data-aspect="${project.aspect || 'landscape'}">
                            <div class="creative-poster-frame" data-aspect="${project.aspect || 'landscape'}">
                              <img src="${asset(project.image)}" alt="${project.title} Showcase Poster" class="creative-poster-img" loading="lazy" decoding="async" width="${project.aspect === 'portrait' ? 600 : project.aspect === 'landscape' ? 800 : 600}" height="${project.aspect === 'portrait' ? 800 : project.aspect === 'landscape' ? 600 : 600}" />
                              <div class="creative-poster-glare"></div>
                            </div>
                            <div class="creative-visual-badge accent-${project.accent}">
                              <span class="badge-icon">${getIcon(project.icon || 'sparkles')}</span>
                              <span>${project.statusLabel}</span>
                            </div>
                          </div>
                        </div>
                      `}
                    </div>

                    <!-- Right: Technical Specification & Key Deliverables -->
                    <div class="flagship-copy">
                      <div class="flagship-meta-top">
                        <span class="flagship-category">${project.category}</span>
                        <span class="flagship-counter">0${index + 1} / 0${FLAGSHIP_PROJECTS.length}</span>
                      </div>

                      <h3 class="flagship-scene-title">${project.title}</h3>
                      <p class="flagship-tagline">${project.tagline}</p>
                      <p class="flagship-summary">${project.summary}</p>

                      <div class="flagship-spec-box">
                        <h4 class="spec-heading">Engineering & Deliverable Scope:</h4>
                        <ul class="flagship-stack" role="list">
                          ${project.built.map(item => `
                            <li>${item}</li>
                          `).join('')}
                        </ul>
                      </div>

                      <div class="flagship-tech-pills">
                        ${project.stack.map(st => `<span class="tech-pill">${st}</span>`).join('')}
                      </div>

                      <div class="flagship-actions">
                        <a href="/work#${project.id}" class="btn btn-primary btn-md" data-route="true" data-project="${project.id}">
                          Inspect Work Case ${getIcon('arrowRight')}
                        </a>
                        ${project.links?.github ? `
                          <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-md">
                            ${getIcon('github')} GitHub Source
                          </a>
                        ` : `
                          <a href="/contact?service=${project.id}" class="btn btn-secondary btn-md" data-route="true">
                            Request Similar Build
                          </a>
                        `}
                      </div>
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}

export function initFlagshipScene(section) {
  if (!section || typeof window === 'undefined') return { destroy() {} };

  const tabs = Array.from(section.querySelectorAll('.flagship-tab'));
  const stageContainer = section.querySelector('#flagship-stage-container');
  const stage = section.querySelector('#flagship-stage');
  const scenes = Array.from(section.querySelectorAll('.flagship-scene'));
  const explodedCards = section.querySelectorAll('.exploded-card-3d');
  const rings = section.querySelectorAll('.creative-glow-ring');

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;

  /* =========================================================================
     DESKTOP: Pinned 3D Scrollytelling Stage with Exploded Layers
     ========================================================================= */
  if (isDesktop && !prefersReduced) {
    gsap.set(scenes, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      opacity: 0,
      scale: 0.92,
      y: 40,
      z: 80,
      rotateX: -6,
      pointerEvents: 'none',
      visibility: 'hidden',
    });

    // First scene initially visible
    gsap.set(scenes[0], {
      opacity: 1,
      scale: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      pointerEvents: 'auto',
      visibility: 'visible',
    });

    function setActiveTab(index, fillPercent = 1) {
      tabs.forEach((tab, i) => {
        const isActive = i === index;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        const fill = tab.querySelector('.tab-progress-fill');
        if (fill) {
          if (i < index) fill.style.width = '100%';
          else if (i === index) fill.style.width = `${fillPercent * 100}%`;
          else fill.style.width = '0%';
        }
      });
    }

    const totalScenes = scenes.length;
    const scrollDistance = totalScenes * 130; // 130vh per scene

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stageContainer,
        start: 'top top+=72',
        end: `+=${scrollDistance}%`,
        pin: stage,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const rawProgress = self.progress;
          const currentProgress = rawProgress * (totalScenes - 1);
          const activeIndex = Math.min(Math.floor(currentProgress), totalScenes - 1);
          const sceneFraction = currentProgress - activeIndex;
          setActiveTab(activeIndex, sceneFraction);

          // Rotate rings and exploded perspective based on scrub progress
          gsap.set(rings, { rotate: rawProgress * 360 });
        },
      },
    });

    // Choreograph transitions between all flagship projects
    for (let i = 0; i < totalScenes - 1; i++) {
      const current = scenes[i];
      const next = scenes[i + 1];

      // If current has 3D exploded card, animate its separation
      const current3D = current.querySelector('.exploded-card-3d');
      if (current3D) {
        const layerBase = current3D.querySelector('.layer-base');
        const layerMid = current3D.querySelector('.layer-mid');
        const layerTop = current3D.querySelector('.layer-top');

        mainTimeline.to(
          current3D,
          {
            rotateX: 18,
            rotateY: -16,
            rotateZ: 4,
            duration: 0.5,
            ease: 'none',
          },
          i * 2
        );

        if (layerBase && layerMid && layerTop) {
          mainTimeline
            .to(layerBase, { transform: 'translateZ(-50px) translateY(20px)', opacity: 0.7, duration: 0.5 }, '<')
            .to(layerMid, { transform: 'translateZ(0px) translateY(0px)', opacity: 0.85, duration: 0.5 }, '<')
            .to(layerTop, { transform: 'translateZ(60px) translateY(-25px)', opacity: 1, duration: 0.5 }, '<');
        }
      }

      // If current is creative poster, animate glare and frame tilt
      const creativeCard = current.querySelector('.creative-poster-card');
      if (creativeCard) {
        mainTimeline.to(
          creativeCard,
          {
            rotateY: -10,
            rotateX: 6,
            scale: 1.03,
            duration: 0.5,
            ease: 'none',
          },
          i * 2
        );
      }

      // Transition to next scene with 3D camera pan & depth glide
      mainTimeline
        .to(current, {
          opacity: 0,
          scale: 0.90,
          y: -40,
          z: -100,
          rotateX: 6,
          duration: 1,
          ease: 'power2.inOut',
          onStart: () => { current.style.pointerEvents = 'none'; },
          onReverseComplete: () => {
            current.style.pointerEvents = 'auto';
            current.style.visibility = 'visible';
          },
        })
        .fromTo(
          next,
          {
            opacity: 0,
            scale: 0.92,
            y: 40,
            z: 80,
            rotateX: -6,
            visibility: 'visible',
            pointerEvents: 'none',
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => { next.style.pointerEvents = 'auto'; },
            onReverseComplete: () => {
              next.style.pointerEvents = 'none';
              next.style.visibility = 'hidden';
            },
          },
          '<+=0.1'
        )
        .to({}, { duration: 0.8 });
    }

    // Direct click on tabs jumps directly to project scene
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.index, 10);
        if (isNaN(idx)) return;
        const trigger = mainTimeline.scrollTrigger;
        if (!trigger) return;

        const start = trigger.start;
        const totalDist = trigger.end - start;
        const targetScroll = start + (idx / (totalScenes - 1)) * totalDist;
        scrollTo(targetScroll, { duration: 1.2 });
      });
    });

    return {
      destroy() {
        mainTimeline.scrollTrigger?.kill();
        mainTimeline.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger && section.contains(t.trigger)) t.kill();
        });
      gsap.set(scenes, { clearProps: 'position,top,left,width,opacity,scale,y,z,rotateX,pointerEvents,visibility,transform' });
        gsap.set(explodedCards, { clearProps: 'rotateX,transform' });
        gsap.set(rings, { clearProps: 'rotate,transform' });
      },
    };
  }

  /* =========================================================================
     MOBILE / ANDROID WEB & REDUCED MOTION: Native 60fps Stacked Cards
     ========================================================================= */
  gsap.set(scenes, {
    position: 'relative',
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: 'auto',
    visibility: 'visible',
  });

  if (!prefersReduced) {
    scenes.forEach((scene) => {
      const card = scene.querySelector('.flagship-card-glass');
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0.35, y: 35, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: scene,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );
    });
  }

  return {
    destroy() {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      gsap.set(scenes, { clearProps: 'position,opacity,y,scale,pointerEvents,visibility,transform' });
    },
  };
}
