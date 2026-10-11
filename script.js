// Canonical public header: new pages inherit it by loading global.css and this script.
const currentPage = window.location.pathname.split("/").pop()?.toLowerCase() || "index.html";
const activeHeaderSection = (() => {
  if ([
    "semaglutide.html",
    "tirzepatide.html",
    "semaglutide-tablets.html",
    "tirzepatide-tablets.html",
  ].includes(currentPage)) {
    return "weight-loss";
  }

  if (["nad-plus.html", "mic-b12.html", "nad-plus-nasal.html"].includes(currentPage)) {
    return "anti-aging";
  }

  if (["sermorelin.html", "glutathione.html", "glutathione-nasal.html"].includes(currentPage)) return "metabolic";

  return "";
})();

const headerLinkClass = (section) => activeHeaderSection === section ? " nav-link-active" : "";
const headerCurrentState = (section) => activeHeaderSection === section ? ' aria-current="true"' : "";
const isMemberHome = currentPage === "member-home.html";
const isMemberSession = isMemberHome;

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
        <div class="glp-nav-dropdown metabolic-nav-dropdown">
          <span class="nav-link glp-nav-link${headerLinkClass("weight-loss")}"${headerCurrentState("weight-loss")}>Weight Loss</span>
          <button
            class="glp-nav-trigger"
            type="button"
            aria-label="Show Weight Loss offerings"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="weight-loss-nav-menu"
          >
            <span class="glp-nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="glp-nav-menu metabolic-nav-menu" id="weight-loss-nav-menu" aria-hidden="true">
            <div class="metabolic-menu-shell">
              <div class="metabolic-menu-heading">
                <span>Explore Weight Loss</span>
                <small>Choose an offering to learn more</small>
              </div>
              <div class="metabolic-product-grid metabolic-product-grid--weight-loss">
                <a class="metabolic-product-card" href="semaglutide.html">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/semaglutide-injection-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">Semaglutide</span>
                </a>
                <a class="metabolic-product-card" href="tirzepatide.html">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/tirzepatide-injection-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">Tirzepatide</span>
                </a>
                <a class="metabolic-product-card" href="semaglutide-tablets.html">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/semaglutide-drops-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">Semaglutide Sublingual Drops</span>
                </a>
                <a class="metabolic-product-card" href="tirzepatide-tablets.html">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/tirzepatide-drops-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">Tirzepatide Sublingual Drops</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="glp-nav-dropdown metabolic-nav-dropdown">
          <span class="nav-link glp-nav-link${headerLinkClass("metabolic")}"${headerCurrentState("metabolic")}>Metabolic Health</span>
          <button
            class="glp-nav-trigger"
            type="button"
            aria-label="Show Metabolic Health offerings"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="metabolic-health-nav-menu"
          >
            <span class="glp-nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="glp-nav-menu metabolic-nav-menu" id="metabolic-health-nav-menu" aria-hidden="true">
            <div class="metabolic-menu-shell">
              <div class="metabolic-menu-heading">
                <span>Explore Metabolic Health</span>
                <small>Choose an offering to learn more</small>
              </div>
              <div class="metabolic-product-grid">
                <a href="sermorelin.html" class="metabolic-product-card">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/sermorelin-injection-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">Sermorelin</span>
                </a>
                <a href="glutathione.html" class="metabolic-product-card">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/glutathione-injection-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">Glutathione</span>
                </a>
                <a href="glutathione-nasal.html" class="metabolic-product-card">
                  <span class="metabolic-product-art"><img class="metabolic-product-image-nasal" src="assets/temporary-unbranded/glutathione-nasal-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">Glutathione Nasal</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="glp-nav-dropdown metabolic-nav-dropdown">
          <span class="nav-link glp-nav-link${headerLinkClass("anti-aging")}"${headerCurrentState("anti-aging")}>Energy &amp; Recovery</span>
          <button
            class="glp-nav-trigger"
            type="button"
            aria-label="Show Energy &amp; Recovery offerings"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="longevity-nav-menu"
          >
            <span class="glp-nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="glp-nav-menu metabolic-nav-menu" id="longevity-nav-menu" aria-hidden="true">
            <div class="metabolic-menu-shell">
              <div class="metabolic-menu-heading">
                <span>Explore Energy &amp; Recovery</span>
                <small>Choose an offering to learn more</small>
              </div>
              <div class="metabolic-product-grid">
                <a href="nad-plus.html" class="metabolic-product-card">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/nad-plus-injection-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">NAD+</span>
                </a>
                <a href="nad-plus-nasal.html" class="metabolic-product-card">
                  <span class="metabolic-product-art"><img class="metabolic-product-image-nasal" src="assets/temporary-unbranded/nad-plus-nasal-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">NAD+ Nasal</span>
                </a>
                <a href="mic-b12.html" class="metabolic-product-card">
                  <span class="metabolic-product-art"><img src="assets/temporary-unbranded/mic-b12-injection-cutout-v1.png" alt="" /></span>
                  <span class="metabolic-product-name">MIC + B12</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <button class="mobile-nav-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav-menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <div class="nav-actions" aria-label="Account actions">
        ${isMemberSession ? `
        <div class="header-member-account">
          <span class="header-member-avatar" aria-hidden="true" data-member-initials>PPH</span>
          <span class="header-member-greeting"><strong>Welcome back, <b data-member-first-name>Member</b></strong><small>Prime Point Member</small></span>
          <button class="header-member-settings" type="button" aria-label="Open member options" aria-haspopup="true" aria-expanded="false" aria-controls="header-member-menu" data-member-menu-trigger>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.13.4.35.75.66 1 .3.25.68.4 1.08.4H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"></path>
            </svg>
          </button>
          <div class="header-member-menu" id="header-member-menu" role="menu" hidden>
            <p><strong data-member-first-name>Member</strong><small>Prime Point Member</small></p>
            <a href="member-home.html#member-home-title" role="menuitem">Member profile</a>
            <button type="button" role="menuitem" data-member-logout>
            Sign out
            </button>
          </div>
        </div>
        ` : `
        <a class="header-action header-login" href="login.html">Log In</a>
        `}
      </div>

      <nav class="mobile-nav-menu" id="mobile-nav-menu" aria-label="Mobile navigation" hidden>
        <p class="mobile-nav-eyebrow">Explore Prime Point</p>
        <div class="mobile-nav-group">
          <button class="mobile-nav-topic" type="button" data-mobile-nav-trigger aria-expanded="false" aria-controls="mobile-weight-loss-links"><span>Weight Loss</span><span class="mobile-nav-chevron" aria-hidden="true"></span></button>
          <div class="mobile-nav-submenu" id="mobile-weight-loss-links" hidden>
            <a class="mobile-nav-sublink" href="semaglutide.html">Semaglutide</a>
            <a class="mobile-nav-sublink" href="tirzepatide.html">Tirzepatide</a>
            <a class="mobile-nav-sublink" href="semaglutide-tablets.html">Semaglutide Sublingual Drops</a>
            <a class="mobile-nav-sublink" href="tirzepatide-tablets.html">Tirzepatide Sublingual Drops</a>
          </div>
        </div>
        <div class="mobile-nav-group">
          <button class="mobile-nav-topic" type="button" data-mobile-nav-trigger aria-expanded="false" aria-controls="mobile-metabolic-links"><span>Metabolic Health</span><span class="mobile-nav-chevron" aria-hidden="true"></span></button>
          <div class="mobile-nav-submenu" id="mobile-metabolic-links" hidden>
            <a class="mobile-nav-sublink" href="sermorelin.html">Sermorelin</a>
            <a class="mobile-nav-sublink" href="glutathione.html">Glutathione</a>
            <a class="mobile-nav-sublink" href="glutathione-nasal.html">Glutathione Nasal</a>
          </div>
        </div>
        <div class="mobile-nav-group">
          <button class="mobile-nav-topic" type="button" data-mobile-nav-trigger aria-expanded="false" aria-controls="mobile-longevity-links"><span>Energy &amp; Recovery</span><span class="mobile-nav-chevron" aria-hidden="true"></span></button>
          <div class="mobile-nav-submenu" id="mobile-longevity-links" hidden>
            <a class="mobile-nav-sublink" href="nad-plus.html">NAD+</a>
            <a class="mobile-nav-sublink" href="nad-plus-nasal.html">NAD+ Nasal</a>
            <a class="mobile-nav-sublink" href="mic-b12.html">MIC + B12</a>
          </div>
        </div>
        <div class="mobile-nav-group mobile-nav-account">
          <a class="header-action mobile-nav-login" href="${isMemberSession ? 'member-home.html' : 'login.html'}">${isMemberSession ? 'Member Home' : 'Log In'}</a>
        </div>
      </nav>
    </div>
  </header>
