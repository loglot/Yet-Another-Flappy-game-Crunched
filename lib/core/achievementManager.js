export class Achievement {
    game
    reachedScore5= false
    constructor(game){
        this.game = game
    }
    tick(){
        if(this.game.player.score == 0&&!this.reachedScore5){
            this.game.display.makeToast("Unlocked New Theme",15)
            this.reachedScore5=true
            this.game.menu.options[0].options.push("Retro")
            this.game.display.colors.push(["#ffffff","#000000","#000000","#000000"])
        }
    }
}