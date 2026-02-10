(function () {
  const video = document.querySelector("video");
  if (!video) return;

  const toast = document.getElementById("audio-toast");
  const txt = document.getElementById("audio-toast-text");
  const btn = document.getElementById("audio-toast-btn");
  const close = document.getElementById("audio-toast-close");

  let dismissed = false;

  function updateToast() {
    if (dismissed) return;

    if (!video.muted && video.volume > 0) {
      txt.textContent = "Som ligado — toque para mutar";
      btn.textContent = "Mutar";
      toast.hidden = false;
      return;
    }

    txt.textContent = "Som desligado — toque para ativar";
    btn.textContent = "Ativar som";
    toast.hidden = false;
  }

  btn.addEventListener("click", () => {
    video.muted = !video.muted;

    if (!video.muted && video.volume === 0) video.volume = 1;

    updateToast();
  });

  close.addEventListener("click", () => {
    dismissed = true;
    toast.hidden = true;
  });
  video.addEventListener("volumechange", updateToast);

  toast.hidden = false;
  updateToast();
})();
