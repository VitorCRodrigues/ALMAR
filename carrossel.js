(() => {
  const container = document.querySelector(".carousel-container");
  const track = document.querySelector(".carousel-track");
  const firstSet = track?.querySelector(".carousel-logos");

  if (!container || !track || !firstSet) return;

  const items = Array.from(firstSet.querySelectorAll("img")).filter(Boolean);
  if (!items.length) return;

  let index = 0;
  let timer = null;
  const INTERVAL = 2200;
  const RESUME_AFTER_CLICK = 2500;

  // ← MUDANÇA PRINCIPAL: era <= 900, agora <= 600
  // Tablets (820px+) usam o layout desktop de múltiplos logos
  function isMobile() {
    return window.innerWidth <= 600;
  }

  function applyMobileLayout() {
    const w = container.clientWidth;
    items.forEach(img => {
      img.style.width          = w + "px";
      img.style.maxWidth       = w + "px";
      img.style.height         = "120px";
      img.style.objectFit      = "contain";
      img.style.objectPosition = "center";
      img.style.flexShrink     = "0";
      img.style.padding        = "0 40px";
      img.style.boxSizing      = "border-box";
    });
    firstSet.style.gap        = "0";
    firstSet.style.padding    = "0";
    firstSet.style.alignItems = "center";
  }

  function resetMobileLayout() {
    items.forEach(img => {
      img.style.width          = "";
      img.style.maxWidth       = "";
      img.style.height         = "";
      img.style.objectFit      = "";
      img.style.objectPosition = "";
      img.style.flexShrink     = "";
      img.style.padding        = "";
      img.style.boxSizing      = "";
    });
    firstSet.style.gap        = "";
    firstSet.style.padding    = "";
    firstSet.style.alignItems = "";
  }

  function goTo(i, { animate = true } = {}) {
    const total = items.length;
    if (i >= total) i = 0;
    if (i < 0)      i = total - 1;
    index = i;

    let x;

    if (isMobile()) {
      applyMobileLayout();
      x = -(index * container.clientWidth);
    } else {
      resetMobileLayout();
      const containerW = container.clientWidth;
      const imgLeft    = items[index].offsetLeft + firstSet.offsetLeft;
      const imgW       = items[index].getBoundingClientRect().width || items[index].offsetWidth || 0;
      const margin     = Math.max(12, Math.round(containerW * 0.06));
      x = imgW > containerW - margin * 2
        ? -(imgLeft - margin)
        : -(imgLeft - (containerW - imgW) / 2);

      const trackW = firstSet.getBoundingClientRect().width;
      const minX   = -(trackW - containerW);
      x = Math.max(minX, Math.min(0, x));
    }

    track.style.transition = animate ? "transform 420ms ease" : "none";
    track.style.transform  = `translateX(${x}px)`;
  }

  function next() { goTo(index + 1); }

  function stopAuto()  { if (timer) clearInterval(timer); timer = null; }
  function startAuto() { stopAuto(); timer = setInterval(next, INTERVAL); }

  window.moveCarousel = function (dir) {
    stopAuto();
    goTo(index + dir);
    setTimeout(startAuto, RESUME_AFTER_CLICK);
  };

  function waitImagesThenInit() {
    const pending = items.filter(img => !img.complete);
    if (pending.length) {
      pending.forEach(img =>
        img.addEventListener("load", waitImagesThenInit, { once: true })
      );
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
    section.addEventListener("touchstart", stopAuto,                         { passive: true });
    section.addEventListener("touchend",   () => setTimeout(startAuto, 800), { passive: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAuto(); else startAuto();
  });
})();
