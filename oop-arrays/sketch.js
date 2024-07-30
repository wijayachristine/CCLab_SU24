let cow1; 
let cowIMG; 

let cows = [];
let numCows = 20; 

function preload(){
  cowIMG = loadImage("assets/cow-poster.png")
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("canvas-cousin");

    // cow1 = new Cow(300,200,cowIMG); //global cow instance

    // make the initial cows and put them into the cows array 
    for(let i = 0; i < numCows; i++){ //only use num cows when we instantiate the variables
      let oneCow = new Cow(random(width), random(height), cowIMG);
      cows.push(oneCow);
    }
  }
  
  function draw() {
    background(220,50,120);

    // cow1.display(); // display cow
    // cow1.update();

    //do stuff for each cow --> loop over the cows array 
    for(let i=0; i<cows.length; i++){
      cows[i].display();
      cows[i].update();
    }

  }

  class Cow{
    constructor(startX, startY, img){
      this.x = startX;
      this.y = startY;
      this.photo = img; 
      this.scaleFactor = random(0.4,0.5);
      this.xSpeed = 1; 
      this.ySpeed = 1; 
    }

    update(){
      this.x += this.xSpeed;
      this.y += this.ySpeed; 

      if(this.x > width || this.x <= 0){
        this.xSpeed = -this.xSpeed;
      }if(this.y > height || this.y < 0){
        this.ySpeed = -this.ySpeed;
      }
    }
    display(){
      
      push();
      translate(this.x, this.y);
      scale(this.scaleFactor);

      // rect(0, 0, 50, 50);

      // reposition img to better fit the objects origin point
      let imgW = this.photo.width;
      let imgH = this.photo.height;
      //      the img       x       y 
      image(this.photo, -imgW/2, -imgH+90);

      fill("blue");
      circle(0,0,10);

      pop();
    }
    }