
const canvas = document.getElementById("display")
const ctx = canvas.getContext("2d")
const acanvas = document.getElementById("screen")
const actx = acanvas.getContext("2d")
import { Toast } from "../Genarics/Toast.js"

export class Display{
    game
    toasts = []
    colors=[
        ["#33363f","#a7c7d8","#ffffff","#afbfaf","#00000050","#33363f","#fff5","#dfdf8d"],
        ["#000000","#90b0c0","#ffffff","#afbfaf","#00000050","#000000","#fff5","yellow"]]
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

        actx.fillStyle = this.colors[this.game.menu.options[0].index][0]
        for(let i = 0; i<5; i++){

            actx.fillRect(Math.round(((192/5)*(i+1))-21),0,3,1000)

        }
        
        this.game.coins.draw(actx)
        this.game.platforms.draw(actx)
        this.game.player.draw(actx)

        actx.fillStyle = this.colors[this.game.menu.options[0].index][0]
        actx.fillRect(0,0,3,1000)
        actx.fillRect(0,0,1000,3)
        actx.fillRect(191-2,0,1000,1000)
        actx.fillRect(0,107-2,1000,1000)


        actx.strokeText(`${this.game.player.score}`, 5, 17)
        actx.fillStyle = this.colors[this.game.menu.options[0].index][2]
        actx.fillText(`${this.game.player.score}`, 5, 17)
    }
    drawGameAnim(anim){
        actx.fillStyle = this.colors[this.game.menu.options[0].index][0]
        for(let i = 0; i<5; i++){

            actx.fillRect(Math.round(((192/5)*(i+1))-21),206-Math.log(anim)*35,3,1000)

        }
        this.game.makePlayer(this.game.player.x, Math.round(this.game.player.y+350-anim)).draw(actx)

    }
    drawBackground(){
        actx.clearRect(0,0,1000,1000)
        actx.fillStyle = this.colors[this.game.menu.options[0].index][1]
        actx.fillRect(0,0,1000,1000)
        actx.fillStyle = this.colors[this.game.menu.options[0].index][0]
        actx.fillRect(0,0,3,1000)
        actx.fillRect(0,0,1000,3)
        actx.fillRect(191-2,0,1000,1000)
        actx.fillRect(0,107-2,1000,1000)

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
        ctx.canvas.width = (window.innerWidth)-50;
        ctx.canvas.height = (this.game.displayinfo.aspectRatio[1] * (window.innerWidth-50) / this.game.displayinfo.aspectRatio[0]);
        if(ctx.canvas.height>window.innerHeight){
            ctx.canvas.height=(window.innerHeight)-50
            ctx.canvas.width = (this.game.displayinfo.aspectRatio[0] * (window.innerHeight-50) / this.game.displayinfo.aspectRatio[1])
        }
        ctx.scale(ctx.canvas.width/this.game.displayinfo.startWidth,ctx.canvas.width/this.game.displayinfo.startWidth)
        this.game.displayinfo.scale=ctx.canvas.width/this.game.displayinfo.startWidth
    }
    drawSmooth(anim){
        ctx.textAlign = "right"
        var retreating=0
        ctx.strokeStyle = this.colors[this.game.menu.options[0].index][5]
        for(let i = 0; i < this.toasts.length; i++){

            //setup and position stuff
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

            //the actual drawing part
            ctx.translate(this.toasts[i].x,this.toasts[i].y)

            // ctx.filter = 'blur(10px)';
            // ctx.drawImage(canvas,
            //     canvas.width-ctx.measureText(this.toasts[i].text).width,                this.toasts[i].y-50,ctx.measureText(this.toasts[i].text).width,100,
            //     -ctx.measureText(this.toasts[i].text).width,    -50,ctx.measureText(this.toasts[i].text).width,100
            // );
            // ctx.filter = 'blur(0px)';
            // ctx.fillStyle = "rgba(153, 169, 178, 1)"
            // var padding = -25
            // ctx.fillRect(-ctx.measureText(this.toasts[i].text).width-padding,-50-padding,ctx.measureText(this.toasts[i].text).width+padding*2,50+padding*2)
            ctx.strokeText(this.toasts[i].text, 0, 0)
            ctx.fillStyle = this.colors[this.game.menu.options[0].index][3]
            ctx.fillText(this.toasts[i].text, 0, 0)


            ctx.translate(-this.toasts[i].x,-this.toasts[i].y)
            

            //lifetime stuff
            this.toasts[i].lifetime-=.1
            if(this.toasts[i].lifetime<0){
                this.toasts.splice(i,1)
                i--
            }


            
        }
        
        ctx.translate(this.game.displayinfo.aspectRatio[0]/2,this.game.displayinfo.aspectRatio[1]+300)
        ctx.save()
        ctx.beginPath()
        ctx.arc(0,0+anim[0],650+anim[1]*2,0,100,false)
        ctx.fillStyle = `${this.colors[this.game.menu.options[0].index][1]}99`
        ctx.fill()
        ctx.fillStyle = this.colors[this.game.menu.options[0].index][4]
        ctx.fill()
        ctx.clip()
        ctx.fillStyle = this.colors[this.game.menu.options[0].index][3]
        this.game.menu.drawSettings(ctx)
        

    }
}