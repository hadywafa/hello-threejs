import Experience from "./experience/experience";
import sources from "./experience/sources";
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement | null;
if (canvas) {
  const experience = new Experience(canvas,sources);
}
