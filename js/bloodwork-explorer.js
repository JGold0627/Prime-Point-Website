(() => {
  'use strict';

  document.querySelectorAll('[data-bw-explorer]').forEach((root) => {
    const canvas = root.querySelector('[data-bw-canvas]');
    const stage = root.querySelector('[data-bw-stage]');
    const hotspots = root.querySelector('.bw-explorer-hotspots');
    const detail = root.querySelector('.bw-explorer-detail');
    const title = root.querySelector('[data-bw-title]');
    const markerList = root.querySelector('[data-bw-marker-list]');
    const markerCount = root.querySelector('[data-bw-marker-count]');
    const scrollHint = root.querySelector('[data-bw-scroll-hint]');
    const status = root.querySelector('[data-bw-status]');
    const back = root.querySelector('[data-bw-reset]');
    const previous = root.querySelector('[data-bw-previous]');
    const next = root.querySelector('[data-bw-next]');
    const regions = [...root.querySelectorAll('[data-bw-region]')].map((button) => ({
      button,
      name: button.querySelector('.bw-hotspot-label').textContent.trim(),
      template: root.querySelector(`[data-bw-region-content="${button.dataset.bwRegion}"]`),
      x: Number(button.dataset.focusX),
      y: Number(button.dataset.focusY),
      zoom: Number(button.dataset.zoom),
    }));
    if (!regions.length || regions.some((region) => !region.template)) return;

    let active = -1;
    let resizeFrame = 0;

    function updateView() {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      // The source image is 2:1. Its dimensions never depend on marker content.
      const sceneWidth = height * 2;
      const overviewX = width * .54 - sceneWidth * .733;
      // Keep touch targets and labels unscaled while the image animates underneath.
      regions.forEach((region) => {
        region.button.style.setProperty('--hotspot-x', `${overviewX + sceneWidth * region.x}px`);
        region.button.style.setProperty('--hotspot-y', `${height * region.y}px`);
      });
      let scale = 1;
      let x = overviewX;
      let y = 0;
      if (active >= 0) {
        const region = regions[active];
        const style = getComputedStyle(root);
        const targetX = parseFloat(style.getPropertyValue('--focus-x')) / 100;
        const targetY = parseFloat(style.getPropertyValue('--focus-y')) / 100;
        scale = region.zoom;
        x = width * targetX - sceneWidth * region.x * scale;
        y = height * targetY - height * region.y * scale;
      }
      stage.style.width = `${sceneWidth}px`;
      stage.style.height = `${height}px`;
      stage.style.setProperty('--scene-x', `${x}px`);
      stage.style.setProperty('--scene-y', `${y}px`);
      stage.style.setProperty('--scene-scale', String(scale));
    }

    function updateMarkerScroll() {
      if (detail.hidden) return;
      const overflows = markerList.scrollHeight > markerList.clientHeight + 1;
      scrollHint.hidden = !overflows;
      markerList.tabIndex = overflows ? 0 : -1;
    }

    function selectRegion(index, moveFocus = true) {
      active = index;
      const region = regions[active];
      title.textContent = region.name;
      markerList.replaceChildren(region.template.content.cloneNode(true));
      [...markerList.children].forEach((marker, i) => marker.style.setProperty('--marker-index', String(Math.min(i, 5))));
      const count = markerList.children.length;
      markerCount.textContent = `${count} tests & markers`;
      markerList.setAttribute('aria-label', `${region.name} tests and markers`);
      regions.forEach((item, i) => item.button.setAttribute('aria-expanded', String(i === active)));
      detail.hidden = false;
      detail.scrollTop = 0;
      markerList.scrollTop = 0;
      root.classList.add('is-focused');
      hotspots.inert = true;
      updateView();
      updateMarkerScroll();
      status.textContent = `${region.name}. ${count} tests and markers. Availability varies by panel. Press Escape to return to the full body.`;
      if (moveFocus) back.focus({ preventScroll: true });
    }

    function resetView() {
      if (active < 0) return;
      const selected = regions[active].button;
      active = -1;
      regions.forEach((region) => region.button.setAttribute('aria-expanded', 'false'));
      root.classList.remove('is-focused');
      detail.hidden = true;
      hotspots.inert = false;
      updateView();
      status.textContent = 'Full body view. Choose a point to explore another category.';
      selected.focus({ preventScroll: true });
    }

    regions.forEach((region, index) => region.button.addEventListener('click', () => selectRegion(index)));
    back.addEventListener('click', resetView);
    previous.addEventListener('click', () => {
      if (active >= 0) selectRegion((active + regions.length - 1) % regions.length, false);
    });
    next.addEventListener('click', () => {
      if (active >= 0) selectRegion((active + 1) % regions.length, false);
    });
    root.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || active < 0) return;
      event.preventDefault();
      resetView();
    });

    function resize() {
      cancelAnimationFrame(resizeFrame);
      root.classList.add('is-resizing');
      updateView();
      updateMarkerScroll();
      resizeFrame = requestAnimationFrame(() => root.classList.remove('is-resizing'));
    }
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      observer.observe(markerList);
    } else window.addEventListener('resize', resize);
    window.addEventListener('pageshow', resize);
    updateView();
    root.classList.add('is-ready');
  });
})();
