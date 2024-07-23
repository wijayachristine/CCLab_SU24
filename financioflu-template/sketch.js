let angle = 45;
let sinInput = 0;
let x = 0;
let amp = 30;
let graphValues = [];

let weirdShapeX = [];
let weirdShapeY = [];
let weirdShapeScale = [];
let weirdShapeRotation = [];

let xLoc = [50, 300, 50, 600, 600];
let yLoc = [50, 200, 350, 350, 50];

let circlesPointX = []; 
let circlesPointY = []; 
let targets = []; 

let xArray = [];
let yArray = [];
let rotationArray = [];

let layersArray = [];
let radius = [];

let creatureTargetArray = [];
let deadArray = [];

let computerColors = ["blue","blue","blue","blue","blue"]; 
let computerChangeColor = [];

let locationX = [];
let locationY = [];

let countdownNum = 10; 
let interval = 60; 
let lastUpdate = 0; 

function setup() {
  createCanvas(800, 500);
  
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  
  background(0);
  
  for( let i = 0; i < 100; i++){
    locationX.push(random(0,width));
    locationY.push(random(0,height));
  }
  
  let angle = 0;
  for(let x = 30; x < 300; x+=20){
    for(let y = 130; y < height; y+=30){

      push();
      weirdShapeX.push(x);
      weirdShapeY.push(y);
      weirdShapeScale.push(random(0.2, 1));
      weirdShapeRotation.push(random(radians(angle)));

      arc(-20, -20, 5, 10, 0, PI);
      pop();

      angle+=30;
    }
  }

}

function draw() {
  background(0);
  
  //binary background 
  fill(255, 30);
  textSize(16);
  
  for(let i = 0; i < locationX.length; i++){
    text('01011', locationX[i], locationY[i]);
    text('10010', locationX[i]+60, locationY[i]);
    text('11000', locationX[i]+120, locationY[i]);
    text('00101', locationX[i]+180, locationY[i]);
  }
  
  if(frameCount < 600){
    push();
    drawIntroScreen();
    pop();
  }else{ 
        push();
        scale(0.5);
        nyseBuilding();
        weirdShapesBelowNYSE();
        pop();

        push();
        scale(0.5);
        graph();
        pop();
  
        clock();

        stairs();
  
        push();
        translate(250,175);
        scale(0.6);
        drawNetwork();
        pop();
      
  }
}

function drawIntroScreen(){
    noStroke();
    fill("white");
    rect(100,100, 600,300);
    fill("black");
    
    textSize(16);
    textFont('Akko Pro Medium');
    text("You are a stock broker!", 320,140);
    text("Every time you click the mouse,", 290, 160);
    text("you are making a stock trade.", 300, 180);
  
    text("Keep making stock trades to feed the creatures!", 250, 210);
    text("The creatures thrive in a high-activity environment.", 240, 230);
  
  
    text("Make sure to continue making stock trades.", 260, 260);
    text("The computers will turn pink if the trade goes through!", 230, 280);
  
  
   
    if (frameCount - lastUpdate >= interval) {
      if (countdownNum > 1) {
      countdownNum--; 
    }
      
    lastUpdate = frameCount; 
  }
  
  // Display the countdown number

  push();
  fill(0);
  textSize(20);
  text(countdownNum, 400,350);
  pop();

    push();
    fill('red');
      translate(100,100);
      rotate(0.5*PI);
      text('NYSENYSENYSENYSENYSENYSENYSE', 0,0);
    pop();
  
    push();
      fill('red');
      translate(100,100);
      text('NYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSE', 0,300);
    pop();
  
    push();
      fill('red');
      translate(700,400);
      rotate(1.5*PI);
      text('NYSENYSENYSENYSENYSENYSENYSE', 0,0);
    pop();
  
    push();
      fill('red');
      translate(700,100);
      rotate(1*PI);
    text('NYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSENYSE', 0,0);
    pop();
    
}

function graph(){
  stockNum();
  
  push();
  fill(255);
  rect(330, 98, 1100, 200);
  stroke(0, 0, 0, 80);
  line(330, 218, 1430, 218);
  pop();
  
  push();
  translate(330, -40);
  if(graphValues.length > 1095)
    graphValues.shift();
  
  let v = noise(frameCount*0.1);
  graphValues.push(v);

  for (let i = 1; i < graphValues.length; i++) {
    let x1 = i - 1;
    let y1 = map(graphValues[i - 1], 0,1, 150, 350);
    let x2 = i;
    let y2 = map(graphValues[i], 0, 1, 150, 350);

    if(y2 < y1){
      strokeWeight(2);
      stroke("green");
    }else{
      stroke("red"); 
    }
    
    line(x1, y1, x2, y2);
    
  }
  pop();
}

