(() => {
  const wrap = document.getElementById("almaHeroMedia");
  if (!wrap) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const list = (wrap.dataset.images || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  if (list.length < 2) return;

  const imgs = Array.from(wrap.querySelectorAll("img.alma-hero-img"));
  if (imgs.length < 2) return;

  list.forEach(src => { const i = new Image(); i.src = src; });

  let index = 0;
  let active = 0;

  imgs[0].src = list[0];
  imgs[0].classList.add("is-active");
  imgs[1].classList.remove("is-active");

  const intervalMs = 6000;

  function swapTo(nextSrc){
    const next = active === 0 ? 1 : 0;

    imgs[next].src = nextSrc;

    imgs[next].getBoundingClientRect();

    imgs[next].classList.add("is-active");
    imgs[active].classList.remove("is-active");

    active = next;
  }

  if (prefersReduced){
    setInterval(() => {
      index = (index + 1) % list.length;
      imgs[active].src = list[index];
    }, intervalMs);
    return;
  }

  setInterval(() => {
    index = (index + 1) % list.length;
    swapTo(list[index]);
  }, intervalMs);
})();
