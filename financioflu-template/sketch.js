let xLoc = [50, 300, 50, 600, 600];
let yLoc = [50, 200, 350, 350, 50];

let circlesPointX = []; 
let circlesPointY = []; 
let targets = []; 

let xArray = [];
let yArray = [];

let layersArray = [];
let radius = [];

let creatureTargetArray = [];
let deadArray = [];

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  
  let startPoint = int(random(0, xLoc.length));

  // put a new x and y coordinate 
  circlesPointX.push(xLoc[startPoint] + 75);
  circlesPointY.push(yLoc[startPoint] + 50);
  // where the cirlce goes
  targets.push(int(random(0, xLoc.length)));
  
  xArray.push(random(0, width));
  yArray.push(random(0, height));
  layersArray.push(0);
  deadArray.push(false); // creature start out alive
  radius.push(random(1, 2));
  creatureTargetArray.push(0);
}

function draw() {
  background(100);
  //create a circle every one second bc frameRate by default is 60
  if(circlesPointX.length < 50 && frameCount % 60 == 0) {
    let startPoint = int(random(0, xLoc.length));

    // put a new x and y coordinate 
    circlesPointX.push(xLoc[startPoint] + 75);
    circlesPointY.push(yLoc[startPoint] + 50);
    // where the cirlce goes
    targets.push(int(random(0, xLoc.length)));
  }
  
  makeCreaturesMove();
  makeFoodMove();

  drawCables();
  drawFood();
  drawComputers();
  drawCreatures();
  
  fill("white");
  text("You are a stock broker!", 320, 420);
  text("Everytime you click the mouse, more transactions show up, thus more creatures do too", 180, 435);
  text("Keep adding creatures for the stock market to continue moving!", 245, 450);
  
}

function makeFoodMove() {
  // update circles position
  for(let i=0; i < circlesPointX.length; i++) {
    let nextLocX = lerp(circlesPointX[i], xLoc[targets[i]] + 75, 0.005); 
    let nextLocY = lerp(circlesPointY[i], yLoc[targets[i]] + 50, 0.005);
    // previous position becomes new starting 
    circlesPointX[i] = nextLocX;
    circlesPointY[i] = nextLocY;
    
    // distance between the circle and the destination 
    if(dist(circlesPointX[i], circlesPointY[i], xLoc[targets[i]] + 75, yLoc[targets[i]] + 50) < 25) {
      let newStartPoint = int(random(0, xLoc.length));
  
      circlesPointX[i] = xLoc[newStartPoint] + 75;
      circlesPointY[i] = yLoc[newStartPoint] + 50;
      
      targets[i] = int(random(0, xLoc.length));
    }
  }
}

function makeCreaturesMove() {
  // update creature
  for(let i = 0; i < xArray.length; i++) {
    let dead = deadArray[i];
    let creatureTarget = creatureTargetArray[i];
    
    if(deadArray[i] == true) {
      yArray[i] += 1;
    } else {

      let newCreatureLocX = lerp(xArray[i], circlesPointX[creatureTarget], 0.1);
      let newCreatureLocY = lerp(yArray[i], circlesPointY[creatureTarget], 0.1);

      xArray[i] = newCreatureLocX;
      yArray[i] = newCreatureLocY;
      
      //creature eat food
      //for creature to eat food, the distance between creature and the food has to be within 10
      if(dist(newCreatureLocX, newCreatureLocY, circlesPointX[creatureTarget], circlesPointY[creatureTarget]) < 10) {
        
        let foodNewStartPoint = int(random(0, xLoc.length));
        
        circlesPointX[creatureTarget] = xLoc[foodNewStartPoint] + 75;
        circlesPointY[creatureTarget] = yLoc[foodNewStartPoint] + 50;

        layersArray[i] += 1;

        if(layersArray[i] > 10)
          deadArray[i] = true;
      }
    }
  }
  
}

function drawFood() {
    // draw circle 
  for(let i=0; i < circlesPointX.length; i++) {
    push();
    fill("white");
    circle(circlesPointX[i], circlesPointY[i], 20);
    pop();
  }
}

function drawCables() {
  // draw line
  for(let i=0; i<xLoc.length; i++) {
    for(let j=i+1; j < xLoc.length; j++) {
      line(xLoc[i] + 75, yLoc[i] + 50, xLoc[j] + 75, yLoc[j] + 50);
    }
  }
}

function drawComputers() {
  // make the rectangle
  for(let i=0; i<5; i++){
    fill(0);
    rect(xLoc[i],yLoc[i],150, 100);
  } 
}

function drawCreatures(){
  for(let i = 0; i < xArray.length; i++){
      xArray[i] += random(-1, 1);
      yArray[i] += random(-1, 1);
    
      let r = radius[i];
      let x = xArray[i];
      let y = yArray[i];
      let l = layersArray[i];

      // draw starting from outermost layer inwards
      for(let j = l + 1; j >= 1; j--) {
        push();
        noStroke(0);    
        fill(random(255), random(255), random(255));
        circle(x-5,y-5,(r+0.5)*j);
        circle(x-10, y-10,(r+1)*j);
        circle(x-15, y-15,(r+1.5)*j);
        circle(x,y,r*j);
        circle(x+5, y+5,(r+0.5)*j);
        circle(x+10, y+10,(r+1)*j);
        circle(x+15, y+15,(r+1.5)*j);
        pop();
      } 
  }
}

function mousePressed(){
  xArray.push(mouseX);
  yArray.push(mouseY);
  layersArray.push(0);
  deadArray.push(false); // creature start out alive
  radius.push(random(1,2));
  creatureTargetArray.push(int(random(circlesPointX.length)));
}
