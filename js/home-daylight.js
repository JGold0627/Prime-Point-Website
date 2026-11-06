(() => {
  const scene = document.querySelector(".home-hero-daylight");
  if (!scene) return;

  const sun = scene.querySelector("[data-day-sun]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const daylight = 22000;
  const cycle = daylight + 1200;
  let elapsed = 1800;
  let lastFrame = null;
  let frame = 0;
  let visible = true;
  let layout;

  function paint() {
    const time = reducedMotion.matches ? .18 : Math.min(elapsed / daylight, 1);
    const progress = time * time * (3 - 2 * time);
    const altitude = Math.sin(Math.PI * progress);
    const { start, travel, rise, scale } = layout;

    const x = start + travel * progress;
    const y = 813 - rise * altitude;
    sun.setAttribute("transform", `translate(${x} ${y}) scale(${scale})`);
    sun.setAttribute("opacity", time === 1 ? 0 : Math.min(1, altitude * 10));
  }

  function fit() {
    const { width, height } = scene.getBoundingClientRect();
    if (!width || !height) return;
    // Fit the solar path to the visible part of the mountain photograph.
    const zoom = Math.max(width / 1536, height / 1024);
    const w = width / zoom;
    const h = height / zoom;
    const left = (1536 - w) / 2;
    const top = (1024 - h) * .72;
    scene.setAttribute("viewBox", `${left} ${top} ${w} ${h}`);
    const start = left + w * (width < 760 ? .10 : .35);
    layout = {
      start, travel: left + .91 * w - start, rise: Math.min(h * .46, 813 - top - .14 * h),
      scale: Math.min(1.15, Math.max(.58, w / 1400))
    };
    paint();
  }

  function tick(now) {
    if (lastFrame !== null) elapsed = (elapsed + now - lastFrame) % cycle;
    lastFrame = now;
    paint();
    frame = requestAnimationFrame(tick);
  }

  function updatePlayback() {
    cancelAnimationFrame(frame);
    lastFrame = null;
    if (!layout) return;
    paint();
    if (visible && !document.hidden && !reducedMotion.matches) {
      frame = requestAnimationFrame(tick);
    }
  }

  fit();
  new ResizeObserver(fit).observe(scene);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  }).observe(scene);
  reducedMotion.addEventListener("change", updatePlayback);
  document.addEventListener("visibilitychange", updatePlayback);
})();
