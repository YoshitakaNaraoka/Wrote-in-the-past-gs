function discreteFourierTransform() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  var numRows = values.length;
  var numCols = values[0].length;
  
  // 実数部と虚数部を格納する配列を作成
  var realPart = new Array(numCols).fill(0);
  var imagPart = new Array(numCols).fill(0);
  
  // DFT計算
  for (var k = 0; k < numCols; k++) {
    for (var n = 0; n < numRows; n++) {
      var angle = (2 * Math.PI * k * n) / numRows;
      realPart[k] += values[n][0] * Math.cos(angle);
      imagPart[k] -= values[n][0] * Math.sin(angle);
    }
  }
  
  // 結果を別のシートに出力
  var outputSheet = spreadsheet.getSheetByName("DFT_Result"); // 結果を出力するシートの名前を指定
  if (!outputSheet) {
    outputSheet = spreadsheet.insertSheet("DFT_Result");
  }
  
  var outputValues = [];
  for (var k = 0; k < numCols; k++) {
    outputValues.push([realPart[k], imagPart[k]]);
  }
  
  outputSheet.getRange(1, 1, numCols, 2).setValues(outputValues);
}
