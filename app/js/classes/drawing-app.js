import Pen from "./pen";
import Eraser from "./eraser";

class DrawingApp {
  constructor(canvas) {
    this.canvas = canvas;
    this.pen = new Pen();
    this.eraser = new Eraser();
    this.mouseIsDown = false;
    this.eraserOn = false;
    this.eraserButton = document.getElementById("eraser");

    const ctx = canvas.getContext("2d");
    this._instantiateListeners(ctx);
    this._instantiateEraser();
  }

  _instantiateListeners(ctx) {
    this.canvas.addEventListener("mousedown", e => {
      this.mouseIsDown = true;
      if (this.eraserOn) {
        this.eraser.activate();
        this.eraser.executeErase(e, ctx);
      } else {
        this.pen.beginDraw(e, ctx);
      }
    });

    this.canvas.addEventListener("mousemove", e => {
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

  _instantiateEraser() {
    this.eraserButton.onclick = () => (this.eraserOn = !this.eraserOn);
  }
}

export default DrawingApp;
