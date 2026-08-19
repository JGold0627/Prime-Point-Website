// Canonical public header: new pages inherit it by loading global.css and this script.
const currentPage = window.location.pathname.split("/").pop()?.toLowerCase() || "index.html";
const activeHeaderSection = (() => {
  if (["peptides.html", "peptide-consult.html", "peptide-checkout.html"].includes(currentPage)) {
    return "peptides";
  }

  if (currentPage === "glp-1s.html" || currentPage.startsWith("glp-eligibility") || [
    "semaglutide.html",
    "tirzepatide.html",
    "semaglutide-tablets.html",
  ].includes(currentPage)) {
    return "glp";
  }

  if (currentPage === "blood-work.html") {
    return "blood-work";
  }

  if (["about.html", "contact.html"].includes(currentPage)) {
    return "about";
  }

  return "";
})();

const headerLinkClass = (section) => activeHeaderSection === section ? " nav-link-active" : "";
const headerCurrentState = (section) => activeHeaderSection === section ? ' aria-current="true"' : "";
const isMemberHome = currentPage === "member-home.html";

const globalHeaderMarkup = `
  <header class="site-header" data-site-header="global" aria-label="Primary navigation">
    <div class="nav-shell">
      <a class="brand" href="index.html" aria-label="Prime Point Health home">
        <img
          class="brand-logo-reference"
          src="assets/brand/Logo V2.png"
          alt="Prime Point Health"
        />
      </a>

      <nav class="nav-links" aria-label="Main navigation">
        <a class="nav-link${headerLinkClass("peptides")}"${headerCurrentState("peptides")} href="peptides.html">Peptides</a>
        <div class="glp-nav-dropdown">
          <a class="nav-link glp-nav-link${headerLinkClass("glp")}"${headerCurrentState("glp")} href="glp-1s.html">GLP-1's</a>
          <button
            class="glp-nav-trigger"
            type="button"
            aria-label="Show GLP-1 medications"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="glp-nav-menu"
          >
            <span class="glp-nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="glp-nav-menu" id="glp-nav-menu" aria-hidden="true">
            <div class="glp-nav-menu-group">
              <span class="glp-nav-menu-label">Injectable</span>
              <a href="semaglutide.html">Semaglutide</a>
              <a href="tirzepatide.html">Tirzepatide</a>
            </div>
            <div class="glp-nav-menu-group">
              <span class="glp-nav-menu-label">Oral</span>
              <a href="semaglutide-tablets.html">Semaglutide Tablets</a>
            </div>
          </div>
        </div>
        <a class="nav-link${headerLinkClass("blood-work")}"${headerCurrentState("blood-work")} href="blood-work.html">Blood Work</a>
        <div class="glp-nav-dropdown about-nav-dropdown">
          <a class="nav-link glp-nav-link${headerLinkClass("about")}"${headerCurrentState("about")} href="about.html">About Us</a>
          <button
            class="glp-nav-trigger"
            type="button"
            aria-label="Show About Us links"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="about-nav-menu"
          >
            <span class="glp-nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="glp-nav-menu" id="about-nav-menu" aria-hidden="true">
            <div class="glp-nav-menu-group">
              <a href="contact.html">Contact Us</a>
            </div>
          </div>
        </div>
      </nav>

      <div class="nav-actions" aria-label="Account actions">
        <a class="header-action header-login" href="${isMemberHome ? "member-home.html" : "login.html"}">${isMemberHome ? "Member Home" : "Log In"}</a>
        <a class="header-action header-start" href="index.html#services">Get Started</a>
        <button class="header-cart" type="button" aria-label="Shopping cart" title="Shopping cart">
          <svg class="header-cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 7H5.12"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
`;

const pageHeader = document.querySelector("[data-site-header-mount], .site-header, .glp-eligibility-header");

if (pageHeader) {
  pageHeader.outerHTML = globalHeaderMarkup;
} else {
  document.body.insertAdjacentHTML("afterbegin", globalHeaderMarkup);
}

const scrollToHomeServices = ({ behavior = "smooth" } = {}) => {
  const servicesSection = document.getElementById("services");
  const servicesGrid = servicesSection?.querySelector(".home-services-grid");

  if (!servicesSection) {
    return;
  }

  const gridBottom = servicesGrid
    ? servicesGrid.getBoundingClientRect().bottom + window.scrollY
    : servicesSection.offsetTop;
  const targetTop = Math.max(
    servicesSection.offsetTop,
    gridBottom - window.innerHeight + 32,
  );

  window.scrollTo({ top: targetTop, behavior });
};

document.querySelector(".header-start")?.addEventListener("click", (event) => {
  if (currentPage !== "index.html") {
    return;
  }

  event.preventDefault();
  window.history.replaceState(null, "", "#services");
  scrollToHomeServices({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
});

if (currentPage === "index.html" && window.location.hash === "#services") {
  window.addEventListener("load", () => {
    window.setTimeout(() => scrollToHomeServices({ behavior: "auto" }), 0);
  });
}

document.querySelectorAll(".glp-nav-dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(".glp-nav-trigger");
  const pageLink = dropdown.querySelector(".glp-nav-link");
  const menuId = trigger?.getAttribute("aria-controls");
  const menu = menuId ? document.getElementById(menuId) : null;
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  let closeTimer;
  let isPinnedOpen = false;

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
    isPinnedOpen = !isPinnedOpen;
    setOpen(isPinnedOpen);
  });

  dropdown.addEventListener("pointerenter", () => {
    if (supportsHover.matches && !isPinnedOpen) {
      setOpen(true);
    }
  });

  dropdown.addEventListener("pointerleave", () => {
    if (supportsHover.matches && !isPinnedOpen) {
      scheduleClose();
    }
  });

  dropdown.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!dropdown.contains(document.activeElement)) {
        isPinnedOpen = false;
        setOpen(false);
      }
    });
  });

  pageLink?.addEventListener("click", () => {
    isPinnedOpen = false;
    setOpen(false);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      isPinnedOpen = false;
      setOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      isPinnedOpen = false;
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
      isPinnedOpen = false;
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

document.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
  const inputId = toggle.getAttribute("aria-controls");
  const passwordInput = inputId ? document.getElementById(inputId) : null;

  if (!passwordInput) {
    return;
  }

  toggle.addEventListener("click", () => {
    const shouldShow = passwordInput.type === "password";

    passwordInput.type = shouldShow ? "text" : "password";
    toggle.textContent = shouldShow ? "Hide" : "Show";
    toggle.setAttribute("aria-pressed", String(shouldShow));
  });
});

