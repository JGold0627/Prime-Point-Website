(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-marker-reel]').forEach((reel) => {
    const viewport = reel.querySelector('[data-marker-window]');
    const track = reel.querySelector('[data-marker-track]');
    const originalItems = Array.from(track.children);
    const count = originalItems.length;
    if (count < 2) return;

    // Keep one accessible list; the continuously repeated visual track is decorative.
    const accessibleList = track.cloneNode(true);
    accessibleList.className = 'bw-reference-accessible';
    accessibleList.removeAttribute('data-marker-track');
    accessibleList.setAttribute('aria-label', 'Bloodwork categories');
    reel.insertBefore(accessibleList, viewport);
    track.setAttribute('aria-hidden', 'true');

    for (let copy = 0; copy < 2; copy += 1) {
      originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.classList.add('bw-marker-reel-copy');
        track.appendChild(clone);
      });
    }

    const items = Array.from(track.children);
    const millisecondsPerRow = 3200;
    let phase = count - 1;
    let rowHeight = 0;
    let activeIndex = -1;
    let frame = null;
    let lastTime = null;
    let hovered = false;
    let visible = false;

    const render = () => {
      track.style.transform = `translate3d(0, ${-phase * rowHeight}px, 0)`;
      const nextActive = (Math.round(phase) + 2) % count;
      if (nextActive !== activeIndex) {
        items.forEach((item, index) => item.classList.toggle('is-current', index % count === nextActive));
        activeIndex = nextActive;
      }
    };

    const tick = (time) => {
      if (lastTime !== null) {
        phase = (phase + (time - lastTime) / millisecondsPerRow) % count;
      }
      lastTime = time;
      render();
      frame = window.requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
      const shouldPlay = !reducedMotion.matches && !hovered && visible && !document.hidden;
      if (shouldPlay && frame === null) {
        lastTime = null;
        frame = window.requestAnimationFrame(tick);
      } else if (!shouldPlay && frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
        lastTime = null;
      }
    };

    const measure = () => {
      rowHeight = originalItems[0].getBoundingClientRect().height;
      if (!reducedMotion.matches) render();
    };

    const updateMotionPreference = () => {
      reel.classList.toggle('is-enhanced', !reducedMotion.matches);
      if (reducedMotion.matches) {
        track.style.transform = '';
        items.forEach((item) => item.classList.remove('is-current'));
        activeIndex = -1;
      } else {
        measure();
      }
      syncPlayback();
    };

    viewport.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      hovered = true;
      syncPlayback();
    });
    viewport.addEventListener('pointerleave', () => {
      hovered = false;
      syncPlayback();
    });
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', updateMotionPreference);

    if ('ResizeObserver' in window) {
      new ResizeObserver(measure).observe(viewport);
    } else {
      window.addEventListener('resize', measure);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      }, { threshold: 0.1 }).observe(reel);
    } else {
      visible = true;
    }

    updateMotionPreference();
  });
})();
