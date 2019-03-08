import Pen from "./pen";
import Eraser from "./eraser";

class DrawingApp {
  constructor(canvas) {
    this.canvas = canvas;
    this.pen = new Pen();
    this.eraser = new Eraser();
    this.mouseIsDown = false;

    const ctx = canvas.getContext("2d");
    this._instantiateListeners(ctx);
  }

  _instantiateListeners(ctx) {
    this.canvas.addEventListener("mousedown", e => {
      this.mouseIsDown = true;
      if (this.eraser.active) {
        this.eraser.executeErase(e, ctx);
      } else {
        this.pen.beginDraw(e, ctx);
      }
    });

    this.canvas.addEventListener("mousemove", e => {
      if (this.eraser.active) {
        this.eraser.generateEraser(e);
      }
      if (this.mouseIsDown) {
        this.eraser.active
          ? this.eraser.executeErase(e, ctx)
          : this.pen.executeDraw(e, ctx);
      }
    });

    document.addEventListener("mouseup", () => {
      this.mouseIsDown = false;
    });
  }
}

export default DrawingApp;
