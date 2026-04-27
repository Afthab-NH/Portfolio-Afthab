// CHECK IF LENIS LOADED
if (typeof Lenis === "undefined") {
  console.error("Lenis not loaded");
}

// INIT LENIS
const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  smoothTouch: false
});

// RAF LOOP
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// DEBUG
console.log("Lenis initialized");

// MAKE LENIS GLOBAL (IMPORTANT for nav)
window.lenis = lenis;