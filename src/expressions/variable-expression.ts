import { Expression } from "./expression"
import { Memory } from "../types/token-type"
import { LogicalValue, MemoryValue, Value } from "./value"

export class VariableExpression implements Expression {
  name: Memory
  value: Value<any> | undefined
  variables: Map<String, Value<any>>

  constructor(name: Memory, variables: Map<String, Value<any>>) {
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
