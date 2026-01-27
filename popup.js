(function () {
  const overlay = document.getElementById('popup-overlay');
  const closeBtn = document.getElementById('popup-close');

  if (!overlay) return;

  function openPopup() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const url = new URL(window.location.href);
    url.searchParams.delete('enviado');
    window.history.replaceState({}, '', url.toString());
  }

  closeBtn?.addEventListener('click', closePopup);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePopup();
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('enviado') === '1') openPopup();
})();
