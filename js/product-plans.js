(() => {
  // Paused while backend configuration is completed. To restore, enable this
  // flag and restore the "single" options in the five supporting product pages.
  const singlePurchasesEnabled = false;
  // Keep prices in cents; URL parameters select a catalog plan, never set its price.
  const products = {
    'semaglutide': { name: 'Semaglutide', rates: { '1': 19900, '3': 17900 } },
    'semaglutide-tablets': { name: 'Semaglutide Sublingual Drops', rates: { '1': 19900, '3': 17900 } },
    'tirzepatide': { name: 'Tirzepatide', rates: { '1': 29900, '3': 26900 } },
    'tirzepatide-tablets': { name: 'Tirzepatide Sublingual Drops', rates: { '1': 29900, '3': 26900 } },
    'sermorelin': { name: 'Sermorelin', rates: { '1': 17900, '3': 16100 } },
    'glutathione': { name: 'Glutathione', singlePurchase: true, rates: { '1': 12900, '3': 11600 } },
    'glutathione-nasal': { name: 'Glutathione Nasal Spray', singlePurchase: true, rates: { '1': 13900, '3': 12500 } },
    'mic-b12': { name: 'MIC + B12', singlePurchase: true, rates: { '1': 11900, '3': 10700 } },
    'nad-plus': { name: 'NAD+', singlePurchase: true, rates: { '1': 13900, '3': 12500 } },
    'nad-plus-nasal': { name: 'NAD+ Nasal', singlePurchase: true, spec: '300 mg/mL · 15 mL', rates: { '1': 14900, '3': 13500 } }
  };
  const money = cents => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  }).format(cents / 100);
  const selection = (productId, plan) => {
    if (!Object.hasOwn(products, productId)) return null;
    const product = products[productId];
    const oneTime = singlePurchasesEnabled && plan === 'single' && product.singlePurchase === true;
    const ratePlan = oneTime ? '1' : plan;
    if (!Object.hasOwn(product.rates, ratePlan)) return null;
    const months = Number(ratePlan);
    const monthly = product.rates[ratePlan];
    return { productId, name: product.name, spec: product.spec, plan, months, monthly, oneTime };
  };
  const params = new URLSearchParams(window.location.search);
  const panel = document.querySelector('[data-product-plans]');
  if (panel) {
    const planSelect = panel.querySelector('select[name="plan"]');
    const productId = panel.dataset.productPlans;
    const requested = selection(productId, params.get('plan'));
    if (requested) {
      planSelect.value = requested.plan;
    }
    const update = () => {
      const selected = selection(productId, planSelect.value);
      if (!selected) return;
      const details = panel.closest('.wellness-product-details, .semaglutide-details-panel');
      details.querySelector('[data-plan-price]').textContent = money(selected.monthly);
      const period = details.querySelector('[data-plan-period]');
      if (period) period.textContent = selected.oneTime ? 'one-time' : '/ month';
      const button = panel.querySelector('[data-plan-cta]');
      if (!button) return; // Coming-soon pages still display selectable plan pricing.
      const actionLabel = button.querySelector('span').textContent.trim();
      const planLabel = selected.oneTime ? 'single-month purchase' : `${selected.months}-month ${products[productId].singlePurchase ? 'subscription' : 'plan'}`;
      const priceLabel = `${money(selected.monthly)} ${selected.oneTime ? 'one-time' : 'per month'}`;
      button.setAttribute('aria-label', `${actionLabel} with ${selected.name}, ${planLabel}, ${priceLabel}`);
    };
    panel.addEventListener('change', update);
    window.addEventListener('pageshow', update);
    update();
    document.querySelectorAll(`[data-product-start="${productId}"]`).forEach(button => {
      button.addEventListener('click', () => {
        panel.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        planSelect.focus({ preventScroll: true });
      });
    });
  }
})();
