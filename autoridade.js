document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("cursosGrid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".curso-card"));

  cards.forEach(c => c.classList.remove("is-open"));

  function closeAll() {
    cards.forEach(c => c.classList.remove("is-open"));
  }

  cards.forEach(card => {
    const btnMore = card.querySelector(".curso-more");
    const btnClose = card.querySelector(".curso-close");

    btnMore?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const willOpen = !card.classList.contains("is-open");
      closeAll();
      if (willOpen) card.classList.add("is-open");
    });

    btnClose?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      card.classList.remove("is-open");
    });
  });
});
