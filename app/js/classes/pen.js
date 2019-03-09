class Pen {
  constructor(red = 100, blue = 100, green = 100) {
    this.red = red;
    this.blue = blue;
    this.green = green;

    this._instantiateListeners();
  }

  beginDraw(event, ctx) {
    const { red, blue, green } = this;
    const { offsetX, offsetY } = event;
    ctx.strokeStyle = `rgb(${red},${green},${blue})`;
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
      sliderValueToBackground(slider);
    }

    sliders.oninput = e => {
      const slider = e.target;
      const color = slider.name;
      const value = slider.value;
      sliderValueToBackground(slider);
      this.changeColor(color, value);
    };

    function sliderValueToBackground(slider) {
      const colors = { red: 0, blue: 0, green: 0 };
      const color = slider.name;
      colors[color] = slider.value;
      const { red, blue, green } = colors;
      slider.style.background = `rgb(${red}, ${green}, ${blue})`;
    }
  }
}

export default Pen;
