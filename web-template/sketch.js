function setup() {
    let cnv = createCanvas(400,400);
    cnv.parent("canvas-cousin");
  }
  
  function draw() {
    background(200,100,120);

    fill(50,120,150,60);
    rect(100,100,200,200);

    noStroke();
    fill(0,120,0,80);
    circle(width/2, height/2, 40);
  }