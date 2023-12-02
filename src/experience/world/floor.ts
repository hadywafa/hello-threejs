import * as THREE from "three"; // Import the necessary parts from the 'three' library
import Experience from "../experience";

export default class Floor {
  private experience: Experience;
  public scene: THREE.Scene;
  public resources: any; // Adjust the type based on the actual type of your resources property
  private geometry!: THREE.CircleGeometry;
  private textures!: {
    color: THREE.Texture;
    normal: THREE.Texture;
  };
  private material!: THREE.MeshStandardMaterial;
  public mesh!: THREE.Mesh;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  private setGeometry(): void {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  private setTextures(): void {
    this.textures = {
      color: this.resources.items.grassColorTexture,
      normal: this.resources.items.grassNormalTexture,
    };

    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  private setMaterial(): void {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }

  private setMesh(): void {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
