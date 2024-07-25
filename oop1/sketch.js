let taxi1;
let taxi2; 

let honk1;
let honk2;
let ambience;

function preload(){
  honk1 = loadSound("assets/honk1.mp3")
  honk2 = loadSound("assets/h0nk2.mp3")
  ambience = loadSound("assets/ambience.mp3")
}

function mousePressed(){
    ambience.loop();
}


function setup() {
    let cnv = createCanvas(400,400);
    cnv.parent("canvas-cousin");

    taxi1 = new Taxi(100,100,1.2);

    taxi2 = new Taxi(300,200,0.5);
  }
  
  function draw() {
    background(200,100,120);

    taxi1.display();
    taxi1.update();
    taxi1.maybeHonk();

    taxi2.display();
    taxi2.update();
  }

  class Taxi{
      constructor(startX, startY, startScale){
        // all the properties
        // that instances of this class should have 
        this.x = startX;
        this.y = startY;
        this.s = startScale;
        this.speed = random(-2,2);
        this.wheelAngle = 45; 
        this.wheelSpeed = this.speed*2; 
      }

      // option 1
      // spinWheel(){
      //   this.wheelAngle+=this.wheelSpeed;
      // }

      // move(){
      //   this.x+=this.speed;
      // }

      update(){
        // this.spinWheel();
        // this.move();

        // option 2 (which i prefer ngl)
        this.wheelAngle+=this.wheelSpeed;
        this.x+=this.speed;

        //reappear
        if(this.x > width){
          this.x = 0;
        }
        if(this.x < 0){
          this.x = width;
      }
      }

      maybeHonk(){
        if(random(0,100) < 0.2){
          if(random()<0.5){
            honk1.play();
          }else{
            honk2.play();
          }
        }
      }

      display(){
        push();
        translate(this.x, this.y);
        scale(this.s);

            noStroke();
            fill(240, 220, 60);

            // base:
            rect(-50, -50, 100, 30);
            // top"
            rect(-25, -70, 50, 20);
            // wheel 1:
            this.drawWheel(-30, -15);
            // wheel 2:
            this.drawWheel( 30, -15);


            // just to see origin 
            // of translation matrix:
            fill("red");
            circle(0, 0, 5); 


        pop();
      }

      drawWheel(wheelx, wheely){
        push();
        translate(wheelx, wheely);
        rotate(radians(this.wheelAngle));

            noStroke();
            fill(0);
            // circle(0,0,30);
            ellipse(0,0,30, 27);

        pop();
    }

  }


