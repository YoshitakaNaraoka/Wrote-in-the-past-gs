function doPost(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  
  // 送信されてくるJSONデータ　{"ID":XXXX,"temp":XXXXX}　から、各要素を取り出す
  var params = JSON.parse(e.postData.getDataAsString());
  var id = params.ID;
  var temp = params.temp;

  //そのままではjsonとして値の取り出しができない(undefinedに)
  console.log(response["appName"]);
  //そのままではスクリプトで処理できないのでparseする
  let json = JSON.parse(response);
  console.log(json["appName"]);

  for(i=0;i<json["params"].length;i++){
  jsonArray[i]=[
    json["params"][i]["id"],
    json["params"][i]["temp"],
    //json["members"][i]["city"]
  ];
  }
 //console.log(json["members"]);
  // データをシートに追加
  sheet.insertRows(2,1);  // 2行1列目に列を挿入する
  sheet.getRange(2, 1).setValue(new Date());     // 受信日時を記録
  sheet.getRange(2, 2).setValue(id);     // IDを記録
  sheet.getRange(2, 3).setValue(temp);     // tempを記録
 

json.forEach((obj)=>{
    let lastRow = sheet.getLastRow()+1;
    Object.keys(obj).forEach((key, index)=>{
        sheet.getRange(lastRow, index+1).setValue(obj[key]);
    });
  });
  
}

function doPost1(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('a');
  
  // 送信されてくるJSONデータ　{"temp_1":XXXX,"temp_2":XXXXX,...}　から、各要素を取り出す
  var params = JSON.parse(e.postData.getDataAsString());
  var id = params.ID;
  var temp = params.temp;

  // データをシートに追加
  sheet.insertRows(2,1);  // 2行1列目に列を挿入する
  sheet.getRange(2, 1).setValue(new Date());     // 受信日時を記録
  sheet.getRange(2, 2).setValue(id);     // temp_1を記録
  sheet.getRange(2, 3).setValue(temp);     // temp_2を記録
}

function doPost2(e){
  var param2 = e.postData.getDataAsString();//データ取得
  var ary2 = param2.split(',');//取得データをカンマで区切ってaryに格納
 
  var fileName = ary2[0];//aryの最初はファイル名(SpreadSheet)
  var sheetName = ary2[1];//次にシート名
  var n_of_colms = ary2[2];//次に項目数(列数)
  var folder = DriveApp.getFolderById('xxxx');//作業フォルダは固定にする:ここにフォルダIDを記入
 
  var SS_ID = SpreadsheetApp.create(fileName).getId();//ルートにファイル名fileNameで新規スプレッドシート作成
  var SS = DriveApp.getFileById(SS_ID);// 新規作成スプレッドシートのIDを取得
 
  var files = folder.getFilesByName(fileName);//作業フォルダ内にfileNameと同じ名前のスプレッドシートが存在するか？
  if (files.hasNext()) {
    SS_ID = files.next().getId();//存在する場合はIDをそのファイルに書き換え
  }
  else{
    folder.addFile(SS);//存在しない場合はルートのファイルをコピー
  }
  DriveApp.getRootFolder().removeFile(SS);//ルートに作成したスプレッドシートは不要なので削除
 
  var ary_length = ary.length;
  var n_of_data = Math.round((ary_length - 3) / n_of_colms); //データの行数(組数)
 
  var spreadsheet = SpreadsheetApp.openById(SS_ID);//あらためてSpreadSheetを開く
  var newSheet = spreadsheet.getSheetByName(sheetName);//同じシート名があるかチェック
  if(!newSheet){
   newSheet= spreadsheet.insertSheet(sheetName,0);//シートがなければ新規作成
  }
 
  newSheet.activate();
  var columnA_Vals = newSheet.getRange('A:A').getValues();
  var LastRow = columnA_Vals.filter(String).length;  //空白を除き、入力済の行数を取得
 
  var ary2 = [];//シートに書き込むための配列
  for(var i=0;i<n_of_data;i++){
    ary2[i] = [];      //まず1次元の配列にして
    for(var j=0;j<n_of_colms;j++){  //その中にさらにデータを格納して2次元にする
      ary2[i][j]=ary[i*n_of_colms + j + 3];//ary[0]はファイル名、1はシート名、2は列数なので3を足している
    }
  }
  var newRange = newSheet.getRange(LastRow+1,1,n_of_data,n_of_colms);//入力済の次の行から、入力範囲を設定
  newRange.setValues(ary2);  //ary2の内容を一気に書き込み
 
  var graphRange = newSheet.getRange(1,1,LastRow+n_of_data,n_of_colms);//グラフ作成するデータの範囲
  var oldCharts = newSheet.getCharts();  //シートにあるすべてのグラフ
  for (var i in oldCharts) {//グラフの数だけ繰り返す
    // シートからそのグラフを削除:古いグラフはすべて削除される
    sheet.removeChart(charts[i]);
  }
 
  var myChart = newSheet.newChart()// 最新のグラフの作成
  .addRange(graphRange)
  .setChartType(Charts.ChartType.SCATTER)
  .setPosition(1,n_of_colms,50,200)
  .build();
 
  newSheet.insertChart(myChart);
}

