function generateGumowskiMirnaMap(a, b, c, d, iterations, x0, y0) {
  var x = x0;
  var y = y0;

  var data = [];
  for (var i = 0; i < iterations; i++) {
    var xn = (a * x + y + (b * x * x * x) - (c * x * y * y) + (d * x * x * y)) % 1;
    var yn = (-x + (c * x * x * x) + (d * x * y * y) + y) % 1;

    x = xn;
    y = yn;

    data.push([x, y]);
  }

  return data;
}

function testGumowskiMirnaMap() {
  var a = 0.3;
  var b = -0.6;
  var c = -0.8;
  var d = 0.4;
  var iterations = 1000;
  var x0 = 0.1;
  var y0 = 0.1;

  var data = generateGumowskiMirnaMap(a, b, c, d, iterations, x0, y0);

  // データの表示
  sheet_GumowskiMirna.getRange(1, 1, data.length, 2).setValues(data);
}

function graph1(){
  const sheetgetrange3 = sheet_GumowskiMirna.getRange(1, 1, data.length, 2);
  var chart_GumouskiMirna = sheet_Graph.newChart()
  .asScatterChart()
  .addRange(sheetgetrange3)
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(0)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('useFirstColumnAsDomain', true)
  .setOption('isStacked', 'false')
  .setPosition(5, 3, 17, 16)
  .build();
  sheet_Graph.insertChart(chart_GumouskiMirna);
}