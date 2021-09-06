let duckImg;
let ducks = [];
let duckNum = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  duckImg = loadImage('duck.png');
  angleMode(CENTER);
  for (let i = 0; i < duckNum; i++){
    ducks.push(new duck(random(width), random(height)));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < ducks.length; i++){
    ducks[i].move();
    ducks[i].show();
  }
}

function mousePressed() {
  ducks.push(new duck(mouseX, mouseY));
}

class duck{
  constructor(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
    this.r = random(-20, 20);
    this.s = random(20, 80);
  }
  move() {
    this.x = random(-1, 1) + this.x;
    this.y = random(-1, 1) + this.y;
  }
  show() {
    push();
    translate(this.x, this.y);
    let angle = map(mouseX, 0, width, -1, 1);
    rotate(angle);
    imageMode(CENTER);
    image(duckImg, 0, 0, this.s, this.s);
    pop();
  }
}
