import { Expression } from "../expressions/expression"
import { LogicalValue } from "../expressions/value"
import { CompositeStatement } from "./composite-statement"

export class ConditionStatement extends CompositeStatement {
  condition: Expression

  constructor(condition: Expression) {
    super()
    this.condition = condition
  }

  execute(): void {
    const value = this.condition.evaluate()
    if (value instanceof LogicalValue) {
      if (value.value) {
        super.execute()
      }
    } else {
      throw `Happy little accident while comparing non logical value ${value.value}`
    }
  }
}