function stockNum(){
  push();
  fill(255);
  rect(330, 70, 120, 20);
  
  fill("red");
  noStroke();
  rect(330,70, 10, 20);
  
  fill("red");
  textSize(15);
  textFont('Akko Pro Medium');
  text('TSLA  -4.02%', 350, 85);
  pop();
  
  push();
  fill(255);
  rect(460, 70, 120, 20);
  
  fill("red");
  noStroke();
  rect(460, 70, 10, 20);
  
  fill("red");
  textSize(15);
  textFont('Akko Pro Medium');
  text('MSFT  -0.74%', 480, 85);
  pop();
  
  push();
  fill(255);
  rect(590, 70, 120, 20);
  
  fill("green");
  noStroke();
  rect(590, 70, 10, 20);
  
  fill("green");
  textSize(15);
  textFont('Akko Pro Medium');
  text('AAPL  +0.06%', 610, 85);
  pop();
  
  push();
  fill(255);
  rect(720, 70, 120, 20);
  
  fill("green");
  noStroke();
  rect(720, 70, 10, 20);
  
  fill("green");
  textSize(15);
  textFont('Akko Pro Medium');
  text('META  +0.2%', 735, 85);
  pop();
  
  push();
  fill(255);
  rect(850, 70, 120, 20);
  
  fill("red");
  noStroke();
  rect(850, 70, 10, 20);
  
  fill("red");
  textSize(15);
  textFont('Akko Pro Medium');
  text('AMZN  -0.34%', 865, 85);
  pop();
  
  push();
  fill(255);
  rect(980, 70, 120, 20);
  
  fill("red");
  noStroke();
  rect(980, 70, 10, 20);
  
  fill("red");
  textSize(15);
  textFont('Akko Pro Medium');
  text('NFLX  -1.51%', 995, 85);
  pop();
  
  push();
  fill(255);
  rect(1110, 70, 120, 20);
  
  fill("red");
  noStroke();
  rect(1110, 70, 10, 20);
  
  fill("red");
  textSize(15);
  textFont('Akko Pro Medium');
  text('CCLB  -0.31%', 1125, 85);
  pop();
  
  push();
  fill(255);
  rect(1240, 70, 120, 20);
  
  fill("green");
  noStroke();
  rect(1240, 70, 10, 20);
  
  fill("green");
  textSize(15);
  textFont('Akko Pro Medium');
  text('CYW  0.05%', 1255, 85);
  pop();
  
  push();
  fill(255);
  rect(1370, 70, 60, 20);
  
  fill(100);
  textSize(30);
  textFont('Akko Pro Medium');
  text('.......', 1372, 85);
  pop();
  
}

function clock(){
  push();
  let angleRad = radians(angle);
  
  push(); 
    translate(760, 40);
    rotate(angleRad);
    noStroke();
    fill(255);
    circle(0, 0, 5); 
    circle(0, 0, 60);
    stroke(0);
    line(0, 0, 15, 15);
  pop();
  
  push(); 
    translate(760, 40); 
    rotate(angleRad*2.5); 
    stroke(0);
    line(0, 0, 7.5, 7.5);
  pop();
  
  angle++;
  pop();
}

function nyseBuilding(){
  push();
  translate(0, 0);
  fill("#9AAAD9");
  textAlign(LEFT);
  textSize(80);
  textFont('Akko Pro Medium');
  text('NYSE', 50, 100);
  noStroke();
  rect(51, 98, 205, 410);
  pop();
}

function stairs(){
  push();
    translate(25.5, 250);
    noStroke();
    fill("#9AAAD9");
    rect(0,0,20,20);
    rect(0,20,40,20);
    rect(0,40,60,20);
    rect(0,60,80,40);
    rect(0,80,100,20);
    rect(0,100,120,20);
    rect(0,120,140,20);
    rect(0,140,160,20);
    rect(0,160,180,20);
    rect(0,180,200,20);
    rect(0,200,260,25);
  pop();
}

function weirdShapesBelowNYSE(){
  
  push();
  fill("black");
  for(let i = 0; i < weirdShapeX.length; i++) {
    push();
    //map so the translation isn't throughout the entire canvas   
    //           map(value, og min, og max, new min, new max)
    let scaledMouseX = map(mouseX, 0, width, -5, 5);
    let scaledMouseY = map(mouseY, 0, height, -5, 5);
    
    //draw the weird shapes imdyin
    //translate to the new coordinate by adding the old location+the scaled mouseX and Y locations
    translate(weirdShapeX[i] + scaledMouseX, weirdShapeY[i] + scaledMouseY);
    scale(weirdShapeScale[i]); 
    rotate(weirdShapeRotation[i]);
    
    arc(-20, -20, 5, 10, 0, 0.6*PI);
    pop();
  }
   pop();

}

