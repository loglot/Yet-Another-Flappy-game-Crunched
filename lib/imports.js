import { Player } from "./player.js";
import { Platforms } from "./platforms.js";
import { Cookie } from "./utils/cookieManager.js";
import { Display } from "./core/gameDisplayer.js";
export class Game{
    // Playerconst = Player
    displayinfo = {startWidth:1920, aspectRatio:[1920,1080], scale:0}
    cookies= new Cookie()
    player = new Player(this)
    platforms = new Platforms(this)
    display = new Display(this)
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
}