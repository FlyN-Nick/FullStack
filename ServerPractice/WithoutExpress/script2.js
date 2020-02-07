// the different canvases 
let firstCanvas = document.getElementById("firstCanvas");
let secondCanvas = document.getElementById("secondCanvas");
let thirdCanvas = document.getElementById("thirdCanvas");

//array of squares on the first canvas
let shapeArray = [];

//size of each square when drawing with the keyboard
let shapeHeight = 100;
let shapeWidth = 100;

//for generating random color
let hexLetters = "0123456789ABCDEF";

let context = firstCanvas.getContext('2d');

// for drawing with the keyboard
let firstRow = ["Q", "W", "E", "R", "T", "Y", "U"];
let secondRow = ["A", "S", "D", "F", "G", "H", "J"];
let thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

// for the use of the third drawing canvas
let locationArray = [];

// drawing with the keyboard for first canvas 
document.onkeypress = function(e) 
{ 
    e = e || window.event;
    if (firstRow.includes(e.code.charAt(3))) // if it's the first row of keys
    {
      let xPos = getIndex(firstRow, e.code.charAt(3))*100;
      if (checkDuplicateSquare(xPos, 0))
      {
        return;
      }
      let square = new Square(xPos, 0, shapeWidth, shapeHeight, randomColorGenerator(), false);
      shapeArray.push(square);
      context.clearRect(0, 0, context.width, context.height);
      drawSquares(shapeArray, context);
    }
    else if (secondRow.includes(e.code.charAt(3))) // if it's the second row of keys
    {
      let xPos = getIndex(secondRow, e.code.charAt(3))*100;
      if (checkDuplicateSquare(xPos, shapeHeight))
      {
        return;
      }
      let square = new Square(xPos, shapeHeight, shapeWidth, shapeHeight, randomColorGenerator(), false);
      shapeArray.push(square);
      context.clearRect(0, 0, context.width, context.height);
      drawSquares(shapeArray, context);
    }
    else if (thirdRow.includes(e.code.charAt(3))) // if it's the third row of keys
    {
      let xPos = getIndex(thirdRow, e.code.charAt(3))*100;
      if (checkDuplicateSquare(xPos, shapeHeight*2))
      {
        return;
      }
      let square = new Square(xPos, shapeHeight*2, shapeWidth, shapeHeight, randomColorGenerator(), false);
      shapeArray.push(square);
      context.clearRect(0, 0, context.width, context.height);
      drawSquares(shapeArray, context);
    }
    else if (e.code.charAt(5) == "1") // the first canvas is cleared when 1 is pressed 
    {
      firstCanvas.getContext('2d').clearRect(0, 0, firstCanvas.width, firstCanvas.height);
      shapeArray = [];
    }
    else if (e.code.charAt(5) == "2") // the second canvas is cleared when 2 is pressed 
    {
      secondCanvas.getContext('2d').clearRect(0, 0, secondCanvas.width, secondCanvas.height);
    }
    else if (e.code.charAt(5) == "3") // the third canvas is cleared when 3 is pressed 
    {
      thirdCanvas.getContext('2d').clearRect(0, 0, thirdCanvas.width, thirdCanvas.height);
    }
    else
    {
      console.log("ErRoR: INVALID KEY");
    }
};

// gets the index of an element in an array
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

// square object with black or white gradient
function Square(xPos, yPos, width, height, color, gradient) 
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
    let myGradient = context.createLinearGradient(0, 0, 0, 300);
    myGradient.addColorStop(0, this.color);
    if (gradient)
    {
      myGradient.addColorStop(1, "white");
    }
    else
    {
      myGradient.addColorStop(1, "black");
    }
    context.fillStyle = myGradient;
    context.fill();
  }
  this.returnX = function()
  {
    return this.xPos;
  }
  this.returnY = function()
  {
    return this.yPos;
  }
}

// draws a square at the mouse down location for second canvas 
function draw(canvas, event) 
{ 
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let context = canvas.getContext('2d');
  let square = new Square(x-1, y-1, 2, 2, randomColorGenerator(), true);
  square.draw(context);
}

// same as the above function except it returns x & y which is used to draw a line for third canvas 
function lineDraw(canvas, event) 
{ 
  /* 
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = Math.floor(event.clientY - rect.top);
  let context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(oldMouseX, oldMouseY);
  context.lineTo(x, y);
  context.lineWidth = 2;
  context.strokeStyle = randomColorGenerator();
  context.stroke();
  oldMouseX = x;
  oldMosueY = y;*/
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let context = canvas.getContext('2d');
  let square = new Square(x-1, y-1, 2, 2, randomColorGenerator(), true);
  square.draw(context);
  return [x, y];
}

// generates a random color represented as hex
function randomColorGenerator() 
{ 
  let color = "#";
  for (let i = 0; i < 6; i++)
  {
    color += hexLetters[Math.floor(Math.random()*16)];
  }
  return color;
}

// checks if a square with the same location is already in the shapeArray
function checkDuplicateSquare(x, y) 
{
  for (let index = 0; index < shapeArray.length; index++)
  {
    if (shapeArray[index].returnX() == x && shapeArray[index].returnY() == y)
    {
      return true;
    }
  }
  return false;
}

// draws all the squares in the shapeArray 
function drawSquares(array, context)
{
  for(let i = 0; i < array.length; i++)
  {
    array[i].draw(context);
  }
}

// event listeners for drawing 
secondCanvas.addEventListener('mousedown', function(e) 
{
  draw(secondCanvas, e);
})

secondCanvas.addEventListener('mousemove', function(e) 
{
  if (e.which == 1)
  {
    draw(secondCanvas, e);
  }
})

thirdCanvas.addEventListener('mousedown', function(e) 
{
    locationArray = []
    locationArray.push(lineDraw(thirdCanvas, e));
})

thirdCanvas.addEventListener('mousemove', function(e) 
{
    if (e.which == 1)
    {
      locationArray.push(lineDraw(thirdCanvas, e));
      let context = thirdCanvas.getContext('2d');
      context.beginPath;
      context.moveTo(locationArray[locationArray.length-2][0], locationArray[locationArray.length-2][1]);
      context.lineTo(locationArray[locationArray.length-1][0], locationArray[locationArray.length-1][1]);
      context.lineWidth = 2; 
      let myGradient = context.createLinearGradient(0, 0, 0, 300);
      myGradient.addColorStop(0, randomColorGenerator());
      myGradient.addColorStop(1, "white");
      context.strokeStyle = myGradient;
      context.stroke();
      if (locationArray.length >= 4)
      {
        locationArray = [locationArray[locationArray.length-3], locationArray[locationArray.length-2], locationArray[locationArray.length-1]];
      }
    }
})

thirdCanvas.addEventListener('mouseup', function(e) 
{
  locationArray = []
})
