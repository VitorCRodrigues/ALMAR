document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".authority-card img[data-hover]");

  imgs.forEach((img) => {
    const original = img.getAttribute("src");
    const hover = img.getAttribute("data-hover");

    if (!hover) return;

    const pre = new Image();
    pre.src = hover;

    img.addEventListener("mouseenter", () => {
      img.setAttribute("src", hover);
    });

    img.addEventListener("mouseleave", () => {
      img.setAttribute("src", original);
    });

    img.addEventListener("blur", () => {
      img.setAttribute("src", original);
    });
  });
});