import { Expression } from "./expression"

export class Value<T> implements Expression {
  value: T
  constructor(value: T) {
    this.value = value
  }

  evaluate(): Value<T> {
    return this
  }
}

export class NumericValue extends Value<number> {
  constructor(value: number) {
    super(value)
  }
}

export class ColorValue extends Value<string> {
  constructor(value: string) {
    super(value)
  }
}

export class LogicalValue extends Value<boolean> {
  constructor(value: boolean) {
    super(value)
  }
}

export class VariableValue extends Value<string> {
  constructor(value: string) {
    super(value)
  }
}
