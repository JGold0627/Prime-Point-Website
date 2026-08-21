// Canonical public header: new pages inherit it by loading global.css and this script.
const currentPage = window.location.pathname.split("/").pop()?.toLowerCase() || "index.html";
const activeHeaderSection = (() => {
  if (["peptides.html", "peptide-consult.html", "peptide-checkout.html"].includes(currentPage)) {
    return "peptides";
  }

  if (currentPage === "glp-1s.html" || currentPage.startsWith("glp-eligibility") || currentPage.startsWith("glp-treatment-") || currentPage.startsWith("glp-identity-") || currentPage.startsWith("glp-checkout-") || [
    "semaglutide.html",
    "tirzepatide.html",
    "semaglutide-tablets.html",
    "tirzepatide-tablets.html",
  ].includes(currentPage)) {
    return "glp";
  }

  if (["blood-work.html", "blood-work-cart.html", "blood-work-checkout.html"].includes(currentPage)) {
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
let isMemberSession = isMemberHome;
try {
  if (isMemberHome) window.localStorage.setItem("primePointMemberLoggedIn", "true");
  isMemberSession = isMemberHome || window.localStorage.getItem("primePointMemberLoggedIn") === "true";
} catch (error) {
  isMemberSession = isMemberHome;
}

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
              <a href="tirzepatide-tablets.html">Tirzepatide Tablets</a>
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
        ${isMemberSession ? `
        <div class="header-member-account">
          <span class="header-member-avatar" aria-hidden="true" data-member-initials>PPH</span>
          <span class="header-member-greeting"><strong>Welcome back, <b data-member-display-name>Member</b></strong><small data-member-number>Member # pending</small></span>
          <button class="header-member-settings" type="button" aria-label="Open member options" aria-haspopup="true" aria-expanded="false" aria-controls="header-member-menu" data-member-menu-trigger>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.13.4.35.75.66 1 .3.25.68.4 1.08.4H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"></path>
            </svg>
          </button>
          <div class="header-member-menu" id="header-member-menu" role="menu" hidden>
            <p><strong data-member-display-name>Member</strong><small data-member-number>Member # pending</small></p>
            <a href="member-home.html#member-home-title" role="menuitem">Member profile</a>
            <a href="login.html" role="menuitem" data-member-sign-out>Sign out</a>
          </div>
        </div>
        ` : `
        <a class="header-action header-login" href="login.html">Log In</a>
        <a class="header-action header-start" href="index.html#services">Get Started</a>
        `}
        <a class="header-cart" href="${isMemberSession ? "blood-work-checkout.html?return=member-home.html" : "blood-work-cart.html"}" aria-label="Shopping cart" title="Shopping cart">
          <svg class="header-cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 7H5.12"></path>
          </svg>
          <span class="header-cart-count" data-cart-count hidden>0</span>
        </a>
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

const isLocalDesignPreview = window.location.protocol === "file:"
  || ["localhost", "127.0.0.1"].includes(window.location.hostname);

if (isLocalDesignPreview) {
  const designParams = new URLSearchParams(window.location.search);
  const designTreatment = designParams.get("treatment") || "semaglutide";
  const designFormat = designParams.get("format") || (designTreatment.includes("tablets") ? "tablets" : "injectable");
  const treatmentStep = designFormat === "tablets" ? "glp-treatment-tablets.html" : "glp-treatment-injectables.html";
  const glpDesignFlow = [
    "glp-eligibility.html",
    "glp-eligibility-contact.html",
    "glp-eligibility-medical.html",
    "glp-eligibility-medical-sex.html",
    "glp-eligibility-medical-current-glp1.html",
    "glp-eligibility-medical-diabetes.html",
    "glp-eligibility-medical-eligible.html",
    "glp-eligibility-medical-doctor-visit.html",
    "glp-eligibility-medical-conditions.html",
    "glp-eligibility-medical-height-weight.html",
    "glp-eligibility-medical-goal-weight.html",
    "glp-eligibility-medical-preferences.html",
    "glp-eligibility-medical-allergies.html",
    "glp-eligibility-medical-allergy-details.html",
    "glp-eligibility-medical-medications.html",
    "glp-eligibility-medical-current-conditions.html",
    "glp-eligibility-medical-additional-notes.html",
    "glp-treatment-selection.html",
    treatmentStep,
    "glp-identity-verification.html",
    "glp-identity-face.html",
    "glp-checkout-disclaimer.html",
    "glp-checkout-summary.html",
    "glp-checkout-shipping.html",
    "glp-checkout-payment.html"
  ];
  const currentDesignIndex = glpDesignFlow.indexOf(currentPage);

  if (currentDesignIndex !== -1) {
    const goToDesignStep = (index) => {
      if (index < 0 || index >= glpDesignFlow.length) return;
      const destination = new URL(glpDesignFlow[index], window.location.href);
      destination.searchParams.set("treatment", designTreatment);
      if (index >= glpDesignFlow.indexOf(treatmentStep)) {
        destination.searchParams.set("format", designFormat);
      }
      window.location.href = destination.href;
    };

    const designNavigator = document.createElement("nav");
    designNavigator.className = "glp-design-navigator";
    designNavigator.setAttribute("aria-label", "Local design navigation");
    designNavigator.innerHTML = `
      <span>Design ${currentDesignIndex + 1}/${glpDesignFlow.length}</span>
      <button type="button" data-design-previous aria-label="Previous design screen" ${currentDesignIndex === 0 ? "disabled" : ""}>&larr;</button>
      <button type="button" data-design-next aria-label="Next design screen" ${currentDesignIndex === glpDesignFlow.length - 1 ? "disabled" : ""}>&rarr;</button>
    `;
    designNavigator.querySelector("[data-design-previous]")?.addEventListener("click", () => goToDesignStep(currentDesignIndex - 1));
    designNavigator.querySelector("[data-design-next]")?.addEventListener("click", () => goToDesignStep(currentDesignIndex + 1));
    document.body.appendChild(designNavigator);

    document.addEventListener("keydown", (event) => {
      if (!event.altKey || !event.shiftKey) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToDesignStep(currentDesignIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToDesignStep(currentDesignIndex + 1);
      }
    });
  }

  const peptideDesignFlow = [
    "peptides.html",
    "peptide-consult.html",
    "peptide-checkout.html",
    "peptide-order-review.html",
    "peptide-account-finalize.html",
    "peptide-schedule.html",
    "member-home.html"
  ];
  const currentPeptideDesignIndex = peptideDesignFlow.indexOf(currentPage);

  if (currentPeptideDesignIndex !== -1) {
    const goToPeptideDesignStep = (index) => {
      if (index < 0 || index >= peptideDesignFlow.length) return;
      const destination = new URL(peptideDesignFlow[index], window.location.href);
      destination.searchParams.set("design", "peptide");
      window.location.href = destination.href;
    };

    const peptideNavigator = document.createElement("nav");
    peptideNavigator.className = "pp-design-navigator";
    peptideNavigator.setAttribute("aria-label", "Local peptide design navigation");
    peptideNavigator.innerHTML = `
      <span>Peptide design ${currentPeptideDesignIndex + 1}/${peptideDesignFlow.length}</span>
      <button type="button" data-design-previous aria-label="Previous peptide screen" ${currentPeptideDesignIndex === 0 ? "disabled" : ""}>&larr;</button>
      <button type="button" data-design-next aria-label="Next peptide screen" ${currentPeptideDesignIndex === peptideDesignFlow.length - 1 ? "disabled" : ""}>&rarr;</button>
    `;
    peptideNavigator.querySelector("[data-design-previous]")?.addEventListener("click", () => goToPeptideDesignStep(currentPeptideDesignIndex - 1));
    peptideNavigator.querySelector("[data-design-next]")?.addEventListener("click", () => goToPeptideDesignStep(currentPeptideDesignIndex + 1));
    document.body.appendChild(peptideNavigator);

    document.addEventListener("keydown", (event) => {
      if (!event.altKey || !event.shiftKey) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPeptideDesignStep(currentPeptideDesignIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToPeptideDesignStep(currentPeptideDesignIndex + 1);
      }
    });
  }
}

const primePointCartKey = "primePointBloodWorkCart";
const bloodWorkProducts = {
  baseline: {
    id: "baseline",
    name: "Single Baseline",
    detail: "One-time comprehensive blood work analysis",
    price: 249,
    cadence: "one-time purchase"
  },
  biannual: {
    id: "biannual",
    name: "Bi-Annual Analysis",
    detail: "Two comprehensive blood panels per year",
    price: 599,
    cadence: "charged annually"
  },
  precision: {
    id: "precision",
    name: "Monthly Precision",
    detail: "Four comprehensive blood panels per year",
    price: 1199,
    cadence: "charged annually"
  },
  "consult-20": {
    id: "consult-20",
    name: "20-Minute Consultation",
    detail: "Additional one-on-one clinician consultation",
    price: 49,
    cadence: "one-time purchase"
  },
  "consult-40": {
    id: "consult-40",
    name: "40-Minute Consultation",
    detail: "Extended one-on-one clinician consultation",
    price: 99,
    cadence: "one-time purchase"
  }
};
const bloodWorkMembershipIds = new Set(["baseline", "biannual", "precision"]);

const getPrimePointCart = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(primePointCartKey) || "[]");
    const entries = Array.isArray(saved) ? saved : saved?.id ? [saved] : [];
    const validEntries = entries
      .filter((entry) => bloodWorkProducts[entry.id])
      .map((entry) => ({ id: entry.id, quantity: Math.max(1, Number(entry.quantity) || 1) }));
    const activeMembershipIndex = validEntries.reduce(
      (latestIndex, entry, index) => bloodWorkMembershipIds.has(entry.id) ? index : latestIndex,
      -1
    );

    return validEntries.filter(
      (entry, index) => !bloodWorkMembershipIds.has(entry.id) || index === activeMembershipIndex
    );
  } catch (error) {
    return [];
  }
};

