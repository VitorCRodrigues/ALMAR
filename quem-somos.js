document.addEventListener('DOMContentLoaded', function () {
  const intro = document.getElementById('intro');
  const video = document.getElementById('introVideo');
  const fullpageWrapper = document.getElementById('fullpage');

  let scrollTimeout = null;
  const baseSpeed = 1;
  const maxSpeed = 24;

  function showSite() {
    if (!intro || intro.classList.contains('intro-hide')) return;

    intro.classList.add('intro-hide');
    video.playbackRate = baseSpeed;

    setTimeout(() => {
      intro.style.display = 'none';
      fullpageWrapper.style.display = 'block';
      window.removeEventListener('wheel', handleWheel);
    }, 700);
  }

  function handleWheel(e) {
    if (!video || intro.classList.contains('intro-hide')) return;

    if (e.deltaY > 0) {
      video.playbackRate = Math.min(
        video.playbackRate + 0.35,
        maxSpeed
      );
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      video.playbackRate = baseSpeed;
    }, 180);
  }

  if (video) {
    video.addEventListener('contextmenu', e => e.preventDefault());
    video.addEventListener('ended', showSite);

    video.play().catch(() => {
      setTimeout(showSite, 3000);
    });

    window.addEventListener('wheel', handleWheel, { passive: true });
  }
});
