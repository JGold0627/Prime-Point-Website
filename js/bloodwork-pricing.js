(() => {
  const root = document.querySelector('[data-bloodwork-pricing]');
  if (!root) return;

  const formatButtons = [...root.querySelectorAll('[data-bw-format]')];
  const formatPanels = [...root.querySelectorAll('[data-bw-format-panel]')];
  const tierButtons = [...root.querySelectorAll('[data-bw-tier]')];
  const offers = [...root.querySelectorAll('[data-bw-offer]')];
  const audiences = { men: 'Men\u2019s', women: 'Women\u2019s' };
  let currentAudience = 'men';
  const labels = { quest: 'Quest', mobile: 'Mobile Phlebotomy' };
  const notes = {
    quest: 'Collection at a Quest location.',
    mobile: 'Blood collection by a mobile phlebotomist.'
  };
  const money = amount => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  }).format(amount);

  function showFormat(format) {
    if (!formatButtons.some(button => button.dataset.bwFormat === format)) return;
    const target = format === 'tasso' ? 'tasso' : 'lab';
    if (Object.hasOwn(audiences, format)) currentAudience = format;
    formatButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.bwFormat === format)));
    formatPanels.forEach(panel => {
      panel.hidden = panel.dataset.bwFormatPanel !== target;
      if (panel.dataset.bwFormatPanel === 'lab') {
        panel.setAttribute('aria-label', `${audiences[currentAudience]} Lab & Mobile Panels`);
      }
    });
    offers.forEach(updateOffer);
  }

  function showTier(tier) {
    if (!offers.some(offer => offer.dataset.bwOffer === tier)) return;
    tierButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.bwTier === tier)));
    offers.forEach(offer => { offer.hidden = offer.dataset.bwOffer !== tier; });
  }

  function updateOffer(offer) {
    const method = offer.querySelector('[data-bw-collection]').value;
    const amount = Number(offer.getAttribute(`data-${currentAudience}-${method}`) ?? offer.dataset[method]);
    if (!Object.hasOwn(labels, method) || !Number.isFinite(amount)) return;
    offer.querySelector('[data-bw-price]').textContent = money(amount);
    offer.querySelector('[data-bw-method-note]').textContent = notes[method];
    const audience = audiences[currentAudience];
    offer.querySelector('[data-bw-audience]').textContent = audience;
    offer.querySelectorAll('[data-bw-marker-audience]').forEach(marker => {
      marker.hidden = marker.dataset.bwMarkerAudience !== currentAudience;
    });
    const name = `${audience} ${offer.dataset.name}`;
    offer.querySelector('[data-bw-choose]').setAttribute('aria-label', `Choose ${name}, ${labels[method]}, ${money(amount)}`);
  }

  formatButtons.forEach(button => button.addEventListener('click', () => showFormat(button.dataset.bwFormat)));
  tierButtons.forEach(button => button.addEventListener('click', () => showTier(button.dataset.bwTier)));

  offers.forEach(offer => {
    offer.querySelector('[data-bw-collection]').addEventListener('change', () => updateOffer(offer));
    updateOffer(offer);
  });
  window.addEventListener('pageshow', () => offers.forEach(updateOffer));
})();
