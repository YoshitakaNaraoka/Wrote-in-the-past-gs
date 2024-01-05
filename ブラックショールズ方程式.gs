function calculateOptionPrice() {
  
  // パラメータの取得
  var S = sheet.getRange("A1").getValue(); // 現在の株価
  var K = sheet.getRange("A2").getValue(); // 行使価格
  var r = sheet.getRange("A3").getValue(); // 利子率
  var sigma = sheet.getRange("A4").getValue(); // ボラティリティ
  var T = sheet.getRange("A5").getValue(); // オプションの満期日（年単位）
  
  // ブラックショールズ方程式の計算
  var d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * T) / (sigma * Math.sqrt(T));
  var d2 = d1 - sigma * Math.sqrt(T);
  
  var callOptionPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2); // コールオプション価格
  var putOptionPrice = K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1); // プットオプション価格
  
  // 結果をセルに出力
  sheet.getRange("A6").setValue(callOptionPrice);
  sheet.getRange("A7").setValue(putOptionPrice);
}

function normCDF(x) {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

function erf(x) {
  var a1 =  0.254829592;
  var a2 = -0.284496736;
  var a3 =  1.421413741;
  var a4 = -1.453152027;
  var a5 =  1.061405429;
  var p  =  0.3275911;

  var sign = (x < 0) ? -1 : 1;
  x = Math.abs(x);

  var t = 1.0 / (1.0 + p * x);
  var y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
  var erfValue = 1 - y * Math.exp(-x * x);

  return sign * erfValue;
}

function createOptionPriceGraph() {
  
  // パラメータの取得
  var S = sheet.getRange("A1").getValue(); // 株価
  var K = sheet.getRange("A2").getValue(); // 行使価格
  var r = sheet.getRange("A3").getValue(); // 利子率
  var sigma = sheet.getRange("A4").getValue(); // ボラティリティ
  
  // グラフの範囲設定
  var xMin = 0;
  var xMax = 2 * K;
  var stepSize = K / 10;
  
  // グラフデータの作成
  arr;
  var x = xMin;
  while (x <= xMax) {
    var T = x / S; // 満期日（年単位）
    var optionPrice = calculateOptionPrice(S, K, r, sigma, T);
    arr.push([x, optionPrice]);
    x += stepSize;
  }
  
  // グラフ作成
    chart.setChartType(Charts.ChartType.LINE)
    .addRange(sheet.getRange(1, 1, data.length, 2))
    .setPosition(1, 4, 0, 0)
    .build();
  
  // グラフをシートに挿入
  sheet.insertChart(chart);
}

function calculateOptionPrice(S, K, r, sigma, T) {
  var d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * T) / (sigma * Math.sqrt(T));
  var d2 = d1 - sigma * Math.sqrt(T);
  
  var callOptionPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2); // コールオプション価格
  var putOptionPrice = K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1); // プットオプション価格
  
  return callOptionPrice; // コールオプション価格を返す
}

function normCDF(x) {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

function erf(x) {
  var a1 =  0.254829592;
  var a2 = -0.284496736;
  var a3 =  1.421413741;
  var a4 = -1.453152027;
  var a5 =  1.061405429;
  var p  =  0.3275911;

  var sign = (x < 0) ? -1 : 1;
  x = Math.abs(x);

  var t = 1.0 / (1.0 + p * x);
  var y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
  var erfValue = 1 - y * Math.exp(-x * x);

  return sign * erfValue;
}