const savePrimePointCart = (cart) => {
  window.localStorage.setItem(primePointCartKey, JSON.stringify(cart));
};

const updatePrimePointCartBadge = () => {
  const quantity = getPrimePointCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = String(quantity);
    badge.hidden = quantity === 0;
  });
};

updatePrimePointCartBadge();

document.querySelectorAll("[data-add-blood-work-plan]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    addBloodWorkProduct(button.dataset.addBloodWorkPlan);
  });
});

const addBloodWorkProduct = (productId) => {
  if (!bloodWorkProducts[productId]) return;
  const cart = getPrimePointCart();
  let updatedCart;

  if (bloodWorkMembershipIds.has(productId)) {
    updatedCart = cart.filter((item) => !bloodWorkMembershipIds.has(item.id));
    updatedCart.push({ id: productId, quantity: 1 });
  } else {
    updatedCart = cart;
    const existing = updatedCart.find((item) => item.id === productId);
    if (existing) existing.quantity += 1;
    else updatedCart.push({ id: productId, quantity: 1 });
  }

  try {
    savePrimePointCart(updatedCart);
  } catch (error) {
    return;
  }

  updatePrimePointCartBadge();
  window.location.href = "blood-work-cart.html";
};

document.querySelectorAll("[data-add-blood-work-product]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    addBloodWorkProduct(button.dataset.addBloodWorkProduct);
  });
});

