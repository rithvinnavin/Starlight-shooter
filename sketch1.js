var splashimg
var gameState = "wait"
var storybutton, mutebutton, musicbutton, nextbutton, playbutton, infobutton, bglevel1
var e1, e2, e3
var ground, enemieslevel1Group, playermissile, enemymissile, playermissileimg, enemymissileimg
var playermissileGroup, enemymissileGroup
var explosionimg, explosion, i, j, enemy1, enemy2, enemy3, enemy4, enemy5, randX1, randX2, randX3, bglevel3, bglevel2, bglevel1
var health1 = 10
var maxHealth = 400
var score = 0
var score3=0
var health2 = 10
var health3 = 10
var enemy6, enemy7, enemy8, enemy9
var counter=0




function preload() {
    splashimg = loadImage("splash.gif")
    // bglevel1=loadImage("assets/background.png")
    bglevel1 = loadImage("assets/skybackground.png")

    bglevel2 = loadImage("assets/level2_bg.jpg")

    bglevel3 = loadImage("assets/level3_bg.jpg")



    playerimg = loadImage("assets/playersplane.gif")

    e1 = loadImage("assets/enemy plane1.gif")
    e2 = loadImage("assets/enemyplane2.png")
    e3 = loadImage("assets/enemyplane3.png")
    e4 = loadImage("assets/boss_level3.gif")




    playermissileimg = loadImage("assets/player missile.gif")
    enemymissileimg = loadImage("assets/enemy missile.gif")

    explosionimg = loadImage("assets/explosion.gif")


    // load sound

    bgmusic=loadSound("assets/gaming-sound-143716.mp3")
    blastsound=loadSound("assets/blast.mp3")
    winsound=loadSound("assets/winclap2.wav")
    oversound=loadSound("assets/mixkit-retro-arcade-game-over-470.wav")
   
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    
    playbutton = createImg("assets/startbutton.png")
    playbutton.position(0, height / 2)
    playbutton.size(250, 250)

    musicbutton = createImg("assets/soundButton.png")
    musicbutton.position(width - 250, height / 2)
    musicbutton.size(250, 250)


    mutebutton = createImg("assets/mute.png")
    mutebutton.position(width - 250, height / 2)
    mutebutton.size(250, 250)
    mutebutton.hide()

    // replace with information image
    infobutton = createImg("assets/popUpMessage.png")
    infobutton.position(0, 0)
    infobutton.size(width, height)
    infobutton.hide()

    ground = createSprite(width / 2, height / 2)
    ground.addImage(bglevel1)
    ground.visible = false
    ground.scale = 0.6
    // groundimg.resize(width*1.5,height)
    ground.velocityY = 7
    ground.y = ground.height / 2

    playermissileGroup = new Group()
    enemymissileGroup = new Group()
    enemieslevel1Group = new Group()

    // character
    player = createSprite(width / 2, height - 100)
    player.addImage(playerimg)
    player.scale = 0.075
    player.visible = false
   // player.debug = true
    //player missile
    // playermissile=createSprite(width)

 oversound.setVolume(0.05)



    bgmusic.play()
bgmusic.setVolume(0.15)
bgmusic.loop()
}

