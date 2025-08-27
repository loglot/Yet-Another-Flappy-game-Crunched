import { Entity } from "./Genarics/Entity.js"
export class Coins{
    coins = [new Entity(50,50,0,0)]
    game
    size = 3
    constructor(game){
        this.game=game
    }
    tick(){

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