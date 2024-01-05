
/**
 * 1次元セル・オートマトンを実行するカスタム関数
 * @param {string} rule ルール（Wolframコード）
 * @param {number} numGenerations 世代数
 * @return {Array} セルの状態を格納した配列
 */


function simulateCellularAutomaton(rule, numGenerations) {
  var numCells = 100; // セルの数
  arr; // セルの状態を格納する配列

  // 初期状態の設定
  for (var i = 0; i < numCells; i++) {
    if (i === Math.floor(numCells / 2)) {
      arr[i] = 1; // 初期状態の中央のセルを生存とする
    } else {
      arr[i] = 0; // それ以外のセルを死亡とする
    }
  }

  // ルールに基づいて状態を更新
  for (var generation = 0; generation < numGenerations; generation++) {
    arr;
    for (var i = 0; i < numCells; i++) {
      var left = arr[(i + numCells - 1) % numCells];
      var center = arr[i];
      var right = arr[(i + 1) % numCells];
      arr[i] = applyRule(left, center, right, rule);
    }
  }

  return arr[i];
}


/**
 * ルールに基づいて次の状態を計算する関数
 * @param {number} left 左隣のセルの状態
 * @param {number} center 中央のセルの状態
 * @param {number} right 右隣のセルの状態
 * @param {string} rule ルール（Wolframコード）
 * @return {number} 次の状態
 */


function applyRule(left, center, right, rule) {
  return parseInt(rule.charAt(parseInt(left + center + right, 2)));
}