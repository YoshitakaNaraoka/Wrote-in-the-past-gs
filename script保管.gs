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
};

function calculateDLVOPotential() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // パラメータの取得
  var A = sheet.getRange("A1").getValue(); // 斥力の強度を表す定数
  var k = sheet.getRange("A2").getValue(); // 距離に関連する定数
  var h = sheet.getRange("A3").getValue(); // 粒子間の距離
  
  // ポテンシャルエネルギーの計算
  var repulsion = A * Math.exp(-k * h); // 斥力項の計算
  
  // 結果をセルに出力
  sheet.getRange("A4").setValue(repulsion);
};

function simulateIntegrateProcess(n_integrateStepSize) {
  var integrateProcess = [0]; //初期値
  for (var i = 1; i < n_integrateStepSize; i++) {
    var x = x;
    var y = sheet_integrate.getRange("B4:C4").activate();
    var y = '${y}';
    var integrate_x_y = 1/(y+1) * Math.pow(x,y+1);
    let rangeactivate = sheet_integrate.getRange(i+1,5,1).activate();
    //sheet_integrate.getRange('F2').activate();
    //sheet_integrate.getCurrentCell().setFormula('=SUM(E2:E301)');
    sheet_integrate.getRange('$G2').activate();
    sheet_integrate.getCurrentCell().setFormula('=SERIESSUM("'+n_integrateStepSize+'","'+degree+'",1,"A2:A6")');
    sheet_integrate.getActiveRangeList().setValue(integrate_x_y);
    integrateProcess.push(integrate_x_y);
  }

  return integrateProcess;

  let n_integrateStepSize = 300;
  let degree = 6;
  var integrateProcess = simulateIntegrateProcess(n_integrateStepSize);
  
  sheet_integrate.getRange('D2').activate();
  sheet_integrate.getCurrentCell().setFormula('=SEQUENCE("'+n_integrateStepSize+'",1,0,1)');
};

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

function macro1() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getCurrentCell().offset(0, -4).activate();
  spreadsheet.getCurrentCell().setFormulaR1C1('=R[0]C[-1]/R[0]C[-3]');
  spreadsheet.getCurrentCell().offset(-1, 0).activate();
  spreadsheet.getCurrentCell().setFormulaR1C1('=R[1]C[-1]+R[0]C[-1]');
};

