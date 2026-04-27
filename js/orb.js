const canvas = document.getElementById("orb-canvas");

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// SPHERE
const geometry = new THREE.SphereGeometry(1, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: 0xff5a1f,
  emissive: 0xff5a1f,
  emissiveIntensity: 0.35,
  metalness: 0.5,
  roughness: 0.25
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// LIGHTING
const light1 = new THREE.PointLight(0xff5a1f, 1.5);
light1.position.set(2, 2, 3);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 0.6);
light2.position.set(-2, -2, 2);
scene.add(light2);

// MOUSE INTERACTION
let targetX = 0;
let targetY = 0;

document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
  targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
});

// ANIMATION
function animate() {
  requestAnimationFrame(animate);

  // SMOOTH ROTATION
  sphere.rotation.y += 0.002;
  sphere.rotation.x += 0.001;

  // INTERACTIVE TILT (SMOOTHED)
  sphere.rotation.y += (targetX - sphere.rotation.y) * 0.02;
  sphere.rotation.x += (targetY - sphere.rotation.x) * 0.02;

  renderer.render(scene, camera);
}

animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});