document.querySelectorAll("[data-blood-work-cart]").forEach((cart) => {
  let items = getPrimePointCart();
  const filledState = cart.querySelector("[data-cart-filled]");
  const emptyState = cart.querySelector("[data-cart-empty]");
  const itemsContainer = cart.querySelector("[data-cart-items]");
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const renderCart = () => {
    const hasItems = items.length > 0;
    if (filledState) filledState.hidden = !hasItems;
    if (emptyState) emptyState.hidden = hasItems;
    if (!hasItems || !itemsContainer) {
      updatePrimePointCartBadge();
      return;
    }

    itemsContainer.replaceChildren();
    items.forEach((item) => {
      const product = bloodWorkProducts[item.id];
      const itemTotal = product.price * item.quantity;
      const itemElement = document.createElement("section");
      itemElement.className = "cart-item";
      itemElement.setAttribute("aria-label", product.name);
      itemElement.innerHTML = `
        <div class="cart-product-mark" aria-hidden="true"><span>PPH</span><small>Blood Work</small></div>
        <div class="cart-item-details">
          <p class="cart-item-brand">Prime Point Health Blood Work</p>
          <h2>${product.name}</h2>
          <p>${product.detail}</p>
          <div class="cart-quantity" aria-label="${product.name} quantity">
            <button type="button" aria-label="Decrease ${product.name} quantity" data-item-decrease="${item.id}">&minus;</button>
            <span aria-live="polite">${item.quantity}</span>
            <button type="button" aria-label="Increase ${product.name} quantity" data-item-increase="${item.id}">+</button>
          </div>
        </div>
        <strong class="cart-item-price">${currency.format(itemTotal)}</strong>`;
      itemsContainer.appendChild(itemElement);
    });

    const total = items.reduce((sum, item) => sum + bloodWorkProducts[item.id].price * item.quantity, 0);
    cart.querySelectorAll("[data-cart-price], [data-cart-total]").forEach((node) => { node.textContent = currency.format(total); });
    savePrimePointCart(items);
    updatePrimePointCartBadge();
  };

  renderCart();

  itemsContainer?.addEventListener("click", (event) => {
    const increase = event.target.closest("[data-item-increase]");
    const decrease = event.target.closest("[data-item-decrease]");
    const productId = increase?.dataset.itemIncrease || decrease?.dataset.itemDecrease;
    if (!productId) return;
    const item = items.find((entry) => entry.id === productId);
    if (!item) return;
    if (increase) item.quantity += 1;
    if (decrease && item.quantity > 1) item.quantity -= 1;
    else if (decrease) items = items.filter((entry) => entry.id !== productId);
    renderCart();
  });

  const consent = cart.querySelector("[data-cart-consent]");
  const checkout = cart.querySelector("[data-cart-checkout]");
  const note = cart.querySelector("[data-cart-note]");
  if (consent && checkout) {
    consent.addEventListener("change", () => { checkout.disabled = !consent.checked; });
    checkout.addEventListener("click", () => {
      window.location.href = isMemberSession
        ? "blood-work-checkout.html"
        : "login.html?return=blood-work-checkout.html";
    });
  }
});

