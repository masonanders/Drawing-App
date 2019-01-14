import Pen from "./pen";
import Eraser from "./eraser";

class DrawingApp {
  constructor(ctx) {
    this.mouseIsDown = false;
    this.pen = new Pen();
    this.eraser = new Eraser();
    this._instantiateListeners(ctx);
  }

  _instantiateListeners(ctx) {
    document.addEventListener("mousedown", e => {
      this.mouseIsDown = true;
      this.pen.beginDraw(e, ctx);
    });

    document.addEventListener("mousemove", e => {
      if (this.mouseIsDown) this.pen.executeDraw(e, ctx);
    });

    document.addEventListener("mouseup", () => {
      this.pen.mouseIsDown = false;
    });
  }
}

export default DrawingApp;
