export class Toast{
    text
    lifetime
    image
    x=1800
    y=-20
    constructor(text, lifetime,x=1800,y=-20){
        this.text=text
        this.lifetime=lifetime
        this.x=x
        this.y=y
    }

}