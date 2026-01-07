(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const headerHeight = () => header.offsetHeight || 80;

  function updateHeaderTheme() {
    const x = Math.floor(window.innerWidth / 2);
    const y = Math.floor(headerHeight() / 2);

    // 1) Faz o header "sumir" pro hit-test (sem afetar visual)
    const prevPointerEvents = header.style.pointerEvents;
    header.style.pointerEvents = "none";

    // 2) Agora sim pega o elemento real por trás
    const el = document.elementFromPoint(x, y);

    // 3) Volta ao normal
    header.style.pointerEvents = prevPointerEvents || "";

    if (!el) return;

    const themedSection = el.closest("[data-header-theme]");
    const shouldBeDark =
        themedSection && themedSection.getAttribute("data-header-theme") === "dark";

    header.classList.toggle("is-dark", !!shouldBeDark);
  }


  // Rodar ao carregar
  window.addEventListener("load", updateHeaderTheme);

  // Rodar no scroll (passivo pra performance)
  window.addEventListener("scroll", updateHeaderTheme, { passive: true });

  // Rodar no resize
  window.addEventListener("resize", updateHeaderTheme);

  // Rodar quando fontes/layout mudarem um pouco
  setTimeout(updateHeaderTheme, 100);
})();
