document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     CONFIG
  ========================== */
  const tempoPorSlide = 2500;   // ms
  const OVERLAP_PCT = 0.30;     // 30% (mude aqui pra 0.25, 0.35 etc)

  /* =========================
     ELEMENTOS
  ========================== */
  const introScroll = document.getElementById("introScroll");
  const track = document.querySelector(".intro-track");
  const images = document.querySelectorAll(".intro-track img");
  const body = document.body;

  let index = 0;
  let animating = false;
  const lastIndex = images.length - 1;

  /* =========================
     FUNÇÃO: calcula overlap (px)
     - 30% da altura da intro
  ========================== */
  function setOverlapFromIntro() {
    if (!introScroll) return;

    const rect = introScroll.getBoundingClientRect();
    const introH = rect.height;

    if (!introH || introH < 10) return;

    const overlapPx = Math.round(introH * OVERLAP_PCT);

    // atualiza variável CSS usada no margin-top negativo
    document.documentElement.style.setProperty("--pyramid-overlap-mobile", overlapPx + "px");
  }

  /* =========================
     INTRO: inicia travado
  ========================== */
  body.classList.add("lock-scroll");

  if (images.length > 0) {
    images[0].classList.add("active");
  }

  // calcula assim que carregar (e depois do layout estabilizar)
  setOverlapFromIntro();
  setTimeout(setOverlapFromIntro, 80);
  setTimeout(setOverlapFromIntro, 200);

  /* =========================
     TROCA DE IMAGEM
  ========================== */
  function changeImage(newIndex) {
    if (animating || newIndex === index) return;
    animating = true;

    const current = images[index];
    const next = images[newIndex];

    current.classList.remove("active");
    current.classList.add("fading-out");
    next.classList.add("active");

    if (newIndex === lastIndex) {
      body.classList.add("intro-last");
      // recalcula overlap quando chega na última
      setOverlapFromIntro();
      setTimeout(setOverlapFromIntro, 80);
    }

    setTimeout(() => {
      current.classList.remove("fading-out");
      index = newIndex;
      animating = false;

      // recalcula depois da transição (layout pode variar)
      setOverlapFromIntro();
    }, 550);
  }

  /* =========================
     FINALIZA INTRO / LIBERA SCROLL
  ========================== */
  function unlockScroll() {
    body.classList.remove("lock-scroll");
    body.classList.add("intro-last");
    body.classList.add("intro-done");

    // mantém a última imagem no fluxo do introScroll
    if (track) {
      track.style.position = "absolute";
      track.style.top = "0";
      track.style.left = "0";
      track.style.width = "100%";
      track.style.height = "100%";
    }

    // garante o overlap certo na hora que “gruda”
    setOverlapFromIntro();
    setTimeout(setOverlapFromIntro, 80);
  }

  /* =========================
     SLIDESHOW POR TEMPO
  ========================== */
  const slideshowInterval = setInterval(() => {
    if (index < lastIndex) {
      changeImage(index + 1);
    } else {
      clearInterval(slideshowInterval);
      unlockScroll();
    }
  }, tempoPorSlide);

  /* =========================
     RESPONSIVO
  ========================== */
  window.addEventListener("resize", function () {
    setOverlapFromIntro();
  });

  window.addEventListener("orientationchange", function () {
    setTimeout(setOverlapFromIntro, 120);
  });
});
