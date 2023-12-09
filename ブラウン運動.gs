/*
function addSheet2() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.insertSheet(1);
  SpreadsheetApp.getActive();
  spreadsheet.getActiveSheet().setName('BrownianMotion');
}

function simulateBrownianMotion(numSteps, stepSize) {
  var position = 0; // 初期位置
  
  for (var i = 0; i < numSteps; i++) {
    var step = stepSize * getRandomStep(); // 1ステップの移動量
    position += step; // 位置の更新
  }
  
  return position;
}

// ランダムな1ステップの移動量を生成する関数
function getRandomStep() {
  return (Math.random() * 2 - 1); // -1から1までの一様乱数
}

// ブラウン運動のシミュレーション
var numSteps = 100; // ステップ数
var stepSize = 0.1; // ステップの大きさ

var finalPosition = simulateBrownianMotion(numSteps, stepSize);

// 結果の表示
//console.log(finalPosition);

function createBrownianMotionGraph() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // パラメータの設定
  var numPoints = 1000; // データポイントの数
  var stepSize = 0.01; // ステップサイズ
  
  // 初期位置の設定
  var initialX = 0;
  var initialY = 0;
  
  // データの作成
  var data = [];
  var x = initialX;
  var y = initialY;
  for (var i = 0; i < numPoints; i++) {
    data.push([x, y]);
    x += randomStep(stepSize);
    y += randomStep(stepSize);
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

/*function randomStep(stepSize) {
  // ランダムなステップサイズを生成
  return (Math.random() - 0.5) * stepSize * 2;
}
*/
