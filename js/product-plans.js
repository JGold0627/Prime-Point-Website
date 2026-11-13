(() => {
  // Keep prices in cents; URL parameters select a catalog plan, never set its price.
  const products = {
    'semaglutide': { name: 'Semaglutide', rates: { '1': 19900, '3': 17900 } },
    'semaglutide-tablets': { name: 'Semaglutide Sublingual Drops', rates: { '1': 19900, '3': 17900 } },
    'tirzepatide': { name: 'Tirzepatide', rates: { '1': 29900, '3': 26900 } },
    'tirzepatide-tablets': { name: 'Tirzepatide Sublingual Drops', rates: { '1': 29900, '3': 26900 } },
    'sermorelin': { name: 'Sermorelin', rates: { '1': 19900 } },
    'glutathione': { name: 'Glutathione', rates: { '1': 12900, '3': 11600 } },
    'glutathione-nasal': { name: 'Glutathione Nasal Spray', rates: { '1': 16900, '3': 13800 } },
    'mic-b12': { name: 'MIC + B12', rates: { '1': 13900, '3': 10800 } },
    'nad-plus': { name: 'NAD+', rates: { '1': 19900, '3': 17200 } },
    'nad-plus-nasal': { name: 'NAD+ Nasal', spec: '300 mg/mL · 15 mL', rates: { '1': 15900, '3': 12400 } }
  };
  const money = cents => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  }).format(cents / 100);
  const selection = (productId, plan) => {
    if (!Object.hasOwn(products, productId)) return null;
    const product = products[productId];
    if (!Object.hasOwn(product.rates, plan)) return null;
    const months = Number(plan);
    const monthly = product.rates[plan];
    return { productId, name: product.name, spec: product.spec, plan, months, monthly };
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
      const button = panel.querySelector('[data-plan-cta]');
      const actionLabel = button.querySelector('span').textContent.trim();
      button.setAttribute('aria-label', `${actionLabel} with ${selected.name}, ${selected.months}-month plan, ${money(selected.monthly)} per month`);
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
