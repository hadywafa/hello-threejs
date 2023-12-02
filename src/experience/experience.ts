import * as THREE from "three";
import Debug from "./utils/debug";
import Resources from "./utils/resources";
import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Camera from "./camera";
import World from "./world/world";
import Renderer from "./renderer";

let instance: Experience | null = null;

export default class Experience {
  public canvas!: HTMLCanvasElement;
  public debug!: Debug;
  public sizes!: Sizes;
  public time!: Time;
  public scene!: THREE.Scene;
  public resources!: Resources;
  public camera!: Camera;
  public renderer!: Renderer;
  public world!: World;

  constructor(_canvas?: HTMLCanvasElement, sources?: any /* Adjust the type based on your sources property */) {
    // Singleton
    if (instance) {
      return instance;
    }
    if (!_canvas) throw new Error("canvas not found");
    instance = this;
    if (typeof window !== "undefined") {
      (window as any).experience = this;
    }
    // Options
    this.canvas = _canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  private resize(): void {
    this.camera.resize();
    this.renderer.resize();
  }

  private update(): void {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  public destroy(): void {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui?.destroy();
  }
}
