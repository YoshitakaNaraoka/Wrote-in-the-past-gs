/*
function poissonDistribution(lambda, n) {
  var lambda = 5;
  var n = 100;
  var numerator = Math.exp(-lambda) * Math.pow(lambda, n);
  var denominator = factorial(n);
  var probability = numerator / denominator;
  var rangeactivate = sheet_PoissonDistribution.getRange(100,2,1).activate();
  sheet_PoissonDistribution.getActiveRangeList().setValue(probability);
  //poissonDistribution.push(probability);
  //Logger.log("P(X = " + x + ") = " + probability);
  return numerator;
}



function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

sheet_PoissonDistribution.getRange('A1').activate();
sheet_PoissonDistribution.getCurrentCell().setFormula('=SEQUENCE(100,1,0,1)');
const sheetgetrange5 = sheet_PoissonDistribution.getRange(1,1,n).activate();
const sheetgetrange6 = sheet_PoissonDistribution.getRange(1,2,n).activate();

var chart_PoissonDistribution = sheet_PoissonDistribution.newChart()
  .asLineChart()
  .addRange(sheetgetrange5)
  .addRange(sheetgetrange6)
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(false)
  .setNumHeaders(0)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('useFirstColumnAsDomain', true)
  .setOption('isStacked', 'false')
  .setPosition(10, 3, 17, 16)
  .build();
  sheet_PoissonDistribution.insertChart(chart_PoissonDistribution);

/*
function testPoissonDistribution() {
  var probability = poissonDistribution(lambda, x);
  
}
*/