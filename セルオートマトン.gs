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
      var left = cells[(i + numCells - 1) % numCells];
      var center = cells[i];
      var right = cells[(i + 1) % numCells];
      newCells[i] = applyRule(left, center, right, rule);
    }
    cells = arr;
  }

  return cells;
}

// セル・オートマトンの実行
var rule = "110"; // ルール（Wolframコード）
var numGenerations = 20; // 世代数

var automaton = simulateCellularAutomaton(rule, numGenerations);

// 結果の表示
console.log(automaton.join(""));
