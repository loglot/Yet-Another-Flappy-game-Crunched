
window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
const acanvas = document.getElementById("screen")
const actx = acanvas.getContext("2d")

import { Game } from "./lib/imports.js"
var game = new Game()

function reset(){
    game.player.reset()
    game.platforms.reset()
}
function init(){
    game.highScore=game.cookies.get("HS")
}
function tick(){
    requestAnimationFrame(tick)
    if(game.state==1){
        game.player.tick()
        game.platforms.tick()
        // enemyTick()
        game.display.drawGame()
    } else if(game.state==0){
        menuTick()
        game.display.drawMenu()
    }
    game.display.transferDraw()
    game.display.drawSmooth()
    game.display.tick()
}

function menuTick(){
    if(justPressed(kd.W)){
        reset()
        game.state=1
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



init()
requestAnimationFrame(tick)