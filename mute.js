document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("hero-video");
  const toast = document.getElementById("audio-toast");
  const txt = document.getElementById("audio-toast-text");
  const btn = document.getElementById("audio-toast-btn");
  const close = document.getElementById("audio-toast-close");

  if (!video || !toast || !txt || !btn || !close) return;

  let dismissed = false;

  function setUI() {
    if (dismissed) return;

    const isOn = !video.muted && (video.volume ?? 1) > 0;

    txt.textContent = isOn
      ? "Som ligado — toque para mutar"
      : "Som desligado — toque para ativar";

    btn.textContent = isOn ? "Mutar" : "Ativar som";

    toast.hidden = false;
  }

  async function tryPlay() {
    try {
      await video.play();
    } catch (e) {
    }
  }

  video.muted = true;
  if (video.volume === 0) video.volume = 1;
  tryPlay();
  toast.hidden = false;
  setUI();

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (video.muted) {
      video.muted = false;
      if (video.volume === 0) video.volume = 1;
      await tryPlay();
    } else {
      video.muted = true;
    }

    setUI();
  });

  close.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    dismissed = true;
    toast.hidden = true;
  });

  video.addEventListener("volumechange", setUI);
});
