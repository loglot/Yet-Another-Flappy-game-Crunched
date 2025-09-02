import { ShopItem } from "./Genarics/ShopItem.js";
export class Shop{
    game
    shop=[
        new ShopItem("Increase Lives",2,"*2","this.game.player.lives++"),
        new ShopItem("Increase Jumps",5,"*3","this.game.player.maxJumps++;this.game.player.jumps++"),
        new ShopItem("Increase Coins",2,"*2","this.game.coins.count++"),
        new ShopItem("Debug",-100,"","")
    ]
    selected=0
    selectedSmooth=0
    constructor(game){
        this.game=game
    }
    tick(){
        if(this.game.justPressed(kd.W)||this.game.justPressed(kd.UP)){
            if(this.selected>0){
                this.selected--
                // this.settingStateSmooth=0
            }

        }
        if(this.game.justPressed(kd.S)||this.game.justPressed(kd.DOWN)){
            if(this.selected<this.shop.length-1){
                this.selected++
                // this.settingStateSmooth=0
            }

        }
        if(this.game.justPressed(kd.ENTER)){
            if(this.game.player.money>=this.shop[this.selected].cost){
                this.game.player.money-=this.shop[this.selected].cost
                eval(this.shop[this.selected].exec)
                this.shop[this.selected].cost=eval(`this.shop[this.selected].cost${this.shop[this.selected].costcalc}`)
            }

        }
        this.selectedSmooth=(this.selectedSmooth*9+this.selected)/10
        this.game.debug.addEntry(`Selection : ${this.selected}, ${Math.round(this.selectedSmooth*1000)/1000}`)

    }
    draw(ctx, anim){
        ctx.textAlign = "center"
        ctx.textBaseline = 'middle';
        ctx.font = `${80}px sans-serif`;
        ctx.lineWidth = 80/5;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 3
        ctx.fillStyle=this.game.display.colors[this.game.menu.options[0].index][2]
        ctx.strokeStyle=this.game.display.colors[this.game.menu.options[0].index][5]
        ctx.strokeText("E",-50+anim/3,0)
        ctx.fillText("E",-50+anim/3,0)
        // ctx.strokeText("==>",-1090,0)
        // ctx.fillText("==>",-1090,0)
        var dist=300
        var ss=this.selected-this.selectedSmooth
        // ctx.fillText(  "==>",-1100-0-dist-Math.sin(ss+Math.PI/2+2*Math.PI)*dist,(ss*dist))
        for(let i = 0; i<this.shop.length;i++){
            var ii=i-this.selectedSmooth
            ctx.textAlign = "left"
            var width=ctx.measureText(this.shop[i].label+`: `).width
            ctx.fillStyle=this.game.display.colors[this.game.menu.options[0].index][2]
            ctx.strokeText(this.shop[i].label+`: $${this.shop[i].cost}`,-1000-dist-0+Math.sin(ii+Math.PI/2+2*Math.PI)*dist,(ii*dist))
            ctx.fillText(this.shop[i].label+": ",-1000+0+dist-Math.sin(ii+Math.PI/2+2*Math.PI)*dist,(ii*dist))
            ctx.fillStyle=this.game.display.colors[this.game.menu.options[0].index][7]
            ctx.fillText(`$${this.shop[i].cost}`,-1000+width+dist-Math.sin(ii+Math.PI/2+2*Math.PI)*dist,(ii*dist))

        }
        ctx.textAlign = "center"
        ctx.fillStyle=this.game.display.colors[this.game.menu.options[0].index][2]
        ctx.strokeStyle=this.game.display.colors[this.game.menu.options[0].index][5]
        ctx.strokeText("==>",-1100-dist-0+Math.sin(ss+Math.PI/2+2*Math.PI)*dist,(ss*dist))
        ctx.fillText("==>",-1100+dist-0-Math.sin(ss+Math.PI/2+2*Math.PI)*dist,(ss*dist))
    }
}