`;

const pageHeader = document.querySelector("[data-site-header-mount], .site-header, .glp-eligibility-header");

if (pageHeader) {
  pageHeader.outerHTML = globalHeaderMarkup;
} else {
  document.body.insertAdjacentHTML("afterbegin", globalHeaderMarkup);
}

// Keep these destinations available on every page, including account pages.
let footerIntro = document.querySelector(".pp-footer-intro");

if (!footerIntro) {
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="pp-footer pp-footer-compact" id="site-footer">
      <nav class="pp-footer-intro" aria-label="Footer navigation">
        <a href="treatments.html">Explore all treatments <span aria-hidden="true">&rarr;</span></a>
      </nav>
    </footer>
  `);
  footerIntro = document.querySelector(".pp-footer-intro");
}

[
  { href: "contact.html", label: "Contact Us" },
  { href: "about.html", label: "About Us" },
].forEach(({ href, label }) => {
  let link = footerIntro.querySelector(`a[href="${href}"]`);
  if (!link) {
    link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    footerIntro.append(link);
  }
  if (currentPage === href) link.setAttribute("aria-current", "page");
});

// Every footer points to the same legal pages, including compact account footers.
const siteFooter = footerIntro.closest("footer");
const footerLegalLinks = siteFooter.querySelector(".pp-footer-legal nav") || footerIntro;
[
  { href: "privacy-policy.html", label: "Privacy Policy" },
  { href: "terms-of-service.html", label: "Terms of Service" },
  { href: "cancellation-policy.html", label: "Cancellation Policy" },
  { href: "shipping-policy.html", label: "Shipping Policy" },
].forEach(({ href, label }) => {
  let link = siteFooter.querySelector(`a[href="${href}"]`);
  if (!link) {
    link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    footerLegalLinks.append(link);
  }
  if (currentPage === href) link.setAttribute("aria-current", "page");
});

