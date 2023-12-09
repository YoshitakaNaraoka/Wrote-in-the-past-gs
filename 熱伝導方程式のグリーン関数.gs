function calculateGreensFunction() {
  
  // 入力パラメータの設定
  var length = 1; // 領域の長さ
  var numPoints = 100; // データポイントの数
  var time = 1; // 時間
  
  // 初期条件と境界条件の設定
  var initialCondition = function(x) {
    return Math.sin(Math.PI * x / length);
  };
  var boundaryCondition = function(t) {
    return 0;
  };
  
  // データの作成
  var data = [];
  var dx = length / (numPoints - 1);
  for (var i = 0; i < numPoints; i++) {
    var x = i * dx;
    var sum = 0;
    for (var j = 1; j <= numPoints; j++) {
      var lambda = j * Math.PI / length;
      var eigenfunction = Math.sin(lambda * x);
      var timeFactor = Math.exp(-lambda * lambda * time);
      var coefficient = 2 / length * initialCondition(lambda) * eigenfunction * timeFactor;
      sum += coefficient;
    }
    var boundaryTerm = boundaryCondition(time);
    data.push([x, sum + boundaryTerm]);
  }
  
  // グラフ作成
  var chart_Green = sheet_Green.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(sheet_Green.getRange(1, 1, data.length, 2))
    .setPosition(1, 4, 0, 0)
    .build();
  
  // グラフをシートに挿入
  sheet_Green.insertChart(chart_Green);
}
