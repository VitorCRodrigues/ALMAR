document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".authority-card");

  cards.forEach((card) => {
    const img = card.querySelector(".card-img");
    if (!img) return;

    const normalSrc = card.dataset.img || img.getAttribute("src");
    const hoverSrc = card.dataset.hover;

    if (normalSrc) img.src = normalSrc;

    if (!hoverSrc) return;

    const preload = new Image();
    preload.src = hoverSrc;

    card.addEventListener("mouseenter", () => {
      img.src = hoverSrc;
    });

    card.addEventListener("mouseleave", () => {
      img.src = normalSrc;
    });

    card.addEventListener("focusin", () => {
      img.src = hoverSrc;
    });

    card.addEventListener("focusout", () => {
      img.src = normalSrc;
    });
  });
});