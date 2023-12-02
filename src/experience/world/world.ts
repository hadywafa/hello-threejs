import Experience from "../experience";
import * as THREE from "three";
import Floor from "./floor";
import Fox from "./fox";
import Environment from "./environment";
export default class World {
  private experience: Experience;
  public scene: THREE.Scene;
  public resources: any; // Adjust the type based on the actual type of your resources property
  private floor: Floor | null = null; // Adjust the type based on the actual type of your Floor class
  private fox: Fox | null = null; // Adjust the type based on the actual type of your Fox class
  private environment: Environment | null = null; // Adjust the type based on the actual type of your Environment class

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }

  update(): void {
    if (this.fox) {
      this.fox.update();
    }
  }
}
