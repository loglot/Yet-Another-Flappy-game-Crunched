const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
const acanvas = document.getElementById("screen")
const actx = acanvas.getContext("2d")

var display = {startWidth:1920, aspectRatio:[1920,1080], scale:0}
var enemies = [{
    x:2,
    y:70,
    speed: -.1,
    hitTimer:0
}]
var enemyTimer = 10000
var highScore=0
import { Game } from "./lib/imports.js"
var game = new Game()

function SpawnEnemy(type=0){
    enemies[enemies.length] = {
        x:Math.floor(Math.random()*5),
        y:-50,
        speed: -(Math.random()/3)-.4,
        hitTimer:0,
        type:type
    }
}
function enemyTick(){
    for(let i = 0; i<enemies.length; i++){
        enemies[i].y-=enemies[i].speed
        enemies[i].hitTimer--
        if(enemies[i].y >= 120){
            enemies.splice(i,1)
        }
        if(enemies[i].hitTimer < 0){
            if(
                game.player.x > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                game.player.x < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                game.player.y+12 < enemies[i].y +15 &&
                game.player.y+12 > enemies[i].y 

            ){
                game.player.velY=-2
                if(game.player.jumps<2){
                    game.player.jumps=2
                }
            }
            if(
                game.player.x > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                game.player.x < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                game.player.y-12 < enemies[i].y +15 &&
                game.player.y-12 > enemies[i].y 

            ){
                game.player.velY=2
            }
            if(
                game.player.x-12 > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                game.player.x-12 < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                game.player.y < enemies[i].y +15 &&
                game.player.y > enemies[i].y 

            ){
                if(game.player.targetX<5){
                    game.player.velX+=2
                    game.player.targetX+=1
                    enemies[i].hitTimer = 5
                }
            }
            if(
                game.player.x+12 > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                game.player.x+12 < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                game.player.y < enemies[i].y +15 &&
                game.player.y > enemies[i].y 

            ){
                if(game.player.targetX>1){
                    game.player.velX-=2
                    game.player.targetX-=1
                    enemies[i].hitTimer = 5
                }
                
            }
        }
    }
    enemyTimer++
    if(enemyTimer>50){

        SpawnEnemy()
        enemyTimer=0
    }
}
function reset(){
    game.player.reset()
 enemies = [{
    x:2,
    y:70,
    speed: -.1,
    hitTimer:0
}]
 enemyTimer = 10000
}

window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}
function tick(){
    requestAnimationFrame(tick)
    if(game.state==1){
        game.player.tick()
        enemyTick()
        drawGame()
    } else if(game.state==0){
        menuTick()
        drawMenu()
    }
    transferDraw()
}

function menuTick(){
    if(justPressed(kd.W)){
        reset()
        game.state=1
    }
}
function drawMenu(){

    actx.clearRect(0,0,1000,1000)
    actx.fillStyle = "rgb(167,199,216)"
    actx.fillRect(0,0,1000,1000)
    actx.fillStyle = "#33363f"
    actx.fillRect(0,0,3,1000)
    actx.fillRect(0,0,1000,3)
    actx.fillRect(191-2,0,1000,1000)
    actx.fillRect(0,107-2,1000,1000)
    actx.font = "15px sans-serif";
    actx.strokeStyle = "#33363f"
    actx.lineWidth = 5;
    actx.textAlign = "left"
    actx.lineJoin = 'miter';
    actx.miterLimit = 2
    actx.strokeText("Yet Another Flappy Game", 10, 20)
    actx.strokeText("Press W To Start", 10, 45)
    actx.fillStyle = "#fff"
    actx.fillText("Press W To Start", 10, 45)
    actx.fillText("Yet Another Flappy Game", 10, 20)

    if(game.player.score>highScore){
        highScore=game.player.score
    }
    if(highScore>0){
        actx.strokeText(`HS:${highScore}`, 10, 90)
        actx.fillText(`HS:${highScore}`, 10, 90)
    actx.textAlign = "right"
        actx.strokeText(`LS:${game.player.score}`, 183, 90)
        actx.fillText(`LS:${game.player.score}`, 183, 90)

    }
    actx.textAlign = "left"
        // actx.strokeText("High Score:", 10, 80)
        // actx.fillText("High Score:", 10, 80)
}

function justPressed(KDKEY){
    var returns = false
    if(KDKEY.isDown()){
        if(!KDKEY.wasDown){
            returns = true
        }
        KDKEY.wasDown = true
    } else {KDKEY.wasDown = false}

    return(returns)
    
}

function drawGame(){

    actx.clearRect(0,0,1000,1000)
    actx.fillStyle = "rgb(167,199,216)"
    actx.fillRect(0,0,1000,1000)
    actx.fillStyle = "#33363f"
    for(let i = 0; i<5; i++){

        actx.fillRect(Math.round(((192/5)*(i+1))-21),0,3,1000)

    }

    for(let i = 0; i<enemies.length; i++){
        actx.fillRect(Math.round(((192/5)*(enemies[i].x+1))-40),Math.round(enemies[i].y),39,15)

    }

    game.player.draw(actx)

    actx.fillStyle = "#33363f"
    actx.fillRect(0,0,3,1000)
    actx.fillRect(0,0,1000,3)
    actx.fillRect(191-2,0,1000,1000)
    actx.fillRect(0,107-2,1000,1000)


    actx.strokeText(`${game.player.score}`, 5, 17)
    actx.fillStyle = "#fff"
    actx.fillText(`${game.player.score}`, 5, 17)
}


function transferDraw(){
    resize()


    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
        ctx.save()
        ctx.scale(10,10)
        ctx.drawImage(acanvas,0,0)
        ctx.restore();

}

function resize(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = display.aspectRatio[1] * window.innerWidth / display.aspectRatio[0];
    if(ctx.canvas.height>window.innerHeight){
        ctx.canvas.height=window.innerHeight
        ctx.canvas.width = display.aspectRatio[0] * window.innerHeight / display.aspectRatio[1]
    }
    ctx.scale(ctx.canvas.width/display.startWidth,ctx.canvas.width/display.startWidth)
    display.scale=ctx.canvas.width/display.startWidth
}
requestAnimationFrame(tick)