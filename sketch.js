/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;
var shrubsGroup,shrubs1,shrubs2,shrubs3
var shrub1,shrub2,shrub3

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(150,250,400,20);
  kangaroo .addAnimation("run",kangaroo_running)
  kangaroo. scale=0.2
  kangaroo.setCollider("circle",0,0,300)

  invisiblejungle=createSprite(400,340,800,5)
  invisiblejungle.visible=false

  shrubsGroup = new Group();
  obstaclesGroup = new Group();

  this.spawnShrubs(10,shrub1,0.08,shrubsGroup,500)
  this.spawnShrubs(10,shrub2,0.08,shrubsGroup,500)
  this.spawnShrubs(15,shrub3,0.08,shrubsGroup,500)
  this.spawnObstacles(20,obstacle1,0.15,obstaclesGroup,500)

  score = 0;

}

function draw() {
  background(255);
  
  kangaroo.x=camera.position.x-270

  if(gameState===PLAY){
  jungle.velocityX=-3
  
  if (jungle.x<10){
    jungle.x=400
  }

  if (keyDown("space")&& kangaroo.y >= 150){
    kangaroo.velocityY=kangaroo.velocityY-2

  }
  kangaroo.velocityY = kangaroo.velocityY + 0.8
 

  if (obstaclesGroup.isTouching(kangaroo)){
    gameState=END
  } 
  
  if (shrubsGroup.isTouching(kangaroo)){
    score=score+1
    kangaroo.overlap(shrubsGroup, function(collector, collected) {
      collected.remove();
    });
  }

  //reset button and player control
  
 
}
else if (gameState === END) {
  
  kangaroo.addAnimation("collided",kangaroo_collided)
  kangaroo.changeAnimation("collided", kangaroo_collided);

  jungle.velocityX = 0;
  kangaroo.velocityX = 0
 
obstaclesGroup.setLifetimeEach(-1);
shrubsGroup.setLifetimeEach(-1);
 
 obstaclesGroup.setVelocityXEach(0);
 shrubsGroup.setVelocityXEach(0);   
 
 
}
kangaroo.collide(invisiblejungle)
drawSprites();
}

function spawnShrubs(numberOfSprites,spriteImg,s,spriteGroup,d){
   
    for (var i=0;i<numberOfSprites;i++){
      var x,y
      x= random(+width/2,width+5000)
      y= random(300,350)
  
      var sprite= createSprite(x,y)
      sprite.addImage(spriteImg)
      sprite.scale=s
      sprite.lifeteime=d

      sprite.velocityX=-4
      spriteGroup.add(sprite)
    } 
  }

  function spawnObstacles(numberOfSprites,spriteImg,s,spriteGroup,d){
   
    for (var i=0;i<numberOfSprites;i++){
      var x,y
      x= random(+width/2,width+5000)
      y= random(300,350)
  
      var sprite= createSprite(x,y)
      sprite.addImage(spriteImg)
      sprite.scale=s
      sprite.lifeteime=d

      sprite.velocityX=-4
      spriteGroup.add(sprite)
    } 
 }

