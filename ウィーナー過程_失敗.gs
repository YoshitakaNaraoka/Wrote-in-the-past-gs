function simulateWienerProcess(n) {
  var wienerProcess = [0]; // 初期値
  for (var i = 1; i < n; i++) {
    var randomValue = Math.random() * 2 - 1; // -1から1までの一様乱数
    var nextValue = wienerProcess[i-1] + randomValue;
    wienerProcess.push(nextValue);
  }
  
  return wienerProcess;
}

// ウィーナー過程のシミュレーション
var n = 100; // シミュレーションするデータ点の数
var wienerProcess = simulateWienerProcess(n);

// シミュレーション結果のログ出力
console.log(wienerProcess);

function cellchoice() {
  var ary1 = sheet.getRange("A1:B100").getValues();
  for (i=0; i<=ary1.length-1; i++) {
    ary1[i][2] = ary1[i][0] * ary1[i][1]
  }
  sheet.getRange("A1:B100").setValues(ary1);
}