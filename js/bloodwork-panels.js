(() => {
  const explorer = document.querySelector('[data-bloodwork-panels]');
  if (!explorer) return;

  const buttons = Array.from(explorer.querySelectorAll('[data-panel-category]'));
  const groups = Array.from(explorer.querySelectorAll('[data-panel-group]'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const status = explorer.querySelector('[data-panel-status]');
  let transition;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selected = groups.find(group => group.id === button.getAttribute('aria-controls'));
      if (!selected || button.getAttribute('aria-pressed') === 'true') return;

      transition?.cancel();
      buttons.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
      groups.forEach(group => { group.hidden = group !== selected; });
      status.textContent = `${button.textContent.trim()}: ${selected.querySelectorAll('li').length} panels shown.`;

      if (!reducedMotion.matches) {
        transition = selected.animate(
          [{ opacity: 0.4, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 260, easing: 'ease-out' }
        );
      }
    });
  });
})();
