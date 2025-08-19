import { Player } from "./player.js";
import { Platforms } from "./platforms.js";
import { Cookie } from "./utils/cookieManager.js";
export class Game{
    // Playerconst = Player
    cookies= new Cookie()
    player = new Player(this)
    platforms = new Platforms(this)
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