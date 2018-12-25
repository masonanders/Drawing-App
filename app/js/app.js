document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  console.assert(resizeCanvas(canvas), "Could not resize canvas element!");
  const ctx = canvas.getContext("2d");

  let mouseIsDown = false;

  document.addEventListener("mousedown", e => {
    mouseIsDown = true;
    beginDraw(e, ctx);
  });

  document.addEventListener("mousemove", e => {
    if (mouseIsDown) executeDraw(e, ctx);
  });

  document.addEventListener("mouseup", () => {
    mouseIsDown = false;
  });
});

function resizeCanvas(canvasEl) {
  const root = document.getElementById("root");
  try {
    canvasEl.width = root.clientWidth;
    canvasEl.height = root.clientHeight;
    return true;
  } catch {
    return false;
  }
}

function beginDraw(event, ctx) {
  const { clientX, clientY } = event;
  ctx.beginPath();
  ctx.moveTo(clientX, clientY);
}

function executeDraw(event, ctx) {
  const { clientX, clientY } = event;
  ctx.lineTo(clientX, clientY);
  ctx.stroke();
}
