const form = document.querySelector(".lead-form");
const note = document.querySelector(".form-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  note.textContent = "Thanks. Prime Point Health will follow up with next steps.";
  form.reset();
});
