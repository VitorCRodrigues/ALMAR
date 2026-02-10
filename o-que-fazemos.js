document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     EXPANSÃO DOS CARDS
  ========================== */
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
     SLIDER AUTOMÁTICO (TEMPO)
  ========================== */
  const track = document.querySelector('.intro-track');
  const images = document.querySelectorAll('.intro-track img');
  const body = document.body;

  if (!track || images.length === 0) return;

  let index = 0;
  const lastIndex = images.length - 1;
  const intervalTime = 1750; // tempo entre slides (ms)
  const fadeTime = 1400;     // deve bater com o CSS

  body.classList.add('lock-scroll');
  images[0].classList.add('active');

  function changeImage(newIndex) {
    const current = images[index];
    const next = images[newIndex];

    current.classList.remove('active');
    current.classList.add('fading-out');
    next.classList.add('active');

    setTimeout(() => {
      current.classList.remove('fading-out');
      index = newIndex;
    }, fadeTime);
  }

  const sliderInterval = setInterval(() => {

    if (index < lastIndex) {
      changeImage(index + 1);
    } else {
      clearInterval(sliderInterval);
      unlockScroll();
    }

  }, intervalTime);

  function unlockScroll() {
    body.classList.remove('lock-scroll');
    track.style.position = 'relative';
  }

});
