// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 50; // Decide the initial number of particles.

let particles = [];


function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  colorMode(HSB);

}

function draw() {
  background(50);

  for(let i = 0; i < NUM_OF_PARTICLES; i++){
    particles.push(new Particle(100, 50));
  }

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  for(let i = particles.length-1; i >= 0; i--){
    if(particles[i].onCanvas == false){
      particles.splice(i,1);
    }
  }

  push();

  fill("black");
  rect(0,40, 90, 30);
  ellipse(90,55,20,30);

  fill("white");
  textSize(20);
  text("PIPE",15,60);
  pop();
}

class Particle {
  // constructor function
  constructor(startX, startY,img) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(2,20);

    this.xSpeed = random(0,2);
    this.ySpeed = random(1,5); //downward motion pos

    this.onCanvas = true; 

    this.pHue = random(200,245); 

    this.scaleFactor = random(0.5, 1);

    this.photo = img; 

  }
  // methods (functions): particle's behaviors
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed; 

    //gravity like effect
    this.ySpeed += 0.05; 

    if(this.y > height || this.x > width || this.x < 0){
      this.onCanvas = false;
    }
  }


  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);

    noStroke();
    fill(this.pHue, 40, 100);
    circle(0,0, this.dia);
;
    pop();




  }
  
} 




