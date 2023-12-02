import * as THREE from "three";

export const shapes: THREE.Group = new THREE.Group();

export const box1 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 'blue' }));
const box2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
box2.userData.id = "c1";
const box3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "red" }));
box3.userData.id = "c2";
// c1.position.x = -1;
// c2.position.x = 1;
// c1.rotation.y = 45;
// c2.rotation.x = 45,

box2.position.set(-1, 0, 0);
box2.rotateX(45);
box2.scale.y = -0.5;
shapes.add(box2);

box3.position.set(1, 0, 0);
box3.rotateX(90);
box3.scale.x = 1.5;
shapes.add(box3);
