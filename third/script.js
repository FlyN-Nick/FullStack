function repeatOften()
{
  requestAnimationFrame(repeatOften);
}
//requestAnimationFrame(repeatOften);
let firstCanvas = document.getElementById("firstCanvas");
let secondCanvas = document.getElementById("secondCanvas");
let shapeArray = [];
let shapeHeight = 100;
let shapeWidth = 100;
let shapesColor = "red";
let context = firstCanvas.getContext('2d');
let firstRow = ["Q", "W", "E", "R", "T", "Y", "U"];
let secondRow = ["A", "S", "D", "F", "G", "H", "J"];
let thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

document.onkeypress = function (e) 
{ // drawing with the keyboard
    e = e || window.event;
    //alert(typeof e.code.charAt(3));
    if (firstRow.includes(e.code.charAt(3)))
    {
      let xPos = getIndex(firstRow, e.code.charAt(3))*100;
      new Square(xPos, 0, shapeWidth, shapeHeight, shapesColor).draw(context);
    }
    else if (secondRow.includes(e.code.charAt(3)))
    {
      let xPos = getIndex(secondRow, e.code.charAt(3))*100;
      new Square(xPos, shapeHeight, shapeWidth, shapeHeight, shapesColor).draw(context);
    }
    else if (thirdRow.includes(e.code.charAt(3)))
    {
      let xPos = getIndex(thirdRow, e.code.charAt(3))*100;
      new Square(xPos, shapeHeight*2, shapeWidth, shapeHeight, shapesColor).draw(context);
    }
    else if (e.code.charAt(5) == "1")
    {
      console.log("Canvas Cleared");
      firstCanvas.getContext('2d').clearRect(0, 0, firstCanvas.width, firstCanvas.height);
      //new Square(0, 0, 700, 300, "white").draw(context);
    }
    else
    {
      console.log("INVALID KEY");
    }
};
function getIndex(array, letter)
{
  for(let i = 0; i < array.length; i++)
  {
    if (array[i] == letter)
    {
      return i;
    }
  }
  return -1;
}
function Square(xPos, yPos, width, height, color) 
{
  this.name = "Square";
  this.width = width;
  this.height = height;
  this.xPos = xPos;
  this.yPos = yPos;
  this.color = color;
  this.draw = function(context) 
  {
    context.rect(this.xPos, this.yPos, this.width, this.height);
    context.fillStyle = this.color;
    context.fill();
  }
}
/*function Circle(size, xPos, yPos)
{
  this.name = "Circle";
  this.size = size;
  this.xPos = xPos;
  this.yPos = yPos;
  this.draw = function(context) 
  {
    context.arc((this.xPos-(this.size/2)), (this.yPos-(this.size/2)), this.size, 0/* change this value to greater than 0 to make a hole in the circle of that size *///, 2*Math.PI /* 2*Math.PI to make a full circle, 1*Math.PI to make a half circle*/);
  //}
//}
//new Circle(shapesSize, ((firstCanvas.width/2)-(shapesSize/2)), ((firstCanvas.height/2)+(shapeSize/2))).draw(context);
