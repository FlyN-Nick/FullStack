;(function () {
  console.log('What does this do')
})()

function repeatOften()
{
  let context = secondCanvas.getContext('2d');
  //context.clearRect(0, 0, canvas.width, canvas.height);
  if(!thirdAnimation)
  {
    if(!firstOrSecond)
    {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(firstX, firstY);
      context.stroke();
      firstX++;
      firstY++;
      if(firstX == 301)
      {
        firstX=0;
        firstY=0;
        firstOrSecond = true;
      }
    }
    else
    {
      context.beginPath();
      context.moveTo(300, 0);
      context.lineTo(secondX, secondY);
      context.stroke();
      secondX--;
      secondY++;
      if(secondX == -1)
      {
        resetValues();
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
  else
  {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(firstXAndYArray[indexer], firstXAndYArray[indexer]);
    context.stroke();
    context.moveTo(300, 0);
    context.lineTo(secondXArray[indexer], firstXAndYArray[indexer]);
    indexer--;
    if(indexer == -1)
    {
      thirdAnimation = false;
    }
  }
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);

let canvas = document.getElementById('firstCanvas');
let secondCanvas = document.getElementById('secondCanvas');
let firstX = 0;
let firstY = 0;
let secondX = 300;
let secondY = 0;
let firstOrSecond = false;
let thirdAnimation = false;
let firstXAndYArray = [];
let secondXArray = [];
let indexer = 300;
function resetValues()
{
  firstOrSecond = false;
  thirdAnimation = true;
  firstX = 0;
  firstY = 0;
  secondX = 300;
  secondY = 0;
  indexer = 300;
  for(let int i = 0; i < 301; i++)
  {
    firstXAndYArray.push(i);
  }
  for(let int i = 300; i > -1; i--)
  {
    secondXArray.push(i);
  }
}
if (canvas.getContext)
{
  let context = canvas.getContext('2d');
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
  for(let x = 0; x < 200; x += 10)
  {
    context.beginPath();
    context.arc(x, 75, 5, 0, 2*Math.PI);
    context.stroke();
  }
}
