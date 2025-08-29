export class ShopItem{
    label
    cost 
    costcalc
    exec

    constructor(label="unnamed",cost=0,costcalc="+1",exec="this.game.player.score=0"){
        this.label=label
        this.cost=cost
        this.costcalc=costcalc
        this.exec=exec
    }
}