document.addEventListener("DOMContentLoaded", function () {
  /* =============================================================
     CONFIGURAÇÃO DE TEMPO
     ============================================================= */
  const tempoPorSlide = 2500; // 2500ms = 2.5 segundos por imagem

  /* =============================================================
     ELEMENTOS E VARIÁVEIS
     ============================================================= */
  const track = document.querySelector(".intro-track");
  const images = document.querySelectorAll(".intro-track img");
  const body = document.body;

  let index = 0;
  let animating = false;
  const lastIndex = images.length - 1;

  // Inicia com a página travada e a primeira imagem ativa
  body.classList.add("lock-scroll");
  if (images.length > 0) {
    images[0].classList.add("active");
  }

  /* =============================================================
     FUNÇÕES DA INTRODUÇÃO
     ============================================================= */

  function changeImage(newIndex) {
    if (animating || newIndex === index) return;
    animating = true;

    const current = images[index];
    const next = images[newIndex];

    // Efeito de transição
    current.classList.remove("active");
    current.classList.add("fading-out");
    next.classList.add("active");

    // Aguarda a transição CSS (0.5s) terminar para liberar a flag
    setTimeout(() => {
      current.classList.remove("fading-out");
      index = newIndex;
      animating = false;
    }, 500);
  }

  function unlockScroll() {
    // Destrava a página e solta o container da intro
    body.classList.remove("lock-scroll");
    track.style.position = "absolute";
    track.style.top = "0";
    
    // (Opcional) Se quiser esconder a intro depois que acaba:
    // track.style.display = 'none'; 
  }

  /* =============================================================
     LÓGICA AUTOMÁTICA (TIMER)
     ============================================================= */
  
  const slideshowInterval = setInterval(() => {
    // Se ainda não chegou na última imagem, avança
    if (index < lastIndex) {
      changeImage(index + 1);
    } 
    // Se chegou na última, para o timer e destrava o site
    else {
      clearInterval(slideshowInterval);
      unlockScroll();
    }
  }, tempoPorSlide);

});


/* =============================================================
   EFEITO DE SCROLL DA PIRÂMIDE (Mantido Original)
   ============================================================= */
document.addEventListener("scroll", function () {
  const section = document.querySelector(".methodus");
  // const layers = document.querySelectorAll(".pyramid-layer"); // Se não usar, pode remover
  // const footer = document.querySelector(".methodus-footer"); // Se não usar, pode remover

  if (!section) return;

  const rect = section.getBoundingClientRect();
  const windowH = window.innerHeight;

  // Calcula quanto da seção já passou pela tela
  let progress = 1 - (rect.top / windowH);
  
  // Limita entre 0 e 1
  progress = Math.max(0, Math.min(progress, 1));

  // Ajuste fino para começar a aparecer (reveal)
  let revealVal = 1 - ((progress - 0.2) * 2.5); 
  revealVal = Math.max(0, Math.min(revealVal, 1));

  // Aplica a opacidade na variável CSS
  section.style.setProperty('--reveal-opacity', revealVal);
});
