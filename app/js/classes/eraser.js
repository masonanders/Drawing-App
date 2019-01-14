class Eraser {
  constructor() {
    this.active = false;
    this.size = 50;
  }

  generateEraser(e) {
    console.log("need to generate eraser");
  }

  executeErase(e, ctx) {
    const { size } = this;
    const x = e.clientX - Math.floor(size / 2);
    const y = e.clientY - Math.floor(size / 2);
    ctx.clearRect(x, y, size, size);
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}

export default Eraser;
