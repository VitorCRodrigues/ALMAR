document.addEventListener('DOMContentLoaded', function () {
  const intro = document.getElementById('intro');
  const video = document.getElementById('introVideo');
  const fullpageWrapper = document.getElementById('fullpage');

  function showSite() {
    if (!intro || intro.classList.contains('intro-hide')) return;

    intro.classList.add('intro-hide');

    setTimeout(() => {
      intro.style.display = 'none';
      fullpageWrapper.style.display = 'block';

      new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: false,
        navigation: false,
        scrollingSpeed: 900,
        easingcss3: 'ease-in-out',
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
      });
    }, 700);
  }

  if (video) {
    // impede menu / interação
    video.addEventListener('contextmenu', e => e.preventDefault());

    // quando o vídeo único termina → entra no site
    video.addEventListener('ended', showSite);

    // fallback se autoplay falhar
    video.play().catch(() => {
      setTimeout(showSite, 3000);
    });
  }
});
