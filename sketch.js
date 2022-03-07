var gamestate= "start"
var trex ,trex_running;
var ground
var groundImage
var fakeground
var cloud,cloudImage
var cactus
var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6
var cloudGroup
var cactusGroup
var deadTrex
var restart
var gameover
var gameoverImage
var restartImage
var jump
var check
var die
var score=0



//load all the images animations and sound affects in the preload
function preload(){
trex_running=loadAnimation("trex3.png","trex4.png")
groundImage=loadImage("ground2.png")
cloudImage=loadImage("cloud.png")
cactus1=loadImage("obstacle1.png")
cactus2=loadImage("obstacle2.png")
cactus3=loadImage("obstacle3.png")
cactus4=loadImage("obstacle4.png")
cactus5=loadImage("obstacle5.png")
cactus6=loadImage("obstacle6.png")
deadTrex=loadAnimation("trex_collided.png")
gameoverImage=loadImage("gameOver.png")
restartImage=loadImage("restart.png")
jump=loadSound("jump.mp3")
check=loadSound("checkPoint.mp3")
die=loadSound("die.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex=createSprite(50,190,20,50)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("dead", deadTrex)
  trex.scale=0.5

  // making the collision radius of the trex visible
  //trex.debug=true
  // changing the shape and size of the collsion radius of the trex
  trex.setCollider("circle",0,0,40)

//creating the ground
ground=createSprite(300,180,600,5)
//creating the fake ground
fakeground=createSprite(300,190,600,5)
//making the fake ground invisible
fakeground.visible=false
ground.addImage(groundImage)
//learning how to generate random integers
var integers= Math.round(random(2,8))
console.log (integers)
//creating the groups
cloudGroup=createGroup()
cactusGroup=new Group()
// creating the gameover and restart objects
gameover=createSprite(300,100)
gameover.addImage(gameoverImage)
gameover.scale=0.7
restart=createSprite(300,140)
restart.addImage(restartImage)
restart.scale=0.5
 
}
function draw(){
  background(247,247,247,255)
  //displaying the score
  fill ("black")
  textSize(15)
  text ("Score: " + score,450,40)
  //playing block
  if(gamestate=="start"){
    // making the gameover and restart icons invisible while playing
    gameover.visible=false
    restart.visible=false
    //moving the ground backwards
ground.velocityX=-7
//updating the score as frame count increases
score=score+Math.round (getFrameRate()/60)
  //if(keyDown("space") && trex.y>160){
    //trex.velocityY=-25
 // }
  //another way of stopping the double jump
  if(keyDown("space") && trex.collide(fakeground)){
    trex.velocityY=-25
    jump.play()
  }
  // playing the checkpoint sound everytime trex crosses 100 points
  if(score%100==0 && score>0){
check.play()
  }
  //adding gravity to trex
  trex.velocityY=trex.velocityY+3
  //making the ground infinate by scrolling it
  if(ground.x<0){
    ground.x=ground.width/2
  }
  //creating the clouds and cacti
  clouds()
  cacti()
  //checking for collision between cactus and trex
  if(trex.isTouching(cactusGroup)){
    die.play()
    gamestate="gameover"
  }
  }
  //dead block
  if(gamestate=="gameover"){
    //making the gameover and restart icons appear once the trex dies
    gameover.visible=true
    restart.visible=true
// stopping the ground
ground.velocityX= 0
// freezing the clouds and the cacti once the trex dies
cactusGroup.setVelocityXEach (0)
cloudGroup.setVelocityXEach (0)
// changing the lifetime of the groups so that the objects don't dissapear after freezing
cactusGroup.setLifetimeEach (-1)
cloudGroup.setLifetimeEach (-1)
// changing the animation of trex once he dies
trex.changeAnimation("dead")
// fixing the flying trex bug
trex.velocityY=0
//checking if the mouse is being clicked on the start button
if(mousePressedOver(restart)){
reset ()
}


  }
  //making trex stand on the fake ground
  trex.collide(fakeground)
  drawSprites()
  

}
function reset(){
gamestate="start"
// destroying all the clouds and cactus that are forzen on the screen
cloudGroup.destroyEach()
cactusGroup.destroyEach()
// resseting the score back to zero
score = 0
trex.changeAnimation("running",trex_running)
}
function clouds(){
if(frameCount%100==0){
//creating clouds
cloud= createSprite(600,100,40,10)
//adding the cloud in it's group
cloudGroup.add(cloud)
cloud.addImage(cloudImage)
cloud.scale= 0.7
cloud.velocityX= -3
cloud.y=Math.round(random(10,130))
//fixing the depth problem for trex so it doesn't hide behind clouds
trex.depth= cloud.depth + 1
//assigning life time to clouds in order to delete them from the memory once they exit the gaming screen (this is called the memory leak problem)
cloud.lifetime=230
}
}
function cacti(){
  if(frameCount%40==0){
//creating cacti
cactus= createSprite(600,162,10,40)
//adding the cacti to it's group
cactusGroup.add(cactus)
cactus.velocityX= -(11+score/30)
var numberGenerator= Math.round(random(1,6))
switch(numberGenerator){
  case 1: cactus.addImage(cactus1)
  break;
  case 2: cactus.addImage(cactus2)
  break;
  case 3: cactus.addImage(cactus3)
  break;
  case 4: cactus.addImage(cactus4)
  break;
  case 5: cactus.addImage(cactus5)
  break;
  case 6: cactus.addImage(cactus6)
  break;
  default:
    break;

}
//fixing the scale
cactus.scale=0.5
//giving cacti liftime
cactus.lifetime=230
  }


  
}