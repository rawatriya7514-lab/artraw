/**
 * ARTRAW — Ambient Canvas Background
 *
 * Lightweight interactive particle grid / constellation mesh for Hero.
 * - Hardware accelerated, throttled to 60fps.
 * - Auto-pauses when out of viewport via IntersectionObserver (0% CPU impact).
 * - Soft interactive attraction to cursor on desktop.
 * - Gentle drift on mobile / Android.
 */

export function createAmbientCanvas() {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-ambient-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  return canvas;
}

export function initAmbientCanvas(canvas) {
  if (!canvas || !canvas.getContext) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  let animId = null;
  let isRunning = false;
  let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  const count = isTouch ? 25 : 45; // fewer particles on mobile for speed
  const particles = [];
  const maxDistance = isTouch ? 90 : 120;

  const mouse = { x: -1000, y: -1000, radius: 140 };

  function resize() {
    width = canvas.width = canvas.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.offsetHeight || window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });

  const onMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };

  const onMouseLeave = () => {
    mouse.x = -1000;
    mouse.y = -1000;
  };

  if (!isTouch) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseout', onMouseLeave, { passive: true });
  }

  // Generate particles — Dominant Crimson Red & Cyber Accents
  const colors = [
    'rgba(255, 30, 66, 0.75)',  // electric crimson red
    'rgba(255, 45, 74, 0.60)',  // laser red
    'rgba(255, 10, 50, 0.50)',  // deep blood crimson
    'rgba(255, 255, 255, 0.35)', // pure starlight
    'rgba(0, 240, 255, 0.35)',  // cyber cyan spark
  ];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  function loop() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      else if (p.y > height) p.y = 0;

      // Cursor push effect on PC
      if (!isTouch && mouse.x > 0) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect close particles with delicate glowing web
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 30, 66, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(loop);
  }

  // IntersectionObserver to freeze canvas when user scrolls past Hero
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            resize();
            animId = requestAnimationFrame(loop);
          }
        } else {
          isRunning = false;
          if (animId) cancelAnimationFrame(animId);
        }
      });
    },
    { threshold: 0.05 }
  );

  observer.observe(canvas);

  return () => {
    observer.disconnect();
    isRunning = false;
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    if (!isTouch) {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    }
  };
}
