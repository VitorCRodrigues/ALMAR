// Auto-scroll 
let autoTimer = null;

function startAutoCarousel() {
  stopAutoCarousel();

  autoTimer = setInterval(() => {
    moveCarousel(1);
  }, 2200); 
}

function stopAutoCarousel() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = null;
}

window.addEventListener("load", startAutoCarousel);

const carouselSection = document.querySelector(".carousel-section");

if (carouselSection) {
  carouselSection.addEventListener("mouseenter", stopAutoCarousel);
  carouselSection.addEventListener("mouseleave", startAutoCarousel);

  carouselSection.addEventListener("touchstart", stopAutoCarousel, { passive: true });
  carouselSection.addEventListener("touchend", startAutoCarousel, { passive: true });
}

document.querySelector(".carousel-btn-prev")?.addEventListener("click", () => {
  stopAutoCarousel();
  setTimeout(startAutoCarousel, 2500);
});

document.querySelector(".carousel-btn-next")?.addEventListener("click", () => {
  stopAutoCarousel();
  setTimeout(startAutoCarousel, 2500);
});
