(() => {
  // Keep prices in cents; URL parameters select a catalog plan, never set its price.
  const products = {
    'sermorelin': { name: 'Sermorelin', rates: { '1': 21900, '3': 20900, '6': 19900 } },
    'tesamorelin': { name: 'Tesamorelin', rates: { '1': 24900, '3': 23900, '6': 22900 } },
    'glutathione': { name: 'Glutathione', rates: { '1': 12900, '3': 12100, '6': 11300, '12': 10500 } },
    'mic-b12': { name: 'MIC + B12', rates: { '1': 13900, '3': 13400, '6': 12900, '12': 12400 } },
    'nad-plus': { name: 'NAD+', rates: { '1': 19900, '3': 18400, '6': 16900, '12': 15400 } }
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
    return {
      productId, name: product.name, plan, months, monthly,
      // Match the existing 10%-off comparison, rounded up to whole dollars.
      original: Math.ceil(monthly / 90) * 100
    };
  };
  const params = new URLSearchParams(window.location.search);
  const form = document.querySelector('[data-product-plans]');
  if (form) {
    const planSelect = form.querySelector('select[name="plan"]');
    const productId = form.dataset.productPlans;
    const requested = selection(productId, params.get('plan'));
    if (requested) {
      planSelect.value = requested.plan;
    }
    const update = () => {
      const selected = selection(productId, planSelect.value);
      if (!selected) return;
      const details = form.closest('.wellness-product-details');
      details.querySelector('[data-plan-price]').textContent = money(selected.monthly);
      const original = details.querySelector('[data-plan-original]');
      original.textContent = money(selected.original);
      original.setAttribute('aria-label', `Original monthly price ${money(selected.original)}`);
      form.querySelector('[type="submit"]').setAttribute('aria-label', `Get Started with ${selected.name}, ${selected.months}-month plan, ${money(selected.monthly)} per month`);
    };
    form.addEventListener('change', update);
    window.addEventListener('pageshow', update);
    update();
    document.querySelectorAll(`[data-product-start="${productId}"]`).forEach(button => {
      button.addEventListener('click', () => {
        form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        planSelect.focus({ preventScroll: true });
      });
    });
  }

  const selected = selection(params.get('product'), params.get('plan'));
  if (!selected) return;
  document.querySelectorAll('[data-product-selection-summary]').forEach(summary => {
    const text = (tag, className, value) => {
      const element = document.createElement(tag);
      element.className = className;
      element.textContent = value;
      return element;
    };
    const price = text('p', 'product-selection-price', '');
    price.append(text('strong', '', `${money(selected.monthly)} / month`), text('s', '', money(selected.original)), text('span', '', '10% off'));
    const change = text('a', '', 'Change plan');
    const query = new URLSearchParams({ plan: selected.plan });
    change.href = `${selected.productId}.html?${query}#${selected.productId === 'nad-plus' ? 'nad-plan-options' : 'product-plan-options'}`;
    summary.replaceChildren(
      text('p', 'product-selection-eyebrow', 'Selected plan'),
      text('p', 'product-selection-name', selected.name),
      text('p', 'product-selection-label', `${selected.months}-month plan`),
      price,
      change
    );
    summary.hidden = false;
  });
})();