const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const mobileNavMenu = document.querySelector("#mobile-nav-menu");

if (mobileNavToggle && mobileNavMenu) {
  const categoryTriggers = mobileNavMenu.querySelectorAll("[data-mobile-nav-trigger]");
  const setCategoryOpen = (trigger, open) => {
    const submenu = document.getElementById(trigger.getAttribute("aria-controls"));
    trigger.setAttribute("aria-expanded", String(open));
    submenu.hidden = !open;
    trigger.closest(".mobile-nav-group").classList.toggle("is-open", open);
  };

  categoryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const open = trigger.getAttribute("aria-expanded") !== "true";
      categoryTriggers.forEach((item) => setCategoryOpen(item, item === trigger && open));
    });
  });

  mobileNavMenu.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") !== currentPage) return;
    link.setAttribute("aria-current", "page");
    const group = link.closest(".mobile-nav-group");
    group.classList.add("is-current");
    const trigger = group.querySelector("[data-mobile-nav-trigger]");
    if (trigger) setCategoryOpen(trigger, true);
  });

  const setMobileNav = (open) => {
    mobileNavMenu.hidden = !open;
    mobileNavToggle.setAttribute("aria-expanded", String(open));
    mobileNavToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("mobile-nav-open", open);
  };

  mobileNavToggle.addEventListener("click", () => {
    setMobileNav(mobileNavToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileNavMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMobileNav(false);
  });

  window.addEventListener("resize", () => {
    if (getComputedStyle(mobileNavToggle).display === "none") setMobileNav(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNavMenu.hidden) {
      setMobileNav(false);
      mobileNavToggle.focus();
    }
  });

  document.addEventListener("focusin", (event) => {
    if (!mobileNavMenu.hidden && !mobileNavMenu.contains(event.target) && !mobileNavToggle.contains(event.target)) {
      setMobileNav(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileNavMenu.hidden && !mobileNavMenu.contains(event.target) && !mobileNavToggle.contains(event.target)) {
      setMobileNav(false);
    }
  });
}

const memberMenuTrigger = document.querySelector("[data-member-menu-trigger]");
const memberMenu = document.querySelector("#header-member-menu");

if (memberMenuTrigger && memberMenu) {
  const setMemberMenu = (open) => {
    memberMenu.hidden = !open;
    memberMenuTrigger.setAttribute("aria-expanded", String(open));
  };

  memberMenuTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setMemberMenu(memberMenu.hidden);
  });

  memberMenu.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", () => setMemberMenu(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMemberMenu(false);
      memberMenuTrigger.focus();
    }
  });
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

