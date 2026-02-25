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
  let introFinalizada = false;
  let touchStartY = 0;

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
    if (animating || newIndex === index || introFinalizada) return;
    if (!images.length) return;

    animating = true;

    const current = images[index];
    const next = images[newIndex];

    if (current) {
      current.classList.remove("active");
      current.classList.add("fading-out");
    }

    if (next) {
      next.classList.add("active");
    }

    if (newIndex === lastIndex) {
      body.classList.add("intro-last");
      // recalcula overlap quando chega na última
      setOverlapFromIntro();
      setTimeout(setOverlapFromIntro, 80);
    }

    setTimeout(() => {
      if (current) current.classList.remove("fading-out");
      index = newIndex;
      animating = false;

      // recalcula depois da transição (layout pode variar)
      setOverlapFromIntro();
    }, 550);
  }


  function unlockScroll() {
    if (introFinalizada) return;
    introFinalizada = true;

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

    // remove listeners de "pular intro"
    removeSkipListeners();
  }

  /* =========================
     PULA INTRO PARA O FINAL
  ========================== */
  function jumpIntroToEnd() {
    if (introFinalizada) return;

    clearInterval(slideshowInterval);
    animating = false;

    // limpa classes de todas as imagens
    images.forEach(function (img) {
      img.classList.remove("active");
      img.classList.remove("fading-out");
    });

    // ativa última imagem
    if (images.length > 0) {
      images[lastIndex].classList.add("active");
      index = lastIndex;
    }

    unlockScroll();
  }

  /* =========================
     DETECÇÃO DE SCROLL PARA BAIXO
     (wheel / touch / teclado)
  ========================== */
  function onWheelSkip(e) {
    if (introFinalizada) return;

    // deltaY > 0 = scroll para baixo
    if (e.deltaY > 0) {
      e.preventDefault();
      jumpIntroToEnd();
    }
  }

  function onKeySkip(e) {
    if (introFinalizada) return;

    // teclas que normalmente descem a página
    const keysDown = ["ArrowDown", "PageDown", " ", "Spacebar", "End"];
    if (keysDown.indexOf(e.key) !== -1) {
      e.preventDefault();
      jumpIntroToEnd();
    }
  }

  function onTouchStart(e) {
    if (!e.touches || !e.touches.length) return;
    touchStartY = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    if (introFinalizada) return;
    if (!e.touches || !e.touches.length) return;

    const currentY = e.touches[0].clientY;
    const diff = touchStartY - currentY;

    // diff > 0 = gesto de subir dedo (tentando descer a página)
    if (diff > 8) {
      e.preventDefault();
      jumpIntroToEnd();
    }
  }

  function removeSkipListeners() {
    window.removeEventListener("wheel", onWheelSkip, { passive: false });
    window.removeEventListener("keydown", onKeySkip);
    window.removeEventListener("touchstart", onTouchStart, { passive: true });
    window.removeEventListener("touchmove", onTouchMove, { passive: false });
  }

  // adiciona listeners enquanto intro está travada
  window.addEventListener("wheel", onWheelSkip, { passive: false });
  window.addEventListener("keydown", onKeySkip);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });

  /* =========================
     SLIDESHOW POR TEMPO
  ========================== */
  const slideshowInterval = setInterval(() => {
    if (introFinalizada) {
      clearInterval(slideshowInterval);
      return;
    }

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
