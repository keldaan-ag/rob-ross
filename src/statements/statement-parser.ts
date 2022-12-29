import {
  ColorValue,
  LogicalValue,
  VariableValue,
  NumericValue,
  Value,
} from "../expressions/value"
import { Token } from "../types/token"
import { TokenType } from "../types/token-type"
import { AssignStatement } from "./assign-statement"
import { Statement } from "./statement"
import { Expression } from "../expressions/expression"
import { VariableExpression } from "../expressions/variable-expression"
import { NotOperator } from "../operators/not-operator"
import { AdditionOperator } from "../operators/addition-operator"
import { SubstractionOperator } from "../operators/substraction-operator"
import { GreaterThanOperator } from "../operators/greater-than-operator"
import { LessThanOperator } from "../operators/less-than-operator"
import { PaintStatement } from "./paint-statement"
import { ConditionStatement } from "./condition-statement"
import { CompositeStatement } from "./composite-statement"
import { Canvas } from "../space/canvas"
import { Robot } from "../space/robot"
import { EqualsOperator } from "../operators/equals-operator"

export class StatementParser {
  tokens: Array<Token>
  position: number
  variables: Map<String, Value<any>>
  canvas: Canvas
  robot: Robot

  constructor(
    tokens: Array<Token>,
    variables: Map<String, Value<any>>,
    canvas: Canvas,
    robot: Robot
  ) {
    this.tokens = tokens
    this.position = 0
    this.variables = variables
    this.canvas = canvas
    this.robot = robot
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

  parse() {
    const root = new CompositeStatement()
    while (this.position < this.tokens.length) {
      const statement = this.parseExpression()
      root.addStatement(statement)
    }
    return root
  }

  parseExpression(): Statement {
    const token = this.next(TokenType.Keyword, TokenType.Variable)
    switch (token.type) {
      case TokenType.Variable:
        if (this.peek(TokenType.Operator, "=")) {
          this.next(TokenType.Operator)
          const value = this.readExpression()
          return new AssignStatement(token.value, value, this.variables)
        } else {
          throw "Happy little accident expecting = symbol"
        }

      case TokenType.Keyword:
        let expression: Expression
        switch (token.value) {
          case "if":
            expression = this.readExpression()
            if (this.peek(TokenType.Keyword, "then")) {
              this.next(TokenType.Keyword)
              const conditionStatement = new ConditionStatement(expression)
              while (!this.peek(TokenType.Keyword, "end")) {
                const statement = this.parseExpression()
                conditionStatement.addStatement(statement)
              }
              this.next(TokenType.Keyword)
              return conditionStatement
            } else {
              throw "Happy little accident expecting then lexeme"
            }

          case "paint":
            expression = this.readExpression()
            return new PaintStatement(expression, this.canvas, this.robot)
        }
      default:
        throw `Happy little syntax error with starting lexem ${token.value}`
    }
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

  nextExpression(): Expression {
    const token = this.next(
      TokenType.Color,
      TokenType.Logical,
      TokenType.Variable,
      TokenType.Numeric
    )
    const value = token.value
    switch (token.type) {
      case TokenType.Color:
        return new ColorValue(value)

      case TokenType.Logical:
        return new LogicalValue(value === "true")

      case TokenType.Numeric:
        return new NumericValue(parseInt(value))

      default:
        return new VariableExpression(value, this.variables)
    }
  }

  readExpression(): Expression {
    const left = this.nextExpression()
    while (this.peek(TokenType.Operator)) {
      const operation = this.next(TokenType.Operator)
      const operator = operation.value
      if (operator === "!") {
        return new NotOperator(left)
      }
      let operatorClass
      switch (operator) {
        case "+":
          operatorClass = AdditionOperator
          break
        case "-":
          operatorClass = SubstractionOperator
          break
        case "==":
          operatorClass = EqualsOperator
          break
        case ">":
          operatorClass = GreaterThanOperator
          break
        case "<":
          operatorClass = LessThanOperator
          break
      }
      if (operatorClass !== undefined) {
        const right = this.nextExpression()
        return new operatorClass(left, right)
      }
    }
    return left
  }
}