document.querySelectorAll("[data-member-dashboard]").forEach((dashboard) => {
  const tabs = Array.from(dashboard.querySelectorAll("[data-member-tab]"));
  const panels = Array.from(dashboard.querySelectorAll("[data-member-panel]"));
  const date = dashboard.querySelector("[data-member-date]");

  if (date) {
    date.textContent = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "America/New_York"
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

const homeLaunchModal = document.querySelector("[data-home-launch-modal]");

if (homeLaunchModal) {
  const homeLaunchSessionKey = "primePointLaunchModalSeen";
  const closeButton = homeLaunchModal.querySelector("[data-home-launch-close]");
  const signupForm = homeLaunchModal.querySelector("[data-home-launch-form]");
  const status = homeLaunchModal.querySelector("[data-home-launch-status]");
  const emailInput = signupForm?.querySelector('input[type="email"]');
  const hasSeenHomeLaunchModal = () => {
    try {
      return window.sessionStorage.getItem(homeLaunchSessionKey) === "true";
    } catch (error) {
      return false;
    }
  };
  const rememberHomeLaunchModal = () => {
    try {
      window.sessionStorage.setItem(homeLaunchSessionKey, "true");
    } catch (error) {
      // Keep the close action working when browser storage is unavailable.
    }
  };

  const closeHomeLaunchModal = () => {
    rememberHomeLaunchModal();
    homeLaunchModal.classList.remove("is-visible");
    document.body.classList.remove("home-launch-modal-open");
    window.setTimeout(() => {
      homeLaunchModal.hidden = true;
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260);
  };

  if (!hasSeenHomeLaunchModal()) {
    homeLaunchModal.hidden = false;
    window.requestAnimationFrame(() => {
      homeLaunchModal.classList.add("is-visible");
      document.body.classList.add("home-launch-modal-open");
      closeButton?.focus();
    });
  }

  closeButton?.addEventListener("click", closeHomeLaunchModal);
  homeLaunchModal.addEventListener("click", (event) => {
    if (event.target === homeLaunchModal) closeHomeLaunchModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && homeLaunchModal.classList.contains("is-visible")) {
      closeHomeLaunchModal();
    }
  });

  signupForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!signupForm.checkValidity()) {
      signupForm.reportValidity();
      return;
    }
    if (status) status.textContent = "Thank you — we'll keep you posted.";
    if (emailInput) emailInput.value = "";
    rememberHomeLaunchModal();
    window.setTimeout(closeHomeLaunchModal, 900);
  });
}

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