function drawNetwork() {
  push();
  noStroke();
  fill("#9AAAD9");
  rect(0,0, 800, 500);
  pop();
  
  //create food every 1 second
  if(frameCount % 60 == 0){
     createFood();
  }
  
  // create new creature every 5 seconds == 60frames/min
  if( frameCount % 100 == 0){
    if(random()<0.3){
      createAddCreature();
    }
    
  }
  
  drawCables();
  
  makeFoodMove(); 
  drawFood();
  
  updateComputers();
  drawComputers();
  
  makeCreaturesEat();
  drawCreatures();
  
  
}

function createFood(){
   let invalidFood = -1;
  
    for(let i = 0; i < circlesPointX.length; i++){
      if(invalidFood == -1 && targets[i] == -1){
      invalidFood = i;
      }
    }

    let startPoint = int(random(0, xLoc.length));

    if(invalidFood == -1){
      // put a new x and y coordinate 
      circlesPointX.push(xLoc[startPoint] + 75);
      circlesPointY.push(yLoc[startPoint] + 50);
      // where the cirlce goes
      targets.push(int(random(0, xLoc.length)));
    }else {
      circlesPointX[invalidFood] = xLoc[startPoint] + 75;
      circlesPointY[invalidFood] = yLoc[startPoint] + 50; 
      targets[invalidFood] = int(random(0, xLoc.length));
    }
}

function createAddCreature(){
    xArray.push(random(0, width));
    yArray.push(random(0, height));
    rotationArray.push(random(-PI,PI));
    layersArray.push(0);
    deadArray.push(false); // creature start out alive
    radius.push(random(1, 2));
    creatureTargetArray.push(-1); //no food can be found
}

// make sure whenever a food becomes invalid, creatures no longer target it 
function makeFoodMove() {
  // update circles position
  for(let i=0; i < circlesPointX.length; i++) {
    let nextLocX = lerp(circlesPointX[i], xLoc[targets[i]] + 75, 0.003); 
    let nextLocY = lerp(circlesPointY[i], yLoc[targets[i]] + 50, 0.003);
    // previous position becomes new starting 
    circlesPointX[i] = nextLocX;
    circlesPointY[i] = nextLocY;
    
    // check if distance between the circle and the destination 
    if(dist(circlesPointX[i], circlesPointY[i], xLoc[targets[i]] + 75, yLoc[targets[i]] + 50) < 25) {
      
        // computerColors[targets[i]] = 'pink';
      
         if(computerColors[targets[i]] == 'blue')
          computerColors[targets[i]] = 'pink';
        
        computerChangeColor[targets[i]] = 0;
      
        //remove food after eaten
        circlesPointX[i] = -1000;
        circlesPointY[i] = -1000;
        targets[i] = -1; 
      
      // go through all available creature n if that creature target is the just marked invalid food, then the creature target will be set to -1
        for(let creature = 0; creature < xArray.length; creature++){
          if(creatureTargetArray[creature] == i){
            creatureTargetArray[creature] = -1; 
          }
        }
    }
  }
}

function makeCreaturesEat() {
  // update creature
  for(let i = 0; i < xArray.length; i++) {
    let dead = deadArray[i];
    let creatureTarget = creatureTargetArray[i];
    
    rotationArray[i] += radians(1); 
    
    if(dead == false && creatureTarget == -1){
      
      // look for new food
      let newTarget = int(random(circlesPointX.length));
      
      // new food is valid only if the food's target is not -1
      // -1 bc it is not a valid food then/ alrd eaten/ alr reached target comp
      if(targets.length > 0 && targets[newTarget] != -1){
        creatureTargetArray[i] = newTarget; 
        creatureTarget = newTarget; 
      } 
      return;
    }
    
    if(deadArray[i] == true) {
        creatureDeathMove();
    } else {

      let newCreatureLocX = lerp(xArray[i], circlesPointX[creatureTarget], 0.1);
      let newCreatureLocY = lerp(yArray[i], circlesPointY[creatureTarget], 0.1);

      xArray[i] = newCreatureLocX;
      yArray[i] = newCreatureLocY;
      
      // creature eat food
      //for creature to eat food, the distance between creature and the food has to be within 10
      if(dist(newCreatureLocX, newCreatureLocY, circlesPointX[creatureTarget], circlesPointY[creatureTarget]) < 10) {
        
        //not all food eaten 
        if(int(random(0,10)) < 3){
          creatureTargetArray[i] = -1; 
          return; //doesn't eat bc the target changes 
        }
        
        //remove food after eaten
        circlesPointX[creatureTarget] = -1000;
        circlesPointY[creatureTarget] = -1000;
        targets[creatureTarget] = -1; 

        creatureTargetArray[i] = -1;
        
         // go through all available creature n if that creature target is the just marked invalid food, then the creature target will be set to -1 - prevent issues when theres more than one creature 
        for(let creature = 0; creature < xArray.length; creature++){
          if(creatureTargetArray[creature] == creatureTarget){
            creatureTargetArray[creature] = -1; 
          }
        }
        
        layersArray[i] += 1;
        
        // creatures die after eating 15
        if(layersArray[i] > 15) {
          deadArray[i] = true;
          creatureTargetArray[i] = -1;    
        }
      }
    }
  }
  
}

