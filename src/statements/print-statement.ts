import { Expression } from "../expressions/expression"
import { Statement } from "./statement"

export class PrintStatement implements Statement {
  expression: Expression
  constructor(expression: Expression) {
    this.expression = expression
  }
  execute(): void {
    const value = this.expression.evaluate()
    console.log(value)
  }
}
