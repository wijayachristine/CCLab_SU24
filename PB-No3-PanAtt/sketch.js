let eye; 
let heartImg; 

let heartBeatSound;
let rapidBreathSound;

let dizzy = [];
let numDizzy = 10; 

function preload(){
  heartImg = loadImage("assets/heart.png");

  heartBeatSound = loadSound("assets/rapid-heartbeat.wav");
  rapidBreathSound = loadSound("assets/rapid-breathing.wav");

}

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-cousin");

    colorMode(HSB);

    eye = new Eye(width/2,height/2);
    heart = new Heart(width/2+125, height/2, heartImg);

    for(let i = 0; i < numDizzy; i++){
      dizzy.push(new Dizzy(20, random(150,250)));
     
    
  }
}
  
  function draw() {

    let hue = (frameCount * 2) % 360;
    let sat = 100;
    let b = 100; 

    // let r = map(sin(time), -1, 1, 0, 255);
    // let g = map(cos(time), -1, 1, 0, 255);
    // let b = map(sin(time+PI/3), -1, 1, 0, 255);

    background(hue, sat, b);

    //eye pupil
    eye.display();
    eye.update();

    // heart
    heart.display();
    heart.update();

    //rapid breathing
    for(let i = 0; i < dizzy.length; i++){
      dizzy[i].display();
      dizzy[i].update();
    }


  }


  class Eye {
    constructor(startX, startY){
      this.x = startX;
      this.y = startY;
      this.xSpeed = 5;
      this.ySpeed = 5; 

    }
    update(){

      this.x += this.xSpeed;
      this.y += this.ySpeed;

      //make it move and vibrate
        if(this.x > 120 || this.x < 120){
          this.xSpeed = -this.xSpeed;
        }if(this.y > 350 || this.y < 50){
          this.ySpeed = -this.ySpeed;
        }
    
    }

    display(){
      push();
      translate(this.x, this.y);

      noStroke();
      fill("brown");
      circle(0,0, 100);

      fill("black");
      circle(0,0, 30);

      fill("white");
      circle(0, 0, 10);

        push();
          stroke(92,64,51,60);
          strokeWeight(2);

          for(let i = 0; i < 30; i++){
            let angle = i * 2*PI / 30;
            let x = cos(angle)*50;
            let y = sin(angle)*50;
            line(x,y, x*0.4, y*0.4);
          }

        pop();

        push();
        stroke(128,128,128,80);
        strokeWeight(2);

        for(let i = 0; i < 18; i++){
          let angle = i * 2*PI / 18 //divide circle 
          let x = cos(angle) * 15; 
          let y = sin(angle) * 15; 
          line(x,y, x*0.5, y*0.5); 
        }
        pop();
      pop();
    }
  }

  class Heart {
    constructor(startX, startY, createImg){
      this.x = startX;
      this.y = startY;

      this.size = 50;
      this.growthRate = 1.2; 
      this.maxSize = 80;
      this.minSize = 50;

      this.photo = createImg;

    }

    update(){

      this.size += this.growthRate;

      if(this.size > this.maxSize || this.size < this.minSize){
        this.growthRate = -this.growthRate;
      }
    }

    display(){
      push();
      translate(this.x, this.y);

      image(this.photo, -this.size/2, -this.size/2, this.size, this.size);

      // let heartW = this.size; 
      // let heartH = this.size; 

      // fill("red");
      // noStroke();
      // beginShape();
      

      // vertex(this.x,this.y - heartH / 4);
      // bezierVertex(this.x - heartW/2, this.y-heartH/2, this.x-heartW/2, this.y+heartH/2, this.x, this.y+heartH/2);
      // bezierVertex(this.x+heartW/2, this.y+heartH/2, this.x+heartW/2, this.y-heartH/2, this.x, this.y-heartH/4);
      // endShape(CLOSE);
      pop();
    }
  }

  class Dizzy {
    constructor(startX, startY, movingRight){
      this.x = startX;
      this.y = startY; 

      this.angle = random(0,2*PI);
      this.rectWidth = 65;
      this.rectHeight = 8; 
      this.angleIncrement = random(0.03, 0.06);
      this.widthChange = random(20,60);

      this.speed = 2; 
     
    }

    update(){

      this.angle += this.angleIncrement;
      this.rectWidth = 65 + sin(this.angle) * this.widthChange;
      
      }
    

    display(){

        noStroke();
        fill(255);
        rect(this.x, this.y, this.rectWidth, this.rectHeight);
    }
  }

  function mousePressed(){
    if(heartBeatSound){
      heartBeatSound.loop();
    }if(rapidBreathSound){
      rapidBreathSound.loop();
    }
  }
    // rapidBreathSound.play();







  
