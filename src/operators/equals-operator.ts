import { Expression } from "../expressions/expression"
import { LogicalValue, Value } from "../expressions/value"
import { BinaryOperatorExpression } from "./operator-expression"

export class EqualsOperator<T> extends BinaryOperatorExpression<T> {
  calc(left: Value<T>, right: Value<T>): Value<T> {
    if (typeof left === typeof right) {
      return new LogicalValue(left.value === right.value) as Value<T>
    }
    throw `Happy little accident while comparing "===" between ${left} ${right}`
  }
  constructor(left: Expression, right: Expression) {
    super(left, right)
  }
}
