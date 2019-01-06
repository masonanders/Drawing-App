export function saveDrawing(saveName, ctx) {
  const canvas = document.getElementById("canvas");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const data = ctx.getImageData(0, 0, width, height);
  const compressedData = JSON.stringify(compressData(data));
  window.localStorage.setItem(saveName, compressedData);
}

export function loadDrawing(saveName, ctx) {
  const data = JSON.parse(window.localStorage.getItem(saveName));
  const decompressedData = decompressData(data);
  const newImageData = new ImageData(
    decompressedData.data,
    decompressedData.width,
    decompressedData.height
  );
  ctx.putImageData(newImageData, 0, 0);
}

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
  let compressedPixelMap = "";
  let numZeros = 0;
  for (let i in pixelMap) {
    if (pixelMap[i] === 0) {
      numZeros++;
    } else {
      if (numZeros > 0) {
        compressedPixelMap += numZeros;
      }
      compressedPixelMap += JSON.stringify(pixelMap[i]);
      numZeros = 0;
    }
  }
  if (numZeros > 0) {
    compressedPixelMap += numZeros;
  }
  const compressedData = {
    data: compressedPixelMap,
    height: data.height,
    width: data.width
  };
  return compressedData;
}

function decompressData(data) {
  const imageData = [];
  let numZeros = "",
    pixelData = "";
  for (let i in data.data) {
    if (data.data[i] === "[") {
      pixelData += "[";
      if (numZeros) {
        imageData.push(JSON.parse(numZeros));
        numZeros = "";
      }
      continue;
    } else if (data.data[i] === "]") {
      pixelData += "]";
      imageData.push(JSON.parse(pixelData));
      pixelData = "";
      continue;
    }
    if (pixelData) {
      pixelData += data.data[i];
    } else {
      numZeros += data.data[i];
    }
  }
  if (numZeros) {
    imageData.push(JSON.parse(numZeros));
  }
  data.data = [];
  for (let i in imageData) {
    if (typeof imageData[i] === "object") {
      imageData[i].forEach(el => data.data.push(el));
    } else {
      for (let j = 0; j < imageData[i]; j++) {
        for (let k = 0; k < 4; k++) {
          data.data.push(0);
        }
      }
    }
  }
  data.data = Uint8ClampedArray.from(data.data);
  return data;
}
