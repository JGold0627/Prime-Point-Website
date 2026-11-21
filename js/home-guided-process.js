(() => {
  const root = document.querySelector('[data-home-guided]');
  if (!root) return;

  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  let current = 0;

  function show(index, focusTab = false) {
    current = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === current));
      tab.tabIndex = i === current ? 0 : -1;
      panels[i].setAttribute('aria-hidden', String(i !== current));
      panels[i].inert = i !== current;
      panels[i].tabIndex = i === current ? 0 : -1;
    });
    if (focusTab) tabs[current].focus({ preventScroll: true });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => { show(index); });
    tab.addEventListener('keydown', (event) => {
      let target;
      if (event.key === 'ArrowRight') target = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') target = (current + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      event.preventDefault();
      show(target, true);
    });
  });
  root.querySelectorAll('[data-guided-biomarker]').forEach(button => {
    button.addEventListener('click', () => {
      const choices = [...root.querySelectorAll('[data-guided-biomarker]')];
      const responses = [...root.querySelectorAll('.home-guided-responses > [aria-hidden]')];
      choices.forEach((choice, i) => {
        const selected = choice === button;
        choice.setAttribute('aria-pressed', String(selected));
        responses[i].setAttribute('aria-hidden', String(!selected));
      });
    });
  });
  show(0);
})();
