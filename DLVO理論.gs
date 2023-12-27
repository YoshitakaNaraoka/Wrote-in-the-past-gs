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
}