function draw() {
   
    if (gameState == "wait") {
        background(splashimg)
        infobutton.hide()
     
    }

    playbutton.mousePressed(() => {
        gameState = "info"
        playbutton.hide()
        infobutton.show()

    })
    if (gameState === "info") {
        infobutton.show()
    }

    infobutton.mousePressed(() => {
        background(bglevel1)

        gameState = "level1"
        playbutton.hide()
        infobutton.hide()
        mutebutton.hide()
        musicbutton.hide()


    })



    musicbutton.mousePressed(() => {
        musicbutton.hide()
        mutebutton.show()
        bgmusic.play()
    })

    mutebutton.mousePressed(() => {
        musicbutton.show()
        mutebutton.hide()
        bgmusic.stop()
    })

    if (gameState == "level1") {
        background(0)
        spawnEnemiesLevel1()
        movement()
        ground.visible = true
        player.visible = true

        // enemieslevel1Group.overlap(player, () => {
        //     alert("enemy destroyed")
        // })

        if (ground.y > height) {
            ground.y = 0
        }

        mutebutton.hide()
        musicbutton.hide()

        if (playermissileGroup.isTouching(enemy1) || playermissileGroup.isTouching(enemy2)) {
            // coinCollecting.play()
            if (playermissileGroup.isTouching(enemy1)) {
                enemy1.remove()
                // score += 10
                health1 += 30
                blastsound.play()
               playermissileGroup.destroyEach()

            }
            if (playermissileGroup.isTouching(enemy2)) {
                enemy2.remove()
                // score1 += 10
                health1 += 30
                blastsound.play()
               playermissileGroup.destroyEach()


            }


        }


     







        if (health1 >= maxHealth) {
            level1over()
            winsound.play()
            enemy1.visible = false
            enemy2.visible = false
            player.visible = false
            ground.visible = false
            playermissileGroup.destroyEach()
        }




    }



    if (gameState == "level2") {
        winsound.stop()
        background("red")
        ground.addImage(bglevel2)
        ground.scale = 4.25

        spawnEnemiesLevel2()
        movement()
        ground.visible = true
        player.visible = true



        if (ground.y > height) {
            ground.y = 0
        }

        mutebutton.hide()
        musicbutton.hide()

        if (playermissileGroup.isTouching(enemy3) || playermissileGroup.isTouching(enemy4) || playermissileGroup.isTouching(enemy5)) {
            if (playermissileGroup.isTouching(enemy3)) {
                if(counter >=2){
                    blastsound.play()

                    enemy3.remove()
                    textSize(40)
                    fill("red")
                    text(counter,windowWidth,windowHeight)
                   }
                // enemy3.remove()
                //     // score += 10
                counter +=1
                health2 += 30
               playermissileGroup.destroyEach()
           

            }

            if (playermissileGroup.isTouching(enemy4)) {
                enemy4.remove()
                blastsound.play()

                //     // score += 10
                health2 += 30
               playermissileGroup.destroyEach()

            }


            if (playermissileGroup.isTouching(enemy5)) {
                enemy5.remove()
                blastsound.play()

                //     // score += 10
                health2 += 30
               playermissileGroup.destroyEach()

            }

        }



        if (health2 >= maxHealth) {
            level2over()
            winsound.play(

            )

            enemy3.visible = false
            enemy4.visible = false
            enemy5.visible = false

            player.visible = false
            ground.visible = false
            playermissileGroup.destroyEach()
        }




    }


    //  level 3


    if (gameState == "level3") {
        winsound.stop()
        background(0)
        ground.visible = true
        ground.addImage(bglevel3)
        ground.scale = 4.25

        movement()
        spawnEnemiesLevel3()

        player.visible = true



        if (ground.y > height) {
            ground.y = 0
        }



        
        if (playermissileGroup.isTouching(enemy6) || playermissileGroup.isTouching(enemy7) || playermissileGroup.isTouching(enemy8)|| playermissileGroup.isTouching(enemy9)) {
            if (playermissileGroup.isTouching(enemy6)) {
                enemy6.remove()
                blastsound.play()
                health3 += 30
               playermissileGroup.destroyEach()
            }

            if (playermissileGroup.isTouching(enemy7)) {
                enemy7.remove()
                blastsound.play()
                health3 += 30
               playermissileGroup.destroyEach()

            }


            if (playermissileGroup.isTouching(enemy8)) {
                enemy8.remove()
                blastsound.play()
                health3 += 30
               playermissileGroup.destroyEach()

            }


            if (playermissileGroup.isTouching(enemy9)) {
                enemy9.remove()
                blastsound.play()
                health3 += 30
               playermissileGroup.destroyEach()

            }

        }

        if (health3 >= maxHealth) {
            level3over()
            winsound.play()
            enemy6.visible = false
            enemy7.visible = false
            enemy8.visible = false
            enemy9.visible = false
oversound.play()

            player.visible = false
            ground.visible = false
            playermissileGroup.destroyEach()
        }

    }





    drawSprites()

    if (gameState == "level1") {
        healthlevel1()
    }

    if (gameState == "level2") {
        healthlevel2()
    }

    if (gameState == "level3") {
        healthlevel3()

    }
    

}




function level1over() {
    swal({
        title: "Enemies Destroyed!! ",
        text: " LEVEL 1 Over!!",
        imageUrl: "assets/explosion.gif",
        imageSize: '200x200',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'LEVEL 2 !!!',
    },
        function (isConfirm) {
            gameState = "level2"

        })

}

// health level 1
function healthlevel1() {
    stroke("blue");
    strokeWeight(10);
    noFill();
    rect(10, 10, 200, 20);

    noStroke();
    fill(255, 25, 25);
    rect(10, 10, map(health1, 0, maxHealth, 0, 200), 20);
    //   health++


    stroke(0)
    strokeWeight(5)
    fill("red")
    textSize(30)
    text(gameState, width / 2 - 100, 50)
}





