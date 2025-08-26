export class Setting{
    label
    type // boolean, options, number
    state // "state"
    options //[false, true] ["string","string"], "[0,5]"
    index
    constructor(label="example", type="boolean", state=false, options=[false, true],index=0){
        this.label=label
        this.type=type
        this.state=state
        this.options=options
        this.index=index
    }
}