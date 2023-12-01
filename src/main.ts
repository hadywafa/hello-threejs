import * as THREE from "three";
// import { animate } from "./scripts/animate";
import { box1, shapes } from "./scripts/transform";
import { axisHelper } from "./scripts/axisHelper";
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
scene.add(box1);
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
