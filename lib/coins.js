import { Entity } from "./Genarics/Entity.js"
export class Coins{
    coins = []
    game
    size = 2
    timer=0
    constructor(game){
        this.game=game
    }
    tick(){
        for(let i = 0; i < this.coins.length; i++){
            this.coins[i].x+=this.coins[i].velX
            this.coins[i].y+=this.coins[i].velY
            this.coins[i].velY+=.1
        }
        this.timer++
        if(this.timer>0){
            this.makeCoin()
            this.timer=0
        }
    }
    makeCoin(){
        this.coins[this.coins.length]=new Entity(Math.random()*192,-5,Math.random()-.5,0)
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
            actx.arc(0,0,this.size+2,0,90,false)
            actx.fill()
            actx.beginPath()
            actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][7]
            actx.arc(0,0,this.size,0,90,false)
            actx.fill()
            actx.restore()
        }
    }
}