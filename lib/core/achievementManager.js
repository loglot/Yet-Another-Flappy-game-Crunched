import { Theme } from "../Genarics/Theme.js"
export class Achievement {
    game
    unlocked=[]
    rewards=[
        new Theme("Space","Unlocked Space Theme",["#aaaaaa","#052030","#ffffff","#afbfaf","#aaaaaa50","#53565f","#fff5","#dfdf8d"],"this.game.spacecount == 10"),
        new Theme("Retro","Unlocked Retro Theme",["#ffffff","#000000","#000000","#000000","#000000","#ffffff","#fff","#000000"],"this.game.player.score == 20"),
        new Theme("GameBoy","Unlocked Gameboy Theme",["#333030","#88985b","#d8ceae","#667f59","#00000050","#333030","#88985b","#d8ceae"],"false"),
        new Theme("Test","Unlocked Test Theme",["#b7cdcf","#3a3a3a","#ffb4b4","#64a194","#be6d6d5e","#b7cdcf","#fff5","#522df5ff"],"false"),
        new Theme("Classic","Unlocked Classic Theme?",["#33363f","#a7c7d8","#ffffff","#afbfaf","#00000050","#33363f","#fff5","#dfdf8d"],"false")
    ]
    constructor(game){
        this.game = game
    }
    tick(){
        for(let i = 0; i<this.rewards.length;i++){
            if(!this.unlocked[i]&&(eval(this.rewards[i].prerequisate)||(kd.J.isDown()/*&& false*/))){
                this.unlockTheme(this.rewards[i])
                this.unlocked[i]=true
                this.game.cookies.set("themes",JSON.stringify(this.unlocked))
            }
        }
        // if(this.game.player.score == 0&&!this.reachedScore20){
        //     this.game.display.makeToast("Unlocked Retro Theme",15)
        //     this.reachedScore20=true
        //     this.addTheme("Retro",["#ffffff","#000000","#000000","#000000","#000000"])
        //     this.game.cookies.set("rs20",true)
        // }
    }
    init(){
        var arr = JSON.parse(this.game.cookies.get("themes"))
        for(let i = 0; i<arr.length;i++){
            if(arr[i]){
                this.unlockTheme(this.rewards[i])
                this.unlocked[i]=true

            }
            console.log(i)
        }
        // if(this.game.cookies.get("rs20")){
        //     this.game.display.makeToast("Unlocked Retro Theme",15)
        //     this.reachedScore20=true
        //     this.addTheme("Retro",["#ffffff","#000000","#000000","#000000","#000000"])

        // } 
        // // this.addTheme()
    }
    unlockTheme(theme=new Theme()){
            this.game.display.makeToast(theme.rewardMessage,15)
            this.game.menu.options[0].options.push(theme.title)
            this.game.display.colors.push(theme.themeColors)

    }
    addTheme(name="unset theme",theme=["#ff0000","#00ff00","#0000ff","#ff00ff","#ffff00","#00ffff","#ffffff"]){
            this.game.menu.options[0].options.push(name)
            this.game.display.colors.push(theme)

    }
}