function myFunction() {

  const spreadsheetId = '1QENCIAzqhwevjOr2r8m2tagcoSZGK6Inj3E40HmNBnY';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("シート3");

  const json = [
    {
      'username': '田中太郎',
      'email': 'tanaka@example.jp',
      'tel': '0120123456'
    },
    {
      'username': '山田太郎',
      'email': 'yamada@example.jp',
      'tel': '0120789123'
    },
  ];

  json.forEach((obj)=>{
    let lastRow = sheet.getLastRow()+1;
    Object.keys(obj).forEach((key, index)=>{
        sheet.getRange(lastRow, index+1).setValue(obj[key]);
    });
  });
}

function myFunction5() {
  
  const sheet5 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  var params5 = JSON.parse(e.postData.getDataAsString());
  const json5 = []
  json.forEach((obj)=>{
    let lastRow = sheet.getLastRow()+1;
    Object.keys(obj).forEach((key, index)=>{
        sheet.getRange(lastRow, index+1).setValue(obj[key]);
    });
  });
}

function myFunction6(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート4");
  var params = JSON.parse(e.postData.getDataAsString());
  var id = params.ID;
  var temp = params.temp;
  const json = [
    {
      'id': id,
      'temp': temp
    },
  ];

  json.forEach((obj)=>{
    let lastRow = sheet.getLastRow()+1;
    Object.keys(obj).forEach((key, index)=>{
        sheet.getRange(lastRow, index+1).setValue(obj[key]);
    });
  });
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート4");
  var params = JSON.parse(e.postData.getDataAsString());
  var id = params.ID;
  var temp = params.temp;
  
  for(i=0;i<json["params"].length;i++){
  jsonArray[i]=[
    json["params"][i]["id"],
    json["params"][i]["temp"],
    //json["members"][i]["city"]
  ];
  }
  
  sheet.insertRows(2,1);  // 2行1列目に列を挿入する
  sheet.getRange(2, 1).setValue(new Date());     // 受信日時を記録
  sheet.getRange(2, 2).setValue(id);     // IDを記録
  sheet.getRange(2, 3).setValue(temp);     // tempを記録
}

function doPost(e) {
  // スプレッドシートオブジェクトを取得
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var postData = JSON.parse(e.postData.getDataAsString());
  var colNames = sheet.getRange("1:1").getValues()[0]
  var lastRow = sheet.getLastRow();
  postData["postDate"] = new Date();
  postData["notSolved"] = 0;
  var Others={}
  for (key of Object.keys(postData)){
    var setCol=colNames.indexOf(key)+1;
    if (setCol==0) {
      Others[key]=postData[key];
      continue;
    }
    sheet.getRange(lastRow+1, setCol).setValue(postData[key]);
  }
  if (Object.keys(Others).legnth>0) {
    var key = "Others";
    var setCol=colNames.indexOf(key)+1;
    sheet.getRange(lastRow+1, setCol).setValue(Others);
  }
}

