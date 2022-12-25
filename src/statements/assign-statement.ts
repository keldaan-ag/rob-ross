import { Expression } from "../expressions/expression"
import { Value } from "../expressions/value"
import { Memory } from "../types/token-type"
import { Statement } from "./statement"

export class AssignStatement implements Statement {
  name: Memory
  expression: Expression
  variableSetter: [string, Value<any>] | undefined

  constructor(name: Memory, expression: Expression) {
    this.name = name
    this.expression = expression
  }

  execute(): void {
    this.variableSetter = [this.name, this.expression.evaluate()]
  }
}
