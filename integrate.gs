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
}

  let n_integrateStepSize = 300;
  let degree = 6;
  var integrateProcess = simulateIntegrateProcess(n_integrateStepSize);
  
  sheet_integrate.getRange('D2').activate();
  sheet_integrate.getCurrentCell().setFormula('=SEQUENCE("'+n_integrateStepSize+'",1,0,1)');
  