function generateMandelbrotSet() {

  // パラメータの設定
  var width = 800; // 生成するイメージの幅
  var height = 800; // 生成するイメージの高さ
  var xMin = -2.5; // x軸の範囲の最小値
  var xMax = 1; // x軸の範囲の最大値
  var yMin = -1.5; // y軸の範囲の最小値
  var yMax = 1.5; // y軸の範囲の最大値
  var maxIterations = 100; // 最大反復回数

  // イメージデータの作成
  arr;
  for (var y = 0; y < height; y++) {
    var row = [];
    var imaginaryPart = yMin + (yMax - yMin) * y / height;
    for (var x = 0; x < width; x++) {
      var realPart = xMin + (xMax - xMin) * x / width;
      var iterations = calculateMandelbrotIterations(realPart, imaginaryPart, maxIterations);
      row.push(iterations);
    }
    arr.push(row);
  }

  // イメージデータをセルに出力
  return sheet.getRange(1, 1, height, width).setValues(arr);
}

function calculateMandelbrotIterations(x, y, maxIterations) {
  var real = 0;
  var imaginary = 0;
  var iteration = 0;

  while (real * real + imaginary * imaginary <= 4 && iteration < maxIterations) {
    var tempReal = real * real - imaginary * imaginary + x;
    var tempImaginary = 2 * real * imaginary + y;
    real = tempReal;
    imaginary = tempImaginary;
    iteration++;
  }

  return iteration;
}

function generateFractalImage() {
  
  // 画像のサイズとパラメータの設定
  var width = 800; // 画像の幅
  var height = 800; // 画像の高さ
  var maxIterations = 100; // 最大反復回数
  
  // 画像データの作成
  arr;
  for (var y = 0; y < height; y++) {
    var row = [];
    for (var x = 0; x < width; x++) {
      var pixelValue = generatePixelValue(x, y, maxIterations);
      row.push(pixelValue);
    }
    arr.push(row);
  }
  
  // 画像データをシートに出力
  return sheet.getRange(1, 1, height, width).setValues(arr);
}

function generatePixelValue(x, y, maxIterations) {
  // フラクタル形状の計算（例としてマンデルブロ集合を使用）
  var width = 3.5;
  var height = 2.5;
  var centerX = -0.75;
  var centerY = 0;
  var zoom = 200;

  var zx = x / zoom - width / 2 + centerX;
  var zy = y / zoom - height / 2 + centerY;
  var pixelValue = calculateMandelbrotIterations(zx, zy, maxIterations);
  
  // ピクセル値の精製ロジック（例としてトーンマッピングを使用）
  return Math.round(pixelValue / maxIterations * 255);
}

function calculateMandelbrotIterations(x, y, maxIterations) {
  var real = 0;
  var imaginary = 0;
  var iteration = 0;

  while (real * real + imaginary * imaginary <= 4 && iteration < maxIterations) {
    var tempReal = real * real - imaginary * imaginary + x;
    var tempImaginary = 2 * real * imaginary + y;
    real = tempReal;
    imaginary = tempImaginary;
    iteration++;
  }

  return iteration;
}