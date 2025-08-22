export class Menu{
    game
    offset=0
    constructor(game){
        this.game = game
    }
    tick(){
        if(this.game.justPressed(kd.W)){
            this.game.reset()
            this.game.state=0.4
        }
    }
    draw(actx){
        this.drawanim(actx,0)
    }
    drawanim(actx,anim){
        actx.font = "15px sans-serif";
        actx.strokeStyle = "#33363f"
        actx.lineWidth = 5;
        actx.textAlign = "left"
        actx.lineJoin = 'miter';
        actx.miterLimit = 3
        actx.strokeText("Yet Another Flappy Game", 10-anim/3, 20-anim/15)
        actx.strokeText("Press W To Start", 10+anim/3, 45-anim/5)
        actx.fillStyle = "#fff"
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