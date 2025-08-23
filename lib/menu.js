import { Setting } from "./Genarics/Setting.js"
export class Menu{
    game
    offset=0
    options = [new Setting("Theme","options","Classic",["Classic","Original"]),new Setting("option 2"),new Setting("option 3"),new Setting("option 4","boolean",true,[false,true],1)]
    selected = 0
    selectedSmooth=0
    settingState=0
    settingStateSmooth=0
    constructor(game){
        this.game = game
    }
    tick(){
        this.selectedSmooth=(this.selectedSmooth*9+this.selected)/10
        if(this.game.state==0||this.game.state==0.6){
            if(this.game.justPressed(kd.W)){
                this.game.reset()
                this.game.state=0.4
            }
            if(this.game.justPressed(kd.S)){
                // this.game.reset()
                this.game.state=2
            }

        }
        if(this.game.state==2){
            if(this.settingState==0){

                if(this.game.justPressed(kd.S)){
                    // this.game.reset()
                    this.game.state=0
                }
                if(this.game.justPressed(kd.A)||this.game.justPressed(kd.LEFT)){
                    if(this.selected>0){
                        this.selected--
                        this.settingStateSmooth=0
                    }
                    
                }
                if(this.game.justPressed(kd.D)||this.game.justPressed(kd.RIGHT)){
                    if(this.selected<this.options.length-1){
                        this.selected++
                        this.settingStateSmooth=0
                    }
                    
                }
                if(this.game.justPressed(kd.ENTER)){
                    this.settingState=1
                    
                }
            }else if(this.settingState==1){

                if(this.game.justPressed(kd.ENTER)){
                    this.settingState=0
                    this.options[this.selected].state=this.options[this.selected].options[this.options[this.selected].index]
                }
                if(this.game.justPressed(kd.W)||this.game.justPressed(kd.UP)){
                    if(this.options[this.selected].index>0){
                        this.options[this.selected].index--
                    }
                }
                if(this.game.justPressed(kd.S)||this.game.justPressed(kd.DOWN)){
                    if(this.options[this.selected].index<=this.options[this.selected].options.length-2){
                        this.options[this.selected].index++
                    }
                }
            }
            this.settingStateSmooth=(this.settingStateSmooth*9+this.settingState)/10

        }
    }
    draw(actx){
        this.drawanim(actx,0)
    }
    drawSettings(ctx){
        ctx.textAlign = "center"
        ctx.textBaseline = 'middle';
        ctx.font = `${80}px sans-serif`;
        ctx.lineWidth = 80/5;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 3

        ctx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][2]
        ctx.strokeStyle = this.game.display.colors[this.game.menu.options[0].index][0]
        
        ctx.strokeText("Press S For Settings",0,-400+this.game.anim[1])
        ctx.fillText("Press S For Settings",0,-400+this.game.anim[1])
        ctx.strokeText("Press S To Go Back To The Menu",0,-100-this.game.anim[1])
        ctx.fillText("Press S To Go Back To The Menu",0,-100-this.game.anim[1])
        ctx.strokeText("<==  ==>",0,-800)
        ctx.fillText("<==  ==>",0,-800)
        var iiii
        for(let i = 0; i<this.options.length; i++){
            var iii=i-this.selected
            if(iii!=0){
                this.drawSettingThing(i,ctx)
            }else{
                iiii=i
            }
        }
        this.drawSettingThing(iiii,ctx)



        ctx.textAlign = "left"
        ctx.textBaseline = 'top';

    }
    drawSettingThing(i,ctx){
            var ii=i-this.selectedSmooth
            var iii=i-this.selected
            var widthToState=(ctx.measureText(this.options[i].label+" : "+this.options[i].state).width/2)-ctx.measureText(this.options[i].state).width
            ctx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][2]
            ctx.strokeText(this.options[i].label+" : "+this.options[i].state,0+ii*500,-1200+Math.sin(ii+Math.PI/2+2*Math.PI)*300)
            ctx.fillText(this.options[i].label+" : "+this.options[i].state,0+ii*500,-600-Math.sin(ii+Math.PI/2+2*Math.PI)*300)
            ctx.beginPath()
            ctx.save()
            if(iii==0){

                ctx.rect(widthToState+ii*500-20,-650-Math.sin(ii+Math.PI/2+2*Math.PI)*300-(400*this.settingStateSmooth),ctx.measureText(this.options[i].state).width+40+(300*this.settingStateSmooth),100+(1000*this.settingStateSmooth))
            }else{
                ctx.rect(widthToState+ii*500-20,-650-Math.sin(ii+Math.PI/2+2*Math.PI)*300,ctx.measureText(this.options[i].state).width+40,100)

            }
            ctx.fillStyle = "#00000050"
            ctx.fill()
            ctx.clip()
            for(let z = 0; z < this.options[i].options.length;z++){
                var zz=z-this.options[i].index
                ctx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][2]
                ctx.strokeText(this.options[i].options[z],(widthToState+ctx.measureText(this.options[i].options[z]).width/2)+ii*500,-600-Math.sin(ii+Math.PI/2+2*Math.PI)*300+zz*100)
                ctx.fillText(this.options[i].options[z],(widthToState+ctx.measureText(this.options[i].options[z]).width/2)+ii*500,-600-Math.sin(ii+Math.PI/2+2*Math.PI)*300+zz*100)

            }
            ctx.restore()

    }
    drawanim(actx,anim){
        actx.font = "15px sans-serif";
        actx.strokeStyle = this.game.display.colors[this.game.menu.options[0].index][0]
        actx.lineWidth = 5;
        actx.textAlign = "left"
        actx.lineJoin = 'miter';
        actx.miterLimit = 3
        actx.strokeText("Yet Another Flappy Game", 10-anim/3, 20-anim/15)
        actx.strokeText("Press W To Start", 10+anim/3, 45-anim/5)
        actx.fillStyle = this.game.display.colors[this.game.menu.options[0].index][2]
        actx.fillText("Press W To Start", 10-anim/3, 45-anim/5)
        actx.fillText("Yet Another Flappy Game", 10+anim/3, 20-anim/15)
        // actx.fillText(this.toasts.length,80,70)
        if(this.game.player.score>this.game.highScore){
            this.game.highScore=this.game.player.score
            this.game.cookies.set("HS", this.game.highScore)
        }
        
        if(this.game.highScore>0){
            actx.strokeText(`HS:${this.game.highScore}`, 10-anim/6, 90-anim/10)
            actx.fillText(`HS:${this.game.highScore}`, 10-anim/6, 90+anim/10)
        actx.textAlign = "right"
            actx.strokeText(`LS:${this.game.player.score}`, 183+anim/6, 90+anim/10)
            actx.fillText(`LS:${this.game.player.score}`, 183+anim/6, 90-anim/10)
        }
        actx.textAlign = "left"

    }
}