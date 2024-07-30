let confettis = [];
let numConfetti = 100;
let backgroundHue; 

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvas-cousin");
  
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(width/2, height/2))
  // }

  colorMode(HSB);
  backgroundHue = random(0,360);
  
}

function draw() {
  // HSB    hue sat bri
  //        360 100 100
  background(backgroundHue, 20, 100);

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].checkOutOfCanvas();
    confettis[i].display();
  }

  if(mouseIsPressed == true){
    for(let i = 0; i < numConfetti; i++){
      confettis.push(new Confetti(mouseX, mouseY))
    }
  }

  //1st solution: if bigger than threshold, delete 1 element 
  // if(confettis.length > 100){
  //  confettis.splice(0,1);
  // }
  //problem: if 

  //solution 2: as long as bigger than threshold, keep deleting the beginning of the array 
  while(confettis.length >100){
    let idx = 0;
    confettis.splice(idx,1);
  }
  
  text(confettis.length,20,20);

  // if its not on canvas, delete. 
  for(let i = confettis.length-1; i >=0 ; i--){
    if(confettis[i].onCanvas == false){
      confettis.splice(i,1);
    }
  }
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3); 

    this.cHue = random(0,360);  

    this.onCanvas = true;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    //apply gravity to ySpeed
    this.speedY += 0.1; 
    this.speedX *= 0.99;
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.cHue, 100, 100);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }

  checkOutOfCanvas(){
    if(this.y > height){
      this.onCanvas = false; 
    }
  }

}


// function mousePressed(){
//   for(let i = 0; i < numConfetti; i++){
//     confettis.push(new Confetti(mouseX, mouseY))
//   }
// }




