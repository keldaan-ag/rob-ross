import { Expression } from "../expressions/expression"
import { LogicalValue } from "../expressions/value"
import { CompositeStatement } from "./composite-statement"

export class ConditionStatement extends CompositeStatement {
  cases: Map<Expression, CompositeStatement>

  constructor() {
    super()
    this.cases = new Map<Expression, CompositeStatement>()
  }

  execute(): void {
    this.cases.forEach((statement, entry) => {
      const conditionValue = entry.evaluate()

      if (conditionValue instanceof LogicalValue) {
        if (conditionValue.value) {
          statement.execute()
        }
      } else {
        throw `Happy little accident while comparing non logical value ${conditionValue.value}`
      }
    })
  }
}
