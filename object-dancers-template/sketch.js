/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new christineDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class christineDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  
    // add properties for your dancer here:
    this.upperLeftArmAngle = 0;
    this.lowerLeftArmAngle = 0; 

    // right arm
    this.upperRightArmAngle = 0; 
    this.lowerRightArmAngle = 0;
    this.armSpeed = 1.3; 

    //head 
    this.headY = -25; 
    this.headSpeed = 1; 

    this.movingArms = true;
    
  }
  update(){

    //stop it from moving for a bit
    if(frameCount % 300 == 0) {
      if(this.movingArms == false) {
        this.movingArms = true;
      } else if(this.movingArms == true) {
        this.movingArms = false;
      }
    }

    if(this.movingArms == false)
      return;

    // update properties here to achieve
    // your dancer's desired moves and behaviour

    //right arm updates
    this.upperRightArmAngle += this.armSpeed;

    if(this.upperRightArmAngle >= 60 || this.upperRightArmAngle <= -60){
      this.armSpeed = -this.armSpeed;
    }

    this.lowerRightArmAngle = this.upperRightArmAngle - 120; 
    if (this.lowerRightArmAngle < -180) {
      this.lowerRightArmAngle = -180;
    } else if (this.lowerRightArmAngle > 0) {
      this.lowerRightArmAngle = 0;
    }

    // left arm updates
    this.upperLeftArmAngle += this.armSpeed;
    if(this.upperLeftArmAngle >= 60 || this.upperLeftArmAngle <= -60){
      this.armSpeed = -this.armSpeed;
    }

    this.lowerLeftArmAngle = this.upperLeftArmAngle + 120; 
    if (this.lowerLeftArmAngle > 180) {
      this.lowerLeftArmAngle = 180;
    } else if (this.lowerLeftArmAngle < 0) {
      this.lowerLeftArmAngle = 0;
    }

    //head updates
    this.headY += this.headSpeed;

    if(this.headY > -10 || this.headY < -25){
      this.headSpeed =  -this.headSpeed;
    }
  }

  display(){
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    this.drawArmLeft();
    this.drawArmRight();

    //body 
    push();
    translate(0,100);
    rotate(radians(75));
    noStroke();
    fill(169,169,169,90);
    ellipse(-10, -60, 20, 50);
    pop();

    //light
    push();
    noStroke();
    // rotate(radians(this.lightShineAngle));
    fill(random(100,255), random(20,250), random(100,255), 80);
    triangle(-100, -100, -10, 100, 100, 100);
    pop();

    noStroke();
    fill(167, 29, 49);
    ellipse(0, 25, 55, 100);

    this.drawHead();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes();

    pop();
  }

  drawArmLeft(){

    //upper arm left
    push();
    translate(-20,10);
    rotate(radians(this.upperLeftArmAngle));
    fill("#DBEBC0");
    noStroke();
    
    ellipse(-30,0,60,20);

      // lower arm right
      push();
      translate(-60,0);
      rotate(-radians(this.upperLeftArmAngle - 90));
      
      fill("#DBEBC0");
      ellipse(-30,0,60,20);

      pop();

  

    pop();
  }

  drawArmRight(){
    //upper arm right - move between 0 and 45 
    push();
    translate(20,10);
    rotate(radians(this.upperRightArmAngle));
    fill("#DBEBC0");
    noStroke();
    
    ellipse(30,0,60,20);

      // lower arm right
      push();
      translate(60,0);
      rotate(-radians(this.upperRightArmAngle + 90));
      
      fill("#DBEBC0");
      ellipse(30,0,60,20);

      pop();


    pop();

   
  }

  drawHead(){
     // head
  push();
     push();
     fill("#DBEBC0");
     noStroke();
     circle(0,this.headY, 50);
    //  arc(0, this.headY, 70, 110, 0, PI);
     pop();

     push();
     //eyes
     fill(0);
     circle(-10,this.headY-8,10);
     circle(10,this.headY-8,10);

     //inner eyes
     fill(255);
     circle(-10,this.headY-6,3);
     circle(10,this.headY-6,3);
     pop();

   //mouth
   fill('red');
   arc(0, this.headY, 10, 20, 0, PI);
   
  pop();
  }


  drawReferenceShapes(){
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
}