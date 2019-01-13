import { saveDrawing, loadDrawing } from "./utilities/save-load";
import DrawingApp from "./classes/drawing-app";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  console.assert(resizeCanvas(canvas), "Could not resize canvas element!");
  const ctx = canvas.getContext("2d");

  window.ctx = ctx;
  window.saveDrawing = saveDrawing;
  window.loadDrawing = loadDrawing;

  new DrawingApp(ctx);
});

function resizeCanvas(canvasEl) {
  const root = document.getElementById("root");
  try {
    canvasEl.width = root.clientWidth;
    canvasEl.height = root.clientHeight;
    return true;
  } catch {
    return false;
  }
}
