function generateLogisticMapData(r, x0, iterations) {
  var data = [];
  var x = x0;
  
  for (var i = 0; i < iterations; i++) {
    data.push([i, x]);
    x = r * x * (1 - x);
  }
  
  return data;
}

function drawLogisticMapChart() {
  var r = 3.5; // パラメータ r の値
  var x0 = 0.1; // 初期値 x0 の値
  var iterations = 100; // イテレーション回数
  
  var data = generateLogisticMapData(r, x0, iterations);
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.getRange(1, 1, data.length, 2).setValues(data);
  
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(sheet.getRange(1, 1, data.length, 2))
    .setPosition(1, 3, 0, 0)
    .build();
  
  sheet.insertChart(chart);
}