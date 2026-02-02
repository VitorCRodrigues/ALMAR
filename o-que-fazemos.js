document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     EXPANSÃO DOS CARDS
  ==========================*/
  const gridContainer = document.querySelector('.servicos-grid');
  const cards = document.querySelectorAll('.servico-card');

  cards.forEach(card => {
    const plusBtn = card.querySelector('.plus-btn');
    const closeBtn = card.querySelector('.close-btn');

    if (plusBtn) {
      plusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        gridContainer.classList.add('expanding-mode');
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        gridContainer.classList.remove('expanding-mode');
        card.classList.remove('active');
      });
    }
  });


  /* =========================
     SLIDER INTRO
  ==========================*/
  const track = document.querySelector(".intro-track");
  const images = document.querySelectorAll(".intro-track img");
  const body = document.body;

  if (!track || images.length === 0) return;

  let index = 0;
  let unlocked = false;
  let animating = false;
  const lastIndex = images.length - 1;

  let startY = 0;
  let deltaY = 0;

  body.classList.add("lock-scroll");
  images[0].classList.add("active");

  function changeImage(newIndex) {
    if (animating || newIndex === index) return;
    animating = true;

    const current = images[index];
    const next = images[newIndex];

    current.classList.remove("active");
    current.classList.add("fading-out");
    next.classList.add("active");

    setTimeout(() => {
      current.classList.remove("fading-out");
      index = newIndex;
      animating = false;
    }, 500);
  }

  function unlockScroll() {
    unlocked = true;
    body.classList.remove("lock-scroll");
    track.style.position = "absolute";
    track.style.top = "0";
  }

  function handleScroll(direction) {
    if (unlocked) return;

    if (direction === "down" && index < lastIndex) {
      changeImage(index + 1);
    } else if (direction === "up" && index > 0) {
      changeImage(index - 1);
    }

    if (index === lastIndex) {
      setTimeout(unlockScroll, 1300);
    }
  }

  window.addEventListener("wheel", function (e) {
    if (animating || unlocked) return;
    e.preventDefault();
    handleScroll(e.deltaY > 0 ? "down" : "up");
  }, { passive: false });

  window.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  window.addEventListener("touchmove", (e) => {
    if (unlocked || animating) return;
    deltaY = startY - e.touches[0].clientY;

    if (Math.abs(deltaY) > 40) {
      handleScroll(deltaY > 0 ? "down" : "up");
      startY = e.touches[0].clientY;
    }
  });

});
