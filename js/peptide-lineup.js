(() => {
  const lineup = document.getElementById("peptide-lineup");
  if (!lineup) return;

  const stage = lineup.querySelector(".lineup-stage");
  const indexBar = lineup.querySelector(".lineup-index");
  const choices = [...indexBar.querySelectorAll("[data-profile]")];
  const template = lineup.querySelector("#lineup-profile-template");
  const status = lineup.querySelector(".lineup-announcement");
  let selected = 0;

  // Profiles without a photograph use their own abstract wave.
  const palettes = [
    ["#102937", "#48717a", "#f4e3b9"], ["#172d40", "#5c7999", "#c2e1ec"],
    ["#183731", "#6d9180", "#dbe5bd"], ["#253442", "#678797", "#d9ece8"],
    ["#252e41", "#817990", "#f1d6ce"], ["#153039", "#567c7a", "#eeceab"],
    ["#343845", "#8b8686", "#f4deba"]
  ];
  function artwork(visual, index, photo) {
    const [deep, light, thread] = palettes[index];
    visual.style.setProperty("--deep", deep);
    visual.style.setProperty("--light", light);
    if (photo) {
      const image = document.createElement("img");
      image.alt = "";
      image.draggable = false;
      image.loading = "lazy";
      image.decoding = "async";
      image.src = photo;
      visual.append(image);
      return;
    }
    const crest = 45 + 12 * index;
    const lines = Array.from({ length: 52 }, (_, row) => {
      const t = row / 51;
      const wave = Math.sin(t * Math.PI);
      const path = `M-40 ${280 + 95*t} C${62 + 38*t} ${305 - 45*t}, 98 ${crest - 58*wave}, 179 ${130 + 65*t} S285 ${248 - 140*t}, 370 ${39 + 92*t}`;
      return `<path d="${path}"/>`;
    }).join("");
    visual.innerHTML = `<svg viewBox="0 0 320 390" preserveAspectRatio="xMidYMid slice" focusable="false">
      <g fill="none" stroke="${thread}" stroke-width="1.15" opacity=".84">${lines}</g>
    </svg>`;
  }

  // Add data-overview, data-function, and data-href to a peptide's HTML button
  // when its approved profile and destination are available.
  const slides = choices.map((choice, index) => {
    const slide = template.content.firstElementChild.cloneNode(true);
    const { profile, overview, function: bodyFunction, href } = choice.dataset;
    const name = choice.textContent.trim();
    slide.id = `lineup-profile-${profile}`;
    slide.setAttribute("aria-label", name);
    choice.setAttribute("aria-controls", slide.id);
    slide.querySelector(".lineup-name").textContent = name;
    if (overview) slide.querySelector("[data-overview]").textContent = overview;
    if (bodyFunction) slide.querySelector("[data-function]").textContent = bodyFunction;
    const functionTemplate = document.getElementById(`lineup-function-${profile}`);
    if (functionTemplate) slide.querySelector("[data-function]").replaceChildren(functionTemplate.content.cloneNode(true));
    const link = slide.querySelector(".lineup-cta");
    if (href) link.href = href;
    link.setAttribute("aria-label", href ? `Learn more about ${name}` : "Learn more in the Peptide Therapy FAQ");
    artwork(slide.querySelector(".lineup-visual"), index, choice.dataset.photo);
    stage.append(slide);
    return slide;
  });

  function select(index, announce = true) {
    const total = slides.length;
    const next = (index + total) % total;
    if (selected !== next && slides[selected].contains(document.activeElement)) {
      stage.focus({ preventScroll: true });
    }
    selected = next;
    slides.forEach((slide, i) => {
      const forward = (i - selected + total) % total;
      const offset = forward > total / 2 ? forward - total : forward;
      const distance = Math.abs(offset);
      slide.style.setProperty("--side", Math.sign(offset));
      slide.style.setProperty("--scale", [1, .83, .65, .48][distance]);
      slide.style.setProperty("--opacity", [1, .46, .26, .13][distance]);
      slide.style.setProperty("--reach", [0, .54, .83, .99][distance]);
      slide.dataset.side = offset < 0 ? "left" : offset > 0 ? "right" : "center";
      slide.style.zIndex = total - distance;
      slide.inert = distance !== 0;
      choices[i].setAttribute("aria-pressed", String(distance === 0));
      choices[i].tabIndex = distance === 0 ? 0 : -1;
    });
    const choice = choices[selected];
    if (indexBar.scrollWidth > indexBar.clientWidth) {
      const delta = choice.getBoundingClientRect().left - indexBar.getBoundingClientRect().left;
      indexBar.scrollLeft += delta - (indexBar.clientWidth - choice.offsetWidth) / 2;
    }
    if (announce) status.textContent = `${choice.textContent} selected`;
  }

  function sideAt(x) {
    const stageBox = stage.getBoundingClientRect();
    const center = stageBox.left + stageBox.width / 2;
    const halfWidth = slides[selected].offsetWidth / 2;
    return x < center - halfWidth ? -1 : x > center + halfWidth ? 1 : 0;
  }

  choices.forEach((choice, i) => choice.addEventListener("click", () => select(i)));
  lineup.addEventListener("keydown", event => {
    const jumps = { ArrowLeft: selected - 1, ArrowRight: selected + 1, Home: 0, End: slides.length - 1 };
    if (!Object.hasOwn(jumps, event.key) || event.altKey || event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    select(jumps[event.key]);
    if (indexBar.contains(event.target)) choices[selected].focus({ preventScroll: true });
  });

  let press = null;
  let skipClick = false;
  stage.addEventListener("pointerdown", event => {
    if (!event.isPrimary || event.button !== 0) return;
    skipClick = false;
    press = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  stage.addEventListener("pointerup", event => {
    if (press?.id !== event.pointerId) return;
    const dx = event.clientX - press.x;
    const dy = event.clientY - press.y;
    press = null;
    skipClick = Math.max(Math.abs(dx), Math.abs(dy)) > 8;
    if (event.pointerType === "touch" && Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
      select(selected + (dx < 0 ? 1 : -1));
    }
  });
  stage.addEventListener("pointercancel", event => {
    if (press?.id === event.pointerId) press = null;
  });
  stage.addEventListener("click", event => {
    if (event.detail && skipClick) { event.preventDefault(); skipClick = false; return; }
    if (event.target.closest("a")) return;
    const side = sideAt(event.clientX);
    if (side) select(selected + side);
  });

  // Pace continuous scrolling while letting a fresh gesture or reversal respond immediately.
  let wheelDistance = 0;
  let lastWheelTime = 0;
  let lastDirection = 0;
  let nextStepTime = 0;
  stage.addEventListener("wheel", event => {
    if (event.ctrlKey || event.metaKey || !event.cancelable) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta) return;
    event.preventDefault();
    const direction = Math.sign(delta);
    const now = performance.now();
    if (now - lastWheelTime > 160 || direction !== lastDirection) {
      wheelDistance = 0;
      nextStepTime = 0;
    }
    lastWheelTime = now;
    lastDirection = direction;
    if (now < nextStepTime) return;
    const unit = event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? stage.clientHeight : 1;
    wheelDistance += Math.abs(delta) * unit;
    if (wheelDistance < 24) return;
    select(selected + direction);
    wheelDistance = 0;
    nextStepTime = now + 350;
  }, { passive: false });

  lineup.querySelector(".lineup-gallery").hidden = false;
  select(0, false);

  // Center the wheel on native anchor navigation, including after a resize.
  const heroLink = document.querySelector('.peptides-hero a[href="#peptide-lineup"]');
  if (heroLink) {
    heroLink.hash = stage.id;
    const centerAnchor = () => {
      stage.style.scrollMarginTop = `calc(50dvh - ${stage.offsetHeight / 2}px)`;
    };
    centerAnchor();
    new ResizeObserver(centerAnchor).observe(stage);
  }
})();
