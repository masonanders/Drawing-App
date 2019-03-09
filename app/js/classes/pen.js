class Pen {
  constructor(red = 100, blue = 100, green = 100) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.penSize = 20;

    this._setSliderProperties();
    this._instantiateListeners();
  }

  beginDraw(event, ctx) {
    const { red, green, blue } = this;
    const { offsetX, offsetY } = event;
    ctx.strokeStyle = `rgb(${red},${green},${blue})`;
    ctx.lineWidth = this.penSize;
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

  updateSliderBackgrounds(...sliders) {
    sliders.forEach(slider => {
      if (slider.name === "pen-size") {
        const { red, green, blue } = this;
        slider.style.background = `rgb(${red}, ${green}, ${blue})`;
      } else {
        const colors = { red: 0, green: 0, blue: 0 };
        const color = slider.name;
        colors[color] = slider.value;
        const { red, green, blue } = colors;
        slider.style.background = `rgb(${red}, ${green}, ${blue})`;
      }
    });
  }

  _setSliderProperties() {
    const penSizeSlider = document.getElementById("pen-size");
    const colorSliders = document.getElementById("color-sliders");
    penSizeSlider.value = this.penSize;
    this.updateSliderBackgrounds(penSizeSlider);
    for (let slider of colorSliders.children) {
      const color = slider.name;
      slider.value = this[color];
      this.updateSliderBackgrounds(slider);
    }
  }

  _instantiateListeners() {
    const penSizeSlider = document.getElementById("pen-size");
    const colorSliders = document.getElementById("color-sliders");

    penSizeSlider.onchange = e => {
      this.penSize = penSizeSlider.value;
    };

    colorSliders.oninput = e => {
      const slider = e.target;
      const { name: color, value } = slider;
      this.changeColor(color, value);
      this.updateSliderBackgrounds(slider, penSizeSlider);
    };
  }
}

export default Pen;
