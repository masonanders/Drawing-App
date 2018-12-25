document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  console.assert(resizeCanvas(canvas), "Could not resize canvas element!");
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
