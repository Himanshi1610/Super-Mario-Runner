var bkg, bkgImage, Edges;
var mario, marioMoving, marioImage, marioMovingImage, mariosJump, mariolJump, marioLeft, marioLeftMoving, marioDie;
var ground, groundImage, invisibleGround;
var jumplSound, jumpsSound, dieSound, warningSound, selectSound, gameOverSound, music, timeMusic, stomp, brickSound;
var brick, brickImage;
var enemy1, enemy2, enemyMove, enemyKill;
var score1=0, score2=0, score3=100, hS=0;
var obstaclesGroup, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacleCoinGroup;
var coin = [20];
var coin, coinImage, coinSound;
var life, lifeCount = 3;
var gameOver, restart, gameOverImg, restartImg;
var princess, princessImage, win;

var START = 0;
var PLAYI = 1;
var TIME = 2;
var PLAYII = 3;
var HELP = 4;
var ABOUT = 5;
var END=6;
var WIN=7;
var gameState = START;

var marioFont;
var selectLogo, selectImage, selectbarrier1, selectbarrier2;
var marioLogo, logoImage;

function preload(){
  bkgImage = loadImage("images/bkg.png");
  
  marioImage = loadAnimation("images/mario00.png");
  marioMoving = loadAnimation("images/mario01.png",  "images/mario02.png", "images/mario03.png");
  mariosJump = loadAnimation("images/mario03.png");
  mariolJump = loadAnimation("images/mario01.png"); 
  marioLeft = loadAnimation("images/mario00l.png");
  marioLeftMoving = loadAnimation("images/mario01l.png", "images/mario02l.png","images/mario03l.png");
  marioDie = loadAnimation("images/collided.png");
  
  groundImage = loadImage("images/ground2.png");
  
  brickImage = loadImage("images/brick.png")
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");

  coinImage = loadImage("images/coin.png")
  
  jumplSound = loadSound("sound/jumpl.wav")
  jumpsSound = loadSound("sound/jumps.wav")
  dieSound = loadSound("sound/die.wav")
  checkPointSound = loadSound("sound/checkPoint.mp3");
  selectSound = loadSound("sound/touch.wav");
  coinSound = loadSound("sound/coin.wav");
  warningSound = loadSound("sound/warning.wav");
  gameOverSound = loadSound("sound/gameover.wav");
  music = loadSound("sound/music.ogg");
  timeMusic = loadSound("sound/timeMusic.ogg");
  stomp = loadSound("sound/stomp.wav");
  brickSound = loadSound("sound/brick.wav");
  win = loadSound("sound/win.wav")
  
  marioFont = loadFont("textFont/emulogic.ttf");
  
  logoImage = loadImage("images/supermario.png");
  
  selectImage = loadImage("images/select.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");

  enemyMove = loadAnimation("images/enemy1.png", "images/enemy2.png");
  enemyKill = loadAnimation("images/enemy3.png");

  princessImage = loadImage("images/Princess Peach.png");
}

