export class Player{
    x = 192/2; y = 108/2; velX=0; velY=0; targetX = 3; jumps=2; scoreTimer =0; score=0
    game
    constructor(Game){
        this.game = Game
    }
    reset(){
        this.x = 192/2; this.y = 108/2; this.velX=0; this.velY=0; this.targetX = 3; this.jumps=2; this.scoreTimer =0;this.score=0
    }
    tick(){
        this.velY += .1
        if(this.game.justPressed(kd.W)){
            if(this.jumps>0){
                this.jumps--
                this.velY+=-4
            }
        }
        if(this.game.justPressed(kd.A)){
            if(this.targetX>1){

                this.velX-=2
                this.targetX-=1
            
            }
        }
        if(this.game.justPressed(kd.D)){
            if(this.targetX<5){

                this.velX+=2
                this.targetX+=1
        
            }
        }
        this.y+=this.velY
        this.x+=this.velX
        this.velX*=.95
        this.scoreTimer++
        if(this.scoreTimer>= 100){
            this.scoreTimer = 0
            this.score++
        }

        if(this.y<14){
            this.y=14
            this.velY=0
        }
        if(this.y>140){
            this.game.state=0
        }
    }
}