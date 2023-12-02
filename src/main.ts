import Experience from "./experience/experience";
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement | null;
if (canvas) {
  const experience = new Experience(canvas);
  console.log(experience);
}
