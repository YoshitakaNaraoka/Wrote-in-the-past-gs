/**
 * セル・オートマトンを実行する関数
 */


function simulateCellularAutomaton() {
  var startRow = 1; // データの開始行
  var startColumn = 1; // データの開始列
  var numRows = lastRow - startRow + 2; // データの行数
  var numColumns = sheet.getLastColumn() - startColumn + 2; // データの列数
  

  var numRows = lastRow - startRow + 1; // データの行数
  var numColumns = sheet.getLastColumn() - startColumn + 1; // データの列数

/*
 Exception: The number of rows in the range must be at least 1.
(row,column) = (0,0) を指定してエラー
*/

  var dataRange = sheet.getRange(startRow, startColumn, numRows, numColumns);
  var data = dataRange.getValues(); // セルの状態を取得
  
  var rule = "110"; // ルール（Wolframコード）
  var numGenerations = 20; // 世代数

  // ルールに基づいて状態を更新
  for (var generation = 0; generation < numGenerations; generation++) {
    arr;
    for (var i = 0; i < numRows; i++) {
      var left = data[i][(numColumns + startColumn - 1) % numColumns];
      var center = data[i][(numColumns + startColumn) % numColumns];
      var right = data[i][(numColumns + startColumn + 1) % numColumns];
      newData[i] = applyRule(left, center, right, rule);
    }
    data = arr;
  }

  // 結果をセルに表示
  var outputRange = get(startRow, startColumn, numRows, numColumns);
  outputRange.setValues(data);
}