import { Token } from "./token"
import { TokenType } from "./types/token-type"

export class LexicalParser {
  tokens: Array<Token>
  source: string

  constructor(source: string) {
    this.source = source
    this.tokens = new Array<Token>()
  }

  nextToken(position: number): number {
    const nextToken = this.source.substring(position)
    for (let i = 0; i < Object.values(TokenType).length; i++) {
      const tokenType = Object.values(TokenType)[i]
      const pattern = new RegExp(tokenType, "i")
      const matcher = nextToken.match(pattern)
      if (matcher && matcher.index === 0) {
        if (tokenType !== TokenType.Whitespace) {
          const value = matcher.length > 1 ? matcher[1] : matcher[0]
          this.tokens.push(new Token(tokenType, value))
        }
        return matcher[0].length
      }
    }
    throw `Happy little invalid expression:" ${nextToken}`
  }

  parse(): Array<Token> {
    let position = 0
    while (position < this.source.length) {
      position += this.nextToken(position)
    }
    return this.tokens
  }
}
