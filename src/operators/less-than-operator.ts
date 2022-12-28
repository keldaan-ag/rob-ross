import { Expression } from "../expressions/expression"
import { LogicalValue, Value } from "../expressions/value"
import { BinaryOperatorExpression } from "../expressions/operator-expression"

export class LessThanOperator<T> extends BinaryOperatorExpression<T> {
  calc(left: Value<T>, right: Value<T>): Value<T> {
    if (
      typeof left.value === typeof right.value &&
      typeof left.value !== "string"
    ) {
      return new LogicalValue(left.value < right.value) as Value<T>
    }
    throw `Happy little accident while comparing "<" between ${left.value} ${right.value}`
  }
  constructor(left: Expression, right: Expression) {
    super(left, right)
  }
}
