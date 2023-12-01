import * as THREE from "three";
import { animate } from "./scripts/animate";
import { shapes } from "./scripts/transform";
import { axisHelper } from "./scripts/axisHelper";
const size = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, size.width / size.width);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl")!,
});
camera.position.z = 3;
scene.add(shapes);
scene.add(axisHelper);
camera.lookAt(shapes.position);
// renderer.render(scene, camera);
animate(renderer,scene,camera);
