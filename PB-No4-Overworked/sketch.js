let computerImg; 
let paperStackImg; 
let whiteNotesImg; 
let pinkNotesImg; 
let blueNotesImg; 
let greenNotesImg; 
let typingSound; 
let officeSound; 

let computer1;
let keyboard1;

function preload(){
  computerImg = loadImage("assets/computer.png");
  paperStackImg = loadImage("assets/paperStack.png");
  whiteNotesImg = loadImage("assets/whiteNotes.png");
  pinkNotesImg = loadImage("assets/pinkNotes.png");
  blueNotesImg = loadImage("assets/blueNotes.png");
  greenNotesImg = loadImage("assets/greenNotes.png");
  officeSound = loadSound("assets/busyoffice.mp3");
}

function setup() {
    let cnv = createCanvas(1400, 800);
    cnv.parent("canvas-cousin");

    computer1 = new Computer(540,110);
    // keyboard1 = new Keyboard(500,700);

    textSize(28);
    textFont('Georgia');
    
  }
  
  function draw() {
    background("grey");

    quad(0, 800, 200, 400, 1400, 400, 1400, 800);

    computer1.display();

    comp();
    paper();
    notes();

    // keyboard.display();
  }

  function keyPressed(){
      if(officeSound.isPlaying() == false){
        officeSound.loop();
    }
    computer1.update();
    // keyboard1.update();
  }

  function keyReleased(){
    if(typingSound.isPlaying() == true){
      typingSound.stop();
      tpingSound.isPlaying == false;
  }
  }

  class Computer {
    constructor(startX, startY){
      this.x = startX;
      this.y = startY;

      this.actualText = "I’ve always been someone who cherished my free time, savoring moments of relaxation and personal space. Yet, I found myself gradually ensnared by the relentless pull of hustle culture. In an effort to escape my challenges and discomforts, I threw myself into an endless cycle of productivity. Every waking hour was consumed by schoolwork, extracurricular activities, and a constant drive to achieve. On the surface, my dedication seemed commendable. I excelled academically and triumphed in various activities, earning accolades and recognition. However, beneath the facade of success, my health began to unravel. The relentless pace left me with little time for rest or self-care. Sleep became a rare commodity, and I don't recall ever enjoying more than five hours of rest each night. As I achieved more, I realized that my well-being was deteriorating. The intense focus on external accomplishments had led to a significant internal cost. It was only through this process that I came to understand the importance of balance—recognizing that true success encompasses not just achievements but also my health and well-being.";
      this.wordIndex = 0; 
      this.showText = ""; //empty string to show it 
    }

    update(){
        // the index is still smaller than the length of the entire paragraph, it will continue producing texts
        if(this.wordIndex < this.actualText.length){
          this.showText += (this.actualText[this.wordIndex] + ' '); //show the new text plus the old one
          this.wordIndex++; //add one everytime
        }

        // if(this.showText.length>501){
        //   this.showText = this.showText.substring(1, this.showText.length-1)
        // }

    }
    display(){
      push();
      fill(29,29,29);
      rect(this.x, this.y, 725, 415);
      fill(255);
      textSize(14);
      text(this.showText, this.x+15, this.y+15, 705, 395)
      pop();
    }
  }

  class Keyboard {
    constructor(startX, startY){
      this.x = startX;
      this.y = startY;

      this.keyW = 50;
      this.keyH = 30;

      this.keySpaceX = 10;
      this.keySpaceY = 10; 

      this.rows = 5;
      this.columns = 15; 
      this.move = 10; 

      this.keys = [];
    }


    update(){
      this.x += random(-this.move, this.move);
      this.y += random(-this.move, this.move);
    }

    display(){

      fill(255);
      strokeWeight(2);
      for(let i = 0; i < this.rows; i++){
        for(let j = 0; j < this.columns; j++){
          let keyX = this.x + j * (this.keyW + this.keySpaceX);
          let keyY = this.y + i * (this.keyH + this.keySpaceY);
          rect(keyX, keyY, this.keyW, this.keyH);
        }
      }
      pop();
    }
  }

  function comp(){
   
    push();
    translate(900, 700);
    fill('red');
    circle(0,0,10);
    scale(0.4);
    image(computerImg, -1200,-1600);

    pop();

  }

  function paper(){
    push();
    translate(100, 700);
    fill('red');
    circle(0,0,10);
    scale(0.4);
    image(paperStackImg, -650, -1750);

    pop();
  }

  function notes(){

    push();
    translate(530,570);
    scale(0.05);
    image(blueNotesImg, -400,-400);
    pop();

    push();
    translate(620,570);
    scale(0.05);
    image(pinkNotesImg,-400,-400);
    pop();

    push();
    translate(710,570);
    scale(0.05);
    image(whiteNotesImg, -400,-400);
    pop();

    push();
    translate(800,570);
    scale(0.05);
    image(greenNotesImg, -400,-400);
    pop();

    push();
    translate(890,570);
    scale(0.05);
    image(blueNotesImg, -400,-400);
    pop();

    push();
    translate(980,570);
    scale(0.05);
    image(pinkNotesImg,-400,-400);
    pop();

    push();
    translate(1070,570);
    scale(0.05);
    image(whiteNotesImg, -400,-400);
    pop();

    push();
    translate(1160,570);
    scale(0.05);
    image(pinkNotesImg, -400,-400);
    pop();
  }


