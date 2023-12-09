/*
function createLennardJonesGraph() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // パラメータの設定
  var epsilon = 1.0; // ε（エネルギースケール）
  var sigma = 1.0; // σ（距離スケール）
  
  // グラフの範囲設定
  var xMin = 0.5;
  var xMax = 3.0;
  var stepSize = 0.1;
  
  // グラフデータの作成
  var data = [];
  var x = xMin;
  while (x <= xMax) {
    var ljValue = calculateLennardJonesValue(x, epsilon, sigma);
    data.push([x, ljValue]);
    x += stepSize;
  }
  
  // グラフ作成
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(sheet.getRange(1, 1, data.length, 2))
    .setPosition(1, 4, 0, 0)
    .build();
  
  // グラフをシートに挿入
  sheet.insertChart(chart);
}

function calculateLennardJonesValue(x, epsilon, sigma) {
  var r = sigma / x;
  var ljValue = 4 * epsilon * ((Math.pow(r, 12)) - (Math.pow(r, 6)));
  return ljValue;
}
*/