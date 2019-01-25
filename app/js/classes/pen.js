class Pen {
  constructor() {
    this.colors = new Set(["red", "blue", "green"]);
    this.red = 50;
    this.blue = 50;
    this.green = 50;
  }

  beginDraw(event, ctx) {
    const { red, blue, green } = this;
    const { clientX, clientY } = event;
    ctx.strokeStyle = `rgb(${red},${blue},${green})`;
    ctx.beginPath();
    ctx.moveTo(clientX, clientY);
  }

  executeDraw(event, ctx) {
    console.log(event);
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const offsetX = (innerWidth / 2) + clientX
    const offsetY = (innerHeight / 2) + clientY
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }

  changeColor(color, value) {
    try {
      if (arguments.length < 2) throw "Two arguments required!";
      if (!colors[color]) throw "Selected color is invalid!";
      if (value < 0 || value > 255) throw "Given value is invalid!";
      this[color] = value;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Pen;
