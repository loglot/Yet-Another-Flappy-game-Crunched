const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
const acanvas = document.getElementById("screen")
const actx = acanvas.getContext("2d")

var display = {startWidth:1920, aspectRatio:[1920,1080], scale:0}
var player = {x : 192/2, y : 108/2, velX:0, velY:0, targetX : 3, jumps:2, scoreTimer :0, score:0}
var enemies = [{
    x:2,
    y:70,
    speed: -.1,
    hitTimer:0
}]
var enemyTimer = 10000
var GameState = 0
var highScore=0

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
                player.x > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                player.x < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                player.y+12 < enemies[i].y +15 &&
                player.y+12 > enemies[i].y 

            ){
                player.velY=-2
                if(player.jumps<2){
                    player.jumps=2
                }
            }
            if(
                player.x > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                player.x < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                player.y-12 < enemies[i].y +15 &&
                player.y-12 > enemies[i].y 

            ){
                player.velY=2
            }
            if(
                player.x-12 > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                player.x-12 < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                player.y < enemies[i].y +15 &&
                player.y > enemies[i].y 

            ){
                if(player.targetX<5){
                    player.velX+=2
                    player.targetX+=1
                    enemies[i].hitTimer = 5
                }
            }
            if(
                player.x+12 > Math.round(((192/5)*(enemies[i].x+1))-40) &&
                player.x+12 < Math.round(((192/5)*(enemies[i].x+1))-1) &&
                player.y < enemies[i].y +15 &&
                player.y > enemies[i].y 

            ){
                if(player.targetX>1){
                    player.velX-=2
                    player.targetX-=1
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
     player = {x : 192/2, y : 108/2, velX:0, velY:0, targetX : 3, jumps:2, scoreTimer :0,score:0}
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
    if(GameState==1){
        playerTick()
        enemyTick()
        drawGame()
    } else if(GameState==0){
        menuTick()
        drawMenu()
    }
    transferDraw()
}

function menuTick(){
    if(justPressed(kd.W)){
        reset()
        GameState=1
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

    if(player.score>highScore){
        highScore=player.score
    }
    if(highScore>0){
        actx.strokeText(`HS:${highScore}`, 10, 90)
        actx.fillText(`HS:${highScore}`, 10, 90)
    actx.textAlign = "right"
        actx.strokeText(`LS:${player.score}`, 183, 90)
        actx.fillText(`LS:${player.score}`, 183, 90)

    }
    actx.textAlign = "left"
        // actx.strokeText("High Score:", 10, 80)
        // actx.fillText("High Score:", 10, 80)
}

function playerTick(){
    player.velY += .1
    if(justPressed(kd.W)){
        if(player.jumps>0){
            player.jumps--
            player.velY+=-4
        }
    }
    if(justPressed(kd.A)){
        if(player.targetX>1){

            player.velX-=2
            player.targetX-=1
        
        }
    }
    if(justPressed(kd.D)){
        if(player.targetX<5){

            player.velX+=2
            player.targetX+=1
    
        }
    }
    player.y+=player.velY
    player.x+=player.velX
    player.velX*=.95
    player.scoreTimer++
    if(player.scoreTimer>= 100){
        player.scoreTimer = 0
        player.score++
    }

    if(player.y<14){
        player.y=14
        player.velY=0
    }
    if(player.y>140){
        GameState=0
    }
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

    drawPlayer()

    actx.fillStyle = "#33363f"
    actx.fillRect(0,0,3,1000)
    actx.fillRect(0,0,1000,3)
    actx.fillRect(191-2,0,1000,1000)
    actx.fillRect(0,107-2,1000,1000)


    actx.strokeText(`${player.score}`, 5, 17)
    actx.fillStyle = "#fff"
    actx.fillText(`${player.score}`, 5, 17)
}

function drawPlayer(){
    actx.save()
    actx.translate(Math.round(player.x),Math.round(player.y))
    actx.beginPath()
    actx.fillStyle = "#33363f22"
    actx.arc(-2,2,12,0,90,false)
    actx.fill()
    actx.beginPath()
    actx.fillStyle = "#33363f"
    actx.arc(0,0,12,0,90,false)
    actx.fill()
    actx.beginPath()
    actx.fillStyle = "#afbfaf"
    actx.arc(0,0,10,0,90,false)
    actx.fill()
    actx.beginPath()
    actx.fillStyle = "#fff5"
    actx.arc(0,0,10,0,(player.scoreTimer/50)*Math.PI,false)
    actx.moveTo(0,0)
    actx.lineTo(10,0)
    actx.lineTo(-Math.sin((player.scoreTimer/15.923566879)-1.57)*10,Math.cos((player.scoreTimer/15.923566879)-1.52)*10)
    actx.fill()
    for(let i = 0; i<player.jumps;i++){
        actx.beginPath()
        actx.fillStyle = "#33363f22"
        actx.arc(Math.sin((i-2.5)/1.5)*12-2,Math.cos((i-2.5)/1.5)*12+2,5,0,90,false)
        actx.fill()

        actx.beginPath()
        actx.fillStyle = "#33363f"
        actx.arc(Math.sin((i-2.5)/1.5)*12,Math.cos((i-2.5)/1.5)*12,5,0,90,false)
        actx.fill()
        actx.beginPath()
        actx.fillStyle = "#fff"
        actx.arc(Math.sin((i-2.5)/1.5)*12,Math.cos((i-2.5)/1.5)*12,3,0,90,false)
        actx.fill()
    }
    actx.restore()

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