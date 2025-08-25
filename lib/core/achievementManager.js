export class Achievement {
    game
    reachedScore20= false
    constructor(game){
        this.game = game
    }
    tick(){
        if(this.game.player.score == 20&&!this.reachedScore20){
            this.game.display.makeToast("Unlocked Retro Theme",15)
            this.reachedScore20=true
            this.addTheme("Retro",["#ffffff","#000000","#000000","#000000","#000000"])
            this.game.cookies.set("rs20",true)
        }
    }
    init(){
        if(this.game.cookies.get("rs20")){
            this.game.display.makeToast("Unlocked Retro Theme",15)
            this.reachedScore20=true
            this.addTheme("Retro",["#ffffff","#000000","#000000","#000000","#000000"])

        } 
        // this.addTheme()
    }
    addTheme(name="unset theme",theme=["#ff0000","#00ff00","#0000ff","#ff00ff","#ffff00","#00ffff","#ffffff"]){
            this.game.menu.options[0].options.push(name)
            this.game.display.colors.push(theme)

    }
}