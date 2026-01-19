document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".topics-track");
  if (!track) return;

  track.innerHTML += track.innerHTML;

  const viewport = document.querySelector(".topics-viewport");
  if (!viewport) return;

  viewport.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
  viewport.addEventListener("mouseleave", () => track.style.animationPlayState = "running");
});
