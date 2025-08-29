export class Debug{
    game
    debugList=["the list","of debug"]
    constructor(game){
        this.game=game
    }
    tick(){

    }
    draw(ctx){
        ctx.textAlign = "left"
        ctx.font = `${80}px sans-serif`;
        ctx.lineWidth = 80/6;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 3
        ctx.fillStyle=this.game.display.colors[this.game.menu.options[0].index][2]
        ctx.strokeStyle=this.game.display.colors[this.game.menu.options[0].index][5]
        // ctx.fillText("E",100,100)
        for(let i =0; i<this.debugList.length;i++){
            if(this.game.menu.options[2].state){

                ctx.strokeText(this.debugList[i],50,100*(i+1))
                ctx.fillText(this.debugList[i],50,100*(i+1))
            }
                    // ctx.lineWidth = 1+(z*2);
                

            
            
        }
        this.debugList=[]
    }
    addEntry(text){
        this.debugList.push(text)
    }
}