import { Player } from "./player.js";
import { Platforms } from "./platforms.js";
export class Game{
    // Playerconst = Player
    player = new Player(this)
    platforms = new Platforms(this)
    state = 0


    
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