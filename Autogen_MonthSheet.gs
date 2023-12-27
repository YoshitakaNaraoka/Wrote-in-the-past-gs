function addSheet4() {
  //コンテナバインド型で紐付いたスプレッドシートを読み込む
  var mySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  // シート名を取得
  var sheetName = dayjs.dayjs().format('YYYY.MM');
  
  // シートを取得
  var targetSheet = mySpreadSheet.getSheetByName(sheetName);
  if (targetSheet == null) {
    // スプレッドシートに新しいシートを追加挿入
    // 名前を指定
    mySpreadSheet.insertSheet(sheetName);
  }
}