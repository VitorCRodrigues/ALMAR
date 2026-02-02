document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".intro-track");
  const images = document.querySelectorAll(".intro-track img");
  const body = document.body;

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

  // DESKTOP
  window.addEventListener("wheel", function (e) {
    if (animating || unlocked) return;
    e.preventDefault();
    handleScroll(e.deltaY > 0 ? "down" : "up");
  }, { passive: false });

  // MOBILE TOUCH
  window.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (unlocked || animating) return;
    deltaY = startY - e.touches[0].clientY;

    if (Math.abs(deltaY) > 40) { // sensibilidade do gesto
      handleScroll(deltaY > 0 ? "down" : "up");
      startY = e.touches[0].clientY;
    }
  }, { passive: true });


document.addEventListener("scroll", function () {
  const section = document.querySelector(".methodus");
  const layers = document.querySelectorAll(".pyramid-layer");
  const footer = document.querySelector(".methodus-footer");

  if (!section) return;

  const rect = section.getBoundingClientRect();
  const windowH = window.innerHeight;

  let progress = 1 - (rect.top / windowH);
  
  progress = Math.max(0, Math.min(progress, 1));
  let revealVal = 1 - ((progress - 0.2) * 2.5); 
  revealVal = Math.max(0, Math.min(revealVal, 1));

  section.style.setProperty('--reveal-opacity', revealVal);

  layers.forEach((el, i) => {
    const delay = i * 0.12;
    const localProgress = Math.max(0, Math.min((progress - delay) * 1.5, 1));

    el.style.transform = `translateY(${80 - (80 * localProgress)}px)`;
  });

  const footerProgress = Math.max(0, Math.min((progress - 0.75) * 2, 1));
  footer.style.transform = `translateY(${40 - (40 * footerProgress)}px)`;

});
});
