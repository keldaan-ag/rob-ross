import {
  ColorValue,
  LogicalValue,
  VariableValue,
  NumericValue,
  Value,
} from "./expressions/value"
import { Token } from "./types/token"
import { TokenType } from "./types/token-type"
import { AssignStatement } from "./statements/assign-statement"
import { Statement } from "./statements/statement"
import { Expression } from "./expressions/expression"
import { VariableExpression } from "./expressions/variable-expression"
import { NotOperator } from "./operators/not-operator"
import { AdditionOperator } from "./operators/addition-operator"
import { SubstractionOperator } from "./operators/substraction-operator"
import { GreaterThanOperator } from "./operators/greater-than-operator"
import { LessThanOperator } from "./operators/less-than-operator"
import { PaintStatement } from "./statements/paint-statement"
import { ConditionStatement } from "./statements/condition-statement"
import { CompositeStatement } from "./statements/composite-statement"
import { Canvas } from "./space/canvas"
import { Robot } from "./space/robot"
import { EqualsOperator } from "./operators/equals-operator"
import { StepStatement } from "./statements/step-statement"
import { LookExpression } from "./expressions/look-expression"
import { TokenStack } from "./types/token-stack"

export class StatementParser {
  tokens: TokenStack
  variables: Map<String, Value<any>>
  canvas: Canvas
  robot: Robot
  compositeStatement: CompositeStatement

  constructor(
    tokens: TokenStack,
    variables: Map<String, Value<any>>,
    canvas: Canvas,
    robot: Robot,
    compositeStatement: CompositeStatement
  ) {
    this.tokens = tokens
    this.variables = variables
    this.canvas = canvas
    this.robot = robot
    this.compositeStatement = compositeStatement
  }

  static parse(
    compositeStatement: CompositeStatement,
    parent: StatementParser | Array<Token>,
    variables: Map<String, Value<any>>,
    canvas: Canvas,
    robot: Robot
  ) {
    let parser: StatementParser | undefined
    if (parent instanceof StatementParser) {
      parser = new StatementParser(
        parent.tokens,
        parent.variables,
        parent.canvas,
        parent.robot,
        compositeStatement
      )
    }
    if (parent instanceof Array<Token>) {
      parser = new StatementParser(
        new TokenStack(parent),
        variables,
        canvas,
        robot,
        compositeStatement
      )
    }
    if (parser) {
      while (parser.hasNextStatement()) {
        parser.parseExpression()
      }
    }
  }

  hasNextStatement() {
    if (!this.tokens.hasNext()) {
      return false
    }
    if (this.tokens.peek(TokenType.Operator)) {
      return true
    }
    if (this.tokens.peek(TokenType.Keyword)) {
      if (this.tokens.peek(TokenType.Keyword, "look")) {
        return false
      } else if (this.tokens.peek(TokenType.Keyword, "end")) {
        return false
      } else if (this.tokens.peek(TokenType.Keyword, "then")) {
        return false
      } else if (this.tokens.peek(TokenType.Keyword, "from")) {
        return false
      } else if (this.tokens.peek(TokenType.Keyword, "to")) {
        return false
      } else {
        return true
      }
    }
    if (this.tokens.peek(TokenType.Variable)) {
      return true
    }
  }

  parseExpressionStatement(token: Token) {
    if (this.tokens.peek(TokenType.Operator, "=")) {
      this.tokens.next(TokenType.Operator)
      const value = this.readExpression()
      this.compositeStatement.addStatement(
        new AssignStatement(token.value, value, this.variables)
      )
    } else {
      throw "Happy little accident expecting = symbol"
    }
  }

  parseConditionStatement() {
    this.tokens.back()
    const conditionStatement = new ConditionStatement()

    while (!this.tokens.peek(TokenType.Keyword, "end")) {
      const type = this.tokens.next(TokenType.Keyword)
      let caseCondition
      if (type.value === "else") {
        caseCondition = new LogicalValue(true) //else case does not have the condition
      } else {
        caseCondition = this.readExpression()
      }
      const caseStatement = new CompositeStatement()
      StatementParser.parse(
        caseStatement,
        this,
        this.variables,
        this.canvas,
        this.robot
      )

      conditionStatement.cases.set(caseCondition, caseStatement)
    }
    this.tokens.next(TokenType.Keyword)
    this.compositeStatement.addStatement(conditionStatement)
  }

  parseExpression(): void {
    const token = this.tokens.next(TokenType.Keyword, TokenType.Variable)
    switch (token.type) {
      case TokenType.Variable:
        this.parseExpressionStatement(token)
        break

      case TokenType.Keyword:
        let expression: Expression
        switch (token.value) {
          case "for":
            expression = this.readExpression()
            if (expression instanceof VariableExpression) {
              const variable = expression
              if ((this.tokens.peek(TokenType.Keyword), "from")) {
                this.tokens.next(TokenType.Keyword)
                const min = this.readExpression()
                if (this.tokens.peek(TokenType.Keyword, "to")) {
                  this.tokens.next(TokenType.Keyword)
                  const max = this.readExpression()
                }
              } else {
                throw "Happy little accident expecting from lexeme"
              }
            } else {
              throw "Happy little accident expecting variable lexeme"
            }
            break

          case "if":
            this.parseConditionStatement()
            break

          case "paint":
            expression = this.readExpression()
            this.compositeStatement.addStatement(
              new PaintStatement(expression, this.canvas, this.robot)
            )
            break

          case "step":
            expression = this.readExpression()
            this.compositeStatement.addStatement(
              new StepStatement(expression, this.canvas, this.robot)
            )
            break

          case "look":
            throw "Happy little accident with expression that can't start with look keyword"
        }
        break

      default:
        throw `Happy little syntax error with starting lexem ${token.value}`
    }
  }

  nextExpression(): Expression {
    const token = this.tokens.next(
      TokenType.Color,
      TokenType.Logical,
      TokenType.Variable,
      TokenType.Numeric,
      TokenType.Keyword
    )
    const value = token.value
    switch (token.type) {
      case TokenType.Color:
        return new ColorValue(value)

      case TokenType.Logical:
        return new LogicalValue(value === "true")

      case TokenType.Numeric:
        return new NumericValue(parseInt(value))

      case TokenType.Keyword:
        if (value === "look") {
          return new LookExpression(this.robot, this.canvas)
        }
        throw "Happy little accident, only look keyword is allowed"

      default:
        return new VariableExpression(value, this.variables)
    }
  }

  readExpression(): Expression {
    const left = this.nextExpression()
    while (this.tokens.peek(TokenType.Operator)) {
      const operation = this.tokens.next(TokenType.Operator)
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
