export class Player{
    x; y; velX; velY; targetX; jumps; maxJumps; scoreTimer; score; money;lives;colide
    game
    constructor(
        Game,
        x = 192/2, 
        y = 108/2, 
        velX=0, 
        velY=0, 
        targetX = 3, 
        jumps=2, 
        maxJumps=2,
        scoreTimer =0, 
        score=0,  
        money=0,
        lives=0,
        colide=true
    ){
    this.x = x; this.y = y; this.velX=velX; this.velY=velY; this.targetX = targetX; this.jumps=jumps; this.maxJumps=maxJumps; this.scoreTimer =scoreTimer; this.score=score; this.money=money; this.lives=lives;this.colide=colide
        this.game = Game
    }
    reset(){
        //this.x = 192/2; this.y = 108/2; this.velX=0; this.velY=0; this.targetX = 3; this.jumps=2; this.scoreTimer =0;this.score=0
        // this= new this.game.Playerconst()
        this.game.resetPlayer()
    }
    async tick(){
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
            if(this.lives==0){

                this.game.state=.6
            } else {
                this.lives--
                this.x = 192/2 
                this.y = 139
                this.velX = 0 
                this.velY = -5
                this.targetX = 3
                this.jumps=0
                this.colide = false
                await this.game.sleep(1000)
                this.colide = true


            }
        }
        this.game.debug.addEntry(`X : ${Math.round(this.x)}, Y : ${Math.round(this.y)}`)
    }
    draw(actx, override){
        var thsi = this
        if(override){
            thsi = override            
        }

        actx.save()
        if(this.game.menu.options[1].index==1){
            actx.translate(Math.round(thsi.x),Math.round(thsi.y))
        } else {
            actx.translate(thsi.x,thsi.y)
        }
        actx.beginPath()
        actx.fillStyle = "#33363f22"
        actx.arc(-2,2,12,0,90,false)
        actx.fill()
        actx.beginPath()
        actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][5]
        actx.arc(0,0,12,0,90,false)
        actx.fill()
        actx.beginPath()
        actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][3][Math.min(this.lives,this.game.display.colors[this.game.menu.options[0].index][3].length-1)]
        actx.arc(0,0,10,0,90,false)
        actx.fill()
        actx.beginPath()
        actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][6]
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
            actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][5]
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