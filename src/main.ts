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
renderer.setSize(size.width, size.height);
const controls = new OrbitControls(camera, canvas);
controls.update();
//---------------------------------------------------------------------------

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
scene.add(box1);
function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}
animate();
