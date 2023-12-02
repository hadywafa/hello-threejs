import * as THREE from "three";
import GUI from "lil-gui";
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
const gui = new GUI();
const box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: "red" }));
scene.add(box)
gui.add(gui.$title, "innerHTML").setValue("Hady Wafa").name("Title"); 
gui.add(box.position, "x", -50,50, 1);  
gui.add(box.position, "y", -50,50, 1);  
gui.add(box.position, "z", -50,50, 1);  
gui.add(box.rotation, "x", 0, 360, 1); 
gui.add(box.rotation, "y", 0, 360, 1); 
gui.add(box.rotation, "z", 0, 360, 1); 
gui.addColor(box.material, "color"); 
gui.add(box.material, "wireframe"); 
//-------------------
// const myObject = {
//   myBoolean: true,
//   myFunction: function () {},
//   myString: "lil-gui",
//   myNumber: 1,
// };

// gui.add(myObject, "myBoolean"); // Checkbox
// gui.add(myObject, "myFunction"); // Button
// gui.add(myObject, "myString"); // Text Field
// gui.add(myObject, "myNumber"); // Number Field

// // Add sliders to number fields by passing min and max
// gui.add(myObject, "myNumber", 0, 1);
// gui.add(myObject, "myNumber", 0, 100, 2); // snap to even numbers

// // Create dropdowns by passing an array or object of named values
// gui.add(myObject, "myNumber", [0, 1, 2]);
// gui.add(myObject, "myNumber", { Label1: 0, Label2: 1, Label3: 2 });

// // Chainable methods
// gui
//   .add(myObject, "myProperty")
//   .name("Custom Name")
//   .onChange((value: any) => {
//     console.log(value);
//   });

// // Create color pickers for multiple color formats
// const colorFormats = {
//   string: "#ffffff",
//   int: 0xffffff,
//   object: { r: 1, g: 1, b: 1 },
//   array: [1, 1, 1],
// };

// gui.addColor(colorFormats, "string");
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
