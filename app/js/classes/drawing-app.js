import Pen from "./pen";
import Eraser from "./eraser";

class DrawingApp {
  constructor(ctx) {
    this.mouseIsDown = false;
    this.pen = new Pen();
    this.eraser = new Eraser();
    this.eraserOn = false;
    this._instantiateListeners(ctx);
  }

  _instantiateListeners(ctx) {
    document.addEventListener("mousedown", e => {
      this.mouseIsDown = true;
      if (this.eraserOn) {
        this.eraser.activate();
        this.eraser.executeErase(e, ctx)
      } else {
        this.pen.beginDraw(e, ctx);
      }
    });

    document.addEventListener("mousemove", e => {
      if (this.eraserOn) {
        this.eraser.generateEraser(e);
      }
      if (this.mouseIsDown) {
        this.eraserOn
          ? this.eraser.executeErase(e, ctx)
          : this.pen.executeDraw(e, ctx);
        }
      });
      
    document.addEventListener("mouseup", () => {
      this.mouseIsDown = false;
      if (this.eraserOn) this.eraser.deactivate();
    });
  }
}

export default DrawingApp;
