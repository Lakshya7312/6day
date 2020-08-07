var time_machingImg, backg;
var player, playerAnima, boi;
var invis_ground;

var gun, gunImg, laser, laserImg;

var up, down, left, right;
var up_arr, down_arr, left_arr, right_arr;

var zombie, zomAnima, zombieGroup;

var form;

var font;

var nameInput, button;

var gameState = 0;

var lasermusic, gameover, oof;

function preload(){
  backg = loadImage("./images/bg2.png");

  time_machineImg = loadImage("./images/time_machine.png");

  boi = loadImage("./boi_1.png");
  playerAnima = loadAnimation("./boi_1.png", "./boi_2.png");
  zomAnima = loadAnimation("./anime/1f.png", "./anime/2f.png", "./anime/3f.png", "./anime/4f.png", "./anime/5f.png");

  gunImg = loadImage("./images/gun.png");
  laserImg = loadImage("./images/laser1.png");

  up_arr = loadImage("./images/up.png");
  down_arr = loadImage("./images/down.png");
  left_arr = loadImage("./images/left.png");
  right_arr = loadImage("./images/right.png");

  font = loadFont("./russo.ttf");

  //bgmusic = loadSound("./sounds/skyline.mp3");
  lasermusic = loadSound("./sounds/laser.mp3");
  oof = loadSound("./sounds/dead.mp3");
  gameover = loadSound("./sounds/gameover.mp3");

}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);

  player = createSprite(windowWidth/3-270, windowHeight/2-360, 40, 70);
  player.shapeColor = "white";

  invis_ground = createSprite(windowWidth/2, windowHeight/2+331, displayWidth, 10);
  invis_ground.visible = false;

  gun = createSprite(0, 0, 10, 10);
  laser = createSprite(gun.x+37, gun.y-4, 10, 10);

  up = createSprite(windowWidth/19-37, windowHeight/3-170, 10, 10);
  down = createSprite(windowWidth/19-37, windowHeight/3-135, 10, 10);
  left = createSprite(windowWidth/19-37, windowHeight/3-100, 10, 10);
  right = createSprite(windowWidth/19-37, windowHeight/3-65, 10, 10);

  zombieGroup = new Group();
}

function draw() {
  background(backg);

  if(gameState === 0){
    form = new Form();
    form.display();
  }

  if(gameState === 1){
  textFont(font);
  textSize(30);
  fill("white");
  text("Controls:", windowWidth/49, windowHeight/3-225);

  //bgmusic.play();
  
  gun.addImage("duh", gunImg);

  up.addImage("lol", up_arr);
  fill("white");
  text("- Shoot", windowWidth/19-10, windowHeight/3-160);
  down.addImage("lmao", down_arr);
  fill("white");
  text("- Jump", windowWidth/19-10, windowHeight/3-125);
  left.addImage("coffin", left_arr);
  fill("white");
  text("- Move Right", windowWidth/19-10, windowHeight/3-90);
  right.addImage("wide_putin", right_arr);
  fill("white");
  text("- Move Left", windowWidth/19-10, windowHeight/3-55);

  player.collide(invis_ground);

  if(keyIsDown(LEFT_ARROW)){
    player.x = player.x + 5;
  } else if(keyIsDown(RIGHT_ARROW)){
    player.x = player.x - 5;
  } else if(keyIsDown(DOWN_ARROW) && player.y >= windowHeight/2+265){
    player.velocityY = -18;
  } 
  if(keyIsDown(UP_ARROW) && frameCount % 45 === 0){
    laser = createSprite(gun.x+37, gun.y-4, 10, 10);
    laser.addImage("bruh", laserImg);
    laser.velocityX = 8;
    lasermusic.play();
  }
  
  gun.x = player.x + 23;
  gun.y = player.y + 5;

  player.velocityY = player.velocityY + 0.8;

  laser.setCollider("rectangle", 19, 0, 125, 30);
  //laser.debug = true;

  createZombie();

  if(laser.isTouching(zombieGroup)){
    laser.visible = false;
    zombie.visible = false;
    zombie.lifetime = 0;
  }

  drawSprites();
}
  if(zombieGroup.isTouching(player)){
    gameState = 2;
    oof.play();
  }

  if(gameState === 2){
    player.visible = false;
    gun.visible = false;
    zombie.visible = false;
    zombieGroup.visible = false;
    zombie.lifetime = 0;
    fill("white");
    textFont(font);
    textSize(60);
    text("GAME OVER", windowWidth/2-180, windowHeight/2);
    gameover.play();
  }
}

function createZombie() {
  if(frameCount % 130 === 0){
    zombie = createSprite(windowWidth/2+100, windowHeight/2-360, 10, 100);
    zombie.addAnimation("anima", zomAnima);
    zombie.x = Math.round(random(windowWidth/2+370, windowWidth));
    zombie.y = Math.round(windowHeight/2+275);
    zombie.velocityX = -6;
    
    zombie.setCollider("rectangle", 0, 0, 75, 130);
    //zombie.debug = true;
    zombieGroup.add(zombie);
  }
}