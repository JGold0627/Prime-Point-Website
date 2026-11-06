// Video links are configured in each Learning Center's data-learning-videos JSON.
document.querySelectorAll('[data-learning-center]').forEach((center) => {
  const config = center.querySelector('[data-learning-videos]');
  const list = center.querySelector('[data-learning-video-list]');
  const empty = center.querySelector('[data-learning-empty]');
  if (!config || !list || !empty) return;

  let entries;
  try {
    entries = JSON.parse(config.textContent);
  } catch {
    return;
  }
  if (!Array.isArray(entries)) return;

  const videos = entries.flatMap((entry) => {
    if (!entry || typeof entry.title !== 'string' || !entry.title.trim() || typeof entry.url !== 'string' || !entry.url.trim()) return [];
    try {
      const url = new URL(entry.url, document.baseURI);
      if (!['https:', 'http:'].includes(url.protocol)) return [];
      return [{ ...entry, title: entry.title.trim(), url: url.href }];
    } catch {
      return [];
    }
  });
  if (!videos.length) return;

  const playIcon = () => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'm9 5 11 7-11 7Z');
    icon.append(path);
    return icon;
  };
  const playlist = document.createElement('ul');
  playlist.className = 'learning-center-playlist';
  playlist.setAttribute('aria-label', 'Educational videos');

  videos.forEach((video) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'learning-center-video-link';
    link.href = video.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const heading = document.createElement('span');
    heading.className = 'learning-center-video-heading';
    const headingCopy = document.createElement('span');
    if (typeof video.publisher === 'string' && video.publisher.trim()) {
      const publisher = document.createElement('span');
      publisher.className = 'learning-center-publisher';
      publisher.textContent = video.publisher.trim();
      headingCopy.append(publisher);
    }
    const title = document.createElement('span');
    title.className = 'learning-center-video-title';
    title.textContent = video.title;
    headingCopy.append(title);
    heading.append(playIcon(), headingCopy);
    link.append(heading);

    for (const field of ['speakers', 'description']) {
      if (typeof video[field] !== 'string' || !video[field].trim()) continue;
      const detail = document.createElement('span');
      detail.className = 'learning-center-' + field;
      detail.textContent = video[field].trim();
      link.append(detail);
    }

    const watch = document.createElement('span');
    watch.className = 'learning-center-watch';
    const videoHost = new URL(video.url).hostname;
    watch.append(document.createTextNode(/(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(videoHost) ? 'Watch on YouTube ' : 'Watch video '));
    const arrow = document.createElement('span');
    arrow.textContent = '\u2197';
    arrow.setAttribute('aria-hidden', 'true');
    const newTab = document.createElement('span');
    newTab.className = 'learning-center-sr-only';
    newTab.textContent = ' (opens in a new tab)';
    watch.append(arrow, newTab);
    link.append(watch);
    item.append(link);
    playlist.append(item);
  });

  list.replaceChildren(playlist);
  empty.hidden = true;
  list.hidden = false;
  if (center.closest('[data-video-layout="stacked"]')) return;

  list.tabIndex = 0;
  list.setAttribute('role', 'region');
  list.setAttribute('aria-label', 'Educational videos, scroll for more');

  // Preserve the original two-video height as the library grows, including on resize.
  const visibleItems = Array.from(playlist.children).slice(0, 2);
  const sizeVideoList = () => {
    const listStyle = getComputedStyle(list);
    const gap = parseFloat(getComputedStyle(playlist).rowGap) || 0;
    const cardsHeight = visibleItems.reduce((height, item) => height + item.getBoundingClientRect().height, 0);
    const padding = parseFloat(listStyle.paddingTop) + parseFloat(listStyle.paddingBottom);
    const height = cardsHeight + gap * Math.max(0, visibleItems.length - 1) + padding;
    list.style.setProperty('--learning-center-list-height', `${Math.ceil(height)}px`);
  };
  sizeVideoList();
  const resizeObserver = new ResizeObserver(sizeVideoList);
  visibleItems.forEach((item) => resizeObserver.observe(item));
});
