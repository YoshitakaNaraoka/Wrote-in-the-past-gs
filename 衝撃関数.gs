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
