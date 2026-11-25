/* Play once on arrival, then leave every category visible for reading. */
(() => {
  const root = document.querySelector('[data-bw-vial]');
  if (!root) return;
  const liquid = root.querySelector('[data-bw-vial-liquid]');
  const control = root.querySelector('[data-bw-vial-control]');
  const artwork = root.querySelector('[data-bw-vial-artwork]');
  if (!liquid || !control) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let inView = !('IntersectionObserver' in window);
  let started = false;
  let completed = false;
  let userPaused = false;
  let artworkReady = !artwork;

  function finish() {
    completed = true;
    root.classList.remove('is-animating', 'is-paused');
  }

  function sync() {
    if (reducedMotion.matches) {
      finish();
      control.hidden = true;
      return;
    }
    if (artworkReady && inView && !document.hidden && !started && !completed) {
      started = true;
      root.classList.add('is-animating');
    }
    root.classList.toggle('is-paused', userPaused || !inView || document.hidden);
    control.hidden = !artworkReady || (!started && !completed);
    control.textContent = completed ? 'Replay animation' : userPaused ? 'Resume animation' : 'Pause animation';
  }

  control.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    if (completed) {
      root.classList.remove('is-animating');
      // Flush the finished state before starting a fresh CSS timeline.
      void root.offsetWidth;
      started = false;
      completed = false;
      userPaused = false;
    } else {
      userPaused = !userPaused;
    }
    sync();
  });

  liquid.addEventListener('animationend', event => {
    if (event.animationName !== 'bw-vial-fill') return;
    finish();
    sync();
  });
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pageshow', sync);

  if (artwork) {
    root.classList.add('is-loading');
    const image = new Image();
    const ready = () => {
      artworkReady = true;
      root.classList.remove('is-loading');
      sync();
    };
    image.addEventListener('load', ready, { once: true });
    image.addEventListener('error', () => { finish(); ready(); }, { once: true });
    image.src = artwork.getAttribute('href');
    if (image.complete && image.naturalWidth) ready();
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: .2 }).observe(root);
  }
  sync();
})();
