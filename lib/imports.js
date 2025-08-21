import { Player } from "./player.js";
import { Platforms } from "./platforms.js";
import { Cookie } from "./utils/cookieManager.js";
import { Display } from "./core/gameDisplayer.js";
import { Achievement } from "./core/achievementManager.js";
import { Menu } from "./menu.js";
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
    reset(){
        this.player.reset()
        this.platforms.reset()
    }
}