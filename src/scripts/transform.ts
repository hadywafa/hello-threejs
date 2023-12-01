import * as THREE from "three";

export const shapes: THREE.Group = new THREE.Group();

const c1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
c1.userData.id = 'c1';
const c2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "red" }));
c2.userData.id = 'c2';
// c1.position.x = -1;
// c2.position.x = 1;
// c1.rotation.y = 45;
// c2.rotation.x = 45,

c1.position.set(-1, 0, 0);
c1.rotateX(45);
c1.scale.y = -0.5;
shapes.add(c1);

c2.position.set(1, 0, 0);
c2.rotateX(90);
c2.scale.x = 1.5;
shapes.add(c2);
