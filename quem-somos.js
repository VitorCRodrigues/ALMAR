document.addEventListener("DOMContentLoaded", function () {
  const tempoPorSlide = 2500; 
  const OVERLAP_PCT = 0.30;
  const BALL_DURATION = 1600;
  const BALL_START = { x: 18, y: 78 };
  const BALL_TARGET = { x: 50, y: 85 };

  const introScroll = document.getElementById("introScroll");
  const track = document.querySelector(".intro-track");
  const images = document.querySelectorAll(".intro-track img");
  const body = document.body;

  const introBall = document.getElementById("introBall");
  const pyramidAnchor = document.querySelector(".pyramid-ball-anchor");

  let index = 0;
  let animating = false;
  let introFinalizada = false;
  let touchStartY = 0;
  let ballSequenceStarted = false;

  const lastIndex = images.length - 1;

  function setOverlapFromIntro() {
    if (!introScroll) return;

    const rect = introScroll.getBoundingClientRect();
    const introH = rect.height;

    if (!introH || introH < 10) return;

    const overlapPx = Math.round(introH * OVERLAP_PCT);
    document.documentElement.style.setProperty("--pyramid-overlap-mobile", overlapPx + "px");
  }

  body.classList.add("lock-scroll");

  if (images.length > 0) images[0].classList.add("active");

  setOverlapFromIntro();
  setTimeout(setOverlapFromIntro, 80);
  setTimeout(setOverlapFromIntro, 200);

  function setBallToViewportPercent(px, py) {
    if (!introBall) return;

    const r = introBall.getBoundingClientRect();
    const x = (window.innerWidth * (px / 100)) - (r.width / 2);
    const y = (window.innerHeight * (py / 100)) - (r.height / 2);

    introBall.style.opacity = "1";
    introBall.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  }

  function setBallToViewportPercent(px, py) {
    if (!introBall) return;

    const r = introBall.getBoundingClientRect();
    const x = (window.innerWidth * (px / 100)) - (r.width / 2);
    const y = (window.innerHeight * (py / 100)) - (r.height / 2);

    introBall.style.opacity = "1";
    introBall.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  }

  function startBallSequence() {
    if (ballSequenceStarted || introFinalizada) return;
    ballSequenceStarted = true;

    // garante que a classe intro-last está aplicada (pra pirâmide já “subir” pelo overlap)
    body.classList.add("intro-last");
    setOverlapFromIntro();

    // mostra a bola em uma posição inicial (ajuste em BALL_START)
    if (introBall) {
      introBall.style.transition = "none";
      setBallToViewportPercent(BALL_START.x, BALL_START.y);

      introBall.getBoundingClientRect();

      introBall.style.transition =
        `transform ${BALL_DURATION}ms cubic-bezier(.22,1,.36,1), opacity 200ms ease`;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBallToViewportPercent(BALL_TARGET.x, BALL_TARGET.y);

        window.setTimeout(() => {
          unlockScroll();
          if (introBall) introBall.style.opacity = "0";
        }, BALL_DURATION + 60);
      });
    });
  }

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

    if (next) next.classList.add("active");

    if (newIndex === lastIndex) {
      body.classList.add("intro-last");
      setOverlapFromIntro();
      setTimeout(setOverlapFromIntro, 80);
    }

    setTimeout(() => {
      if (current) current.classList.remove("fading-out");
      index = newIndex;
      animating = false;
      setOverlapFromIntro();

      // NOVO: se chegou na mulher (último slide), para e roda a sequência da bola
      if (index === lastIndex && !introFinalizada) {
        clearInterval(slideshowInterval);
        startBallSequence();
      }
    }, 550);
  }

  function unlockScroll() {
    if (introFinalizada) return;
    introFinalizada = true;

    body.classList.remove("lock-scroll");
    body.classList.add("intro-last");
    body.classList.add("intro-done");

    if (track) {
      track.style.position = "absolute";
      track.style.top = "0";
      track.style.left = "0";
      track.style.width = "100%";
      track.style.height = "100%";
    }

    setOverlapFromIntro();
    setTimeout(setOverlapFromIntro, 80);

    removeSkipListeners();
  }

  function jumpIntroToEnd() {
    if (introFinalizada) return;

    clearInterval(slideshowInterval);
    animating = false;

    images.forEach(function (img) {
      img.classList.remove("active");
      img.classList.remove("fading-out");
    });

    if (images.length > 0) {
      images[lastIndex].classList.add("active");
      index = lastIndex;
    }

    unlockScroll();
  }

  function onWheelSkip(e) {
    if (introFinalizada) return;
    if (e.deltaY > 0) {
      e.preventDefault();
      jumpIntroToEnd();
    }
  }

  function onKeySkip(e) {
    if (introFinalizada) return;
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

  window.addEventListener("wheel", onWheelSkip, { passive: false });
  window.addEventListener("keydown", onKeySkip);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });

  const slideshowInterval = setInterval(() => {
    if (introFinalizada) {
      clearInterval(slideshowInterval);
      return;
    }

    if (index < lastIndex) {
      changeImage(index + 1);
    } else {
      // Antes você liberava aqui; agora quem libera é a sequência da bola
      clearInterval(slideshowInterval);
      startBallSequence();
    }
  }, tempoPorSlide);

  window.addEventListener("resize", function () {
    setOverlapFromIntro();
  });

  window.addEventListener("orientationchange", function () {
    setTimeout(setOverlapFromIntro, 120);
  });
});