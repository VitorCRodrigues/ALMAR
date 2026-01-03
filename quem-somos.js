document.addEventListener('DOMContentLoaded', function () {
  const intro = document.getElementById('intro');
  const video = document.getElementById('introVideo');
  const fullpageWrapper = document.getElementById('fullpage');

  // === PLAYLIST DE VÍDEOS DA INTRO ===
  const videoPlaylist = [
    'videos/valores e visão .mp4', // primeiro vídeo
    'videos/farol.mp4'  // segundo vídeo
  ];
  let currentVideoIndex = 0;

  // função que carrega e toca o vídeo atual
  function playCurrentVideo() {
    if (!video) return;

    const src = videoPlaylist[currentVideoIndex];
    video.src = src;
    video.load();
    video.play().catch(() => {
      // se o navegador barrar autoplay, mostra o site mesmo assim depois de 3s
      setTimeout(showSite, 3000);
    });
  }

  // função que esconde o vídeo e mostra o site
  function showSite() {
    if (!intro || intro.classList.contains('intro-hide')) return;

    intro.classList.add('intro-hide');

    setTimeout(() => {
      intro.style.display = 'none';
      fullpageWrapper.style.display = 'block';

      // inicializa o fullPage.js só depois da intro
      new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: false,
        navigation: false,
        scrollingSpeed: 900,
        easingcss3: 'ease-in-out',
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
      });
    }, 700); // mesmo tempo do transition do CSS
  }

  if (video) {
    // Quando um vídeo termina:
    video.addEventListener('ended', function () {
      // Se ainda tem vídeo na playlist, toca o próximo
      if (currentVideoIndex < videoPlaylist.length - 1) {
        currentVideoIndex += 1;
        playCurrentVideo(); // troca o src e dá play
      } else {
        // Se já foi o último, mostra o site
        showSite();
      }
    });

    // fallback se der erro em qualquer vídeo
    video.addEventListener('error', function () {
      setTimeout(showSite, 3000);
    });

    // opcional: clicar para pular intro
    intro.addEventListener('click', showSite);

    // começa tocando o primeiro vídeo
    playCurrentVideo();
  }
});
