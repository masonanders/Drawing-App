class Eraser {
  constructor() {
    this.active = false;
    this.size = 50;
    this.eraserButton = document.getElementById("eraser");
    window.eraser = this.eraserButton;

    this._instantiateListener();
  }

  generateEraser(event) {
    console.log("need to generate eraser");
  }

  executeErase(event, ctx) {
    const { size } = this;
    const x = event.offsetX - Math.floor(size / 2);
    const y = event.offsetY - Math.floor(size / 2);
    ctx.clearRect(x, y, size, size);
  }

  toggle() {
    this.active = !this.active;
  }

  _instantiateListener() {
    this.eraserButton.onclick = () => {
      this.toggle();
    };
  }
}

export default Eraser;
