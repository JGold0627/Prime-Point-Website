// Run from anywhere: node scripts/check-product-pricing.cjs
// Exercises the real pricing and inline page scripts with small DOM fixtures.
// Price-change scenarios run in memory and never modify the website files.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const source = read('js/product-plans.js');
const attributes = text => Object.fromEntries([...text.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
const dataset = attrs => Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith('data-')).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value]));
const amount = text => Number(text.match(/\$([\d,.]+)/)?.[1].replaceAll(',', ''));
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);

function page(file, script = source, search = '') {
  const html = read(file).replace(/<!--[\s\S]*?-->/g, '');
  const events = {};
  const listen = (event, fn) => (events[event] ||= []).push(fn);
  const options = [...html.matchAll(/<option\b([^>]*)>(.*?)<\/option>/g)].map(match => {
    const attrs = attributes(match[1]);
    return { value: attrs.value, dataset: dataset(attrs), textContent: match[2], selected: /\bselected\b/.test(match[1]), hasAttribute: key => key in attrs, get text() { return this.textContent; } };
  });
  const select = {
    options, value: (options.find(option => option.selected) || options[0])?.value,
    get selectedOptions() { return options.filter(option => option.value === this.value); },
    addEventListener: listen
  };
  const price = {}, period = {}, spec = {}, title = {}, image = {}, thumbnail = {};
  const makeCta = markup => ({ ...attributes(markup), querySelector: () => ({ textContent: 'Get Started' }), setAttribute(key, value) { this[key] = value; }, removeAttribute(key) { delete this[key]; } });
  const ctaMatch = html.match(/<(?:a|button)\b[^>]*(?:data-plan-cta|class="wellness-product-cta product-plan-continue")[^>]*>/);
  const cta = ctaMatch ? makeCta(ctaMatch[0]) : null;
  const productActions = [...html.matchAll(/<div\b[^>]*\bdata-ghk-product-action\b[^>]*>\s*(<a\b[^>]*>)/g)].map((match, index) => {
    const actionCta = index === 0 ? cta : makeCta(match[1]);
    return { hidden: false, querySelector: () => actionCta };
  });
  const comingSoon = { hidden: true };
  const photo = { dataset: dataset(attributes(html.match(/<button[^>]+data-product-image[^>]+>/)?.[0] || '')), setAttribute() {}, querySelector: () => thumbnail, click() {} };
  const track = { firstElementChild: { cloneNode: () => ({ setAttribute() {} }) }, append() {} };
  const strip = { querySelector: () => track, classList: { add() {} } };
  const standard = html.match(/data-product-plans="([^"]+)"/)?.[1];
  const custom = html.match(/data-product-option-prices="([^"]+)"/)?.[1];
  const panel = {
    dataset: { productPlans: standard, productOptionPrices: custom },
    querySelector: selector => selector === 'select[name="plan"]' ? select : cta,
    closest: () => ({ querySelector: selector => selector === '[data-plan-price]' ? price : period }),
    addEventListener: listen
  };
  const badges = [...html.matchAll(/<span data-product-starting-price="([^"]+)">([^<]+)<\/span>/g)].map(match => ({ dataset: { productStartingPrice: match[1] }, textContent: match[2] }));
  const nodes = {
    '[data-product-plans]': standard ? panel : null,
    '[data-product-image]': photo, '[data-product-photo]': image,
    '[data-product-title-name]': title, '.product-plan-price strong': price,
    '.product-plan-price span': period, '.glutathione-product-spec': spec,
    '.product-plan-continue': cta,
    '.peptide-coming-soon': comingSoon, '.care-strip': strip
  };
  const context = vm.createContext({
    Intl, URLSearchParams, encodeURIComponent,
    window: { location: { search }, addEventListener: listen },
    document: {
      getElementById: () => select,
      querySelector: selector => { assert(selector in nodes, selector); return nodes[selector]; },
      querySelectorAll: selector => {
        if (selector === '[data-product-starting-price]') return badges;
        if (selector === '[data-product-option-prices]') return custom ? [panel] : [];
        if (selector === '[data-product-photo], .peptide-standard-vial img') return [image];
        if (selector === '[data-ghk-product-action]') return productActions;
        if (selector.startsWith('[data-product-start=')) return [];
        throw new Error(`Unexpected selector: ${selector}`);
      }
    }
  });
  assert(/<script src="js\/product-plans\.js\?v=\d+"><\/script>/.test(html), `${file}: missing shared pricing script`);
  vm.runInContext(script, context, { filename: 'product-plans.js' });
  if (custom) {
    assert(html.indexOf('js/product-plans.js') < html.indexOf('<script>'), `${file}: pricing must load before selection logic`);
    for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) vm.runInContext(match[1], context, { filename: file });
  }
  return { html, badges, options, select, price, period, title, spec, thumbnail, cta, productActions, comingSoon, image, fire: event => (events[event] || []).forEach(fn => fn()) };
}

