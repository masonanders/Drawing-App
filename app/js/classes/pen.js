class Pen {
  beginDraw(event, ctx) {
    const { clientX, clientY } = event;
    ctx.beginPath();
    ctx.moveTo(clientX, clientY);
  }

  executeDraw(event, ctx) {
    const { clientX, clientY } = event;
    ctx.lineTo(clientX, clientY);
    ctx.stroke();
  }
}

export default Pen;
