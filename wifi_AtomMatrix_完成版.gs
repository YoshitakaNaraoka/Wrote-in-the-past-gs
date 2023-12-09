function doPost(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  
  // 送信されてくるJSONデータ　{"ID":XXXX,"temp":XXXXX}　から、各要素を取り出す
  var params = JSON.parse(e.postData.getDataAsString());
  var date = params.date;
  var id = params.ID;
  var temp = params.temp;
  var name = params.name;

  const jsonArray = [date,id,temp,name];

  // データをシートに追加
  sheet.insertRows(2,1);  // 2行1列目に列を挿入する
  sheet.getRange(2, 1).setValue(jsonArray[0]);     // 受信日時を記録
  sheet.getRange(2, 2).setValue(jsonArray[1]);     // IDを記録
  sheet.getRange(2, 3).setValue(jsonArray[2]);     // tempを記録
  sheet.getRange(2, 4).setValue(jsonArray[3]);
}