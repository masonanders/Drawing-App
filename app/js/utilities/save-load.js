export function saveDrawing(saveName, ctx) {
  const canvas = document.getElementById("canvas");
  const width = canvas.clientWidth,
    height = canvas.clientHeight;
  const data = ctx.getImageData(0, 0, width, height);
  const compressedData = JSON.stringify(compressData(data));
  window.localStorage.setItem(saveName, compressedData);
}

export function loadDrawing(saveName, ctx) {
  const dataAsString = window.localStorage.getItem(saveName);
  const data = JSON.parse(dataAsString);
  const decompressedData = decompressData(data);
  const newImageData = new ImageData(
    decompressedData.data,
    decompressedData.width,
    decompressedData.height
  );
  ctx.putImageData(newImageData, 0, 0);
}

function compressData(data) {
  const pixelMap = compressEmptyPixels(data.data);
  const compressedPixelMap = groupZeros(pixelMap);
  const compPixelMapString = fromArrayToCompressedString(compressedPixelMap);
  const compressedData = {
    data: compPixelMapString,
    height: data.height,
    width: data.width
  };
  return compressedData;
}

function compressEmptyPixels(imageData) {
  const pixelMap = [];
  let i = 0;
  while (i < imageData.length) {
    let allZero = true,
      pixelData = [];
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
  return pixelMap;
}

function groupZeros(pixelMap) {
  const compressedPixelMap = [];
  let numZeros = 0;
  for (let i in pixelMap) {
    if (pixelMap[i] === 0) {
      numZeros++;
    } else {
      if (numZeros > 0) {
        compressedPixelMap.push(numZeros);
        numZeros = 0;
      }
      compressedPixelMap.push(pixelMap[i]);
    }
  }
  if (numZeros > 0) {
    compressedPixelMap.push(numZeros);
  }
  return compressedPixelMap;
}

function fromArrayToCompressedString(array) {
  let compressedString = "";
  array.forEach(el => {
    compressedString += JSON.stringify(el);
  });
  return compressedString;
}

function decompressData(data) {
  const imageData = fromCompressedStringToArray(data.data);
  const decompressedPixelMap = decompressPixelMap(imageData);
  data.data = Uint8ClampedArray.from(decompressedPixelMap);
  return data;
}

function fromCompressedStringToArray(string) {
  const imageData = [];
  let numZeros = "",
    pixelData = "";
  for (let i in string) {
    if (string[i] === "[") {
      pixelData += "[";
      if (numZeros) {
        imageData.push(JSON.parse(numZeros));
        numZeros = "";
      }
    } else if (string[i] === "]") {
      pixelData += "]";
      imageData.push(JSON.parse(pixelData));
      pixelData = "";
    } else if (pixelData) {
      pixelData += string[i];
    } else {
      numZeros += string[i];
    }
  }
  if (numZeros) {
    imageData.push(JSON.parse(numZeros));
  }
  return imageData;
}

function decompressPixelMap(compPixelMap) {
  const expandedPixelMap = [];
  for (let i in compPixelMap) {
    if (typeof compPixelMap[i] === "object") {
      compPixelMap[i].forEach(el => expandedPixelMap.push(el));
    } else {
      for (let j = 0; j < compPixelMap[i]; j++) {
        for (let k = 0; k < 4; k++) {
          expandedPixelMap.push(0);
        }
      }
    }
  }
  return expandedPixelMap;
}
