import { Expression } from "./expression"
import { LogicalValue, VariableValue, Value } from "./value"

export class VariableExpression implements Expression {
  name: string
  value: Value<any> | undefined
  variables: Map<String, Value<any>>

  constructor(name: string, variables: Map<String, Value<any>>) {
    this.name = name
    this.variables = variables
  }
  evaluate(): Value<any> {
    if (this.variables.has(this.name)) {
      return this.variables.get(this.name)!
    } else {
      return new LogicalValue(false)
    }
  }
}
