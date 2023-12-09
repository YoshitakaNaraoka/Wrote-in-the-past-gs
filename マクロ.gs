/*
function myFunction() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setValue('1');
  spreadsheet.getRange('A2').activate();
};

function a() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setFormula('=SEQUENCE(300,1,0,1)');
  spreadsheet.getRange('A1:B300').activate();
  var sheet = spreadsheet.getActiveSheet();
  var chart = sheet.newChart()
  .asLineChart()
  .addRange(spreadsheet.getRange('A1:B300'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(0)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('useFirstColumnAsDomain', true)
  .setOption('isStacked', 'false')
  .setPosition(285, 3, 17, 16)
  .build();
  sheet.insertChart(chart);
};
*/

function myFunction() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(31, 7).activate();
};

function macro1() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(0, -4).activate();
  spreadsheet.getCurrentCell().setFormulaR1C1('=R[0]C[-1]/R[0]C[-3]');
  spreadsheet.getCurrentCell().offset(-1, 0).activate();
  spreadsheet.getCurrentCell().setFormulaR1C1('=R[1]C[-1]+R[0]C[-1]');
};