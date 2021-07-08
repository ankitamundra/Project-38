var path, mainCyclist;
var pathImg, mainRacer, mainRacerFall;

var cyclist1, cyclist1Fall;
var cyclist2, cyclist2Fall;
var cyclist3, cyclist3Fall;

var obstacle1, obstacle2, obstacle3;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0, bellSound, gameOverImage;

var opp1G, opp2G, opp3G, obstaclesG;


function preload(){
  pathImg=loadImage("Road.png");
  mainRacer=loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerFall=loadAnimation("mainPlayer3.png");
  
  cyclist1=loadAnimation("opponent1.png","opponent2.png");
  cyclist1Fall=loadAnimation("opponent3.png");
  
  cyclist2=loadAnimation("opponent4.png","opponent5.png");
  cyclist2Fall=loadAnimation("opponent6.png");
  
  cyclist3=loadAnimation("opponent7.png","opponent8.png");
  cyclist3Fall=loadAnimation("opponent9.png");
  
  bellSound=loadSound("bell.mp3");
  gameOverImage=loadImage("gameOver.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
}


function setup(){
createCanvas(800,300);

  path=createSprite(100,150);
  path.addImage(pathImg);
  path.x=path.width/4;
  
  gameOver=createSprite(400,140,10,10);
  gameOver.addImage(gameOverImage);

  mainCyclist  = createSprite(100,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacer);
  mainCyclist.addAnimation("mainRacerFalling", mainRacerFall);
  mainCyclist.scale=0.07;
    
  opp1G=new Group();
  opp2G=new Group();
  opp3G=new Group();
  obstaclesG=new Group();
}


function draw() {

  mainCyclist.x = camera.position.x - 150;
  //camera.position.y= 150;
  gameOver.x= mainCyclist.x;

  background(0);
  
  
  if(gameState===PLAY){
  
    path.velocityX = -(6+2*distance/150);
    spawnCyclists();
    spawnObstacles();
    
    gameOver.visible=false;
    
    if(keyDown("space")){
      bellSound.play();
    }
    
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  if(path.x < 0 ){
    path.x = width/2;
  }
    distance=distance+Math.round(getFrameRate()/60);
  
    if(opp1G.isTouching(mainCyclist)){
      opp1G.setVelocityXEach(0);
      opponent1.changeAnimation("opp1Fall",cyclist1Fall);
      opp1G.setLifetimeEach(-1);
      gameState=END;
    }
    if(opp2G.isTouching(mainCyclist)){
      opp2G.setVelocityXEach(0);
      opponent2.changeAnimation("opp2Fall",cyclist2Fall);
      opp2G.setLifetimeEach(-1);
      gameState=END;
    }
    if(opp3G.isTouching(mainCyclist)){
      opp3G.setVelocityXEach(0);
      opponent3.changeAnimation("opp3Fall",cyclist3Fall);
      opp3G.setLifetimeEach(-1);
      gameState=END;
    }
    
    if(obstaclesG.isTouching(mainCyclist)){
      obstaclesG.destroyEach();
      obstaclesG.setLifetimeEach(-1);
      gameState=END;
    }
    
  }
  else if(gameState===END){

    gameOver.visible=true;
    mainCyclist.velocityX=0;
    mainCyclist.changeAnimation("mainRacerFalling",mainRacerFall);
    path.velocityX=0;
    obstaclesG.setVelocityXEach=0;


    if(keyDown("UP_ARROW")){
     reset();
    }
    
  }
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,600,30);

}


function spawnOpponent1(){
    opponent1=createSprite(camera.position.x+ 800,200,10,10);
    opponent1.addAnimation("opp1",cyclist1);
    opponent1.addAnimation("opp1Fall",cyclist1Fall);
    opponent1.scale=0.06;
    opponent1.velocityX=-(5+2*distance/150);
    opponent1.lifetime=250;
    opponent1.y=Math.round(random(30,270));
    
    opp1G.add(opponent1);
}


function spawnOpponent2(){
    opponent2=createSprite(camera.position.x+800,200,10,10);
    opponent2.addAnimation("opp2",cyclist2);
    opponent2.addAnimation("opp2Fall",cyclist2Fall);
    opponent2.scale=0.06;
    opponent2.velocityX=-(5+2*distance/150);
    opponent2.lifetime=250;
    opponent2.y=Math.round(random(30,270));
  
    opp2G.add(opponent2);
}


function spawnOpponent3(){
    opponent3=createSprite(camera.position.x + 800,200,10,10);
    opponent3.addAnimation("opp3",cyclist3);
    opponent3.addAnimation("opp3Fall",cyclist3Fall);
    opponent3.scale=0.06;
    opponent3.velocityX=-(5+2*distance/150);
    opponent3.lifetime=250;
    opponent3.y=Math.round(random(30,270));
  
    opp3G.add(opponent3);
}


function spawnCyclists(){
  var cyclists=Math.round(random(1,2));
  
  if(frameCount%250===0){
    if(cyclists==1){
      spawnOpponent1();
    }else{
      spawnOpponent2();
    }
  }
   
    if(frameCount%750===0){
      if(cyclists==2){
        spawnOpponent3();
      }
    }
}


function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  
  opp1G.destroyEach();
  opp2G.destroyEach();
  opp3G.destroyEach();
  obstaclesG.destroyEach();
  
  mainCyclist.changeAnimation("SahilRunning",mainRacer);
  
  distance=0;
}


function spawnObstacles(){
  if(frameCount%600===0){
    var obstacles=createSprite(camera.position.x+800,150);
    obstacles.y=Math.round(random(30,270));
    obstacles.velocityX=-(5+2*distance/150);
    
    var rand=Math.round(random(1,3));
    switch(rand){
      case 1: obstacles.addImage(obstacle1);
        break;
      case 2: obstacles.addImage(obstacle2);
        break;
      case 3: obstacles.addImage(obstacle3);
        break;
      default: break;
    }
    obstacles.scale=0.08;
    obstaclesG.add(obstacles);
  }
}












