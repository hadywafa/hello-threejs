import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//---------------------------------------------------------------------------
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = size.width / size.height;
//---------------------------------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color("gray");
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
//---------------------------------------------------------------------------
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();
//---------------------------------------------------------------------------
window.addEventListener("resize", () => {
  //update size
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  //update camera
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  //update renderer
  renderer.setSize(size.width, size.height);
});
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
//---------------------------------------------------------------------------
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
//---------------------------------------------------------------------------
const triangleGeometry = new THREE.BufferGeometry();
const trianglePositionsArray = new Float32Array([
  // vertex - 1
  0,
  0,
  0,
  //vertex-2
  0,
  1,
  0,
  //vertex-3
  1,
  0,
  0,
]);
const trianglePositionsAttribute = new THREE.BufferAttribute(trianglePositionsArray, 3);
triangleGeometry.setAttribute("position", trianglePositionsAttribute);

const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
scene.add(triangleMesh);

// const geometry = new THREE.BufferGeometry();
// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3);
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4;
// }
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionsAttribute);

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

//---------------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}
//---------------------------------------------------------------------------
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
animate();
