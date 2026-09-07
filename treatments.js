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
