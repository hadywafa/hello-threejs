import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EventEmitter } from "events"; 

export default class Resources extends EventEmitter {
  private sources: any[]; // Adjust the type based on the actual type of your sources property
  private items: { [key: string]: any } = {};
  private toLoad: number;
  private loaded: number;
  private loaders!: {
    gltfLoader: GLTFLoader;
    textureLoader: THREE.TextureLoader;
    cubeTextureLoader: THREE.CubeTextureLoader;
  };

  constructor(sources: any /* Adjust the type based on your sources property */) {
    super();

    this.sources = sources;
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  private setLoaders(): void {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };
  }

  private startLoading(): void {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  private sourceLoaded(source: any, file: any): void {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.emit("ready");
    }
  }
}