document.querySelectorAll(".login-form").forEach((form) => {
  const note = form.querySelector(".login-form-note");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (note) {
      note.textContent = "Opening your secure member home...";
    }

    window.location.href = "member-home.html";
  });
});

document.querySelectorAll("[data-member-dashboard]").forEach((dashboard) => {
  const tabs = Array.from(dashboard.querySelectorAll("[data-member-tab]"));
  const panels = Array.from(dashboard.querySelectorAll("[data-member-panel]"));
  const date = dashboard.querySelector("[data-member-date]");

  if (date) {
    date.textContent = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date());
  }

  const activateMemberPanel = (name, moveFocus = false) => {
    const nextTab = tabs.find((tab) => tab.dataset.memberTab === name);
    if (!nextTab) return;

    tabs.forEach((tab) => {
      const active = tab === nextTab;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.memberPanel !== name;
    });

    if (moveFocus) nextTab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateMemberPanel(tab.dataset.memberTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = (index + 1) % tabs.length;
      if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      activateMemberPanel(tabs[nextIndex].dataset.memberTab, true);
    });
  });

  dashboard.querySelectorAll("[data-member-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      activateMemberPanel(trigger.dataset.memberOpen);
      dashboard.querySelector(".member-app-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

document.querySelectorAll("[data-member-feedback]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector("[data-member-feedback-note]");
    if (note) note.textContent = "Secure note saving will be enabled when member data storage is connected.";
  });
});

document.querySelectorAll("[data-account-form]").forEach((form) => {
  const password = form.querySelector('input[name="password"]');
  const passwordConfirm = form.querySelector('input[name="password_confirm"]');
  const note = form.querySelector(".account-form-note");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
      passwordConfirm.setCustomValidity("Passwords must match.");
      passwordConfirm.reportValidity();
      return;
    }

    passwordConfirm?.setCustomValidity("");

    if (note) {
      note.textContent = "Account saving will be enabled when the secure member database is connected.";
    }
  });

  passwordConfirm?.addEventListener("input", () => passwordConfirm.setCustomValidity(""));
});

document.querySelectorAll("[data-username-recovery]").forEach((form) => {
  const note = form.querySelector(".recovery-form-note");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (note) {
      note.textContent = "Username recovery will be enabled when secure member lookup is connected.";
    }
  });
});

document.querySelectorAll("[data-password-recovery]").forEach((form) => {
  const note = form.querySelector(".recovery-form-note");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (note) {
      note.textContent = "Password recovery will be enabled when secure member lookup is connected.";
    }
  });
});

document.querySelectorAll(".contact-email-capture").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const sourceEmail = form.querySelector('input[type="email"]');
    const contactSection = document.getElementById("contact-form");
    const destinationEmail = contactSection?.querySelector('input[name="email"]');

    if (!sourceEmail || !destinationEmail) {
      return;
    }

    destinationEmail.value = sourceEmail.value;
    contactSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    window.setTimeout(() => destinationEmail.focus(), 450);
  });
});

document.querySelectorAll(".contact-question-capture").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const sourceQuestion = form.querySelector('input[name="question"]');
    const contactSection = document.getElementById("contact-form");
    const destinationMessage = contactSection?.querySelector('textarea[name="message"]');

    if (!sourceQuestion || !destinationMessage) {
      return;
    }

    destinationMessage.value = sourceQuestion.value;
    contactSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    window.setTimeout(() => destinationMessage.focus(), 450);
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
  document.querySelectorAll(".glp-hero-wall-track").forEach((track) => {
    if (track.querySelector(".glp-hero-wall-set")) {
      return;
    }

    const originalSet = document.createElement("div");
    originalSet.className = "glp-hero-wall-set";
    originalSet.append(...track.children);

    const repeatedSet = originalSet.cloneNode(true);
    repeatedSet.setAttribute("aria-hidden", "true");
    repeatedSet.querySelectorAll("img").forEach((image) => {
      image.alt = "";
    });

    track.append(originalSet, repeatedSet);
  });
})();

(() => {
  const hero = document.querySelector(".home-hero");
  const scrollCue = document.querySelector(".home-hero-scroll-cue");

  if (!hero || !scrollCue) {
    return;
  }

  const updateScrollCue = () => {
    const heroBounds = hero.getBoundingClientRect();
    const actionBounds = hero.querySelector(".home-hero-centered-actions")?.getBoundingClientRect();
    const heroIsActive = heroBounds.top < window.innerHeight && heroBounds.bottom > 80;
    const hasClearSpace = !actionBounds || actionBounds.bottom < window.innerHeight - 56;

    scrollCue.classList.toggle("is-visible", heroIsActive && hasClearSpace);
  };

  updateScrollCue();
  window.addEventListener("scroll", updateScrollCue, { passive: true });
  window.addEventListener("resize", updateScrollCue);
})();

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
    "script, style, link, template, noscript, canvas, video, source, .home-hero-scroll-cue, [hidden], [aria-hidden='true']";

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
