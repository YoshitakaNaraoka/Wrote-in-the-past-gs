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