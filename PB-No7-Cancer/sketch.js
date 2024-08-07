let mri;
let mri2;
let body1;
let mriImg; 
let newMriImg1; 
let mriCompImg; 
let cnoduleImg;
let calImg;
let mri2ndhalfImg;
let mribgImg;
let meImg;

let mriSound;
let calSound; 
let greenButtonSound;
let redButtonSound;

let showImage = false; 
let moveBlockRight = false; 
let moveBlockLeft = false; 

function preload(){
  mriImg = loadImage("assets/mri.png");
  mriCompImg = loadImage("assets/mricomp.png");
  cnoduleImg = loadImage("assets/cancer-nodule.png");
  calImg = loadImage("assets/calendar.png");
  mri2ndhalfImg = loadImage("assets/mri2ndhalf.png");
  mribgImg = loadImage("assets/mribg.jpg");
  meImg = loadImage("assets/me.png");

  mriSound = loadSound("assets/p2-MRIscan.mp3");
  calSound = loadSound("assets/P3-Cal.mp3");
  greenButtonSound = loadSound("assets/p1-greenbutton.mp3");
  redButtonSound = loadSound("assets/p1-redbutton.mp3");

}

function setup() {
    let cnv = createCanvas(1450, 820);
    cnv.parent("canvas-cousin");

    mri = new MRI(1650,100, mriImg, 0.35);
    mri2 = new MRI(-600, 400, mriCompImg, 0.4);
    body1 = new Body(650, 320, meImg);

    mri2ndhalf = new MRI (1650, 100, mri2ndhalfImg, 0.35);

    colorMode(HSB);
  
  }

  
function draw() {
    background(mribgImg);

    // note to self: only shows up whenever its pressed
    // if(mouseIsPressed){
    //   if(mouseX > 270 && mouseX < 435 &&
    //     mouseY > 285 && mouseY < 415){
    //   push();
    //   scale(0.08);
    //   image(cnoduleImg, 237/0.08, 280/0.08);
    //   pop();
    // }
    // }

    mri.display();
    mri2.display();


    if(showImage == true){
      push();
      scale(0.08);
      image(cnoduleImg, 237/0.08, 280/0.08);
      pop();
    }
    
    

    greenButton();
    cal();

    body1.display();
    body1.update();
    
    mri2ndhalf.display();

    redButton();

    
  }

function mousePressed(){
    if(mouseX > 270 && mouseX < 435 &&
      mouseY > 285 && mouseY < 415){
    showImage = true;
  }if(showImage == true){
    if(mriSound.isPlaying() == false){
      mriSound.play();
      calSound.stop();
      greenButtonSound.stop();
      redButtonSound.stop();
    }
  }


    if(mouseX > 30 && mouseX < 210 &&
        mouseY > 27 && mouseY < 197){
          if(calSound.isPlaying() == false){
            calSound.play();
            mriSound.stop();
            greenButtonSound.stop();
            redButtonSound.stop();
          }
        }
  
    //for the green button
    let greenCircleX = 992;
    let greenCircleY = 314;
    let greenCircleRad = 20;
    let greenD = dist(mouseX, mouseY, greenCircleX, greenCircleY);

    if(greenD < greenCircleRad){
      moveBlockRight = true; 
      moveBlockLeft = false; 
      if(greenButtonSound.isPlaying() == false){
        greenButtonSound.play();
        mriSound.stop();
        calSound.stop();
        redButtonSound.stop();
      }
    }

    //for the red button 
    // circle(1240, 388, 20);
    let redCircleX = 1240; 
    let redCircleY = 388;
    let redCircleRad = 20; 
    let redD = dist(mouseX, mouseY, redCircleX, redCircleY);

    if(redD < redCircleRad){
      moveBlockLeft = true; 
      moveBlockRight = false; 
      if(redButtonSound.isPlaying() == false){
        redButtonSound.play();
        mriSound.stop();
        calSound.stop();
        greenButtonSound.stop();
      }
    }
  }

  class MRI {
    constructor(startX, startY, createImg, scaleF){
      this.x = startX;
      this.y = startY; 
      this.scaleFactor = scaleF;

      this.photo = createImg; 

      this.imgW = this.photo.width;
      this.imgH = this.photo.height; 

    }

    display(){
      push();
      scale(this.scaleFactor);
      // rect(this.x, this.y, this.imgW, this.imgH);
                  // 2388     1688 
      // console.log(this.imgW, this.imgH);
      // console.log(mouseX, mouseY);
      image(this.photo, this.x, this.y, this.imgW, this.imgH)

      // fill('red');
      // circle(this.x, this.y, 50);
      

      pop();
    }
  }

  class Body {
    constructor(startX, startY, createImg){
      this.x = startX;
      this.y = startY;
      this.photo = createImg;

      this.xSpeed = 1; 
      this.max = 850;
      this.min = 630;
  
    }

    update(){
      if(moveBlockRight == true){
        if(this.x < this.max){
          this.x += this.xSpeed; 
        }else{
          moveBlockRight = false; 
        }
      }

      if(moveBlockLeft == true){
        if(this.x > this.min){
          this.x -= this.xSpeed;
        }else{
          moveBlockLeft = false; 
        }
      }
    }

    display(){
      push();
      translate(this.x, this.y);
      // fill('red');
      // circle(0,0,10);
      scale(0.3);
      image(this.photo, 0, 100);
      pop();
    }
  }


function greenButton(){
  noStroke();
  fill('green');
  circle(992, 314, 20);
}

function redButton(){
  noStroke();
  fill('red');
  circle(1240, 388, 20);
}

function cal(){
  push();
  scale(0.1);
  image(calImg, 200,100);
  pop();
}



