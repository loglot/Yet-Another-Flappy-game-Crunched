export class Theme{
    title
    rewardMessage
    themeColors
    prerequisate
    // completed=false
    constructor(title="unset theme",message="Unlocked Theme",colors=["#ff0000","#00ff00","#0000ff","#ff00ff","#ffff00","#00ffff","#ffffff"], prerequisate="true"){
        this.title=title
        this.rewardMessage=message
        this.themeColors=colors
        this.prerequisate=prerequisate
    }
}