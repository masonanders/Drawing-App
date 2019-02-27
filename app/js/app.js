import { saveDrawing, loadDrawing } from "./utilities/save-load";
import DrawingApp from "./classes/drawing-app";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const width = 600;
  const height = 600;
  resizeCanvas(canvas, width, height);
  new DrawingApp(canvas);
});

function resizeCanvas(canvasEl, width, height) {
  canvasEl.style.width = width;
  canvasEl.style.height = height;
  canvasEl.width = width;
  canvasEl.height = height;
}
