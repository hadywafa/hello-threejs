import * as THREE from "three";
const scene = new THREE.Scene();
const size = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, size.width / size.width);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl")!,
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.render(scene, camera);

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
// }
// animate();