function setup(){
  createCanvas(600,370);
  frameRate(24);
  
  bkg = createSprite(300,180,10,10);
  bkg.addImage(bkgImage);
  
  Edges = createEdgeSprites();
  
  marioMoving.frameDelay =1;
  mario = createSprite(100, 290, 10,10);
  mario.addAnimation("mario",marioImage);
  mario.addAnimation("marioL", marioLeft);
  mario.addAnimation("movingR", marioMoving);
  mario.addAnimation("movingL", marioLeftMoving);
  mario.addAnimation("jumpS", mariosJump);
  mario.addAnimation("jumpS", mariolJump);
  mario.addAnimation("die", marioDie);
  mario.scale = 1.2;
  
  ground = createSprite(300, 350, 600,10);
  ground.addImage(groundImage);
  
  invisibleGround = createSprite(300,318,600,10);
  invisibleGround.visible=false;
  
  coin = createSprite(230,15,10,10);
  coin.addImage(coinImage);
  coin.scale=0.03;
  
  marioLogo = createSprite(300,100,10,10);
  marioLogo.addImage(logoImage);
  marioLogo.scale=0.2;
  marioLogo.visible= false;
  
  selectLogo = createSprite(170,195,5,5);
  selectLogo.addImage(selectImage);
  selectLogo.scale =0.03;
  selectLogo.visible = false;
  
  obstaclesGroup = new Group();
  brickGroup = new Group();
  obstacleCoinGroup = new Group();
  
  life = createSprite(270, 160,10,10);
  life.addAnimation("mario",marioImage);
  life.visible = false
  
  gameOver = createSprite(300, 120, 10,10);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300, 220, 10,10);
  restart.addImage(restartImg);
  restart.scale = 0.7;
  
  mario.setCollider("rectangle", 0, 0, 15,30);
  
  for(var i = 1; i<=20; i++){
      coin[i] = createSprite(600+(i*150), 165, 5, 5);
      coin[i].addImage(coinImage);
      coin[i].scale = 0.03;
      coin[i].y = random(70,250);
    }
  
  enemy1 = createSprite(600+50,300,5,5);
  enemy1.addAnimation("move", enemyMove);
  enemy1.addAnimation("kill", enemyKill);
  enemy1.visible = false;
  enemy1.scale = 1.5;
  enemy2 = createSprite(600+200,300,5,5);
  enemy2.addAnimation("move", enemyMove);
  enemy2.addAnimation("kill", enemyKill);
  enemy2.visible = false;
  enemy2.scale = 1.5;

  princess = createSprite(320,285,10,10);
  princess.addImage(princessImage);
  princess.scale = 0.09;
  princess.visible = false;
}

