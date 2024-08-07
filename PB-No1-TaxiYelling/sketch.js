let creature1;
let creature2; 
let backgroundImg; 
let creature1Img;
let creature2Img;
let narration; 

let clothesline;

let useless; 
let investment;
let laji; 
let actmature;
let everything; 
let startFrame;

let sizeChange = 1; 
let maxSize = 300;
let minSize = 20; 

function preload(){
    backgroundImg = loadImage("assets/backgroundtaxi.jpg");
    creature1Img = loadImage("assets/child.png");
    creature2Img = loadImage("assets/adult.png");

    clothesline = loadImage("assets/clothes.png");
    useless = loadImage("assets/useless.png"); 
    investment = loadImage("assets/investment.png");
    laji = loadImage("assets/trash.png");
    actmature = loadImage("assets/act-mature.png");
    everything = loadImage("assets/everything.png");

    narration = loadSound("assets/sketch1-taxi.mp3");

}

function setup() {
    let cnv = createCanvas(1200, 800);
    cnv.parent("canvas-cousin");

    let initSize1 = 100;
    let initSize2 = 200;

    startFrame = frameCount; 

    creature1 = new Creature(250, 250, initSize1, creature1Img, 2.6);
    creature2 = new Creature(100, 140, initSize2, creature2Img, 1.3);
   
  }
  
  function draw() {
    background(backgroundImg);

      textSize(20);
      text("Press the 'w' key", 10, 30);
  

    if(keyIsPressed){
      if(narration.isPlaying() == false){
        narration.play();
      }
    }
    
    if(keyIsPressed){
      if(key === 'w'){
        creature1.update(-sizeChange);
          creature2.update(sizeChange);
      }
      }
      
    if(keyIsPressed){
      if(key === 's'){
        creature1.update(sizeChange);
        creature2.update(-sizeChange);
      }
    }


    creature1.display();
    creature2.display();

    if(frameCount - startFrame >= 600){
      push();
      scale(0.5);
      image(clothesline, 0, 10);
      pop();
    }

    if(frameCount - startFrame >= 2000){
      push();
      scale(0.1);
      image(useless, 750, 5600);
      pop();
    }
    
    if(frameCount - startFrame >= 2460){
      push();
      scale(0.1);
      image(investment, 2150, 5500);
      pop();
    }
     
    if(frameCount - startFrame >= 3000){
      push();
      scale(0.1);
      image(laji, 3900, 5950);
      pop();
    }
    if(frameCount - startFrame >= 3600){
      push();
      scale(0.1);
      image(actmature, 6050, 5600);
      pop();
    }

    if(frameCount - startFrame >= 4380){
      push();
      scale(0.1);
      image(everything, 7600, 5300);
      pop();
    }
    
  }

  class Creature {
    constructor(startX, startY, initSize, createImg, scaleFactor){
      this.x = startX;
      this.y = startY; 

      this.size = initSize;  
      this.photo = createImg;
      this.scaleFactor = scaleFactor;

    }

    update(amount){
      //grow 
      this.size += amount; 
      if(this.size > maxSize){
        this.size = maxSize;
      }
      if(this.size < minSize){
        this.size = minSize; 
      }
    }

    display(){
      push();
      noStroke();
      translate(this.x, this.y+10);
      scale(this.scaleFactor);
      // fill('red');
      // rect(this.x, this.y+10, this.size, this.size);
      image(this.photo, -this.size/2, -this.size/2, this.size, this.size); 

      pop();
    }
  }


  function textBoxes(){
    push();

    textSize()

    pop();
  }

  
