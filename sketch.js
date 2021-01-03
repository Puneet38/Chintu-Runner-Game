let chintu,chintuImage,coinSound;
let bckg,bckgImage,coin,coinImg,obstcale,obstacleImg;
let score=0;
let ground,groundImg;
let PLAY=0
let END=1;
let gameState=PLAY;

function preload(){
  chintuImage = loadImage("chintu.png");
  bckgImage = loadImage("bckg.jpg");
  cloudImage= loadImage("cloud.png");
  coinImg = loadImage("coin.png")
  coinSound = loadSound("mixkit-retro-game-notification-212.wav");
  groundImage = loadImage("ground2.png");
  jumpS = loadSound("mixkit-fast-small-sweep-transition-166 (1).wav");
  obstacleImg=loadImage("cactus.png");
  gameOverImg = loadImage("gameOver.png")
  restartImg=loadImage("restart.png");
  goS=loadSound("mixkit-arcade-retro-game-over-213 (1).wav")
}

function setup() {
 
  createCanvas(windowWidth,windowHeight);
  
  chintu = createSprite(50,windowHeight-100,10,10)
  chintu.addImage(chintuImage);
  chintu.scale=0.6;
  chintu.debug=false;
  chintu.setCollider("circle",55,5,80)
  
  bckg = createSprite(300,300,600,600)
  bckg.addImage(bckgImage)
  bckg.scale=5
  
  gameOver=createSprite(windowWidth/2,windowHeight/2,20,20)
  gameOver.addImage(gameOverImg);
  
  restart=createSprite(windowWidth/2,(windowHeight/2)+70,20,20)
  restart.addImage(restartImg)
  

  ground = createSprite(windowWidth/2,windowHeight-50,windowWidth,10)
  
  ground.depth=bckg.depth+1;
  
  ground2=createSprite(windowWidth/2,windowHeight-50,windowWidth,5)
  
  coinGroup=new Group()
  obstacleGroup=new Group()
}


function draw() {
  background("white")
  
  if(gameState===PLAY) {
    
    bckg.velocityX=-7;
    
    if(bckg.x<0) {
      bckg.x=600
    }
    
  if(keyDown("space")) {
    chintu.velocityY=-15;
    jumpS.play()
  }
    
  chintu.velocityY=chintu.velocityY+0.5
    
    
  if(chintu.isTouching(coinGroup)) {
    coinGroup.destroyEach();
    coinSound.play();
    score=score+5;  
  }
    
  if(obstacleGroup.isTouching(chintu)) {
    goS.play()
    gameState=END;
  }
    
  gameOver.visible=false;
  restart.visible=false;
    
  obstacles();
  coins()
  clouds()
  drawSprites();
    
  } else if(gameState===END) {
    chintu.velocityY=0;
    bckg.velocityX=0;
    
    obstacleGroup.destroyEach();
    
    fill("black")
   textSize(40)
   text("Game Over,Press R to reset",(windowWidth/2)-70,windowHeight/2)
 
  }
  
  chintu.depth=bckg.depth+1;
  ground2.shapeColor="black"
  
  if(keyDown('r') || keyDown('R')) {
    reset()
  }
  
  chintu.collide(ground);
  ground.visible=false;

  textSize(20);
  fill("white")
  text("score :" + score,windowWidth-130,70)
}

function clouds() {
  if(frameCount%60===0) {
    cloud=createSprite(windowWidth,random(80,300),10,10);
    cloud.velocityX=-7;
    cloud.addImage(cloudImage)
    cloud.scale=0.3
  }
}

function coins() {
  if(frameCount%120===0) {
    coin=createSprite(windowWidth,random(420,510)  ,10,10);
    coin.velocityX=-7;
    coin.addImage(coinImg)
    coin.scale=0.15  
    coinGroup.add(coin)
  }
}

function obstacles() {
  if(frameCount%100===0) {
    obstacle=createSprite(windowWidth,windowHeight-120,10,10);
    obstacle.velocityX=-7;
    obstacle.addImage(obstacleImg)
    obstacle.scale=0.3
    obstacleGroup.add(obstacle)
  }
}

function reset() {
  gameState=PLAY;
  score=0;
}
