document.addEventListener("DOMContentLoaded", () => {
  const tabs = [...document.querySelectorAll(".events-tab")];
  const wrapper = document.querySelector(".events-details");
  const panels = [...document.querySelectorAll(".events-detail")];

  if (!tabs.length || !wrapper || !panels.length) return;

  function closeAll() {
    wrapper.classList.remove("is-open");
    panels.forEach(p => p.classList.remove("is-open"));
    tabs.forEach(t => t.classList.remove("is-active"));
  }

  function openById(id, tab) {
    const panel = document.getElementById(id);
    if (!panel) return;

    wrapper.classList.add("is-open");
    panels.forEach(p => p.classList.toggle("is-open", p === panel));
    tabs.forEach(t => t.classList.toggle("is-active", t === tab));
  }

  tabs.forEach(tab => {
    tab.addEventListener("mouseenter", () => openById(tab.dataset.target, tab));
  });

  wrapper.addEventListener("mouseleave", closeAll);
});