function creatureDeathMove() {
    let pointOneX = -50;
    let pointOneY = 415;

  for (let i = 0; i < xArray.length; i++) {
    let x = xArray[i];
    let y = yArray[i];
    let dead = deadArray[i];
    
    // second stage of animation is -2
    let pointTwoX = int(random(-400, -300));
    let pointTwoY = int(random(100, -150));

    // creatureTargetArray initially used to check for food; now it is used to tell the program what state it is in; -1 move towards the base of the stairs
    if (dead && creatureTargetArray[i] == -1) {
      let nextX = lerp(x, pointOneX, 0.005);
      let nextY = lerp(y, pointOneY, 0.005);

      xArray[i] = nextX;
      yArray[i] = nextY;
      
      //after it moves to base of stairs, set target to -2 
      // if the target is -2: move up the building
      if (dist(nextX, nextY, pointOneX, pointOneY) < 10)
        creatureTargetArray[i] = -2;
    }

    if (dead && creatureTargetArray[i] == -2) {
      let nextX = lerp(x, pointTwoX, 0.005);
      let nextY = lerp(y, pointTwoY, 0.005);

      xArray[i] = nextX;
      yArray[i] = nextY;
      
    // if it's up the building: set target to -3
    // if it's -3: turn black
      if (dist(nextX, nextY, pointTwoX, pointTwoY) < 10)
        creatureTargetArray[i] = -3;
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
  push();
  for(let i=0; i<5; i++){
    fill(0);
     // scale the computers and the creatures back by mapping the y position 
//     let scaleFactor = map(yLoc[i], 0, 500, 0.1, 2);
   
//     translate(xLoc[i],yLoc[i]);
//     scale(scaleFactor);
    
    rect(xLoc[i],yLoc[i],150, 100);
    rect(xLoc[i]+60,yLoc[i]+100, 30,20);
    ellipse(xLoc[i]+75,yLoc[i]+120, 60,25);
    fill(computerColors[i]);
    
    rect(xLoc[i]+10,yLoc[i]+10,130,75);
  } 
   pop();
}

function updateComputers() {
  for(let i = 0; i < computerChangeColor.length; i++) {
    computerChangeColor[i] += 1;
    // 60 frames has passed
    if(computerChangeColor[i] == 60) {
      computerColors[i] = 'blue';
      computerChangeColor[i] = 0;
    }
  }
}

function drawCreatures() {
  for (let i = 0; i < xArray.length; i++) {
    if(creatureTargetArray[i] != -3) {
      xArray[i] += random(-1, 1);
      yArray[i] += random(-1, 1);
    }

    let r = radius[i];
    let x = xArray[i];
    let y = yArray[i];
    let l = layersArray[i];

    // draw starting from outermost layer inwards
    for (let j = l + 1; j >= 1; j--) {
      push();
      translate(x, y);
      // // scale the computers and the creatures back by mapping the y position
      // let scaleFactor = map(mouseY, 0, height, 0.5, 5);
      // scale(scaleFactor)
      if(creatureTargetArray[i] != -3) {
        rotate(rotationArray[i]);
      }
      noStroke(0);
      if(deadArray[i] == true && creatureTargetArray[i] == -3) {
        fill(0);
      } else {
        fill(random(255), random(255), random(255));
      }
      circle(-5, -5, (r + 0.5) * j);
      circle(-10, -10, (r + 1) * j);
      circle(-15, -15, (r + 1.5) * j);
      circle(0, 0, r * j);
      circle(5, 5, (r + 0.5) * j);
      circle(10, 10, (r + 1) * j);
      circle(15, 15, (r + 1.5) * j);
      pop();
    }
  }
}

function mousePressed(){

      createFood();
    }

// function keyPressed() {

