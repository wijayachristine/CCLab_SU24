let particle1; 
let particles = [];
let numParticles = 2000;

let pplImg; 
let womanImg; 
let bullySound;

// closer ones look at you 
// make them turn depending on the direction that they walk 

function preload(){
  // add sound 
  // sound will be narration of bullying
  pplImg = loadImage("assets/ppl.png");
  womanImg = loadImage("assets/women.png");
  bullySound = loadSound("assets/Bullying.mp3");

}

function setup() {
    let cnv = createCanvas(2000, 1000);
    cnv.parent("canvas-cousin");

    particle1 = new Particle(width/2, height/2, 30, womanImg);

    for(let i = 0; i < numParticles; i++){
      let x = random(width);
      let y = random(height);
      let sizes = 30;
      particles.push(new Particle( x, y, sizes, pplImg));
    }
  }
  
  function draw() {
    background('grey');

    // one circle in the middle
    // other circle surrounding it but it avoids it at all costs 

    if(mouseIsPressed){
      particle1.x = mouseX;
      particle1.y = mouseY;
      if(bullySound.isPlaying() == false){
        bullySound.play();
      }
    }

    particle1.display();

    for(let i = 0; i < particles.length; i++){
      particles[i].update(particle1);
      particles[i].display();
}  }

  class Particle {
    constructor(startX, startY, sizes, createImg){
      this.x = startX;
      this.y = startY;

      this.sizes = sizes; 
      this.img = createImg;

      this.rotation = atan2(mouseX, mouseY, this.x, this.y);

      this.parSpeedX = random(-0.5,0.5); 
      this.parSpeedY = random(-0.5,0.5);

    }

    update(other){
      let dx = this.x - other.x;
      let dy = this.y - other.y;
      let distance = sqrt((dx*dx)+(dy*dy)); //dist creature1 n creature2

      if(distance < 100){
        this.x += dx / distance*2; // move
        this.y += dy / distance*2; 
      }

      
      // this.x += random(-this.parSpeed, this.parSpeed);
      // this.y += random(-this.parSpeed, this.parSpeed);

      this.x += this.parSpeedX;
      this.y += this.parSpeedY;

      if(this.x > width || this.x < 0){
        this.parSpeedX = -this.parSpeedX;

      }if(this. y > height || this.y < 0){
        this.parSpeedY = -this.parSpeedY;
    
      }
    }
    display(){
      push();
      rotate(this.rotation);
      image(this.img, this.x, this.y, this.sizes, this.sizes);
      pop();
      
    }
  }
