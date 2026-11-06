(() => {
  const film = document.querySelector('.bw-reference-film');
  if (!film || !('IntersectionObserver' in window)) return;

  const phone = window.matchMedia('(max-width: 600px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let inView = false;
  let failedSource = null;

  function syncPlayback() {
    const source = phone.matches ? film.dataset.mobileSrc : film.dataset.desktopSrc;
    const sourceChanged = film.getAttribute('src') !== source;
    const useStill = reducedMotion.matches || connection?.saveData || failedSource === source;
    if (sourceChanged || useStill) film.classList.remove('has-frame');
    if (useStill || document.hidden || !inView) {
      film.pause();
      return;
    }
    if (sourceChanged) film.src = source;
    film.play().catch(error => {
      if (error.name !== 'AbortError' && film.getAttribute('src') === source) {
        film.classList.remove('has-frame');
      }
    });
  }

  film.addEventListener('playing', () => {
    if (!reducedMotion.matches && !connection?.saveData) film.classList.add('has-frame');
  });
  film.addEventListener('error', () => {
    failedSource = film.getAttribute('src');
    film.classList.remove('has-frame');
  });
  phone.addEventListener('change', syncPlayback);
  reducedMotion.addEventListener('change', syncPlayback);
  connection?.addEventListener('change', syncPlayback);
  document.addEventListener('visibilitychange', syncPlayback);
  window.addEventListener('pageshow', syncPlayback);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncPlayback();
  }).observe(film.closest('figure'));
})();
