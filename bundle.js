/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/js/app.js":
/*!***********************!*\
  !*** ./app/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_save_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/save-load */ "./app/js/utilities/save-load.js");
/* harmony import */ var _classes_drawing_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/drawing-app */ "./app/js/classes/drawing-app.js");



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const width = 600;
  const height = 600;
  resizeCanvas(canvas, width, height);
  new _classes_drawing_app__WEBPACK_IMPORTED_MODULE_1__["default"](canvas);
});

function resizeCanvas(canvasEl, width, height) {
  canvasEl.style.width = width;
  canvasEl.style.height = height;
  canvasEl.width = width;
  canvasEl.height = height;
}


/***/ }),

/***/ "./app/js/classes/drawing-app.js":
/*!***************************************!*\
  !*** ./app/js/classes/drawing-app.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pen */ "./app/js/classes/pen.js");
/* harmony import */ var _eraser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eraser */ "./app/js/classes/eraser.js");



class DrawingApp {
  constructor(canvas) {
    this.canvas = canvas;
    this.pen = new _pen__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.eraser = new _eraser__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.mouseIsDown = false;

    const ctx = canvas.getContext("2d");
    this._instantiateListeners(ctx);
  }

  _instantiateListeners(ctx) {
    this.canvas.addEventListener("mousedown", e => {
      this.mouseIsDown = true;
      if (this.eraser.active) {
        this.eraser.executeErase(e, ctx);
      } else {
        this.pen.beginDraw(e, ctx);
      }
    });

    this.canvas.addEventListener("mousemove", e => {
      if (this.eraser.active) {
        this.eraser.generateEraser(e);
      }
      if (this.mouseIsDown) {
        this.eraser.active
          ? this.eraser.executeErase(e, ctx)
          : this.pen.executeDraw(e, ctx);
      }
    });

    document.addEventListener("mouseup", () => {
      this.mouseIsDown = false;
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (DrawingApp);


/***/ }),

/***/ "./app/js/classes/eraser.js":
/*!**********************************!*\
  !*** ./app/js/classes/eraser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Eraser {
  constructor() {
    this.active = false;
    this.size = 50;
    this.eraserButton = document.getElementById("eraser");
    window.eraser = this.eraserButton;

    this.changeColor();
    this._instantiateListener();
  }

  generateEraser(event) {
    console.log("need to generate eraser");
  }

  executeErase(event, ctx) {
    const { size } = this;
    const x = event.offsetX - Math.floor(size / 2);
    const y = event.offsetY - Math.floor(size / 2);
    ctx.clearRect(x, y, size, size);
  }

  toggle() {
    this.active = !this.active;
    this.changeColor();
  }

  changeColor() {
    this.eraserButton.style.backgroundColor = this.active
      ? "#2299FF"
      : "#77CCFF";
  }

  _instantiateListener() {
    this.eraserButton.onclick = () => {
      this.toggle();
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Eraser);


/***/ }),

/***/ "./app/js/classes/pen.js":
/*!*******************************!*\
  !*** ./app/js/classes/pen.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Pen);


/***/ }),

/***/ "./app/js/utilities/save-load.js":
/*!***************************************!*\
  !*** ./app/js/utilities/save-load.js ***!
  \***************************************/
/*! exports provided: saveDrawing, loadDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveDrawing", function() { return saveDrawing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDrawing", function() { return loadDrawing; });
function saveDrawing(saveName, ctx) {
  const canvas = document.getElementById("canvas");
  const width = canvas.clientWidth,
    height = canvas.clientHeight;
  const data = ctx.getImageData(0, 0, width, height);
  const compressedData = JSON.stringify(compressData(data));
  window.localStorage.setItem(saveName, compressedData);
}

function loadDrawing(saveName, ctx) {
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map