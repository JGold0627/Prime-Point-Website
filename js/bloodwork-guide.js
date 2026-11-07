// Native scrolling stacks the steps only when their full content fits onscreen.
(() => {
  const stack = document.querySelector('.bw-guide-stack');
  if (!stack || !('ResizeObserver' in window)) return;

  const steps = [...stack.querySelectorAll(':scope > .bw-guide-step')];
  if (steps.length < 2) return;
  const labels = steps.map((step) => step.querySelector(':scope > .bw-guide-step-label'));
  if (labels.some((label) => !label)) return;

  const desktop = window.matchMedia('(min-width: 901px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const navigation = document.querySelector('.bw-guide-navigation');
  const previous = navigation?.querySelector('[data-bw-guide-prev]');
  const next = navigation?.querySelector('[data-bw-guide-next]');
  const position = navigation?.querySelector('[data-bw-guide-position]');
  let frame = 0;

  const currentStep = () => {
    const distance = steps[1].offsetLeft - steps[0].offsetLeft;
    return Math.max(0, Math.min(steps.length - 1, Math.round(stack.scrollLeft / distance)));
  };

  const updateNavigation = () => {
    if (!navigation || !previous || !next || !position) return;
    navigation.hidden = desktop.matches;
    if (desktop.matches) return;
    const index = currentStep();
    previous.disabled = index === 0;
    next.disabled = index === steps.length - 1;
    const label = `Step ${index + 1} of ${steps.length}`;
    if (position.textContent !== label) position.textContent = label;
  };

  const moveToStep = (index) => {
    if (desktop.matches) return;
    const step = steps[Math.max(0, Math.min(steps.length - 1, index))];
    stack.scrollTo({
      left: step.offsetLeft - steps[0].offsetLeft,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  };

  previous?.addEventListener('click', () => moveToStep(currentStep() - 1));
  next?.addEventListener('click', () => moveToStep(currentStep() + 1));
  stack.addEventListener('scroll', updateNavigation, { passive: true });
  stack.addEventListener('keydown', (event) => {
    if (desktop.matches || event.target !== stack) return;
    const destinations = {
      ArrowLeft: currentStep() - 1,
      ArrowRight: currentStep() + 1,
      Home: 0,
      End: steps.length - 1,
    };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    moveToStep(destinations[event.key]);
  });

  const update = () => {
    frame = 0;
    updateNavigation();
    if (!desktop.matches || reducedMotion.matches) {
      stack.classList.remove('is-stacking');
      return;
    }

    const headerStyle = header && getComputedStyle(header);
    const pinnedHeader = headerStyle && ['fixed', 'sticky'].includes(headerStyle.position);
    const top = 24 + (pinnedHeader ? header.offsetHeight : 0);
    const sizes = steps.map((step, index) => {
      const style = getComputedStyle(step);
      const inset = parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop);
      const label = labels[index];
      const gap = parseFloat(style.rowGap);
      const strip = inset + label.getBoundingClientRect().height + gap;
      const copy = step.querySelector(':scope > .bw-guide-step-copy');
      const art = step.querySelector(':scope > .bw-guide-art');
      const cta = step.querySelector(':scope > .bw-guide-cta');
      // The artwork spans the copy and action rows. Both columns must fit before stacking.
      const leftHeight = (copy?.getBoundingClientRect().height ?? 0)
        + (cta ? gap + cta.getBoundingClientRect().height : 0);
      const body = Math.max(leftHeight, art?.getBoundingClientRect().height ?? 0);
      return {
        strip: Math.floor(strip),
        natural: Math.ceil(strip + body + parseFloat(style.paddingBottom) + parseFloat(style.borderBottomWidth)),
      };
    });

    // The next card covers both content columns and leaves only the label row.
    const available = window.innerHeight - top - 24;
    const offsets = [0];
    sizes.slice(0, -1).forEach(({ strip }, i) => offsets.push(offsets[i] + strip));
    const depth = Math.max(...sizes.map(({ natural }, i) => offsets[i] + natural));
    if (depth > available) {
      stack.classList.remove('is-stacking');
      return;
    }

    // A shared bottom edge makes all cards leave the sticky area together,
    // preserving their vertical separation even as the footer enters.
    steps.forEach((step, index) => {
      const offset = offsets[index];
      step.style.setProperty('--bw-stack-top', `${top + offset}px`);
      step.style.setProperty('--bw-stack-height', `${depth - offset}px`);
      if (index) {
        const previousExtra = depth - offsets[index - 1] - sizes[index - 1].natural;
        step.style.setProperty('--bw-stack-underlap', `${previousExtra}px`);
        // Keep the next step below the viewport while the previous one settles.
        // An open panel gets extra reading room before the overlap begins.
        const previousBottom = top + offsets[index - 1] + sizes[index - 1].natural;
        const panelOpen = steps[index - 1].querySelector('.bw-guide-panel[open]');
        const readingHold = window.innerHeight * (panelOpen ? 0.35 : 0.2);
        const readingGap = Math.ceil(Math.max(0, window.innerHeight - previousBottom) + readingHold);
        step.style.setProperty('--bw-stack-reading-gap', `${readingGap}px`);
      }
      step.style.setProperty('--bw-stack-order', index + 1);
    });
    stack.classList.add('is-stacking');
  };

  const scheduleUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  // Restore a card's natural starting point for deep links or covered keyboard focus.
  const showStep = (step) => {
    if (!stack.classList.contains('is-stacking')) return;
    const index = steps.indexOf(step);
    if (index < 0) return;
    let top = window.scrollY + stack.getBoundingClientRect().top;
    for (let i = 0; i < index; i += 1) {
      top += steps[i].offsetHeight + parseFloat(getComputedStyle(steps[i + 1]).marginTop);
    }
    window.scrollTo({
      top: top - parseFloat(step.style.getPropertyValue('--bw-stack-top')),
      behavior: 'instant',
    });
  };

  const revealHash = () => {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const target = id && document.getElementById(id);
    if (target) showStep(target.closest('.bw-guide-step'));
  };

  stack.addEventListener('focusin', (event) => {
    const step = event.target.closest('.bw-guide-step');
    const next = steps[steps.indexOf(step) + 1];
    if (next && next.getBoundingClientRect().top < event.target.getBoundingClientRect().bottom + 16) {
      showStep(step);
    }
  });

  const observer = new ResizeObserver(scheduleUpdate);
  observer.observe(stack);
  steps.forEach((step) => [...step.children].forEach((child) => observer.observe(child)));
  if (header) observer.observe(header);
  stack.addEventListener('toggle', scheduleUpdate, true);
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', revealHash);
  desktop.addEventListener('change', scheduleUpdate);
  reducedMotion.addEventListener('change', scheduleUpdate);
  if (document.fonts) document.fonts.ready.then(scheduleUpdate);
  update();
  requestAnimationFrame(revealHash);
})();
