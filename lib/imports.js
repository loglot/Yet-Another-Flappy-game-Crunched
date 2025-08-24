import { Player } from "./player.js";
import { Platforms } from "./platforms.js";
import { Cookie } from "./utils/cookieManager.js";
import { Display } from "./core/gameDisplayer.js";
import { Achievement } from "./core/achievementManager.js";
import { Menu } from "./menu.js";

const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
const acanvas = document.getElementById("screen")
const actx = acanvas.getContext("2d")
export class Game{
    // Playerconst = Player
    displayinfo = {startWidth:1920, aspectRatio:[1920,1080], scale:0}
    cookies= new Cookie()
    player = new Player(this)
    platforms = new Platforms(this)
    display = new Display(this)
    achievement = new Achievement(this)
    menu = new Menu(this)
    state = 0
    highScore=0
    anim = [0,0]

    
    justPressed(KDKEY){
        var returns = false
        if(KDKEY.isDown()){
            if(!KDKEY.wasDown){
                returns = true
            }
            KDKEY.wasDown = true
        } else {KDKEY.wasDown = false}

        return(returns)
        
    }
    resetPlayer(){
        this.player=new Player(this)
    }
    makePlayer(x = 192/2, y = 108/2, velX=0, velY=0, targetX = 3, jumps=2, scoreTimer =0, score=0){
        return(
            new Player(this,x,y,velX,velY,targetX,jumps,scoreTimer,score)
        )
    }
    reset(){
        this.player.reset()
        this.platforms.reset()
    }
    tick(){
            
        this.display.drawBackground()
        if(this.state==1){
            this.player.tick()
            this.platforms.tick()
            this.achievement.tick()
            this.display.drawGame()
            this.anim[1] = ((this.anim[1]*9)-2)/10
            // new Player(this,100,50).draw(actx)
        } else if(this.state==0){
            this.anim[1] = ((this.anim[1]*9)-2)/10
            this.menu.draw(actx)
        } else if (this.state==0.4){
            this.anim[0] = ((this.anim[0]*9) + 350)/10
            this.anim[1] = ((this.anim[1]*9)-2)/10
            if(this.anim[0]>349){
                this.state=1
            }
            this.menu.drawanim(actx,this.anim[0])
            this.display.drawGameAnim(this.anim[0])
        }else if (this.state==0.6){
            this.anim[0] = ((this.anim[0]*9)-2)/10
            this.display.drawGameAnim(this.anim[0])
            this.menu.drawanim(actx,this.anim[0])
            if(this.anim[0]<=0){
                this.state=0
            }
        }else if (this.state==2){
            this.anim[1] = ((this.anim[1]*9)+300)/10
            this.menu.draw(actx)

        }
        if(this.justPressed(kd.M)){
            acanvas.classList.toggle("invisible")
        }
        this.display.transferDraw()
        this.menu.tick()
        this.display.tick()
        this.display.drawSmooth(this.anim)
    }
    init(){
        this.achievement.init()
        this.highScore=this.cookies.get("HS")
    }
}