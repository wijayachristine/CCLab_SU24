// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.

let particles = [];


function preload(){
  cloudIMG = loadImage("assets/cloud2.png")
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  // for (let i = 0; i < NUM_OF_PARTICLES; i++) {
  //   particles[i] = new Particle(100,200);
  // }



  colorMode(HSB);

}

function draw() {
  background(50);

  if(mouseIsPressed == true){
    for(let i = 0; i < NUM_OF_PARTICLES; i++){
      particles.push(new Particle(mouseX, mouseY))
    }
  }

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
  while(particles.length >1000){
    let idx = 0;
    particles.splice(idx, 1);
  }

  for(let i = particles.length-1; i >= 0; i--){
    if(particles[i].onCanvas == false){
      particles.splice(i,1);
    }
  }
}

class Particle {
  // constructor function
  constructor(startX, startY,img) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(2,20);

    this.xSpeed = random(-1,1);
    this.ySpeed = random(-2,2);

    this.onCanvas = true; 

    this.pHue = random(0,360); 

    this.scaleFactor = random(0.5, 1);

    this.photo = img; 
  }
  // particle's behaviors
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed; 

    if(this.x > width || this.x < 0){
      this.xSpeed = -this.xSpeed;
    }if(this.y > height || this.y < 0){
      this.ySpeed = -this.ySpeed;
    }
  }


  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);

    noStroke();
    fill(this.pHue,20,100);
    circle(0,0, this.dia);

    // let imgW = this.photo.width;
    // let imgH = this.photo.height;

    // image(this.photo, -imgW/2, -imgH/2);
;
    pop();


  }
  checkOutOfCanvas(){
    if(this.y > height || this.x > width){
      this.onCanvas = false; 
    }
  }
  
} 


// function mousePressed(){
//     for (let i = 0; i < NUM_OF_PARTICLES; i++) {
//       particles[i] = new Particle(mouseX, mouseY, cloudIMG);
//     }
//   }