function createLennardJonesGraph() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // パラメータの設定
  var epsilon = 1.0; // ε（エネルギースケール）
  var sigma = 1.0; // σ（距離スケール）
  
  // グラフの範囲設定
  var xMin = 0.5;
  var xMax = 3.0;
  var stepSize = 0.1;
  
  // グラフデータの作成
  var data = [];
  var x = xMin;
  while (x <= xMax) {
    var ljValue = calculateLennardJonesValue(x, epsilon, sigma);
    data.push([x, ljValue]);
    x += stepSize;
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

function calculateLennardJonesValue(x, epsilon, sigma) {
  var r = sigma / x;
  var ljValue = 4 * epsilon * ((Math.pow(r, 12)) - (Math.pow(r, 6)));
  return ljValue;
}

function calculateImpulseResponse() {

  // 入力パラメータの設定
  var systemCoefficients = [1, -0.5, 0.25, -0.125]; // 系の係数
  
  // 応答計算のための初期化
  var inputSignal = [1]; // 入力信号（インパルス関数）
  var outputSignal = []; // 出力信号
  
  // 衝撃関数の計算
  for (var i = 0; i < inputSignal.length; i++) {
    var output = 0;
    for (var j = 0; j < systemCoefficients.length; j++) {
      if (i - j >= 0) {
        output += systemCoefficients[j] * inputSignal[i - j];
      }
    }
    outputSignal.push(output);
  }
  
  // 結果をシートに出力
  var range_impulse = sheet_Impulse.getRange(1, 1, outputSignal.length, 1);
  range_impulse.setValues(outputSignal.map(function(value) {
    return [value];
  }));
}

function calculateGreensFunction() {
  
  // 入力パラメータの設定
  var length = 1; // 領域の長さ
  var numPoints = 100; // データポイントの数
  var time = 1; // 時間
  
  // 初期条件と境界条件の設定
  var initialCondition = function(x) {
    return Math.sin(Math.PI * x / length);
  };
  var boundaryCondition = function(t) {
    return 0;
  };
  
  // データの作成
  var data = [];
  var dx = length / (numPoints - 1);
  for (var i = 0; i < numPoints; i++) {
    var x = i * dx;
    var sum = 0;
    for (var j = 1; j <= numPoints; j++) {
      var lambda = j * Math.PI / length;
      var eigenfunction = Math.sin(lambda * x);
      var timeFactor = Math.exp(-lambda * lambda * time);
      var coefficient = 2 / length * initialCondition(lambda) * eigenfunction * timeFactor;
      sum += coefficient;
    }
    var boundaryTerm = boundaryCondition(time);
    data.push([x, sum + boundaryTerm]);
  }
  
  // グラフ作成
  var chart_Green = sheet_Green.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(sheet_Green.getRange(1, 1, data.length, 2))
    .setPosition(1, 4, 0, 0)
    .build();
  
  // グラフをシートに挿入
  sheet_Green.insertChart(chart_Green);
}

function getTodayDate() {
  //Dateオブジェクトからインスタンスを生成
  const today = new Date();
  //メソッドを使って、本日の日付を取得
  const year = today.getFullYear(); //年
  const month = today.getMonth()+1; //月
  let this_month = String("yyyy.mm");
}

function addSheet3() {
//コンテナバインド型で紐付いたスプレッドシートを読み込む
let mySheet = SpreadsheetApp.getActiveSpreadsheet();
//追加挿入したシートに名前を設定
mySheet.insertSheet().setName(this_month);
}

function getTodayDate() {
//Dateオブジェクトからインスタンスを生成
const today = new Date();

//メソッドを使って、本日の日付を取得
const year = today.getFullYear(); //年
const month = today.getMonth()+1; //月
}

function numberToString() {
//数値型の変数を定義する
let num = month;
//そのまま数値としてログ表示
Logger.log(num);
//toStringメソッドで数値を文字列に変換
Logger.log(num.toString());
}

//追加挿入したシートに名前を設定
newSheet.setName('num');

function addSheet3() {
//コンテナバインド型で紐付いたスプレッドシートを読み込む
let mySheet = SpreadsheetApp.getActiveSpreadsheet();
//スプレッドシートに新しいシートを追加挿入
let newSheet = mySheet.insertSheet();

function getTodayDate() {
//Dateオブジェクトからインスタンスを生成
const today = new Date();

//メソッドを使って、本日の日付を取得
const year = today.getFullYear(); //年
const month = today.getMonth()+1; //月

//追加挿入したシートに名前を設定
newSheet.setName('month');
}}

function addSheet3() {
//コンテナバインド型で紐付いたスプレッドシートを読み込む
let mySheet = SpreadsheetApp.getActiveSpreadsheet();
//スプレッドシートに新しいシートを追加挿入
let newSheet = mySheet.insertSheet();
let sheetName = mySheet.getSheetName();

function getTodayDate() {
//Dateオブジェクトからインスタンスを生成
const today = new Date();
//メソッドを使って、本日の日付を取得
const year = today.getFullYear(); //年
const month = today.getMonth()+1; //月
var this_month = String("yyyy.m");
}

//追加挿入したシートに名前を設定
Sheet.setName("this_month");
}

function drawClothoidCurve(a, b, stepSize) {
  var canvas = DocumentApp.getActiveDocument().getBody().appendCanvas(600, 600);
  var ctx = canvas.getContext('2d');

  ctx.translate(canvas.getWidth() / 2, canvas.getHeight() / 2);
  ctx.scale(50, 50);

  ctx.beginPath();
  ctx.moveTo(0, 0);

  var tMax = a / Math.sqrt(b);
  for (var t = 0; t <= tMax; t += stepSize) {
    var x = Math.cos((a * t * t) / 2);
    var y = Math.sin((a * t * t) / 2);
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}

function testClothoidCurve() {
  var a = 1;
  var b = 1;
  var stepSize = 0.01;

  drawClothoidCurve(a, b, stepSize);
}

function drawFeynmanDiagram() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // グラフ描画の準備
  var ui = SpreadsheetApp.getUi();
  var drawing = sheet.newDrawing();
  
  // ダイアグラムの描画
  var diagram = drawing
    .appendShape(SpreadsheetApp.drawing.ShapeType.LINE, 0, 0, 100, 100)
    .appendShape(SpreadsheetApp.drawing.ShapeType.LINE, 100, 0, 0, 100)
    .appendShape(SpreadsheetApp.drawing.ShapeType.ELLIPSE, 0, 0, 100, 100)
    .setShapeForeground(0, 0, 0, 0) // 透明化
    .setShapeForeground(1, 0, 0, 0) // 透明化
    .setShapeForeground(2, 255, 255, 255); // 白色に設定
  
  // グラフをシートに挿入
  drawing.setPosition(1, 4, 0, 0);
  sheet.updateDrawing(drawing.build());
  
  // ダイアグラムの保存
  var file = DriveApp.createFile(sheet.getBlob());
  ui.alert('Feynman Diagram has been created and saved as ' + file.getName());
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
  .setPosition(1, 3, 17, 16)
  .build();
  sheet_Graph.insertChart(chart_GumouskiMirna);
}

function generateLogisticMapData(r, x0, iterations) {
  var data = [];
  var x = x0;
  
  for (var i = 0; i < iterations; i++) {
    data.push([i, x]);
    x = r * x * (1 - x);
  }
  
  return data;
}

function drawLogisticMapChart() {
  var r = 3.5; // パラメータ r の値
  var x0 = 0.1; // 初期値 x0 の値
  var iterations = 100; // イテレーション回数
  
  var data = generateLogisticMapData(r, x0, iterations);
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.getRange(1, 1, data.length, 2).setValues(data);
  
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(sheet.getRange(1, 1, data.length, 2))
    .setPosition(1, 3, 0, 0)
    .build();
  
  sheet.insertChart(chart);
}

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