function draw(){
  
   background("black");
  
  if(gameState === START){
    
    frameCount = 0;
    
    mario.collide(invisibleGround);
    mario.collide(Edges);
    
    marioLogo.visible = true;
    selectLogo.visible = true;
    bkg.visible = false;
    mario.visible = true;
    life.visible = false;
    ground.visible = true;
    gameOver.visible = false;
    restart.visible = false;
    enemy1.visible = false;
    enemy2.visible = false;
    princess.visible = false;

    for(var i = 1; i<=20; i++) {
     coin[i].visible = true;
    }
    
    textFont(marioFont);
    textSize(15);
    fill("white");
    text("START GAME", 200,200);
    text("Help",200, 220);
    text("About",200,240);
    
    mario.changeAnimation("mario",marioImage);
    mario.x = 100;
    mario.y = 290;
    enemy1.x = random(600, 1200);
    enemy2.x = random(600, 1200);
    
    if(selectLogo.y>=190 && selectLogo.y<=240){
      if(keyDown("down") && selectLogo.y === 195){
        selectLogo.y = 215;
        selectSound.play();
      }
      
      if(keyWentDown("down") && selectLogo.y === 215){
        selectLogo.y = 235;
        selectSound.play();
      }

      if(keyDown("up") && selectLogo.y === 235){
        selectLogo.y = 215;
        selectSound.play();
      }
      
      if(keyWentDown("up") && selectLogo.y === 215){
        selectLogo.y = 195;
        selectSound.play();
      }
    }
    
    
    if(keyDown("enter") && selectLogo.y ===195){
       gameState = PLAYI;
    }
    if(keyDown("enter") && selectLogo.y === 215){
      gameState = HELP;
    }
    if(keyDown("enter") && selectLogo.y === 235){
      gameState = ABOUT;
      }
  }
  
  if(gameState === PLAYI){
    
    mario.depth = ground.depth;
    mario.depth = mario.depth+1;
    mario.velocityY = mario.velocityY + 0.8;
    mario.collide(invisibleGround);
    mario.collide(Edges);
    
    marioLogo.visible= false;
    selectLogo.visible = false;
    bkg.visible = true;
    life.visible = false;
    enemy1.visible = true;
    enemy2.visible = true;
    selectSound.stop();
    for(var i = 1; i<=20; i++) {
     coin[i].visible = true;
    }
    
    if(frameCount === 1){
      music.play();
    }

    spawnObstacle();
    spawnBrick();
    var t = Math.round(frameCount/24);
     score3 = 30 - t; 
    
    textFont(marioFont);
    textSize(10);
    fill("white");
    text("MARIO", 90, 15);
    text(score1, 90, 30);
    text("x"+score2, 240, 20);
    text("Time", 380,15);
    text(score3,380,30);
    
    if(keyDown("space") && mario.y>285){
      mario.velocityY = -18;
      jumpsSound.play();
      mario.addAnimation("mario", mariosJump);
    }
    if(keyDown("space") && keyDown("shift") && mario.y>285){
      mario.velocityY = -25;
      jumplSound.play();
      jumpsSound.stop();
      mario.addAnimation("mario", mariolJump);
    }
    if(keyWentUp("space")){
      mario.addAnimation("mario", marioImage);
    }

    mario.velocityY = mario.velocityY + 0.8;
    
    if(keyWentDown("right")){
      marioMoving.frameDelay =2;
      mario.addAnimation("mario", marioMoving);
    }
    if(keyWentDown("right") && keyDown("ctrl")){
      marioMoving.frameDelay =1;
      mario.addAnimation("mario", marioMoving);
    }
    if(keyDown("right") && mario.x<300){
      mario.x = mario.x+2;
    }
    else if(keyDown("right")){
      if(mario.x>=300 && mario.x<305){
        ground.x = ground.x -2;
        backgroundMove();
        bkg.velocityX = -2;
        enemy1.velocityX = -4;
        enemy2.velocityX = -4;
        obstaclesGroup.setVelocityXEach(-2);
        brickGroup.setVelocityXEach(-2);
        for(var i = 1; i<=20; i++) {
            coin[i].velocityX = -2;
        }
      }
    }
    
    if(keyWentUp("right")){
       mario.addAnimation("mario", marioImage);
       ground.velocityX = 0;
       bkg.velocityX =0;
       enemy1.velocityX = -2;
       enemy2.velocityX = -2;
       obstaclesGroup.setVelocityXEach(0);
       brickGroup.setVelocityXEach(0);
      for(var i = 1; i<=20; i++) {
            coin[i].velocityX = 0;
        }
    } 
    
    if(keyWentDown("left")){
      marioLeftMoving.frameDelay = 2;
      mario.addAnimation("mario", marioLeftMoving)
    }
    if(keyWentDown("left") && keyDown("ctrl")){
      marioLeftMoving.frameDelay = 1;
      mario.addAnimation("mario", marioLeftMoving)
    }
    if(keyWentUp("left")){
      mario.addAnimation("mario", marioLeft);
    }
    if(keyDown
      ("left")){
      mario.x = mario.x-2;
    }
    if(keyDown("left") && keyDown("ctrl")){
      mario.x = mario.x-2.5;
    }
    if(keyDown("right") && keyDown("ctrl") && mario.x<300){
      mario.x = mario.x+2.5;
    }
    else if(keyDown("right") && keyDown("ctrl")){
      if(mario.x>=300 && mario.x<305){
        ground.x = ground.x -4.1;
        obstaclesGroup.setVelocityXEach(-6);
        backgroundMove();
        bkg.velocityX =-5.85;
        enemy1.velocityX = -8;
        enemy2.velocityX = -8;
        brickGroup.setVelocityXEach(-6);
        for(var i = 1; i<=20; i++) {
          if(mario.x>=300 && keyDown("right")){
            coin[i].velocityX = -6;
          }
        }
      }
    }
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }

    if(score3 === 0){
      warningSound.play();
      music.stop();
      gameState = TIME;
    }
    
    for(var i = 1; i<=20; i++) {
      if(coin[i].isTouching(mario)){
        coin[i].x = 600 + i*1500;
        score2 = score2 + 1;
        coin[i].y = random(70,250);
        coinSound.play();
      }
      else if(coin[i].x<0){
        coin[i].x = 600 + i*1500;
        coin[i].y = random(70,250);
      }
    }

    if(enemy1.x<0){
      enemy1.y = 300;
      enemy1.x = random(600,1200);
      enemy1.velocityX = -2;
      enemy1.changeAnimation("move",enemyMove);
    }
    if(enemy2.x<0){
      enemy2.x = random(600, 1200);
      enemy2.y = 300;
      enemy2.velocityX = -2;
      enemy2.changeAnimation("move",enemyMove);
    }
    if(enemy1.x >= 600 || enemy2.x >= 600){
      enemy1.y = 300;
      enemy2.y = 300;
      enemy1.changeAnimation("move",enemyMove);
      enemy2.changeAnimation("move",enemyMove);
    }

    if(mario.isTouching(enemy1) || mario.isTouching(enemy2)){
      if(mario.isTouching(enemy1) && mario.y < enemy1.y-5){
        enemy1.changeAnimation("kill", enemyKill);
        enemy1.velocityX = -25;
        stomp.play();
      }
      else if(mario.isTouching(enemy2) && mario.y < enemy2.y-5){
        enemy2.changeAnimation("kill", enemyKill);
        enemy2.velocityX = -25;
        stomp.play();
      }
      else{
        dieSound.play();
        marioLogo.visible= false;
        selectLogo.visible = false;
        bkg.visible = true;
        music.stop();

        obstaclesGroup.setVelocityXEach(0);
        enemy1.velocityX = 0;
        enemy2.velocityX = 0;
        bkg.velocityX=0;
        brickGroup.setVelocityXEach(0);
        for(var i = 1; i<=20; i++) {
            coin[i].velocityX = 0;
            coin[i].x = 600 + i*150;
        }

        mario.changeAnimation("die",marioDie);
        mario.y = 250;
        lifeCount = lifeCount -1;
        gameState = END;
        if(lifeCount === 0){
          dieSound.stop();
          gameOverSound.play();
        } 
      }
    }

    if(brickGroup.isTouching(mario)){
      brickGroup.destroyEach();
      brickSound.play();
      score1 = score1 + 100;
    }

    if(score1 >= 30000 && score3>20 && score3<50){
      gameState = WIN;
      music.stop();
      win.play();
    }
    
    if(obstaclesGroup.isTouching(mario)){
      dieSound.play();
      marioLogo.visible= false;
      selectLogo.visible = false;
      bkg.visible = true;
      music.stop();

      obstaclesGroup.setVelocityXEach(0);
      bkg.velocityX=0
      enemy1.velocityX = 0;
      enemy2.velocityX = 0;
      brickGroup.setVelocityXEach(0);
      for(var i = 1; i<=20; i++) {
            coin[i].velocityX = 0;
            coin[i].x = 600 + i*150;
        }

      mario.changeAnimation("die",marioDie);
      mario.y = 250;
      lifeCount = lifeCount -1;
      gameState = END;
      if(lifeCount === 0){
       dieSound.stop();
       gameOverSound.play();
      }
    }
  }
  
  if(gameState === HELP){
    mario.collide(invisibleGround);
    mario.collide(Edges);
    
    marioLogo.visible= false;
    selectLogo.visible = false;
    bkg.visible = false;
    coin.visible = true;
    gameOver.visible = false;
    restart.visible = false;
    
    textFont(marioFont);
    textSize(20);
    fill("white");
    text("HELP", 250, 100);
    textSize(10);
    text("Press Left/Right Arrow to move", 140, 150);
    text("Press Space to jump small",170,190);
    text("Press Left/Right Arrow + Ctrl to run", 110, 170);
    text("Press Space + Shift to jump long",130,210);
    text("Press Backspace to go back",170,250);
    
    if(keyDown("backspace")){
      gameState = START;
    }
    
    mario.changeAnimation("movingR", marioMoving);
    mario.x=mario.x+3;
    if(mario.x>570){
      mario.visible = false;
    }
  }
  
  if(gameState === ABOUT){
    mario.collide(invisibleGround);
    mario.collide(Edges);
    
    marioLogo.visible= false;
    selectLogo.visible = false;
    bkg.visible = false;
    coin.visible = true;
    life.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    ground.visible = false;
    
    textFont(marioFont);
    textSize(20);
    fill("white");
    text("About", 250, 100);
    textSize(10);
    text("Super Mario is stuck in endless runner world.", 80, 130);
    text("Will he be able to ever re-unite", 150, 150);
    text("with princess daisy?",200,170);
    text("Let's find out.", 230, 190);
    text("Press Backspace to go back",170,250);
    
    if(keyDown("backspace")){
      gameState = START;
    }
  }
  
  
  
  
  if(gameState === TIME){
    life.visible = false;
    
    mario.collide(invisibleGround);
    mario.collide(Edges);
    
    backgroundMove();
    bkg.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    enemy1.velocityX = 0;
    enemy2.velocityX = 0;

    enemy2.x =800;
    enemy1.x = 650;
    brickGroup.setVelocityXEach(0);
    for(var i = 1; i<=20; i++) {
          if(mario.x>=300 && keyDown("right")){
            coin[i].velocityX = 0;
          }
        }
    
    if(mario.x>100){
      mario.changeAnimation("mario", marioLeftMoving);
      mario.x = mario.x - 2;
    }
    else if(mario.x<100){
      mario.changeAnimation("mario", marioMoving);
      mario.x = mario.x + 2;
    }
    if(mario.x>=99 && mario.x<=101){
      mario.x = 100;
      mario.y = 290;
      mario.addAnimation("mario", marioImage)
    }

    
    
    if(keyDown("right")&& mario.x === 100){
      gameState = PLAYII
      timeMusic.play();
    }
  }
  
  
  
  if(gameState === PLAYII){
    life.visible = false;
    princess.visible = false;

    mario.collide(invisibleGround);
    mario.collide(Edges);
    
    mario.changeAnimation("mario", marioMoving);
    
    ground.velocityX = -(5 + 2*score1/100);
    score1 = score1+ Math.round(getFrameRate()/24);
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
    backgroundMove();
    bkg.velocityX = -(5 + 2*score1/100);
    spawnObstacleI();
    spawnBrickI();
    brickGroup.setVelocityXEach(-(5 + 2*score1/100));
    obstaclesGroup.setVelocityXEach(-(5 + 2*score1/100));
    for(var i = 1; i<=20; i++) {
      coin[i].velocityX = -(5 + 2*score1/100);
      if(coin[i].isTouching(mario)){
        coin[i].x = 600;
        score2 = score2 + 1;
        coin[i].y = random(70,250);
        coinSound.play();
      }
      else if(coin[i].x<0){
        coin[i].x = 600 + i*1500;
        coin[i].y = random(70,250);
      }
    }
    
    if(keyDown("space") && mario.y>285){
      mario.velocityY = -10;
      jumpsSound.play();
      mario.addAnimation("mario", mariosJump);
    }
    if(keyDown("space") && keyDown("shift") && mario.y>285){
      mario.velocityY = -13;
      jumplSound.play();
      jumpsSound.stop();
      mario.addAnimation("mario", mariolJump);
    }
    if(keyWentUp("space")){
      mario.addAnimation("mario", marioMoving);
    }
    mario.velocityY = mario.velocityY + 0.8;

    if(brickGroup.isTouching(mario)){
      brickGroup.destroyEach();
      coinSound.play();
      score1 = score1 + 100;
    }
    
    if(obstaclesGroup.isTouching(mario)){
      dieSound.play();
      timeMusic.stop();
      marioLogo.visible= false;
      selectLogo.visible = false;
      bkg.visible = true;

      obstaclesGroup.setVelocityXEach(0);
      bkg.velocityX=0
      brickGroup.setVelocityXEach(0)
      ground.velocityX = 0;
      for(var i = 1; i<=20; i++) {
            coin[i].velocityX = 0;
            coin[i].x = 600 + i*150;
        }
      mario.changeAnimation("die",marioDie);
      mario.y = 250;
      lifeCount = lifeCount -1;
      gameState = END;
    }
  }
  
  
  
  
  
  if (gameState === END){
    princess.visible = false;
    
    mario.velocityY = 5;

    mario.depth = ground.depth;
    mario.depth = mario.depth+1;
    
    if(mario.y >370){
      ground.visible = false;
      enemy1.visible = false;
      enemy2.visible = false;
      bkg.visible = false;
      obstaclesGroup.destroyEach();
      brickGroup.destroyEach();
      life.visible = true;
      for(var i = 1; i<=20; i++) {
            coin[i].visible = false;
      }
    }
    textFont(marioFont);
    textSize(20);
    fill("white");
    text("X", 300, 170);
    text(lifeCount, 330, 170);
    
    score1 = score1 + score2*10;
    score2 = 0;
    
    if(hS<score1){
      hS = score1;
    }
    
    if(lifeCount > 0){
      textSize(10);
      text("Press Enter to restart", 200, 200);
      if(keyDown("Enter")){
        gameState = START;
        mario.x = 100;
        mario.y = 290;
        mario.addAnimation("mario", marioImage);
      }
    } 
    else {
      if(mario.y >370){
        gameOver.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart)){
          mario.addAnimation("mario",marioImage);
          gameState = START;
          score3 = 100;
          score2 = 0;
          score1 = 0;
          lifeCount = 3;
        }
      }
    }
  }
  
  
  

  if(gameState === WIN){
    princess.visible = true;
    brickGroup.destroyEach();
    obstaclesGroup.destroyEach();
    bkg.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    enemy1.visible = false;
    enemy2.visible = false;
    for(var i = 1; i<=20; i++) {
        coin[i].visible = false;
    }
    mario.x = 290;
    mario.y = 290;
    textFont(marioFont);
    textSize(10);
    fill("white");
    text("Thank You Mario!",220,130);
    text("MARIO found the Princess,", 180, 160);
    text("Your quest is over.", 205, 180);
  }
  
  
  console.log(enemy1.y);
  console.log(mario.y);

  enemy1.collide(invisibleGround);
  enemy2.collide(invisibleGround);
  
  drawSprites();
  
  textFont(marioFont);
  textSize(10);
  fill("white");
  text("MARIO", 90, 15);
  text(score1, 90, 30);
  text("x"+score2, 240, 20);
  text("Time", 380,15);
  text(score3,380,30);
  text("HighScore",500, 15)
  text(hS, 500,30);

  if(gameState === TIME){
    text("Press Right Arrow Key", 90,100);
  }
}

