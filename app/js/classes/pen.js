class Pen {
  constructor(red = 50, blue = 50, green = 50) {
    this.red = red;
    this.blue = blue;
    this.green = green;

    this._instantiateListeners();
  }

  beginDraw(event, ctx) {
    const { red, blue, green } = this;
    const { offsetX, offsetY } = event;
    ctx.strokeStyle = `rgb(${red},${blue},${green})`;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }

  executeDraw(event, ctx) {
    const { offsetX, offsetY } = event;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }

  changeColor(color, value) {
    this[color] = value;
  }

  _instantiateListeners() {
    const sliders = document.getElementById("color-sliders");
    for (let slider of sliders.children) {
      const color = slider.name;
      slider.value = this[color];
    }

    sliders.onchange = e => {
      const color = e.target.name;
      const value = e.target.value;
      this.changeColor(color, value);
    };
  }
}

export default Pen;