document.querySelectorAll("[data-blood-work-checkout]").forEach((checkoutPage) => {
  let items = getPrimePointCart();
  const emptyState = checkoutPage.querySelector("[data-checkout-empty]");
  const checkoutContent = checkoutPage.querySelector("[data-checkout-content]");
  const productsContainer = checkoutPage.querySelector("[data-checkout-products]");
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const returnTarget = new URLSearchParams(window.location.search).get("return");
  const backLink = checkoutPage.querySelector("[data-checkout-back]");
  if (backLink && returnTarget === "member-home.html") {
    backLink.hidden = false;
    backLink.href = "member-home.html";
    backLink.textContent = "Back to member home";
  }

  const renderCheckout = () => {
    const hasItems = items.length > 0;
    if (emptyState) emptyState.hidden = hasItems;
    if (checkoutContent) checkoutContent.hidden = !hasItems;
    if (!hasItems) {
      savePrimePointCart(items);
      updatePrimePointCartBadge();
      return;
    }

    const total = items.reduce((sum, item) => sum + bloodWorkProducts[item.id].price * item.quantity, 0);
    checkoutPage.querySelectorAll("[data-checkout-price]").forEach((node) => { node.textContent = currency.format(total); });
    if (!productsContainer) return;
    productsContainer.replaceChildren();
    items.forEach((item) => {
      const product = bloodWorkProducts[item.id];
      const row = document.createElement("div");
      row.className = "checkout-product";
      row.innerHTML = `
        <div class="checkout-product-mark" aria-hidden="true"><span>PPH</span><small>Blood Work</small><b>${item.quantity}</b></div>
        <div class="checkout-product-details">
          <strong>${product.name}</strong><small>${product.detail}</small>
          <div class="checkout-quantity" aria-label="${product.name} quantity">
            <button type="button" aria-label="Decrease ${product.name} quantity" data-checkout-decrease="${item.id}">&minus;</button>
            <span aria-live="polite">${item.quantity}</span>
            <button type="button" aria-label="Increase ${product.name} quantity" data-checkout-increase="${item.id}">+</button>
          </div>
        </div>
        <span>${currency.format(product.price * item.quantity)}</span>`;
      productsContainer.appendChild(row);
    });
    savePrimePointCart(items);
    updatePrimePointCartBadge();
  };

  renderCheckout();

  productsContainer?.addEventListener("click", (event) => {
    const increase = event.target.closest("[data-checkout-increase]");
    const decrease = event.target.closest("[data-checkout-decrease]");
    const productId = increase?.dataset.checkoutIncrease || decrease?.dataset.checkoutDecrease;
    if (!productId) return;
    const item = items.find((entry) => entry.id === productId);
    if (!item) return;
    if (increase) item.quantity += 1;
    if (decrease && item.quantity > 1) item.quantity -= 1;
    else if (decrease) items = items.filter((entry) => entry.id !== productId);
    renderCheckout();
  });

  const note = checkoutPage.querySelector("[data-checkout-note]");
  checkoutPage.querySelectorAll("[data-payment-placeholder]").forEach((button) => {
    button.addEventListener("click", () => {
      if (note) note.textContent = "This payment option will become available when secure payment processing is connected.";
    });
  });

  checkoutPage.querySelector("[data-discount-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (note) note.textContent = "Discount-code validation will become available when checkout is connected.";
  });

  checkoutPage.querySelector("[data-checkout-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    if (note) note.textContent = "Your information is ready. Secure payment entry will be provided by the connected payment processor.";
  });
});

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

