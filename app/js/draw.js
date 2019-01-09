export function beginDraw(event, ctx) {
  const { clientX, clientY } = event;
  ctx.beginPath();
  ctx.moveTo(clientX, clientY);
}

export function executeDraw(event, ctx) {
  const { clientX, clientY } = event;
  ctx.lineTo(clientX, clientY);
  ctx.stroke();
}
