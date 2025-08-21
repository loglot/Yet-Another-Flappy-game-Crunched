export class Menu{
    game
    constructor(game){
        this.game = game
    }
    tick(){
        if(this.game.justPressed(kd.W)){
            this.game.reset()
            this.game.state=1
        }
    }
    draw(actx){
        
        actx.font = "15px sans-serif";
        actx.strokeStyle = "#33363f"
        actx.lineWidth = 5;
        actx.textAlign = "left"
        actx.lineJoin = 'miter';
        actx.miterLimit = 3
        actx.strokeText("Yet Another Flappy Game", 10, 20)
        actx.strokeText("Press W To Start", 10, 45)
        actx.fillStyle = "#fff"
        actx.fillText("Press W To Start", 10, 45)
        actx.fillText("Yet Another Flappy Game", 10, 20)
        // actx.fillText(this.toasts.length,80,70)
        if(this.game.player.score>this.game.highScore){
            this.game.highScore=this.game.player.score
            this.game.cookies.set("HS", this.game.highScore)
        }
        
        if(this.game.highScore>0){
            actx.strokeText(`HS:${this.game.highScore}`, 10, 90)
            actx.fillText(`HS:${this.game.highScore}`, 10, 90)
        actx.textAlign = "right"
            actx.strokeText(`LS:${this.game.player.score}`, 183, 90)
            actx.fillText(`LS:${this.game.player.score}`, 183, 90)
        }
        actx.textAlign = "left"
            // actx.strokeText("High Score:", 10, 80)
                // actx.fillText("High Score:", 10, 80)
    }
}