import { saveDrawing, loadDrawing } from "./utilities/save-load";
import DrawingApp from "./classes/drawing-app";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  window.canvas = canvas;
  const width = 600;
  const height = 600;
  resizeCanvas(canvas, width, height);
  const ctx = canvas.getContext("2d");

  window.ctx = ctx;
  window.saveDrawing = saveDrawing;
  window.loadDrawing = loadDrawing;

  new DrawingApp(canvas, ctx);
});

function resizeCanvas(canvasEl, width, height) {
  canvasEl.style.width = width;
  canvasEl.style.height = height;
  canvasEl.width = width;
  canvasEl.height = height;
}
