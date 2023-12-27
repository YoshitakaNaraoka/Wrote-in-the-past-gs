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
  .setPosition(1, 3, 17, 16)
  .build();
  sheet_Graph.insertChart(chart_GumouskiMirna);
}