(() => {
  // Prices are in cents. Each variant has its own stable identifier for intake/checkout.
  const products = {
    'nad-plus-nasal': {
      name: 'NAD+ Nasal',
      page: 'nad-plus-nasal.html',
      variants: {
        '100mg-15ml': { concentration: '100 mg/mL', volume: '15 mL', price: 11900 },
        '100mg-30ml': { concentration: '100 mg/mL', volume: '30 mL', price: 15900 },
        '300mg-15ml': { concentration: '300 mg/mL', volume: '15 mL', price: 14900 },
        '300mg-30ml': { concentration: '300 mg/mL', volume: '30 mL', price: 19900 }
      }
    }
  };
  const money = (cents) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(cents / 100);
  const getSelection = (productId, variantId) => {
    if (!Object.hasOwn(products, productId)) return null;
    const product = products[productId];
    if (!Object.hasOwn(product.variants, variantId)) return null;
    const variant = product.variants[variantId];
    return {
      productId, variantId, name: product.name, page: product.page, ...variant,
      label: `${variant.concentration} · ${variant.volume}`,
      // Round the comparison price up to whole dollars; keep final prices unchanged.
      originalPrice: Math.ceil(variant.price / 90) * 100
    };
  };
  const params = new URLSearchParams(window.location.search);
  const accountSelection = getSelection(params.get('product'), params.get('variant'));
  if (accountSelection) {
    document.querySelectorAll('[data-product-selection-summary]').forEach((summary) => {
      // Resolve the display from the catalog; never trust prices supplied in a URL.
      const text = (tag, className, value) => {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = value;
        return element;
      };
      const price = text('p', 'product-selection-price', '');
      price.append(text('strong', '', money(accountSelection.price)), text('s', '', money(accountSelection.originalPrice)), text('span', '', '10% off'));
      const change = text('a', '', 'Change option');
      change.href = `${accountSelection.page}?variant=${encodeURIComponent(accountSelection.variantId)}#nad-nasal-options`;
      summary.replaceChildren(
        text('p', 'product-selection-eyebrow', 'Selected option'),
        text('p', 'product-selection-name', accountSelection.name),
        text('p', 'product-selection-label', accountSelection.label),
        price, change
      );
      summary.hidden = false;
    });
  }

  document.querySelectorAll('[data-product-options]').forEach((form) => {
    const productId = form.dataset.productOptions;
    const radios = [...form.querySelectorAll('input[name="variant"]')];
    const requested = getSelection(productId, params.get('variant'));
    if (requested) radios.find((radio) => radio.value === requested.variantId).checked = true;

    const updateSelection = () => {
      const selected = getSelection(productId, radios.find((radio) => radio.checked)?.value);
      if (!selected) return;
      const price = form.closest('.wellness-product-details').querySelector('[data-option-price]');
      price.querySelector('[data-option-final]').textContent = money(selected.price);
      const original = price.querySelector('[data-option-original]');
      original.textContent = money(selected.originalPrice);
      original.setAttribute('aria-label', `Original price ${money(selected.originalPrice)}`);
      price.querySelector('[data-option-label]').textContent = selected.label;
      form.querySelector('[type="submit"]').setAttribute('aria-label', `Continue with ${selected.name}, ${selected.label}, ${money(selected.price)}`);
    };
    form.addEventListener('change', updateSelection);
    window.addEventListener('pageshow', updateSelection);
    updateSelection();

    document.querySelectorAll(`[data-product-start="${productId}"]`).forEach((button) => {
      button.addEventListener('click', () => {
        form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
        radios.find((radio) => radio.checked)?.focus({ preventScroll: true });
      });
    });
  });
})();
