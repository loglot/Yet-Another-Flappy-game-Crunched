export class Player{
    x; y; velX; velY; targetX; jumps; scoreTimer; score
    game
    constructor(Game,x = 192/2, y = 108/2, velX=0, velY=0, targetX = 3, jumps=2, scoreTimer =0, score=0){
    this.x = x; this.y = y; this.velX=velX; this.velY=velY; this.targetX = targetX; this.jumps=jumps; this.scoreTimer =scoreTimer; this.score=score
        this.game = Game
    }
    reset(){
        //this.x = 192/2; this.y = 108/2; this.velX=0; this.velY=0; this.targetX = 3; this.jumps=2; this.scoreTimer =0;this.score=0
        // this= new this.game.Playerconst()
        this.game.resetPlayer()
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
            this.game.state=.6
        }
    }
    draw(actx, override){
        var thsi = this
        if(override){
            thsi = override            
        }

        actx.save()
        actx.translate(Math.round(thsi.x),Math.round(thsi.y))
        actx.beginPath()
        actx.fillStyle = "#33363f22"
        actx.arc(-2,2,12,0,90,false)
        actx.fill()
        actx.beginPath()
        actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][0]
        actx.arc(0,0,12,0,90,false)
        actx.fill()
        actx.beginPath()
        actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][3]
        actx.arc(0,0,10,0,90,false)
        actx.fill()
        actx.beginPath()
        actx.fillStyle = "#fff5"
        actx.arc(0,0,10,0,(thsi.scoreTimer/50)*Math.PI,false)
        actx.lineTo(0,0)
        actx.lineTo(10,0)
        // actx.lineTo(-Math.sin((thsi.scoreTimer/15.923566879)-1.57)*10,Math.cos((thsi.scoreTimer/15.923566879)-1.52)*10)
        actx.fill()
        for(let i = 0; i<thsi.jumps;i++){
            actx.beginPath()
            actx.fillStyle = "#33363f22"
            actx.arc(Math.sin((i-2.5)/1.5)*12-2,Math.cos((i-2.5)/1.5)*12+2,5,0,90,false)
            actx.fill()

            actx.beginPath()
            actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][0]
            actx.arc(Math.sin((i-2.5)/1.5)*12,Math.cos((i-2.5)/1.5)*12,5,0,90,false)
            actx.fill()
            actx.beginPath()
            actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][2]
            actx.arc(Math.sin((i-2.5)/1.5)*12,Math.cos((i-2.5)/1.5)*12,3,0,90,false)
            actx.fill()
        }
        actx.restore()

    }   
}