document.querySelectorAll(".site-header").forEach((header) => {
  const navShell = header.querySelector(".nav-shell");
  let actions = header.querySelector(".nav-actions");

  if (!navShell) {
    return;
  }

  if (!actions) {
    actions = document.createElement("div");
    actions.className = "nav-actions";
    actions.setAttribute("aria-label", "Account actions");
    navShell.append(actions);
  }

  if (actions.querySelector(".header-cart")) {
    return;
  }

  const cartButton = document.createElement("button");
  cartButton.className = "header-cart";
  cartButton.type = "button";
  cartButton.setAttribute("aria-label", "Shopping cart");
  cartButton.title = "Shopping cart";
  cartButton.innerHTML = `
    <svg class="header-cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 7H5.12"></path>
    </svg>
  `;
  actions.append(cartButton);
});

document.querySelectorAll(".glp-nav-dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(".glp-nav-trigger");
  const pageLink = dropdown.querySelector(".glp-nav-link");
  const menuId = trigger?.getAttribute("aria-controls");
  const menu = menuId ? document.getElementById(menuId) : null;
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  let closeTimer;

  if (!trigger || !menu) {
    return;
  }

  const setOpen = (isOpen, { restoreFocus = false } = {}) => {
    window.clearTimeout(closeTimer);
    dropdown.classList.toggle("is-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));

    if (restoreFocus) {
      trigger.focus();
    }
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => setOpen(false), 140);
  };

  trigger.addEventListener("click", () => {
    setOpen(trigger.getAttribute("aria-expanded") !== "true");
  });

  dropdown.addEventListener("pointerenter", () => {
    if (supportsHover.matches) {
      setOpen(true);
    }
  });

  dropdown.addEventListener("pointerleave", () => {
    if (supportsHover.matches) {
      scheduleClose();
    }
  });

  dropdown.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!dropdown.contains(document.activeElement)) {
        setOpen(false);
      }
    });
  });

  pageLink?.addEventListener("click", () => setOpen(false));

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
      setOpen(false, { restoreFocus: true });
    }
  });
});

document.querySelectorAll(".lead-form").forEach((form) => {
  const note = form.querySelector(".form-note");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (note) {
      note.textContent = "Thanks. Prime Point Health will follow up with next steps.";
    }

    form.reset();
  });
});

document.querySelectorAll(".compact-faq details").forEach((item) => {
  item.open = true;

  item.addEventListener("toggle", () => {
    if (!item.open) {
      requestAnimationFrame(() => {
        item.open = true;
      });
    }
  });
});

document.querySelectorAll(".page-hero-video").forEach((video) => {
  const playHeroVideo = () => {
    const playPromise = video.play?.();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  };

  if (video.readyState >= 2) {
    playHeroVideo();
  } else {
    video.addEventListener("canplay", playHeroVideo, { once: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      playHeroVideo();
    }
  });
});

document.querySelectorAll(".hero-media-stack").forEach((stack) => {
  const videos = [...stack.querySelectorAll(".hero-media")];

  if (videos.length < 2) {
    return;
  }

  let activeIndex = videos.findIndex((video) => video.classList.contains("is-active"));

  if (activeIndex < 0) {
    activeIndex = 0;
    videos[0].classList.add("is-active");
  }

  const playVideos = () => {
    videos.forEach((video) => {
      const playPromise = video.play?.();

      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    });
  };

  const showVideo = (nextIndex) => {
    videos[activeIndex].classList.remove("is-active");
    activeIndex = nextIndex;
    videos[activeIndex].classList.add("is-active");
  };

  playVideos();

  window.setInterval(() => {
    showVideo((activeIndex + 1) % videos.length);
  }, 4300);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      playVideos();
    }
  });
});

document.querySelectorAll(".peptide-plan-image").forEach((panel) => {
  const setGlowPosition = (event) => {
    const rect = panel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    panel.style.setProperty("--bubble-x", `${x.toFixed(1)}%`);
    panel.style.setProperty("--bubble-y", `${y.toFixed(1)}%`);
  };

  panel.addEventListener("pointermove", setGlowPosition);
  panel.addEventListener("pointerleave", () => {
    panel.style.setProperty("--bubble-x", "50%");
    panel.style.setProperty("--bubble-y", "46%");
  });
});

document.querySelectorAll(".cellular-motion-canvas").forEach((canvas) => {
  const context = canvas.getContext("2d");
  const cells = [];
  const cellCount = 34;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
    canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const resetCells = () => {
    const rect = canvas.getBoundingClientRect();
    cells.length = 0;

    for (let index = 0; index < cellCount; index += 1) {
      cells.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: 34 + Math.random() * 86,
        speed: 0.18 + Math.random() * 0.38,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.5 ? 190 : 288,
      });
    }
  };

  const draw = (time) => {
    const rect = canvas.getBoundingClientRect();

    context.clearRect(0, 0, rect.width, rect.height);
    context.fillStyle = "#06131c";
    context.fillRect(0, 0, rect.width, rect.height);

    cells.forEach((cell, index) => {
      const drift = time * 0.00016 * cell.speed;
      const x = (cell.x + Math.cos(drift + cell.phase) * 58 + rect.width) % rect.width;
      const y = (cell.y + Math.sin(drift * 1.3 + cell.phase) * 42 + rect.height) % rect.height;
      const pulse = Math.sin(time * 0.0012 + cell.phase) * 7;
      const radius = cell.radius + pulse;
      const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius);

      gradient.addColorStop(0, `hsla(${cell.hue}, 96%, 72%, 0.42)`);
      gradient.addColorStop(0.45, `hsla(${cell.hue}, 94%, 58%, 0.18)`);
      gradient.addColorStop(1, `hsla(${cell.hue}, 94%, 42%, 0)`);

      context.beginPath();
      context.fillStyle = gradient;
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();

      if (index % 3 === 0) {
        context.beginPath();
        context.strokeStyle = `hsla(${cell.hue}, 94%, 74%, 0.2)`;
        context.lineWidth = 1.4;
        context.arc(x, y, radius * 0.52, 0, Math.PI * 2);
        context.stroke();
      }
    });

    requestAnimationFrame(draw);
  };

  resize();
  resetCells();
  window.addEventListener("resize", () => {
    resize();
    resetCells();
  });
  requestAnimationFrame(draw);
});

(() => {
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const revealSelector = "[data-pp-reveal]";
  const sectionBlocks = [
    ...document.querySelectorAll("main > section, body > section, main > article"),
  ];
  const ignoredElements =
    "script, style, link, template, noscript, canvas, video, source, [hidden], [aria-hidden='true']";

  sectionBlocks.forEach((block) => {
    if (block.matches("[aria-hidden='true']") || block.querySelector(revealSelector)) {
      return;
    }

    const candidates = [...block.children].filter(
      (element) => !element.matches(ignoredElements)
    );

    candidates.forEach((element, index) => {
      element.setAttribute("data-pp-reveal", "");
      element.style.setProperty(
        "--pp-reveal-delay",
        `${Math.min(index * 70, 210)}ms`
      );
    });
  });

  const revealItems = [...document.querySelectorAll(revealSelector)];

  if (!revealItems.length) {
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("pp-reveal-visible", entry.isIntersecting);
      });
    },
    {
      rootMargin: "-12% 0px -12% 0px",
      threshold: 0,
    }
  );

  document.documentElement.classList.add("pp-reveal-ready");
  revealItems.forEach((item) => revealObserver.observe(item));
})();
