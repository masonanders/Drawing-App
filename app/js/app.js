document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  console.assert(resizeCanvas(canvas), "Could not resize canvas element!");
  const ctx = canvas.getContext("2d");

  let mouseIsDown = false;
  window.ctx = ctx;
  window.saveDrawing = saveDrawing;
  window.loadDrawing = loadDrawing;
  window.compressData = compressData;
  window.decompressData = decompressData;
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

function saveDrawing(saveName, ctx) {
  const canvas = document.getElementById("canvas");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const data = ctx.getImageData(0, 0, width, height);
  const compressedData = JSON.stringify(compressData(data));
  window.localStorage.setItem(saveName, compressedData);
}

function loadDrawing(saveName, ctx) {
  const decompressedData = decompressData(
    window.localStorage.getItem(saveName)
  );
  const newImageData = new ImageData(
    decompressedData.data,
    decompressedData.width,
    decompressedData.height
  );
  ctx.putImageData(newImageData, 0, 0);
}

// compress further by grouping pixels;
function compressData(data) {
  const imageData = data.data;
  const pixelMap = new Array();
  let i = 0;
  while (i < imageData.length) {
    let allZero = true;
    let pixelData = new Array();
    for (let j = 0; j < 4; j++) {
      pixelData.push(imageData[i]);
      if (imageData[i]) allZero = false;
      i++;
    }
    if (allZero) {
      pixelMap.push(0);
    } else {
      pixelMap.push(pixelData);
    }
  }
  let compressedData = {
    data: pixelMap,
    height: data.height,
    width: data.width
  };
  if (data.data.length !== compressedData.data.length) {
    compressedData = compressData(compressedData);
  }
  return compressedData;
}

function decompressData(data) {
  data = JSON.parse(data);
  const imageData = new Array();
  for (let i in data.data) {
    if (data.data[i]) {
      data.data[i].forEach(el => imageData.push(el));
    } else {
      for (let i = 0; i < 4; i++) {
        imageData.push(0);
      }
    }
  }
  data.data = Uint8ClampedArray.from(imageData);
  return data;
}
