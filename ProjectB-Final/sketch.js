let objects = [];
let numObjects = 12;

let scaleFactor = 0.60;

// animation 
let no1Image;
let no2Image;
let no3Image;
let no4Image;
let no6Image;
let no7Image;  
let no8Image;

//bg
let brainSynapsesImg;

//dragging pls work
let isDragging = false;

let initialMouseX;
let initialMouseY;

let canvasTranslatedX = 0;
let canvasTranslatedY = 0; 

function preload(){
  no1Image = loadImage("assets/No_1_Childhood.png");
  no2Image = loadImage("assets/No_2_Bullying.png");
  no3Image = loadImage("assets/No_3_Cracked_Mirror.png");
  no4Image = loadImage("assets/No_4_Overworking.png");
  no6Image = loadImage("assets/No_7_College.png");
  no7Image = loadImage("assets/No_8_Cancer.png");
  no8Image = loadImage("assets/No_10_NYC_Hosp.png");
  brainSynapsesImg = loadImage("assets/brainSynapses.png");

}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-cousin1");

      //taxi
      objects.push(new Objects(-1300, 350, no1Image, "taxi"));

      //bully
      objects.push(new Objects(800, 0, no2Image, 'bully'));
    
      //cracked mirror
      objects.push(new Objects(1550, -10, no3Image, 'mirror'));

      //candle
      objects.push(new Objects(-300, 720, no4Image, 'candle'));
      
      //toxic mask
      // objects.push(new Objects(-3000, 0, no5Image, 'toxic'));

      //college door
      objects.push(new Objects(-520, 10, no6Image, 'door'));

      //cancer
      objects.push(new Objects(340, -400, no7Image, 'cancer'));

      //nyc skyline
      objects.push(new Objects(-1200, -700, no8Image, 'nyc'));

      //lantern
      // objects.push(new Objects(-700, 0, no11Image, 'lantern'));  
    }
   
  // }

  function draw() {
    push();
    translate(width/2 + canvasTranslatedX, height/2 + canvasTranslatedY)
    scale(scaleFactor*0.38);
    image(brainSynapsesImg, -(width*5)/2, -(height*5)/2, width*5, height*5);
    pop();

    push();
    translate(width/2 + canvasTranslatedX, height/2 + canvasTranslatedY);
    scale(scaleFactor);

    // rect(-width*10/2,-height*10/2,width*10,height*10)

    for(let i = 0; i < objects.length; i++){
      objects[i].display();   
    }

    
    pop();

  
    if(keyIsPressed == true){
      if(key === 'd'){
        scaleFactor += 0.001 ;  
      }
      if(key === 'a'){
        scaleFactor -= 0.001;
      }
    }
  }

  class Objects{
    constructor(startX, startY, createImage, myType) {
      // properties: particle's characteristics
      this.x = startX;
      this.y = startY;

      this.photo = [createImage]; 

      this.currentImg = 0;

      this.type = myType;

      this.minSize = 100; 
      this.maxSize = 1000;
      this.d = dist(0, 0, this.x, this.y); 
      this.imgSize = map(this.d, 0, width*2, this.minSize, this.maxSize);

    }

    display(){
    
    push();
    
    translate(this.x, this.y);


      //       the img      x        y 
      // circle(0, 0, this.imgSize*2)

      image(this.photo[this.currentImg], -this.imgSize/2, -this.imgSize/2, this.imgSize, this.imgSize);
     
    
      pop();
    }

    checkIfPressed(mouseX, mouseY){

      
      // let mXScaledTranslated = mouseX/scaleFactor - (width/2)/scaleFactor
      // let mYScaledTranslated = mouseY/scaleFactor - (height/2)/scaleFactor
      // console.log(mXScaledTranslated)

      let adjustedMouseX = (mouseX - width/2 - canvasTranslatedX) / scaleFactor;
      let adjustedMouseY = (mouseY - height/2 - canvasTranslatedY) / scaleFactor;
      let d = dist(adjustedMouseX, adjustedMouseY, this.x, this.y);
      // let distance = dist(mXScaledTranslated, mYScaledTranslated, this.x, this.y);
      // console.log(mouseX-width/2, mouseY-height/2, this.x, this.y);
      // console.log("distance", distance)
      let radius = this.imgSize/2;

      // get d betwen mouns and this.x 

      // check if d is smaller than imgSize/2 times scalefactor

      if(distance < radius){
        return true;
      }else{
        return false; 
      }

  
    }
  }



function mousePressed(){

    initialMouseX = mouseX; 
    initialMouseY = mouseY;
    isDragging = true; 

    for(let i = 0; i < objects.length; i++){
      if(objects[i].checkIfPressed(mouseX, mouseY)){
        console.log(objects[i].type  + "clicked");
        if(objects[i].type == 'taxi'){
          window.location.href = '../PB-No1-TaxiYelling'; 
        }
        if(objects[i].type == 'bully'){
          window.location.href = '../PB-No2-Bullying'; 
        }
        if(objects[i].type == 'mirror'){
          window.location.href = '../PB-No3-PanAtt'; 
        }
        if(objects[i].type == 'candle'){
          window.location.href = '../PB-No4-Overworked'; 
        }
        if(objects[i].type == 'door'){
          window.location.href = '../PB-No6-Door'; 
        }
        if(objects[i].type == 'cancer'){
          window.location.href = '../PB-No7-Cancer'; 
        }
        if(objects[i].type == 'nyc'){
          window.location.href = '../PB-No8-HospRoom'; 
        }
      }
    }
  }

function mouseDragged(){
  if(isDragging){
    canvasTranslatedX += mouseX - initialMouseX;
    canvasTranslatedY += mouseY - initialMouseY;
    initialMouseX = mouseX;
    initialMouseY = mouseY;
  }
}

function mouseReleased(){
  isDragging = false; 
}

