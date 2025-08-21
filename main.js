
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

function init(){
    game.highScore=game.cookies.get("HS")
}
function tick(){
    requestAnimationFrame(tick)
    game.display.drawBackground()
    if(game.state==1){
        game.player.tick()
        game.platforms.tick()
        game.display.drawGame()
        game.achievement.tick()
    } else if(game.state==0){
        game.menu.tick()
        game.menu.draw(actx)
    }
    game.display.transferDraw()
    game.display.tick()
    game.display.drawSmooth()
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