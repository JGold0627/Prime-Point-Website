(() => {
  // Paused while backend configuration is completed. To restore, enable this
  // flag and restore the "single" options in the five supporting product pages.
  const singlePurchasesEnabled = false;
  // Pricing source of truth: edit rates here when a product's cost changes.
  // Product dropdowns, selected prices, CTA labels, and catalog starting prices
  // all read these amounts. Keep prices in cents; URL parameters only select plans.
  // Rates are monthly unless priceBasis is 'plan' (the total for that duration).
  const products = {
    'semaglutide': { name: 'Semaglutide', priceBasis: 'plan', rates: { '1': 12900, '3': 29900 } },
    'semaglutide-tablets': { name: 'Semaglutide Sublingual Drops', priceBasis: 'plan', rates: { '1': 12900, '3': 34900 } },
    'tirzepatide': { name: 'Tirzepatide', rates: { '1': 19900, '3': 12900 } },
    'tirzepatide-tablets': { name: 'Tirzepatide Sublingual Drops', priceBasis: 'plan', rates: { '1': 18900, '3': 35700 } },
    'sermorelin': { name: 'Sermorelin', priceBasis: 'plan', rates: { '1': 13900, '3': 34900 } },
    'glutathione': { name: 'Glutathione', singlePurchase: true, rates: { '1': 12900, '3': 11600 } },
    'glutathione-nasal': { name: 'Glutathione Nasal Spray', singlePurchase: true, rates: { '1': 13900, '3': 12500 } },
    'mic-b12': { name: 'MIC + B12', singlePurchase: true, rates: { '1': 11900, '3': 10700 } },
    'nad-plus': { name: 'NAD+', singlePurchase: true, rates: { '1': 13900, '3': 12500 } },
    'nad-plus-nasal': { name: 'NAD+ Nasal', singlePurchase: true, spec: '300 mg/mL · 15 mL', rates: { '1': 14900, '3': 13500 } },
    'bpc-157': { name: 'BPC-157', rates: { 'bpc-157': 25900, 'bpc-157-tb4': 37900 } },
    'mots-c': { name: 'MOTS-c', rates: { 'mots-c': 22900 } },
    'kpv': { name: 'KPV', rates: {}, priceLabel: 'Coming Soon' },
    'semax': { name: 'Semax Nasal', rates: { 'semax': 27900 } },
    'epitalon': { name: 'Epitalon', rates: { 'epitalon': 39900 } },
    // Only the face cream has checkout enabled; pending options must not lower its badge.
    'ghk-cu': { name: 'GHK-Cu', rates: { 'cream-monthly': 13900, 'hair-monthly': 13900, 'injectable-monthly': 17900 }, startingPlans: ['cream-monthly'] }
  };
  const money = cents => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2
  }).format(cents / 100);
  const syncOptionPrices = (select, product) => {
    for (const option of select.options) {
      const rate = product.rates[option.value === 'single' ? '1' : option.value];
      if (!Number.isFinite(rate)) continue;
      // Keep each page's existing plan names, units, and subscription wording.
      option.textContent = option.textContent.replace(/\$[\d,]+(?:\.\d+)?/, money(rate));
      if (option.hasAttribute('data-monthly-price')) option.dataset.monthlyPrice = String(rate / 100);
      if (option.hasAttribute('data-price')) option.dataset.price = money(rate);
    }
  };
  document.querySelectorAll('[data-product-starting-price]').forEach(badge => {
    const product = products[badge.dataset.productStartingPrice];
    if (!product) return;
    const plans = product.startingPlans || Object.keys(product.rates);
    const rates = plans.map(plan => product.rates[plan]).filter(Number.isFinite);
    badge.textContent = rates.length ? `Starting from ${money(Math.min(...rates))}` : product.priceLabel || 'View pricing';
  });
  // Peptide pages keep their own formulation, photo, and availability controls.
  // Hydrate their option prices before their inline selection scripts run.
  document.querySelectorAll('[data-product-option-prices]').forEach(panel => {
    const product = products[panel.dataset.productOptionPrices];
    const select = panel.querySelector('select[name="plan"]');
    if (product && select) syncOptionPrices(select, product);
  });
  const selection = (productId, plan) => {
    if (!Object.hasOwn(products, productId)) return null;
    const product = products[productId];
    const oneTime = singlePurchasesEnabled && plan === 'single' && product.singlePurchase === true;
    const ratePlan = oneTime ? '1' : plan;
    if (!Object.hasOwn(product.rates, ratePlan)) return null;
    const months = Number(ratePlan);
    const price = product.rates[ratePlan];
    const perPlan = product.priceBasis === 'plan';
    return { productId, name: product.name, spec: product.spec, plan, months, price, perPlan, oneTime };
  };
  const params = new URLSearchParams(window.location.search);
  const panel = document.querySelector('[data-product-plans]');
  if (panel) {
    const planSelect = panel.querySelector('select[name="plan"]');
    const productId = panel.dataset.productPlans;
    if (!Object.hasOwn(products, productId)) return;
    syncOptionPrices(planSelect, products[productId]);
    const requested = selection(productId, params.get('plan'));
    if (requested) {
      planSelect.value = requested.plan;
    }
    const update = () => {
      const selected = selection(productId, planSelect.value);
      if (!selected) return;
      const details = panel.closest('.wellness-product-details, .semaglutide-details-panel');
      details.querySelector('[data-plan-price]').textContent = money(selected.price);
      const period = details.querySelector('[data-plan-period]');
      if (period) period.textContent = selected.oneTime ? 'one-time'
        : selected.perPlan && selected.months > 1 ? `/ ${selected.months} months` : '/ month';
      const button = panel.querySelector('[data-plan-cta]');
      if (!button) return; // Coming-soon pages still display selectable plan pricing.
      const actionLabel = button.querySelector('span').textContent.trim();
      const planLabel = selected.oneTime ? 'single-month purchase' : `${selected.months}-month ${products[productId].singlePurchase ? 'subscription' : 'plan'}`;
      const pricePeriod = selected.oneTime ? 'one-time' : selected.perPlan
        ? `total for ${selected.months} ${selected.months === 1 ? 'month' : 'months'}` : 'per month';
      const priceLabel = `${money(selected.price)} ${pricePeriod}`;
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
