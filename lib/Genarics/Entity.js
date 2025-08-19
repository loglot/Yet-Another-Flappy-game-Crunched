export class Entity{
    velX
    velY
    x 
    y 
    hitTimer=0
    xOffset = 0
    yOffset = 0
    constructor(x,y,velX,velY){
        this.x=x
        this.y=y
        this.velX=velX
        this.velY=velY
    }
    move(xFric=1,yFric=1){
        this.x+=this.velX
        this.y+=this.velY
        this.velX*=xFric
        this.velY*=yFric
    }
}