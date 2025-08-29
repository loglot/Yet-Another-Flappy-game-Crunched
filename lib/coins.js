
const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
import { Entity } from "./Genarics/Entity.js"
export class Coins{
    coins = []
    game
    size = 2
    timer=0
    delay=100
    count=1
    constructor(game){
        this.game=game
    }
    tick(){
        for(let i = 0; i < this.coins.length; i++){
            this.coins[i].x+=this.coins[i].velX
            this.coins[i].y+=this.coins[i].velY
            this.coins[i].velY+=.05
            
        
            // if(Math.sqrt(Math.abs((this.game.player.x-this.coins[i].x)^2+(this.game.player.y-this.coins[i].y)^2)*20)<12){
            // if(Math.abs(this.game.player.x-this.coins[i].x)<12){
            if(Math.hypot(this.game.player.x - this.coins[i].x, this.game.player.y - this.coins[i].y)<=15){
                this.coins.splice(i,1)
                i--
                this.game.player.money+=this.count
            }
            if(this.coins[i].y>108){
                this.coins.splice(i,1)
                i--
            }
        }
        this.timer++
        if(this.timer>this.delay){
            this.makeCoin()
            this.timer=0
        }
    }
    makeCoin(){
        this.coins[this.coins.length]=new Entity(Math.random()*192,-30,Math.random()-.5,0)
    }
    draw(actx){
        for(let i = 0; i < this.coins.length; i++){
            actx.save()
            if(this.game.menu.options[1].index==1){
                actx.translate(Math.round(this.coins[i].x),Math.round(this.coins[i].y))
            } else {
                actx.translate(this.coins[i].x,this.coins[i].y)
            }
            actx.beginPath()
            actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][5]
            actx.globalAlpha=(this.coins[i].y<5)?(this.coins[i].y/20)+2:0
            actx.arc(0,0-Math.round(this.coins[i].y)+10,this.size+2,0,90,false)
            actx.fill()
            actx.beginPath()
            actx.globalAlpha=1
            actx.arc(0,0,this.size+2,0,90,false)
            actx.fill()
            actx.beginPath()
            actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][7]
            actx.globalAlpha=(this.coins[i].y<5)?(this.coins[i].y/20)+2:0
            actx.arc(0,10-Math.round(this.coins[i].y),this.size,0,90,false)
            actx.fill()
            actx.beginPath()
            actx.globalAlpha=1
            actx.arc(0,0,this.size,0,90,false)
            actx.fill()
            actx.restore()
            // actx.fillStyle="#000"
            // actx.fillRect(Math.sqrt(Math.abs((this.game.player.x-this.coins[i].x)^2+(this.game.player.y-this.coins[i].y)^2)),3,3,3)
        }
    }
}