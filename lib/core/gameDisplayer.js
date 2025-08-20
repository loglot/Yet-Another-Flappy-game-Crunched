
const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
const acanvas = document.getElementById("screen")
const actx = acanvas.getContext("2d")
import { Toast } from "../Genarics/Toast.js"

export class Display{
    game
    toasts = []
    constructor(game){
        this.game=game
    }
    tick(){
        if(this.game.justPressed(kd.T)){
        // if(Math.random()>.9){
            this.makeToast("toast made"+`${Math.round(Math.random()*(Math.random()*200))}`, 15)
        // }
        }
    }
    makeToast(text, lifetime){
        this.toasts[this.toasts.length]=new Toast(text,lifetime)
    }
    
    drawGame(){

        actx.clearRect(0,0,1000,1000)
        actx.fillStyle = "rgb(167,199,216)"
        actx.fillRect(0,0,1000,1000)
        actx.fillStyle = "#33363f"
        for(let i = 0; i<5; i++){

            actx.fillRect(Math.round(((192/5)*(i+1))-21),0,3,1000)

        }
        
        this.game.platforms.draw(actx)
        this.game.player.draw(actx)

        actx.fillStyle = "#33363f"
        actx.fillRect(0,0,3,1000)
        actx.fillRect(0,0,1000,3)
        actx.fillRect(191-2,0,1000,1000)
        actx.fillRect(0,107-2,1000,1000)


        actx.strokeText(`${this.game.player.score}`, 5, 17)
        actx.fillStyle = "#fff"
        actx.fillText(`${this.game.player.score}`, 5, 17)
    }
    drawMenu(){

        actx.clearRect(0,0,1000,1000)
        actx.fillStyle = "rgb(167,199,216)"
        actx.fillRect(0,0,1000,1000)
        actx.fillStyle = "#33363f"
        actx.fillRect(0,0,3,1000)
        actx.fillRect(0,0,1000,3)
        actx.fillRect(191-2,0,1000,1000)
        actx.fillRect(0,107-2,1000,1000)
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
    transferDraw(){
        this.resize()


        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
            ctx.save()
            ctx.scale(10,10)
            ctx.drawImage(acanvas,0,0)
            ctx.restore();

    }
    
    resize(){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = this.game.displayinfo.aspectRatio[1] * window.innerWidth / this.game.displayinfo.aspectRatio[0];
        if(ctx.canvas.height>window.innerHeight){
            ctx.canvas.height=window.innerHeight
            ctx.canvas.width = this.game.displayinfo.aspectRatio[0] * window.innerHeight / this.game.displayinfo.aspectRatio[1]
        }
        ctx.scale(ctx.canvas.width/this.game.displayinfo.startWidth,ctx.canvas.width/this.game.displayinfo.startWidth)
        this.game.displayinfo.scale=ctx.canvas.width/this.game.displayinfo.startWidth
    }
    drawSmooth(){
        ctx.textAlign = "right"
        var retreating=0
        for(let i = 0; i < this.toasts.length; i++){
            ctx.strokeStyle = "#33363f"
            var scale = 80
            var target=20*scale/10+((i-retreating)*70)
            if(this.toasts[i].lifetime<5){
                retreating++
                target=-20
            }
            this.toasts[i].y = ((this.toasts[i].y*10)+target)/11
            ctx.font = `${scale}px sans-serif`;
            ctx.lineWidth = scale/5;
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 3
            ctx.strokeText(this.toasts[i].text, this.toasts[i].x, this.toasts[i].y)
            ctx.fillStyle = "rgba(203, 225, 237, 1)"
            ctx.fillText(this.toasts[i].text, this.toasts[i].x, this.toasts[i].y)

            this.toasts[i].lifetime-=.1
            if(this.toasts[i].lifetime<0){
                this.toasts.splice(i,1)
                i--
            }
            
        }
        ctx.textAlign = "left"

    }
}