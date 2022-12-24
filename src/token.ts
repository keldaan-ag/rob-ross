import { TokenType } from "./types/token-type"

export class Token{
    type: TokenType
    value: string

    constructor(tokenType: TokenType,value: string){
        this.type = tokenType
        this.value = value
    }
}