function doPost(e) {
  // スプレッドシートオブジェクトを取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  var postData = JSON.parse(e.postData.getDataAsString());
  var colNames = sheet.getRange("1:1").getValues()[0]
  var lastRow = sheet.getLastRow();
  postData["postDate"] = new Date();
  postData["notSolved"] = 0;
  var Others={}
  for (key of Object.keys(postData)){
    var setCol=colNames.indexOf(key)+1;
    if (setCol==0) {
      Others[key]=postData[key];
      continue;
    }
    sheet.getRange(lastRow+1, setCol).setValue(postData[key]);
  }
  if (Object.keys(Others).legnth>0) {
    var key = "Others";
    var setCol=colNames.indexOf(key)+1;
    sheet.getRange(lastRow+1, setCol).setValue(Others);
  }
}

function doPost(e) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('a');
  
  // 送信されてくるJSONデータ　{"temp_1":XXXX,"temp_2":XXXXX,...}　から、各要素を取り出す
  var params = JSON.parse(e.postData.getDataAsString());
  var id = params.ID;
  var temp = params.temp;

  // データをシートに追加
  sheet.insertRows(2,1);  // 2行1列目に列を挿入する
  sheet.getRange(2, 1).setValue(new Date());     // 受信日時を記録
  sheet.getRange(2, 2).setValue(id);     // temp_1を記録
  sheet.getRange(2, 3).setValue(temp);     // temp_2を記録
}

function doPost(e) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('a');
  
  // 送信されてくるJSONデータ　{"temp_1":XXXX,"temp_2":XXXXX,...}　から、各要素を取り出す
  var params = JSON.parse(e.postData.getDataAsString());
  var id = params.ID;
  var temp = params.temp;

  // データをシートに追加
  //sheet.insertRows(2,1);  // 2行1列目に列を挿入する
  json.forEach((obj)=>{
    let lastRow = sheet.getLastRow()+1;
    Object.keys(obj).forEach((params, index)=>{
        sheet.getRange(lastRow, index+1).setValue(obj[params]);
    });
  });
}

function doPost(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  
  // 送信されてくるJSONデータ　{"ID":XXXX,"temp":XXXXX}　から、各要素を取り出す
  var params = JSON.parse(e.postData.getDataAsString());
  // 配列の中身はC++のコードと紐づいている必要がある
  const jsonArray = [params.date,params.ID,params.temp,params.name];

  // データをシートに追加
  sheet.insertRows(2,1);  // 2行1列目に列を挿入する
  sheet.getRange(2, 1).setValue(jsonArray[0]);     // 受信日時を記録
  sheet.getRange(2, 2).setValue(jsonArray[1]);     // IDを記録
  sheet.getRange(2, 3).setValue(jsonArray[2]);     // tempを記録
  sheet.getRange(2, 4).setValue(jsonArray[3]);
}

function doPost(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("極座標変換");
  
  // 送信されてくるJSONデータ　{"ID":XXXX,"temp":XXXXX}　から、各要素を取り出す
  var params = JSON.parse(e.postData.getDataAsString());
  var angle1 = params.angle_servo1;
  var angle2 = params.angle_servo2;
  var angle3 = params.angle_servo3;
  var angle4 = params.angle_servo4;
  var angle5 = params.angle_servo5;
  var angle6 = params.angle_servo6;

  const jsonArray = [angle1,angle2,angle3,angle4,angle5,angle6];

  // データをシートに追加
  sheet.getRange(1, 2).setValue(jsonArray[0]);
  sheet.getRange(1, 3).setValue(jsonArray[1]);
  sheet.getRange(1, 4).setValue(jsonArray[2]);
  sheet.getRange(1, 5).setValue(jsonArray[4]);
  sheet.getRange(1, 6).setValue(jsonArray[5]);
  sheet.getRange(1, 7).setValue(jsonArray[6]);
}

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