function spawnEnemiesLevel1() {
    if (frameCount % 80 == 0) {
        var randX1 = Math.round(random(50, width - 50))
        enemy1 = createSprite(randX1, 0)
        enemy1.velocityY = 4
        enemy1.scale = 0.25
        enemy1.visible = false
        enemy1.addImage(e2)
       // enemy1.debug=true


        var randX2 = Math.round(random(50, width - 50))
        enemy2 = createSprite(randX2, 0)
        enemy2.velocityY = 4
        enemy2.scale = 0.25
        enemy2.visible = false
        enemy2.addImage(e3)
        //enemy2.debug=true




        rand = Math.round(random(1, 2))
        switch (rand) {
            case 1: enemy1.visible = true
                break;

            case 2: enemy2.visible = true
                break;

            default: break;

          }

        
          if (player.isTouching(enemy1) || player.isTouching(enemy2)){
            health1 -=20
        }

    }
}




// level 2


function level2over() {
    swal({
        title: "Enemies Destroyed!! ",
        text: " LEVEL 2 Over!!",
        imageUrl: "assets/explosion.gif",
        imageSize: '200x200',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'LEVEL 3 !!!',
    },
        function (isConfirm) {
            gameState = "level3"

        })

}




function healthlevel2() {
    stroke("cyan");
    strokeWeight(10);
    noFill();
    rect(10, 10, 200, 20);

    noStroke();
    fill(255, 0, 0);
    rect(10, 10, map(health2, 0, maxHealth, 0, 200), 20);
    //   health++



    stroke(0)
    strokeWeight(5)
    fill("cyan")
    textSize(30)
    text(gameState, width / 2 - 100, 50)
}




function spawnEnemiesLevel2() {
    if (frameCount % 80 == 0) {
        var randX1 = Math.round(random(50, width - 50))
        enemy3 = createSprite(randX1, 0)
        enemy3.velocityY = 5.5
        enemy3.scale = 0.075
        enemy3.visible = false
        enemy3.addImage(e1)


        var randX2 = Math.round(random(50, width - 50))
        enemy4 = createSprite(randX2, 0)
        enemy4.velocityY = 5.5
        enemy4.scale = 0.25
        enemy4.visible = false
        enemy4.addImage(e2)

        var randX3 = Math.round(random(50, width - 50))
        enemy5 = createSprite(randX3, 0)
        enemy5.velocityY = 5.5
        enemy5.scale = 0.25
        enemy5.visible = false
        enemy5.addImage(e3)



        rand = Math.round(random(1, 3))
        switch (rand) {
            case 1: enemy3.visible = true
                break;

            case 2: enemy4.visible = true
                break;

            case 3: enemy5.visible = true
                break;

            default: break;

        }
    }

}


function movement() {
  

    player.x = mouseX
    // player.y=mouseY

    if (keyDown("space")) {

        playermissile = createSprite(player.x, player.y)
        playermissile.addImage(playermissileimg)
       // playermissile.debug=true
        playermissile.velocityY = -6
        playermissile.scale = 0.35
        playermissileGroup.add(playermissile)

    }
}


// level 3
function healthlevel3() {
    stroke("cyan");
    strokeWeight(10);
    noFill();
    rect(10, 10, 200, 20);

    noStroke();
    fill(255, 25, 25);
    rect(10, 10, map(health3, 0, maxHealth, 0, 200), 20);
    //   health++


    stroke(0)
    strokeWeight(5)
    fill("cyan")
    textSize(30)
    text(gameState, width / 2 - 100, 50)
}



function spawnEnemiesLevel3() {
    if (frameCount % 80 == 0) {
        var randX1 = Math.round(random(50, width - 50))
        enemy6 = createSprite(randX1, 0)
        enemy6.velocityY = 5.5
        enemy6.scale = 0.075
        enemy6.visible = false
        enemy6.addImage(e1)


        var randX2 = Math.round(random(50, width - 50))
        enemy7 = createSprite(randX2, 0)
        enemy7.velocityY = 5.5
        enemy7.scale = 0.25
        enemy7.visible = false
        enemy7.addImage(e2)

        var randX3 = Math.round(random(50, width - 50))
        enemy8 = createSprite(randX3, 0)
        enemy8.velocityY = 5.5
        enemy8.scale = 0.25
        enemy8.visible = false
        enemy8.addImage(e3)

        var randX4 = Math.round(random(50, width - 50))
        enemy9 = createSprite(randX4, 0)
        enemy9.velocityY = 5.5
        enemy9.scale =0.5
        enemy9.visible = false
        enemy9.addImage(e4)

        rand = Math.round(random(1, 4))
        switch (rand) {
            case 1: enemy6.visible = true
                break;

            case 2: enemy7.visible = true
                break;

            case 3: enemy8.visible = true
                break;

            case 4: enemy9.visible = true
                break;


            default: break;

        }
    }

}

function level3over() {
    swal({
        title: "AIR BASE CLEAR!! ",
        text: " All Enemies Neutralized!!",
        imageUrl: "assets/explosion.gif",
        imageSize: '200x200',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Restart',
    },
        function (isConfirm) {
            window.location.reload()

        })

}
