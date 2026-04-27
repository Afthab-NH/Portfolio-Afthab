const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("button, li").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
  });
});