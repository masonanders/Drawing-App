import Pen from "./pen";

class DrawingApp {
  constructor(ctx) {
    this.mouseIsDown = false;
    this.pen = new Pen();
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
