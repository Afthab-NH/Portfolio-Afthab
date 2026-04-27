gsap.registerPlugin(ScrollTrigger);

// HERO TEXT
gsap.from(".hero-content h1", {
  y: 100,
  opacity: 0,
  duration: 1.2
});

// HERO GLOW PARALLAX
gsap.to(".hero-glow", {
  scale: 1.5,
  scrollTrigger: {
    trigger: ".hero",
    scrub: true
  }
});

// SECTION REVEALS
gsap.utils.toArray(".section h2").forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 80,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 80%"
    }
  });
});

// NAV CLICK (Lenis compatible)
document.querySelectorAll(".side-nav li").forEach(item => {
  item.addEventListener("click", () => {
    const target = document.getElementById(item.dataset.section);

    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });
  });
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".side-nav li");
const progressBar = document.querySelector(".nav-progress");

// ACTIVE LINK
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(li => {
    li.classList.remove("active");
    if (li.dataset.section === current) {
      li.classList.add("active");
    }
  });

  // PROGRESS BAR
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollProgress = (window.scrollY / scrollHeight) * 100;

  progressBar.style.height = scrollProgress + "%";
});

// TEXT REVEAL
gsap.from(".reveal-text span", {
  y: 120,
  opacity: 0,
  stagger: 0.15,
  duration: 1.2,
  ease: "power4.out"
});

// SUBTITLE
gsap.from(".hero-subtitle", {
  y: 40,
  opacity: 0,
  delay: 0.6,
  duration: 1
});

const button = document.querySelector(".cta");

document.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect();

  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
});

button.addEventListener("mouseleave", () => {
  button.style.transform = "translate(0,0)";
});

// PARTCILES

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 40; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.fillStyle = "rgba(255,90,31,0.3)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.y -= 0.2;
    if (p.y < 0) p.y = canvas.height;
  });

  requestAnimationFrame(draw);
}

draw();