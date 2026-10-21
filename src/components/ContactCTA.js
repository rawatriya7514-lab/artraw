/**
 * ARTRAW — Contact CTA
 * Strong final visual transition, working navigation preserved.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIcon } from '../utils/icons.js';

gsap.registerPlugin(ScrollTrigger);

export function createContactCTA() {
  const section = document.createElement('section');
  section.className = 'section contact-cta';
  section.id = 'contact';
  section.setAttribute('aria-labelledby', 'contact-title');

  section.innerHTML = `
    <div class="container">
      <div class="contact-inner">
        <div class="contact-copy reveal">
          <p class="contact-label reveal" data-scramble>Work with me</p>
          <h2 id="contact-title" class="contact-title reveal">Build Something Different.</h2>
          <p class="contact-description reveal">
            Design, video, a website, an app, automation, or a custom digital job — tell me what
            you need and get a structured brief you can review before sending. This is an enquiry,
            not a contract.
          </p>
          <div class="contact-actions reveal">
            <a href="/contact" class="btn btn-primary btn-lg" data-route="true">
              Start a Project
              ${getIcon('arrowRight')}
            </a>
            <a href="/work" class="btn btn-secondary btn-lg" data-route="true">View Work</a>
          </div>
          <p class="contact-note reveal">
            Direct: <a href="mailto:rawateditzz@gmail.com" style="color: var(--color-accent-red); text-decoration: underline;">rawateditzz@gmail.com</a> · Call / WhatsApp: <a href="tel:9315878751" style="color: #ffffff;">+91 9315878751</a>
          </p>
        </div>
        <div class="contact-visual reveal" aria-hidden="true">
          <div class="contact-mark-wrap">
            <div class="contact-mark" data-depth="0.04" style="padding: 2px; overflow: hidden; border-radius: 50%;">
              <svg class="contact-mark-svg" width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="border-radius: 50%; object-fit: cover; display: block;"><rect width="32" height="32" rx="7" fill="#070709"/><path d="M8 23 L16 7 L24 23" fill="none" stroke="#ff2d4a" stroke-width="2"/><path d="M11 18 H21" stroke="#3ee0ff" stroke-width="2"/></svg>
            </div>
            <div class="contact-ring" style="--accent: var(--color-accent-red);"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}

export function initContactCTA(section) {
  if (!section) return { destroy() {} };

  const copyEls = section.querySelectorAll('.contact-copy > *');
  const visual = section.querySelector('.contact-visual');
  const mark = section.querySelector('.contact-mark');

  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && section.contains(t.trigger)) t.kill();
  });

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.set(copyEls, { opacity: 0, y: 30 });
    gsap.set(visual, { opacity: 0, x: -40 });
    gsap.set(mark, { scale: 0.8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        once: true,
        toggleActions: 'play none none none',
      },
    });

    tl.to(copyEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' })
      .to(visual, { opacity: 1, x: 0, duration: 1 }, 0.2)
      .to(mark, { scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, 0.4);

    return () => tl.kill();
  });

  mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
    gsap.set([...copyEls, visual], { opacity: 1, y: 0, x: 0 });
    gsap.set(mark, { scale: 1 });
    return () => {};
  });

  return {
    destroy() {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger)) t.kill();
      });
      gsap.set([...copyEls, visual], { clearProps: 'opacity,y,x' });
      gsap.set(mark, { clearProps: 'scale' });
    },
  };
}
