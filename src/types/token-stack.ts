import { Token } from "./token"
import { TokenType } from "./token-type"

export class TokenStack {
  tokens: Token[]
  position: number
  constructor(tokens: Array<Token>) {
    this.tokens = tokens
    this.position = 0
  }

  peek(type: TokenType, value?: string): boolean {
    if (this.position < this.tokens.length) {
      const token = this.tokens[this.position]
      if (value === undefined) {
        return type == token.type
      } else {
        return type == token.type && token.value === value
      }
    }
    return false
  }

  next(type: TokenType, ...types: TokenType[]): Token {
    const tokenTypes = Array.from(types).concat(type)
    if (this.position < this.tokens.length) {
      const token = this.tokens[this.position]
      for (let i = 0; i < tokenTypes.length; i++) {
        const t = tokenTypes[i]
        if (token.type === t) {
          this.position++
          return token
        }
      }
    }
    const previousToken = this.tokens[this.position - 1]
    throw `After the happy little ${previousToken.value} declaration expected any of the following lexemes ${tokenTypes}`
  }

  hasNext() {
    return this.position < this.tokens.length
  }

  back() {
    this.position--
  }
}
