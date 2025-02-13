const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
const acanvas = document.getElementById("screen")
const actx = acanvas.getContext("2d")

var display = {startWidth:1920, aspectRatio:[1920,1080], scale:0}
var player = {x : 192/2, y : 108/2, velX:0, velY:0, targetX : 3}
var enemies = []
var enemyTimer = 10000

function SpawnEnemy(){
    enemies[enemies.length] = {
        x:Math.floor(Math.random()*5),
        y:-50,
        speed: -(Math.random()/3)-.4,
    }
}
function enemyTick(){
    for(let i = 0; i<enemies.length; i++){
        enemies[i].y-=enemies[i].speed
    }
    enemyTimer++
    if(enemyTimer>50){

        SpawnEnemy()
        enemyTimer=0
    }
}

window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}
function tick(){
    requestAnimationFrame(tick)
    playerTick()
    enemyTick()
    drawGame()
    transferDraw()
}

function playerTick(){
    player.velY += .1
    if(justPressed(kd.W)){
        player.velY+=-4
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

    if(player.y<14){
        player.y=14
        player.velY=0
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

        actx.fillRect(((192/5)*(i+1))-21,0,3,1000)

    }

    for(let i = 0; i<enemies.length; i++){
        actx.fillRect(((192/5)*(enemies[i].x+1))-40,enemies[i].y,39,15)

    }
    actx.beginPath()
    actx.fillStyle = "#33363f"
    actx.arc(player.x,player.y,12,0,90,false)
    actx.fill()
    actx.beginPath()
    actx.fillStyle = "#afbfaf"
    actx.arc(player.x,player.y,10,0,90,false)
    actx.fill()


    actx.fillStyle = "#33363f"
    actx.fillRect(0,0,3,1000)
    actx.fillRect(0,0,1000,3)
    actx.fillRect(191-2,0,1000,1000)
    actx.fillRect(0,107-2,1000,1000)
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