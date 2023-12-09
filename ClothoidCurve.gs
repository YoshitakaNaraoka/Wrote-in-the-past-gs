/*function drawClothoidCurve(a, b, stepSize) {
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
*/