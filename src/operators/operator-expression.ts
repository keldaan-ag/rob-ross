import { Expression } from "../expressions/expression"
import { Value } from "../expressions/value"

export abstract class UnaryOperatorExpression<T> implements Expression {
  value: Expression
  abstract calc(value: Value<T>): Value<T>
  constructor(value: Expression) {
    this.value = value
  }
  evaluate(): Value<T> {
    return this.calc(this.value.evaluate())
  }
}

export abstract class BinaryOperatorExpression<T> implements Expression {
  left: Expression
  right: Expression
  abstract calc(left: Value<T>, right: Value<T>): Value<T>
  constructor(left: Expression, right: Expression) {
    this.left = left
    this.right = right
  }
  evaluate(): Value<T> {
    return this.calc(this.left.evaluate(), this.right.evaluate())
  }
}
