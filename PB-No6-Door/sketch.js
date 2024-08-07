let champagneImg;
let idkImg;
let scotchImg;
let vodkaImg;
let handImg; 
let titosImg; 

let ellipseW = 20;
let ellipseH = 10; 

let table1;

let vodkaPar = [];
let num_vodka_par = 10;
let puddle = [];

//insert this text
//Everyone knows the exhilarating freedom that comes with college—the boundless possibilities and the thrill of self-discovery. But alongside that freedom lurks a darker reality: the numbing feeling of drowning yourself in alcohol, desperately trying to escape the confusion and uncertainty of figuring out who you really are.

function preload() {
  champagneImg = loadImage("assets/champagne.png");
  idkImg = loadImage("assets/idk.png");
  scotchImg = loadImage("assets/scotch.png");
  vodkaImg = loadImage("assets/vodka.png");
  titosImg = loadImage("assets/titos.png");
  handImg = loadImage("assets/hand.png");
}
// draw hand as cursor, vodka bottle falls and then vodka pours

function setup() {
  let cnv = createCanvas(1000, 800);
  cnv.parent("canvas-cousin");
  noCursor();

  table1 = new Table(100, 500, champagneImg, idkImg, scotchImg, vodkaImg, titosImg);
  lights1 = new Lights(100,280);
  lights2 = new Lights(300,280);
  lights3 = new Lights(500,280);
  lights4 = new Lights(700,280);
  lights5 = new Lights(900,280);
}

function draw() {
  background(0);
  //college table + alc bottles + party + noises
  table1.display();

  if(table1.update() === true){
    if(table1.rotationAngle >= 90){
      for (let i = 0; i < num_vodka_par; i++) {
        vodkaPar.push(new Particle(825, 380));
      }for (let i = 0; i < vodkaPar.length; i++) {
        vodkaPar[i].display();
        vodkaPar[i].update();
      }
    }
      noStroke();
      fill(255,255,255,30);
      ellipse(825, 790, ellipseW, ellipseH);
  }
  
  if(frameCount % 70 == 0){
    ellipseW += 4;
    ellipseH += 2;
  }

  for (let i = 0; i < vodkaPar.length; i++) {
      vodkaPar[i].display();
      vodkaPar[i].update();
    }
  
  for (let i = vodkaPar.length - 1; i >= 0; i--) {
      if (vodkaPar[i].onCanvas == false) {
        vodkaPar.splice(i, 1);
      }
    }

  lights1.display();
  lights2.display();
  lights3.display();
  lights4.display();
  lights5.display();


  image(handImg, mouseX-50, mouseY-50, 100, 100);

}

class Table {
  constructor(startX, startY, createImg, createImg2, createImg3, createImg4, createImg5) {
    this.x = startX;
    this.y = startY;

    this.photo = createImg;
    this.photo2 = createImg2;
    this.photo3 = createImg3;
    this.photo4 = createImg4;
    this.photo5 = createImg5;
    this.imgW = this.photo.width;
    this.imgH = this.photo.height;

    this.rotationAngle = 0;
    this.falling = false;

    // this.rectW = -this.photo4.width * 0.35;
    // this.rectH = -this.photo4.height;

  }

  update(){
    // console.log('mouse X', mouseX, 'mouseY', mouseY);
    if(mouseX > 580 && mouseY > 190 && mouseX < 630 && mouseY < 250){
      let d = dist(pmouseX, pmouseY, mouseX, mouseY);
      console.log(d)
      if(d>35 && pmouseX < mouseX){
        this.falling = true;
      }
    }
      return this.falling;

    // if(mouseX > 300 - this.imgW*0.67*0.2 && 
    //   mouseX < 300 - this.imgW * 0.67 * 0.2 + this.imgW *0.2 &&
    //   mouseY >  400 - this.imgH *0.97* 0.2 && 
    //   mouseY < 400 - this.imgH * 0.97*0.2 + this.imgH*0.2){
    // this.falling = true;
    // }
    // return this.falling;
  }

  display() {
    push();
    translate(100,0);
    fill(255);
    noStroke();
     
      quad(0, 500, 600, 500, 800, 300, 200, 300);
      rect(0, 500, 20, 200);
      rect(200, 500, 20, 100);
      rect(580, 500, 20, 200);
      rect(780, 300, 20, 250);
    
    
      push();
      scale(0.1);
      image(this.photo, 1500, 1200, this.imgW, this.imgH);
      pop();

      push();
      scale(0.1);
      image(this.photo2, 2500, 1500, this.imgW, this.imgH);
      pop();

      push();
      scale(0.1);
      image(this.photo3, 3300, 1200, this.imgW, this.imgH);
      pop();

      push();
      scale(0.1);
      image(this.photo5, 4600, 1200, this.imgW, this.imgH);
      pop();

      //as long as mouseX and mouseY is over it, it falls
      //above & if mouseSpeed is above a certain threshold, it
          push();
            translate(530,400);
            
            scale(0.2);
            rotate(radians(this.rotationAngle));
            // fill("red");
            // rect(0,0, -this.photo4.width*0.35, -this.photo4.height);
            image(this.photo4, -this.photo4.width*0.67, -this.photo4.height*0.97);
            
            // circle(0, 0, 5)
          pop();
    
          if(this.falling == true && this.rotationAngle <= 90){
            this.rotationAngle += 1;
          }
    
        
    pop();
}
}

class Particle {
  constructor(startX, startY) {
    this.x = startX
    this.y = startY
    this.dia = random(2, 10);

    this.xSpeed = random(-0.1, 0.1);
    this.ySpeed = random(4, 6);

    this.onCanvas = true;
    this.gravity = 0.001; 
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.ySpeed += this.gravity;

    if (this.y > height || this.x > width || this.x < 0) {
      this.onCanvas = false;
    }


  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255,255,255,10);
    circle(0, 0, this.dia);
    pop();
  }

  checkOutOfCanvas() {
    if (this.y > height || this.x > width) {
      this.onCanvas = false;
    }
  }
}

class Lights {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.lightShineAngle = 0; 
}

update(){
  this.lightShineAngle += 1; 
}

display () {
  push();
  noStroke();
  translate(this.x,this.y);
  scale(3);
  rotate(radians(this.lightShineAngle));
  fill(random(100,255), random(20,250), random(100,255), 80);
  // triangle(-100, -100, -10, 100, 100, 100);
  triangle(-50, 200, 0, -100, 50, 200);

  fill('red');
  circle(this.x, this.y, 20);
pop();
}
}








