import * as THREE from "three";
import gsap from "gsap";
import { shapes } from "./transform";
const cube1 = shapes.children?.find((child) => child.userData.id === "c1");

//=============== using code ==============
// const animate = () => {
//   if (cube1) {
//     cube1.rotation.x += 0.01;
//   }
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(animate);
// };
// animate();
//=============== using gsap ==============
if (cube1) gsap.to(cube1.rotation, { duration: 1, delay: 1, x: 0.1 });
export const animate = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(() => {
    animate(renderer, scene, camera);
  });
};
