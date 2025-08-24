
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
    game.init()
}
function tick(){
    requestAnimationFrame(tick)
    game.tick()
}

init()
requestAnimationFrame(tick)