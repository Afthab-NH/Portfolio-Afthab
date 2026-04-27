// SAFE CANVAS SELECTION
const orbCanvas = document.getElementById("orb-canvas");

if (!orbCanvas) {
  console.error("Orb canvas not found");
}

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Move camera slightly back
camera.position.z = 2.5;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: orbCanvas,
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// SPHERE (MAKE IT MORE VISIBLE)
const geometry = new THREE.SphereGeometry(1.1, 64, 64);
camera.position.z = 3;

const material = new THREE.MeshStandardMaterial({
  color: 0xff5a1f,
  emissive: 0xff5a1f,
  emissiveIntensity: 0.4,
  metalness: 0.6,
  roughness: 0.25
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// LIGHTING (STRONGER + BETTER PLACED)
const light1 = new THREE.PointLight(0xff5a1f, 2);
light1.position.set(3, 3, 3);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 1);
light2.position.set(-3, -2, 2);
scene.add(light2);

// MOUSE INTERACTION
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
});

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  // BASE ROTATION (steady)
  sphere.rotation.y += 0.002;
  sphere.rotation.x += 0.001;

  // SMOOTH INTERACTION (corrected)
  sphere.rotation.y += (mouseX * 0.3 - sphere.rotation.y) * 0.02;
  sphere.rotation.x += (mouseY * 0.3 - sphere.rotation.x) * 0.02;

  renderer.render(scene, camera);
}

animate();

// RESIZE FIX
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});