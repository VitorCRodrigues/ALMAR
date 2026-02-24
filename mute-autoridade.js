document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");

  const toast = document.getElementById("audio-toast");
  const txt = document.getElementById("audio-toast-text");
  const btn = document.getElementById("audio-toast-btn");
  const close = document.getElementById("audio-toast-close");

  if (!audio || !toast || !txt || !btn || !close) return;

  let dismissed = false;

  audio.volume = 0.35;

  function isSoundOn() {
    return !audio.paused && !audio.muted && (audio.volume ?? 1) > 0;
  }

  function setUI(forceShow = true) {
    if (dismissed) return;

    const on = isSoundOn();

    txt.textContent = on
      ? "Som ligado — toque para mutar"
      : "Som desligado — toque para ativar";

    btn.textContent = on ? "Mutar" : "Ativar som";

    if (forceShow) toast.hidden = false;
  }

  async function tryPlay() {
    try {
      await audio.play();
      setUI(true);
      return true;
    } catch (e) {
      setUI(true);
      return false;
    }
  }

  audio.muted = false; 
  toast.hidden = false;
  setUI(true);
  tryPlay();

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSoundOn()) {
      audio.muted = true;
    } else {
      audio.muted = false;
      if (audio.volume === 0) audio.volume = 0.35;
      await tryPlay();
    }

    setUI(true);
  });

  close.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dismissed = true;
    toast.hidden = true;
  });

  document.addEventListener("pointerdown", () => {
    if (!dismissed && !isSoundOn()) tryPlay();
  }, { once: true });

  audio.addEventListener("volumechange", () => setUI(false));
  audio.addEventListener("play", () => setUI(false));
  audio.addEventListener("pause", () => setUI(false));
});