function spawnBrick(){
  if(frameCount%250 === 0 && mario.x>=300 && keyDown("right")){
    brick = createSprite(600, 200, 10, 10);
    brick.addImage(brickImage);
    brick.y=Math.round(random(100,250));

    if(brick.y>150 && brick.y<200){
      brick.y = 175;
    }
    
    brickGroup.add(brick);
    brick.lifetime = 5000;
  }
}

function spawnObstacle(){
  if(frameCount%175 === 0 && mario.x>=300 && keyDown("right")){
    obstacle = createSprite(600, 290, 10, 10)
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    obstaclesGroup.add(obstacle);
    obstacle.lifetime = 5000;
  }
}

function spawnBrickI(){
  if(frameCount%500 === 0){
    brick = createSprite(600, 200, 10, 10);
    brick.addImage(brickImage);
    brick.y=Math.round(random(100,250));

    if(brick.y>150 && brick.y<200){
      brick.y = 175;
    }
    
    brickGroup.add(brick);
    brick.lifetime = 600/5;
    mario.collide(brickGroup);
  }
}

function spawnObstacleI(){
  if(frameCount%125 === 0){
    obstacle = createSprite(600, 290, 10, 10)
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break
    default: break;
    }
    obstaclesGroup.add(obstacle);
    obstacle.lifetime = 600/5;
  }
}


function backgroundMove(){
    if(bkg.x<23){
      bkg.x=bkg.width/2;
    }
}