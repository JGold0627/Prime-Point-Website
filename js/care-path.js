// A single, gentle pass highlights the journey without hiding any step's copy.
document.querySelectorAll('[data-care-path]').forEach((section) => {
  const steps = [...section.querySelectorAll('[data-care-step]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const timers = [];
  if (!steps.length) return;

  // Keep the alternating curves attached to the description paragraphs,
  // including when font loading or a narrower viewport changes their height.
  const connectorPairs = steps.slice(0, -1).map((step, index) => ({
    step,
    connector: step.querySelector('.care-path-connector'),
    from: step.querySelector('.care-path-card p'),
    to: steps[index + 1].querySelector('.care-path-card p'),
  })).filter(({ connector, from, to }) => connector && from && to);
  const positionConnectors = () => {
    const weight = parseFloat(getComputedStyle(section).getPropertyValue('--care-line-weight')) || 1.25;
    const positions = connectorPairs.map(({ step, connector, from, to }) => {
      const origin = step.getBoundingClientRect();
      const start = from.getBoundingClientRect();
      const end = to.getBoundingClientRect();
      const startY = start.top + start.height / 2;
      const endY = end.top + end.height / 2;
      return {
        connector,
        top: startY - origin.top - weight / 2,
        height: endY - startY + weight,
      };
    });
    positions.forEach(({ connector, top, height }) => {
      connector.style.setProperty('--care-connector-top', `${top}px`);
      connector.style.setProperty('--care-connector-height', `${height}px`);
      connector.classList.toggle('is-positioned', height > 0);
    });
  };
  let connectorFrame;
  const scheduleConnectors = () => {
    cancelAnimationFrame(connectorFrame);
    connectorFrame = requestAnimationFrame(positionConnectors);
  };
  if ('ResizeObserver' in window) {
    const connectorObserver = new ResizeObserver(scheduleConnectors);
    connectorObserver.observe(section.querySelector('.care-path-steps'));
    steps.forEach((step) => connectorObserver.observe(step));
  } else {
    window.addEventListener('resize', scheduleConnectors, { passive: true });
  }
  document.fonts?.ready.then(scheduleConnectors);
  scheduleConnectors();

  const highlight = (index) => {
    section.style.setProperty('--care-progress', String(index / Math.max(1, steps.length - 1)));
    steps.forEach((step, position) => {
      step.classList.toggle('is-active', position === index);
      step.classList.toggle('is-reached', position <= index);
    });
  };
  const finish = () => {
    timers.forEach(window.clearTimeout);
    highlight(steps.length - 1);
  };

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    finish();
    return;
  }

  highlight(0);
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    steps.slice(1).forEach((_, index) => {
      timers.push(window.setTimeout(() => highlight(index + 1), (index + 1) * 1100));
    });
  }, { threshold: .3 });
  observer.observe(section.querySelector('.care-path-steps'));

  reducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    finish();
  });
  window.addEventListener('pagehide', () => {
    observer.disconnect();
    timers.forEach(window.clearTimeout);
  }, { once: true });
});
