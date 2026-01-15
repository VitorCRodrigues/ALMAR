// events-tabs.js
document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".events-tab"));
  const details = Array.from(document.querySelectorAll(".events-detail"));

  if (!tabs.length || !details.length) return;

  function closeAll() {
    tabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-expanded", "false");
    });
    details.forEach((d) => d.classList.remove("is-open"));
  }

  function openById(id) {
    const tab = tabs.find((t) => t.dataset.target === id);
    const panel = document.getElementById(id);

    if (!tab || !panel) return;

    closeAll();
    tab.classList.add("is-active");
    tab.setAttribute("aria-expanded", "true");
    panel.classList.add("is-open");

    // opcional: garantir que o bloco fique visível no viewport
    panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.target;
      const panel = document.getElementById(id);

      const isOpen = panel && panel.classList.contains("is-open");
      if (isOpen) {
        closeAll(); // clicou no ativo => fecha
      } else {
        openById(id); // abre o clicado
      }
    });
  });

  // ✅ abre o primeiro por padrão (se quiser)
  openById(tabs[0].dataset.target);
});