let savedMemberFirstName = "Josh";
let savedMemberLastName = "Gold";
let savedMemberNumber = "1";
try {
  savedMemberFirstName = window.localStorage.getItem("primePointMemberFirstName") || "Josh";
  savedMemberLastName = window.localStorage.getItem("primePointMemberLastName") || "Gold";
  savedMemberNumber = window.localStorage.getItem("primePointMemberNumber") || "1";
} catch (error) {
  savedMemberFirstName = "Josh";
  savedMemberLastName = "Gold";
  savedMemberNumber = "1";
}

document.querySelectorAll("[data-member-display-name]").forEach((name) => {
  name.textContent = savedMemberFirstName || "Josh";
});

document.querySelectorAll("[data-member-initials]").forEach((initials) => {
  const firstInitial = savedMemberFirstName.charAt(0);
  const lastInitial = savedMemberLastName.charAt(0);
  initials.textContent = (firstInitial + lastInitial).toUpperCase() || "PPH";
});

document.querySelectorAll("[data-member-number]").forEach((number) => {
  number.textContent = savedMemberNumber ? `Member #${savedMemberNumber}` : "Member # pending";
});

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
  const returnPage = new URLSearchParams(window.location.search).get("return");
  const safeReturnPage = returnPage === "blood-work-checkout.html" ? returnPage : "member-home.html";
  const createAccountLink = document.querySelector('.login-account-prompt a[href="create-account.html"]');
  if (createAccountLink && safeReturnPage === "blood-work-checkout.html") {
    createAccountLink.href = `create-account.html?return=${encodeURIComponent(safeReturnPage)}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (note) {
      note.textContent = "Opening your secure member home...";
    }

    try {
      window.localStorage.setItem("primePointMemberLoggedIn", "true");
    } catch (error) {
      // Continue to the local member experience when storage is unavailable.
    }

    window.location.href = safeReturnPage;
  });
});

document.querySelectorAll("[data-member-sign-out]").forEach((link) => {
  link.addEventListener("click", () => {
    try {
      window.localStorage.removeItem("primePointMemberLoggedIn");
    } catch (error) {
      // The destination still provides a signed-out screen.
    }
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

    const firstName = form.querySelector('input[name="first_name"]')?.value.trim();
    const lastName = form.querySelector('input[name="last_name"]')?.value.trim();
    if (firstName) {
      try {
        window.localStorage.setItem("primePointMemberFirstName", firstName);
        if (lastName) window.localStorage.setItem("primePointMemberLastName", lastName);
      } catch (error) {
        // The account flow still works when browser storage is unavailable.
      }
    }

    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
      passwordConfirm.setCustomValidity("Passwords must match.");
      passwordConfirm.reportValidity();
      return;
    }

    passwordConfirm?.setCustomValidity("");

    try {
      window.localStorage.setItem("primePointMemberLoggedIn", "true");
    } catch (error) {
      // Continue to the requested destination when storage is unavailable.
    }

    const returnPage = new URLSearchParams(window.location.search).get("return");
    const safeReturnPage = returnPage === "blood-work-checkout.html" ? returnPage : "member-home.html";
    if (note) note.textContent = "Account created. Opening your next step...";
    window.location.href = safeReturnPage;
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
