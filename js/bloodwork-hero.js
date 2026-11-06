(() => {
  const visual = document.querySelector('.bw-laptop-visual');
  const stage = visual?.querySelector('.bw-laptop-stage');
  if (!visual || !stage) return;

  // Keep the supplied photo and real homepage in the same coordinate system.
  // Crop the bottom 36 pixels containing the source image-size badge.
  const fit = () => {
    const { width, height } = visual.getBoundingClientRect();
    if (!width || !height) return;
    const scale = Math.max(width / 778, height / 405);
    const left = (width - 778 * scale) / 2;
    stage.style.transform = `translateX(${left}px) scale(${scale})`;
  };

  fit();
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(visual);
  else window.addEventListener('resize', fit, { passive: true });
})();
