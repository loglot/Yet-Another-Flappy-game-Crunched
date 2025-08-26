import { Entity } from "./Genarics/Entity.js"
export class Platforms{
    
    platform = [new Entity(2,70,0,.1)]
    
    game
    spawnTimer=1000000
    pushback=5
    pushbackTime=.95
    constructor(Game){
        this.game = Game
    }

    tick(){
        for(let i = 0; i<this.platform.length; i++){
            this.platform[i].move()
            this.platform[i].yOffset*=this.pushbackTime
            this.platform[i].xOffset*=this.pushbackTime
        
            this.platform[i].hitTimer--
            if(this.platform[i].y >= 120){
                this.platform.splice(i,1)
            }
            if(this.platform[i].hitTimer < 0){
                var x = this.platform[i].x
                var xo = + this.platform[i].xOffset
                var y = this.platform[i].y + this.platform[i].yOffset
                if(
                    this.game.player.x > Math.round((((192/5)*(x+1))-40)+xo) &&
                    this.game.player.x < Math.round((((192/5)*(x+1))-1)+xo) &&
                    this.game.player.y+12 < y +15 &&
                    this.game.player.y+12 > y 

                ){
                    this.game.player.velY=-2
                    if(this.game.player.jumps<2){
                        this.game.player.jumps=2
                    }
                    this.platform[i].velY+=this.pushback/50
                    this.platform[i].yOffset+=this.pushback
                }
                if(
                    this.game.player.x > Math.round((((192/5)*(x+1))-40)+xo) &&
                    this.game.player.x < Math.round((((192/5)*(x+1))-1)+xo) &&
                    this.game.player.y-12 < y+15 &&
                    this.game.player.y-12 > y

                ){
                    this.game.player.velY=2
                    this.platform[i].velY-=this.pushback/50
                    this.platform[i].yOffset-=this.pushback
                }
                if(
                    this.game.player.x-12 > Math.round((((192/5)*(x+1))-40)+xo) &&
                    this.game.player.x-12 < Math.round((((192/5)*(x+1))-1)+xo) &&
                    this.game.player.y < y+15 &&
                    this.game.player.y > y

                ){
                    if(this.game.player.targetX<5){
                        this.game.player.velX+=2
                        this.game.player.targetX+=1
                        this.platform[i].hitTimer = 5
                    }
                    this.platform[i].xOffset-=this.pushback
                }
                if(
                    this.game.player.x+12 > Math.round((((192/5)*(x+1))-40)+xo) &&
                    this.game.player.x+12 < Math.round((((192/5)*(x+1))-1)+xo) &&
                    this.game.player.y < y+15 &&
                    this.game.player.y > y

                ){
                    if(this.game.player.targetX>1){
                        this.game.player.velX-=2
                        this.game.player.targetX-=1
                        this.platform[i].hitTimer = 5
                    }
                    this.platform[i].xOffset+=this.pushback
                    
                }
            }
        }

        this.spawnTimer++
        if(this.spawnTimer>50){

            this.spawn()
            this.spawnTimer=0
        }
    }
    spawn(){
       
        this.platform.push(
            new Entity(
                Math.floor(Math.random()*5),
                -50,
                0,
                (Math.random()/3)+.4
            )
        )
    }
    reset(){
        this.platform = [new Entity(2,70,0,.1)]
    }
    draw(actx){
        for(let i = 0; i<this.platform.length; i++){
            var x = Math.round((((192/5)*(this.platform[i].x+1))-40))+this.platform[i].xOffset
            var y =(this.platform[i].y+this.platform[i].yOffset)
            if(this.game.menu.options[1].index==1){
                x=Math.round(x)
                y=Math.round(y)
            }
            actx.translate(x,y)
            actx.fillRect(0,0,39,15)
            actx.translate(-x,-y)
        }
    }
}