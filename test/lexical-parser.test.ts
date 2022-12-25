import { LexicalParser } from "../src/lexical/lexical-parser"
import { TokenType } from "../src/types/token-type"

test("test nextToken", () => {
  const lexicalParser = new LexicalParser("paint #ff00a2")
  expect(lexicalParser.nextToken(0)).toBe(5)
  expect(lexicalParser.nextToken(5)).toBe(1)
  expect(lexicalParser.nextToken(6)).toBe(7)
})

test("test parse", () => {
  const lexicalParser = new LexicalParser("step 1 paint #fb3c2d")
  const tokens = lexicalParser.parse()
  expect(tokens.length).toBe(4)
  expect(tokens[0].type).toBe(TokenType.Keyword)
  expect(tokens[0].value).toBe("step")
  expect(tokens[1].type).toBe(TokenType.Numeric)
  expect(tokens[1].value).toBe("1")
  expect(tokens[2].type).toBe(TokenType.Keyword)
  expect(tokens[2].value).toBe("paint")
  expect(tokens[3].type).toBe(TokenType.Color)
  expect(tokens[3].value).toBe("#fb3c2d")
})

test("test error", () => {
  expect(() => {
    const lexicalParser = new LexicalParser("bad")
    lexicalParser.parse()
  }).toThrow("Happy little invalid expression: bad")
})