function verify(script, checkFallbacks = false) {
  const home = page('index.html', script);
  const catalog = page('treatments.html', script);
  assert.equal(home.badges.length, 5);
  assert.equal(catalog.badges.length, 16);
  for (const badge of [...home.badges, ...catalog.badges]) {
    const id = badge.dataset.productStartingPrice;
    const product = page(`${id}.html`, script);
    const eligible = id === 'ghk-cu' ? product.options.filter(option => option.dataset.form === 'cream') : product.options;
    const prices = eligible.map(option => amount(option.textContent)).filter(Number.isFinite);
    const expected = prices.length ? `Starting from ${money(Math.min(...prices))}` : 'Coming Soon';
    assert.equal(badge.textContent, expected, id);
    if (checkFallbacks) {
      for (const listing of [home, catalog]) {
        const fallback = listing.html.match(new RegExp(`data-product-starting-price="${id}">([^<]+)`))?.[1];
        // Without JavaScript, invite the visitor to the product page rather than
        // showing a second hardcoded price that could become outdated.
        if (fallback) assert.equal(fallback, 'View pricing', `${id}: badge must not duplicate a price`);
      }
    }
    for (const option of product.options) {
      product.select.value = option.value;
      product.fire('change');
      product.fire('pageshow');
      const value = amount(option.textContent);
      assert.equal(product.price.textContent, Number.isFinite(value) ? money(value) : 'Coming Soon', `${id}: selected price`);
      if (id === 'ghk-cu') {
        const offered = option.dataset.form !== 'injectable';
        assert.equal(product.productActions.length, 3, 'GHK-Cu: hero, overview, and bottom CTAs must be present');
        for (const action of product.productActions) {
          assert.equal(action.hidden, !offered);
          const link = action.querySelector('a');
          assert.equal(link.href, option.dataset.checkoutUrl || undefined);
          assert.equal(link['aria-disabled'], option.dataset.checkoutUrl ? undefined : 'true');
          assert.equal(link.tabindex, option.dataset.checkoutUrl ? undefined : '-1');
          assert.equal(link['aria-label'], `Get started with ${option.text}`);
        }
        assert.equal(product.comingSoon.hidden, offered);
        assert.equal(product.title.textContent, option.dataset.productTitle);
        assert.equal(product.thumbnail.src, product.image.src);
        assert(fs.existsSync(path.join(root, product.image.src)), `Missing ${option.dataset.form} product image`);
        if (option.dataset.form === 'hair') {
          assert.equal(product.title.textContent, 'GHK-Cu Hair Foam');
          assert.equal(product.spec.textContent, 'Contains Finasteride and latanoprost');
          assert.equal(product.image.src, 'assets/products/ghk-cu-hair-foam-glass-pump.png');
        }
      }
    }
  }
  const combo = page('bpc-157-tb4.html', script);
  assert.equal(combo.price.textContent, page('bpc-157.html', script).options.find(option => option.value === 'bpc-157-tb4').textContent.match(/\$[\d,.]+/)[0]);
  for (const id of ['glutathione', 'glutathione-nasal', 'nad-plus', 'nad-plus-nasal', 'mic-b12']) {
    const product = page(`${id}.html`, script, '?plan=single&price=1');
    assert.equal(product.select.value, '1', `${id}: paused single purchase must not reactivate`);
    assert(product.cta['aria-label'].includes('subscription'));
  }
  return { home, catalog };
}

