(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const targets = document.querySelectorAll(`
    .alma-section,
    .alma-dark-section,
    .alma-value,
    .alma-partner,
    .alma-gallery-inner
  `);

  if (!targets.length) return;

  targets.forEach(el => el.classList.add("reveal-up"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px"
  });

  targets.forEach(el => io.observe(el));
})();
