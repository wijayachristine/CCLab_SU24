let room;
let heartMonitorImg;
let bedImg;
let panelImg;
let standImg;
let heartbeat;

let roomSound;

let items = [];

function preload() {
  heartMonitorImg = loadImage("assets/heart-monitor.png");
  bedImg = loadImage("assets/bed.png");
  panelImg = loadImage("assets/panel.png");
  standImg = loadImage("assets/stand.png");
  roomSound = loadSound("items/HospRoom.mp3");

  //yes 
  plushImg = loadImage("items/plush.png");
  shoesNoLacesImg = loadImage("items/shoesnoLaces.png");
  sweaterImg = loadImage("items/sweater.png");
  pantsImg = loadImage("items/pants.png");
  booksImg = loadImage("items/books.png");

  // //nos
  medsImg = loadImage("items/meds.png");
  toiletriesImg = loadImage("items/toiletries.png");
  sweatsLacesImg = loadImage("items/sweatsLaces.png");
  perfumeImg = loadImage("items/perfume.png");
  cableImg = loadImage("items/cable.png");
  shoesLacesImg = loadImage("items/shoes.png");

}

function setup() {
  let cnv = createCanvas(1000, 600);
  cnv.parent("canvas-cousin");

  room = new Room(200, 400, heartMonitorImg, bedImg, panelImg, standImg);
  items.push(new Items(700, 0, plushImg, 0.05, 'yes'));
  items.push(new Items(850, 0, toiletriesImg, 0.18, 'no'));
  items.push(new Items(700, 120, medsImg, 0.05, 'no'));
  items.push(new Items(820, 100, shoesNoLacesImg, 0.18, 'yes'));
  items.push(new Items(760, 300, pantsImg, 0.2, 'yes'));
  items.push(new Items(850, 220, booksImg, 0.2, 'yes'));
  items.push(new Items(690, 230, perfumeImg, 0.2, 'no'));
  items.push(new Items(700, 380, cableImg, 0.05, 'no'));
  items.push(new Items(880, 350, sweaterImg, 0.15, 'yes'));
  items.push(new Items(860, 470, sweatsLacesImg, 0.15, 'no'));
  items.push(new Items(700, 500, shoesLacesImg, 0.05, 'no'));


}

function draw() {
  background("#D3D3D3");

  room.display();

  push();
  noStroke();
  fill(255, 255, 255, 80);
  rect(700, 0, 300, 600);
  pop();

  for(let i = 0; i < items.length; i++){
      items[i].display();
      items[i].update();
  }

  drawTextBox();

}

class Room {
  constructor(startX, startY, createImg, createImg2, createImg3, createImg4) {

    this.x = startX;
    this.y = startY;

    this.photo = createImg;
    this.photo2 = createImg2;
    this.photo3 = createImg3;
    this.photo4 = createImg4;

    this.t = 0;

  }

  display() {

    push();
    translate(this.x, this.y);

    // fill("blue");
    // circle(0, 0, 20);

    line(0, 0, windowWidth - 690, 0);
    line(0, 0, 0, -windowHeight);
    line(0, 0, -200, 185);

    //window
    push();
    translate(-50, -300);
    fill("#87CEEB");
    quad(0, 150, -230, 290, -150, 80, 0, 0);

    pop();

    //monitor
    push();
    scale(0.15);
    // fill('blue');
    rect(100, -1400, 900, 650);
    image(this.photo, 50, -1500);

    //bed
    push();
    scale(2.4);
    rotate(1.98 * PI);
    image(this.photo2, -850, -900);
    pop();

    pop();

    //behind bed panel
    push();
    scale(0.2);
    image(this.photo3, 600, -2400);

    //iv stand
    push();
    image(this.photo4, 1200, -1200);
    pop();
    pop();

    pop();
  }
}

class Items {
  constructor(startX, startY, createImg, scaleF, type) {
    this.x = startX;
    this.y = startY;

    this.ogX = startX;
    this.ogY = startY;

    this.scaleFactor = scaleF;
    this.theType = type;

    this.photo = createImg;

    this.isDragged = false;

    this.imgW = this.photo.width * this.scaleFactor;
    this.imgH = this.photo.height * this.scaleFactor;

    this.rectW = this.imgW;
    this.rectH = this.imgH;
  }

  update() {
    if (this.isDragged == true) {
        this.x = mouseX;
        this.y = mouseY;

      if(this.theType === 'no') {
        this.x = constrain(this.x, 700, 1000 - this.rectW);
        this.y = constrain(this.y, 0, windowHeight - this.rectH);
      // if (this.x < 700 + this.imgW / 2) {
      //   this.x = 700 + this.imgW / 2;
      // } else if (this.x > 1000 - ithis.imgW / 2) {
      //   this.x = 1000 - this.imgW / 2;
      // }

      // if (this.y < this.imgH / 2) {
      //   this.y = this.imgH / 2;
      // } else if (this.y > windowHeight - this.imgH / 2) {
      //   this.y = windowHeight - this.imgH / 2;
      // }
    }
  }
  }

  display() {

    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);
    // fill('red');
    // rect(100, 0, this.imgW+(100/this.scaleFactor), this.imgH+(100/this.scaleFactor));
    image(this.photo, 100, 100);
    pop();
  }

  checkIfPressed() {
    if(mouseX > this.x &&
      mouseX < this.x + this.rectW &&
      mouseY > this.y &&
      mouseY < this.y + this.rectW){
      this.isDragged = true; 
    }
  }
}

function drawTextBox(){
  //textbox
  push();
  noStroke();
  fill("#6C1D6E");
  rect(0, 0, 700, 70);
  fill(255);
  textSize(48);
  textFont('NYU Serif');
  text('NYU Langone Inpatient Ward', 65, 50);
  pop();
}
function mousePressed(){
  if(!roomSound.isPlaying()){
    roomSound.play();
    }

  for(let i = 0; i < items.length; i++){
    items[i].checkIfPressed();
  }
}

function mouseReleased(){
  for(let i = 0; i < items.length; i++){
    if(items[i].theType === 'no'){
      items[i].x = items[i].ogX;
      items[i].y = items[i].ogY;
    }
    items[i].isDragged = false; 
  }
}



