export class Achievement {
    game
    reachedScore5= false
    constructor(game){
        this.game = game
    }
    tick(){
        if(this.game.player.score == 5&&!this.reachedScore5){
            this.game.display.makeToast("Unlocked New Theme",15)
            this.reachedScore5=true
        }
    }
}