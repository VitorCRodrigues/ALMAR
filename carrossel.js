(() => {
  const container = document.querySelector(".carousel-container");
  const track = document.querySelector(".carousel-track");
  const firstSet = track?.querySelector(".carousel-logos"); // 1º bloco

  if (!container || !track || !firstSet) return;

  const items = Array.from(firstSet.querySelectorAll("img")).filter(Boolean);
  if (!items.length) return;

  let index = 0;
  let positions = [];
  let widths = [];

  // autoplay
  let timer = null;
  const INTERVAL = 2200;          // tempo entre itens
  const RESUME_AFTER_CLICK = 2500;

  function numStyle(el, prop) {
    const v = parseFloat(getComputedStyle(el)[prop] || "0");
    return Number.isFinite(v) ? v : 0;
  }

  function measure() {
    const padLeft = numStyle(firstSet, "paddingLeft");
    const padRight = numStyle(firstSet, "paddingRight");

    const containerW = container.clientWidth;

    positions = items.map(img => firstSet.offsetLeft + img.offsetLeft - padLeft);
    widths = items.map(img => img.getBoundingClientRect().width || img.offsetWidth || 0);

    const firstSetW = firstSet.getBoundingClientRect().width;

    // limites para não "passar" demais
    const minX = -(firstSet.offsetLeft + firstSetW - padRight - containerW);
    const maxX = 0;

    return { containerW, minX, maxX };
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function goTo(i, { animate = true } = {}) {
    const isMobile = window.innerWidth <= 640;
    const step = isMobile ? 2 : 1;
    const total = items.length;

    // snap para múltiplo de step no mobile
    if (isMobile) i = Math.round(i / step) * step;

    if (i >= total) i = 0;
    if (i < 0) i = total - step < 0 ? 0 : total - step;

    index = i;

    const { containerW, minX, maxX } = measure();

    const itemLeft = positions[index];
    // no mobile mostra 2 itens: alinha à esquerda sem centralizar
    let x = isMobile ? -itemLeft : (() => {
      const itemW = widths[index];
      const margin = Math.max(12, Math.round(containerW * 0.06));
      if (itemW > containerW - margin * 2) return -(itemLeft - margin);
      return -(itemLeft - (containerW - itemW) / 2);
    })();

    x = clamp(x, minX, maxX);

    track.style.transition = animate ? "transform 420ms ease" : "none";
    track.style.transform = `translateX(${x}px)`;
  }

  function next() {
    const step = window.innerWidth <= 640 ? 2 : 1;
    goTo(index + step);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, INTERVAL);
  }
  
  window.moveCarousel = function (dir) {
    stopAuto();
    goTo(index + dir);
    setTimeout(startAuto, RESUME_AFTER_CLICK);
  };

  function waitImagesThenInit() {
    const pending = items.filter(img => !img.complete);
    if (pending.length) {
      pending.forEach(img => img.addEventListener("load", waitImagesThenInit, { once: true }));
      return;
    }

    goTo(0, { animate: false });
    startAuto();
  }

  window.addEventListener("load", waitImagesThenInit);

  window.addEventListener("resize", () => goTo(index, { animate: false }));

  const section = document.querySelector(".carousel-section");
  if (section) {
    section.addEventListener("mouseenter", stopAuto);
    section.addEventListener("mouseleave", startAuto);

    section.addEventListener("touchstart", stopAuto, { passive: true });
    section.addEventListener("touchend", () => setTimeout(startAuto, 800), { passive: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });
})();
