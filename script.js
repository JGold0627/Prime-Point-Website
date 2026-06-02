const form = document.querySelector(".lead-form");
const note = document.querySelector(".form-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  note.textContent = "Thanks. Prime Point Health will follow up with next steps.";
  form.reset();
});

document.querySelectorAll(".compact-faq details").forEach((item) => {
  const closePeers = () => {
    document.querySelectorAll(".compact-faq details").forEach((peer) => {
      if (peer !== item) {
        peer.removeAttribute("open");
      }
    });
  };

  const openItem = () => {
    closePeers();
    item.setAttribute("open", "");
  };

  item.addEventListener("pointerenter", openItem);
  item.addEventListener("mouseenter", openItem);

  item.addEventListener("focusin", openItem);

  item.addEventListener("pointerleave", () => {
    item.removeAttribute("open");
  });

  item.addEventListener("mouseleave", () => {
    item.removeAttribute("open");
  });

  item.addEventListener("focusout", (event) => {
    if (!item.contains(event.relatedTarget)) {
      item.removeAttribute("open");
    }
  });

  item.addEventListener("toggle", () => {
    if (item.open) {
      closePeers();
    }
  });
});
