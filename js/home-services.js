document.querySelectorAll('[data-home-carousel]').forEach((carousel) => {
  const rail = carousel.querySelector('[data-carousel-rail]');
  const track = rail?.querySelector('[data-carousel-track]');
  const navigation = carousel.querySelector('[data-carousel-navigation]');
  if (!track || !navigation) return;

  const previous = navigation.querySelector('[data-carousel-prev]');
  const next = navigation.querySelector('[data-carousel-next]');
  const progress = navigation.querySelector('[data-carousel-progress]');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let previousTime = 0;
  let speed = 0;
  let targetSpeed = 0;

  const limit = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    speed = 0;
    targetSpeed = 0;
  };

  const updateNavigation = () => {
    const maximum = limit();
    const position = Math.max(0, Math.min(maximum, track.scrollLeft));
    previous.disabled = position <= 1;
    next.disabled = position >= maximum - 1;
    const fraction = Math.min(1, track.clientWidth / track.scrollWidth);
    progress.style.width = `${fraction * 100}%`;
    progress.style.transform = `translateX(${maximum ? position / maximum * (1 - fraction) / fraction * 100 : 0}%)`;
  };

  const animate = (time) => {
    const elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.04) : 1 / 60;
    previousTime = time;
    speed += (targetSpeed - speed) * (1 - Math.exp(-elapsed * 12));
    const maximum = limit();
    if (Math.abs(speed) < 2 && targetSpeed === 0 || speed < 0 && track.scrollLeft <= 0 || speed > 0 && track.scrollLeft >= maximum) {
      stop();
      return;
    }
    track.scrollLeft = Math.max(0, Math.min(maximum, track.scrollLeft + speed * elapsed));
    frame = requestAnimationFrame(animate);
  };

  rail.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch' || event.buttons) return;
    const bounds = rail.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const edge = Math.min(200, bounds.width * 0.18);
    const direction = x < edge ? -(1 - x / edge) : x > bounds.width - edge ? 1 - (bounds.width - x) / edge : 0;
    targetSpeed = Math.sign(direction) * Math.pow(Math.min(1, Math.abs(direction)), 1.5) * 440;
    if (!frame && targetSpeed !== 0) frame = requestAnimationFrame(animate);
  });

  // Motion belongs to this interaction only: leaving, scrolling the page, or
  // switching input modes must never leave the row drifting in the background.
  rail.addEventListener('pointerleave', stop);
  rail.addEventListener('pointerdown', stop);
  track.addEventListener('focusin', stop);
  track.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('scroll', stop, { passive: true });
  window.addEventListener('blur', stop);
  document.addEventListener('visibilitychange', stop);
  finePointer.addEventListener('change', stop);
  reducedMotion.addEventListener('change', stop);

  const move = (direction) => {
    stop();
    const firstCard = track.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;
    track.scrollTo({ left: Math.max(0, Math.min(limit(), track.scrollLeft + direction * distance)), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') stop();
    if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape'].includes(event.key)) return;
    event.preventDefault();
    stop();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
    if (event.key === 'Home' || event.key === 'End') {
      track.scrollTo({ left: event.key === 'Home' ? 0 : limit(), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });
  track.addEventListener('scroll', updateNavigation, { passive: true });
  new ResizeObserver(() => { stop(); updateNavigation(); }).observe(track);
  updateNavigation();
});
