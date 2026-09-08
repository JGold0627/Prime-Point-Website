const treatmentFilters = document.querySelectorAll(".treatments-filter");
const treatmentCards = document.querySelectorAll("[data-treatment-category]");

treatmentFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selectedCategory = filter.textContent.trim().toLowerCase().replaceAll(" ", "-");

    treatmentFilters.forEach((option) => {
      const isSelected = option === filter;
      option.classList.toggle("is-active", isSelected);
      option.setAttribute("aria-pressed", String(isSelected));
    });

    treatmentCards.forEach((card) => {
      card.hidden = selectedCategory !== "all"
        && card.dataset.treatmentCategory !== selectedCategory;
    });
  });
});

const syncTreatmentCategoryLink = () => {
  const category = window.location.hash.slice(1);
  const filter = Array.from(treatmentFilters).find((item) => item.id === category && category);
  if (filter) filter.click();
};

window.addEventListener("hashchange", syncTreatmentCategoryLink);
document.querySelectorAll('.pp-footer-medications a[href*="treatments.html#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const filter = document.getElementById(link.hash.slice(1));
    if (filter) filter.click();
  });
});
syncTreatmentCategoryLink();

const treatmentsQuality = document.querySelector(".treatments-quality");
const treatmentsQualityMedia = document.querySelector(".treatments-quality-media");
const treatmentsQualityContent = document.querySelector(".treatments-quality-content");
const treatmentsQualityItems = document.querySelectorAll(".treatments-quality-list details");

treatmentsQualityItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    treatmentsQualityItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

const syncQualityMediaHeight = () => {
  if (!treatmentsQuality || !treatmentsQualityMedia || !treatmentsQualityContent) return;

  if (window.matchMedia("(max-width: 1050px)").matches) {
    treatmentsQuality.style.removeProperty("--treatments-quality-media-height");
    return;
  }

  const hasExpandedItem = treatmentsQualityContent.querySelector("details[open]");
  if (!hasExpandedItem) {
    treatmentsQuality.style.setProperty(
      "--treatments-quality-media-height",
      `${treatmentsQualityContent.offsetHeight}px`,
    );
  }
};

syncQualityMediaHeight();
window.addEventListener("load", syncQualityMediaHeight, { once: true });
window.addEventListener("resize", syncQualityMediaHeight);
