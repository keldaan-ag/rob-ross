import { Expression } from "./expression"
import { Memory } from "../types/token-type"
import { MemoryValue, Value } from "./value"

export class VariableExpression implements Expression {
  name: Memory
  value: Value<any> | undefined

  constructor(name: Memory) {
    this.name = name
    this.value = undefined
  }
  evaluate(): Value<any> {
    if (this.value === undefined) {
      return new MemoryValue(this.name)
    } else {
      return this.value
    }
  }
}
