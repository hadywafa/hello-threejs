import * as dat from "lil-gui";

export default class Debug {
  public active: boolean;
  public ui: dat.GUI | null;

  constructor() {
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new dat.GUI();
    } else {
      this.ui = null;
    }
  }
}
