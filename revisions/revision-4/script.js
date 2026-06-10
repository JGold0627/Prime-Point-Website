const form = document.querySelector(".lead-form");
const note = document.querySelector(".form-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  note.textContent = "Thanks. Prime Point Health will follow up with next steps.";
  form.reset();
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
