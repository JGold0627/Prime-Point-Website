document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
  const photo = gallery.querySelector('[data-product-photo]');
  const frame = photo.closest('figure');
  const information = gallery.querySelector('[data-product-information]');
  const caption = gallery.querySelector('.wellness-product-caption');
  const originalCaption = caption?.textContent;
  const views = gallery.querySelectorAll('[data-product-image], [data-product-view="information"]');
  const preview = gallery.querySelector('[data-product-information-preview]');
  if (information && preview) {
    // Reuse the actual panel content, keeping the thumbnail decorative and free of duplicate IDs.
    const copyForThumbnail = (node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.cloneNode();
      const copy = document.createElement(node.tagName === 'BR' ? 'br' : 'span');
      copy.className = node.className;
      if (node.tagName === 'H3') copy.classList.add('sermorelin-thumbnail-step-title');
      if (node.tagName === 'P' && node.parentElement.classList.contains('sermorelin-infographic-step')) {
        copy.classList.add('sermorelin-thumbnail-step-copy');
      }
      node.childNodes.forEach((child) => copy.append(copyForThumbnail(child)));
      return copy;
    };
    const canvas = document.createElement('span');
    canvas.className = 'sermorelin-thumbnail-canvas';
    canvas.append(copyForThumbnail(information));
    preview.append(canvas);
    const sizePreview = () => {
      const bounds = frame.getBoundingClientRect();
      const style = getComputedStyle(frame);
      const width = bounds.width - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
      const height = Math.max(bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth), parseFloat(getComputedStyle(information).minHeight) || 0);
      if (!width || !height) return;
      const scale = Math.min(preview.clientWidth / width, preview.clientHeight / height);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };
    const previewObserver = new ResizeObserver(sizePreview);
    previewObserver.observe(frame);
    previewObserver.observe(preview);
    sizePreview();
  }
  views.forEach((button) => {
    button.addEventListener('click', () => {
      const showInformation = button.dataset.productView === 'information' && Boolean(information);
      photo.hidden = showInformation;
      if (information) information.hidden = !showInformation;
      if (!showInformation && button.dataset.productImage) {
        photo.src = button.dataset.productImage;
        photo.alt = button.dataset.productAlt;
      }
      frame.classList.toggle('is-information', showInformation);
      frame.classList.toggle('is-packaging', button.dataset.productView === 'packaging');
      if (caption) caption.textContent = showInformation ? 'How Sermorelin Works' : originalCaption;
      views.forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
  });
});

document.querySelectorAll('.wellness-product-layout').forEach((layout) => {
  const details = layout.querySelector('.wellness-product-details');
  const desktop = window.matchMedia('(min-width: 761px)');
  let measuredWidth = -1;
  const sizePhoto = () => {
    if (!desktop.matches) {
      layout.style.removeProperty('--product-photo-height');
      return;
    }
    // Measure a hidden, collapsed copy without changing the user's open accordion.
    const measure = details.cloneNode(true);
    measure.setAttribute('aria-hidden', 'true');
    measure.inert = true;
    measure.removeAttribute('id');
    measure.querySelectorAll('[id]').forEach((item) => item.removeAttribute('id'));
    measure.querySelectorAll('details').forEach((item) => {
      item.removeAttribute('open');
      item.removeAttribute('name');
    });
    measure.style.cssText = `position:absolute;left:0;top:0;width:${details.getBoundingClientRect().width}px;height:auto;min-height:0;visibility:hidden;pointer-events:none;transform:none;transition:none;`;
    layout.append(measure);
    const height = measure.getBoundingClientRect().height;
    measure.remove();
    layout.style.setProperty('--product-photo-height', `${height}px`);
  };
  const observer = new ResizeObserver(([entry]) => {
    // Accordion height changes must not resize the photo.
    if (entry.contentRect.width === measuredWidth) return;
    measuredWidth = entry.contentRect.width;
    sizePhoto();
  });
  observer.observe(details);
  desktop.addEventListener('change', sizePhoto);
  document.fonts.ready.then(sizePhoto);
  sizePhoto();
});

// Get started buttons intentionally have no backend action until intake is connected.
