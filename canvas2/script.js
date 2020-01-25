function repeatOften()
{
  requestAnimationFrame(repeatOften);
}
//requestAnimationFrame(repeatOften);
let firstCanvas = document.getElementById("firstCanvas");
let secondCanvas = document.getElementById("secondCanvas");
function drawCircle(canvas, event) { // draws a circle at mouse click location
    let rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    let context = canvas.getContext('2d');
    let circleSize = 10;
    let distanceBetweenCircles = 10;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath()
    context.moveTo(0, 0);
    context.lineTo(x-circleSize, y-circleSize);
    context.stroke();
    context.beginPath();
    context.arc(x-(circleSize/2), y-(circleSize/2), circleSize, 0 /* change this value to greater than 0 to make a hole in the circle of that size */, 2*Math.PI /* 2*Math.PI to make a full circle, 1*Math.PI to make a half circle*/);
    context.stroke();

    for(let index = x; index < 600; index+=distanceBetweenCircles)
    {
      context.beginPath();
      context.arc(index, y, circleSize, 0, 2*Math.PI);
      context.stroke();
    }

    console.log("x: " + x + " y: " + y)
}

secondCanvas.addEventListener('mousedown', function(e) {
    drawCircle(secondCanvas, e);
})
if (firstCanvas.getContext) // divide the canvas into eighths
{
  let context = firstCanvas.getContext('2d');
  // Reset the current path
  context.beginPath();
  // Staring point (10,45)
  context.moveTo(0,0);
  // End point (180,47)
  context.lineTo(600,600);
  // Make the line visible
  context.stroke();

  //context.beginPath();
  context.moveTo(600,0);
  context.lineTo(0,600);
  context.stroke();

  //context.beginPath();
  context.moveTo(300,0);
  context.lineTo(300, 600);
  context.stroke();

  //context.beginPath();
  context.moveTo(0, 300);
  context.lineTo(600, 300);
  context.stroke();
  let xValues = [];
  let distanceBetweenCircles = 5;
  let yPos = 75;
  let circleSize = 20;
  for(let x = 0; x < 600; x += distanceBetweenCircles) // make a line of circles
  {
    xValues.push(x);
  }
  for(let index = 0; index < (600/distanceBetweenCircles); index++)
  {
    context.beginPath();
    context.arc(xValues[index], yPos, circleSize, 0, 2*Math.PI);
    context.stroke();
  }
}

let square =
{
  name: "Square",
  size: 50,
  xPos: (firstCanvas.width/2),
  yPos: (firstCanvas.height/2),
  color: "red",
  draw: function(context) {
    context.rect(this.xPos-(this.size/2), this.yPos-(this.size/2), this.size, this.size);
    context.fillStyle = this.color;
    context.fill();
  }
}
square.draw(firstCanvas.getContext('2d'));
