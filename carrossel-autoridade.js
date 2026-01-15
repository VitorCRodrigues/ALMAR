document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("events-carousel");
  const btnPrev = document.querySelector(".events-arrow--left");
  const btnNext = document.querySelector(".events-arrow--right");

  if (!track || !btnPrev || !btnNext) return;

  let autoTimer = null;

  const getStep = () => {
    const first = track.querySelector(".events-logo-item");
    if (!first) return 200;

    const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const scrollNext = () => {
    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScroll - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    const step = getStep();
    if (track.scrollLeft <= 2) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(scrollNext, 2200);
  };

  const stopAuto = () => {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  };

  btnNext.addEventListener("click", () => {
    stopAuto();
    scrollNext();
    setTimeout(startAuto, 2500);
  });

  btnPrev.addEventListener("click", () => {
    stopAuto();
    scrollPrev();
    setTimeout(startAuto, 2500);
  });

  const strip = document.querySelector(".events-logos-strip");
  if (strip) {
    strip.addEventListener("mouseenter", stopAuto);
    strip.addEventListener("mouseleave", startAuto);
    strip.addEventListener("touchstart", stopAuto, { passive: true });
    strip.addEventListener("touchend", startAuto, { passive: true });
  }

  requestAnimationFrame(() => {
    track.scrollLeft = 0;
  });

  startAuto();
});