const original = verify(source, true);
// Semaglutide quotes the whole plan price, including direct three-month links.
const semaglutide = page('semaglutide.html', source, '?plan=3&price=1');
assert.equal(semaglutide.price.textContent, '$299');
assert.equal(semaglutide.period.textContent, '/ 3 months');
assert(semaglutide.cta['aria-label'].includes('$299 total for 3 months'));
assert.equal(semaglutide.cta.href, 'https://start.joinprimepoint.com/semaglutide-injection');
assert(semaglutide.options.every(option => !option.textContent.includes('/mo')));
semaglutide.select.value = '1';
semaglutide.fire('change');
assert.equal(semaglutide.price.textContent, '$129');
assert.equal(semaglutide.period.textContent, '/ month');
assert(semaglutide.cta['aria-label'].includes('$129 total for 1 month'));
assert.equal(original.catalog.badges.find(badge => badge.dataset.productStartingPrice === 'semaglutide').textContent, 'Starting from $129');
// Change every numeric rate by $7.12. All displayed prices must follow, including
// fractional amounts, without modifying a product page or either card listing.
const changed = source.replace(/rates: \{([^}]+)\}/g, (_, rates) => `rates: {${rates.replace(/: (\d+)/g, (_, cents) => `: ${Number(cents) + 712}`)}}`);
const updated = verify(changed);
for (let i = 0; i < original.catalog.badges.length; i++) {
  const oldPrice = amount(original.catalog.badges[i].textContent);
  if (Number.isFinite(oldPrice)) assert.equal(updated.catalog.badges[i].textContent, `Starting from ${money(oldPrice + 7.12)}`);
}
// A cheaper, unavailable injection must not become the face cream's starting price.
verify(source.replace(/'injectable-monthly': \d+/, "'injectable-monthly': 100"));
// A confirmed hair checkout URL enables only that selection; repeated switching
// must never leave the face-cream URL attached to the hair or injectable option.
const ghk = page('ghk-cu.html');
const hair = ghk.options.find(option => option.dataset.form === 'hair');
hair.dataset.checkoutUrl = 'https://example.test/hair-checkout';
for (const value of ['hair-monthly', 'cream-monthly', 'injectable-monthly', 'hair-monthly', 'cream-monthly']) {
  ghk.select.value = value;
  ghk.fire('change');
  ghk.fire('pageshow');
  const option = ghk.select.selectedOptions[0];
  for (const action of ghk.productActions) {
    const link = action.querySelector('a');
    assert.equal(action.hidden, option.dataset.form === 'injectable');
    assert.equal(link.href, option.dataset.checkoutUrl || undefined);
    assert.equal(link['aria-disabled'], option.dataset.checkoutUrl ? undefined : 'true');
    assert.equal(link.tabindex, option.dataset.checkoutUrl ? undefined : '-1');
  }
}
// Removing a checkout URL must also clear every previously active link.
hair.dataset.checkoutUrl = '';
ghk.select.value = hair.value;
ghk.fire('change');
for (const action of ghk.productActions) {
  assert.equal(action.querySelector('a').href, undefined);
  assert.equal(action.querySelector('a')['aria-disabled'], 'true');
}
console.log('PASS: 21 cards, 17 product pages, price-change propagation, plan selection, CTA availability, and paused one-time plans.');