document.querySelectorAll("[data-home-faq]").forEach((section) => {
  const list = section.querySelector(".home-faq-list");
  if (!list) return;

  const desktop = window.matchMedia("(min-width: 801px)");
  let lastWidth = -1;
  let measurementFrame = 0;
  const pixels = (value) => Number.parseFloat(value) || 0;

  const sizePhoto = () => {
    measurementFrame = 0;
    if (!desktop.matches) {
      section.style.removeProperty("--home-faq-photo-height");
      return;
    }

    // Measure only question rows and borders, even when an answer is open.
    const listStyle = getComputedStyle(list);
    let collapsedHeight = pixels(listStyle.borderTopWidth) + pixels(listStyle.borderBottomWidth);
    list.querySelectorAll("details").forEach((item) => {
      const summary = item.querySelector("summary");
      const style = getComputedStyle(item);
      collapsedHeight += summary.getBoundingClientRect().height
        + pixels(style.borderTopWidth) + pixels(style.borderBottomWidth);
    });
    section.style.setProperty("--home-faq-photo-height", `${Math.ceil(collapsedHeight)}px`);
  };

  const scheduleMeasurement = () => {
    cancelAnimationFrame(measurementFrame);
    measurementFrame = requestAnimationFrame(sizePhoto);
  };

  // Answer height changes must never trigger a new photograph size.
  new ResizeObserver(([entry]) => {
    const width = entry.contentRect.width;
    if (Math.abs(width - lastWidth) < 0.5) return;
    lastWidth = width;
    scheduleMeasurement();
  }).observe(list);
  desktop.addEventListener("change", scheduleMeasurement);
  document.fonts?.ready.then(scheduleMeasurement);
  document.fonts?.addEventListener("loadingdone", scheduleMeasurement);
  sizePhoto();
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

// Shared scroll reveal: replay on entry and recede on exit across every page.
(() => {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealSelector = "[data-pp-reveal]";
  const ignoredElements =
    "script, style, link, template, noscript, canvas, video, source, nav, dialog, [role='dialog'], [role='tablist'], .site-header, .home-hero-scroll-cue, [aria-hidden='true'], [data-pp-reveal='off']";

  const prepareContent = (element, index = 0) => {
    if (element.closest(ignoredElements) || element.closest(revealSelector)) {
      return;
    }

    // Follow nested layouts to their content, preserving section backgrounds.
    // Forms stay together; hidden tabs are observed so they can reveal on opening.
    const isContainer = element.matches("section, article") || (
      !element.matches("form") &&
      element.querySelector(`section, article, ${revealSelector}`)
    );

    if (isContainer) {
      [...element.children].forEach(prepareContent);
      return;
    }

    element.setAttribute("data-pp-reveal", "");
    element.style.setProperty("--pp-reveal-delay", `${Math.min(index * 70, 210)}ms`);
  };

  document.querySelectorAll("main, body > section, .pp-footer").forEach((root) => {
    [...root.children].forEach(prepareContent);
  });

  const revealItems = [...document.querySelectorAll(revealSelector)].filter(
    (element) => !element.closest(ignoredElements) &&
      !element.parentElement?.closest(revealSelector)
  );

  if (!revealItems.length) {
    return;
  }

  revealItems.forEach((item) => item.classList.add("pp-reveal-item"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          const isAbove = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          entry.target.style.setProperty("--pp-reveal-shift", isAbove ? "-18px" : "18px");
        }

        entry.target.classList.toggle("pp-reveal-visible", entry.isIntersecting);
      });
    },
    {
      rootMargin: "-32px 0px -32px 0px",
      threshold: 0,
    }
  );

  const syncMotionPreference = () => {
    revealObserver.disconnect();
    document.documentElement.classList.toggle("pp-reveal-ready", !reducedMotion.matches);

    if (!reducedMotion.matches) {
      revealItems.forEach((item) => revealObserver.observe(item));
    }
  };

  reducedMotion.addEventListener("change", syncMotionPreference);
  syncMotionPreference();
})();
