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