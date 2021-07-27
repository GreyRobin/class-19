var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background("black");
  if(gameState === "play"){
    if(keyDown("left_arrow")){
      ghost.x = ghost.x-3
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x+3
    }
    if(keyDown("space")){
      ghost.velocityY = -10
    }

ghost.velocityY = ghost.velocityY+0.5

spawndoors()
    if(tower.y > 400){
      tower.y = 300
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState = "end"
    }
  

 drawSprites()
}
if(gameState==="end"){
  stroke("red")
  fill("red")
  textSize(100)
  text("game over",100,300)
}
}
function spawndoors(){
if(frameCount%240===0){
  climber = createSprite(200,10)
  door = createSprite(200,-50)
  invisibleBlock = createSprite(200,15)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2
  door.x = Math.round(random(120,400))
  climber.x = door.x
  invisibleBlock.x = door.x
  climber.addImage(climberImg)
  door.addImage(doorImg)
  climber.velocityY = 1
  door.velocityY = 1
  invisibleBlock.velocityY = 1
  climber.lifetime = 800
  door.lifetime = 800
  invisibleBlock.lifetime = 800
  ghost.depth = door.depth
  ghost.depth+=1
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock.debug = true
}
}