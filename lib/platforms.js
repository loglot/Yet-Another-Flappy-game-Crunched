import { Entity } from "./Genarics/Entity.js"
export class Platforms{
    
    platform = [new Entity(2,70,0,.1)]
    game
    spawnTimer=0
    constructor(Game){
        this.game = Game
    }

    tick(){
        for(let i = 0; i<this.platform.length; i++){
            this.platform[i].move()
        
            this.platform[i].hitTimer--
            if(this.platform[i].y >= 120){
                this.platform.splice(i,1)
            }
            if(this.platform[i].hitTimer < 0){
                if(
                    this.game.player.x > Math.round(((192/5)*(this.platform[i].x+1))-40) &&
                    this.game.player.x < Math.round(((192/5)*(this.platform[i].x+1))-1) &&
                    this.game.player.y+12 < this.platform[i].y +15 &&
                    this.game.player.y+12 > this.platform[i].y 

                ){
                    this.game.player.velY=-2
                    if(this.game.player.jumps<2){
                        this.game.player.jumps=2
                    }
                }
                if(
                    this.game.player.x > Math.round(((192/5)*(this.platform[i].x+1))-40) &&
                    this.game.player.x < Math.round(((192/5)*(this.platform[i].x+1))-1) &&
                    this.game.player.y-12 < this.platform[i].y +15 &&
                    this.game.player.y-12 > this.platform[i].y 

                ){
                    this.game.player.velY=2
                }
                if(
                    this.game.player.x-12 > Math.round(((192/5)*(this.platform[i].x+1))-40) &&
                    this.game.player.x-12 < Math.round(((192/5)*(this.platform[i].x+1))-1) &&
                    this.game.player.y < this.platform[i].y +15 &&
                    this.game.player.y > this.platform[i].y 

                ){
                    if(this.game.player.targetX<5){
                        this.game.player.velX+=2
                        this.game.player.targetX+=1
                        this.platform[i].hitTimer = 5
                    }
                }
                if(
                    this.game.player.x+12 > Math.round(((192/5)*(this.platform[i].x+1))-40) &&
                    this.game.player.x+12 < Math.round(((192/5)*(this.platform[i].x+1))-1) &&
                    this.game.player.y < this.platform[i].y +15 &&
                    this.game.player.y > this.platform[i].y 

                ){
                    if(this.game.player.targetX>1){
                        this.game.player.velX-=2
                        this.game.player.targetX-=1
                        this.platform[i].hitTimer = 5
                    }
                    
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
            actx.fillRect(Math.round(((192/5)*(this.platform[i].x+1))-40),Math.round(this.platform[i].y),39,15)
        }
    }
}