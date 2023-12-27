function myFunction1() {
  var spreadsheet = SpreadsheetApp.getActive();
  //sheetのアクティブ化(取得)
  spreadsheet.getRange('A1').activate();
  //セルの取得
  spreadsheet.getCurrentCell().setFormula('=SEQUENCE(10,1,1,1)');
  //取得したセルに，数式をテキストとして入力
  spreadsheet.getRange('A11').activate();
  spreadsheet.getCurrentCell().setFormula('=sum(A1:A10)');
};

function myFunction2() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1:A10').activate()
  .shiftRowGroupDepth(1);
  //列のグループ化
  spreadsheet.getActiveRangeList().setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);
};

function myFunction3() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getActiveSheet().getRowGroup(11, 1).collapse();
  //.collapse() は，グループを折り畳む
};