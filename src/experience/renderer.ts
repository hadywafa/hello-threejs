import * as THREE from "three"; // Import the necessary parts from the 'three' library
import Experience from "./experience"; // Update the import path based on your project structure

export default class Renderer {
  private experience: Experience;
  private canvas: HTMLCanvasElement;
  private sizes: any; // Adjust the type based on the actual type of your sizes property
  private scene: THREE.Scene;
  private camera: Experience["camera"]; // Adjust the type based on the actual type of your camera property
  public instance!: THREE.WebGLRenderer;

  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  private setInstance(): void {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    // this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  public resize(): void {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  public update(): void {
    this.instance.render(this.scene, this.camera.instance);
  }
}
