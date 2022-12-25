import { Expression } from "../expressions/expression"
import { NumericValue, Value } from "../expressions/value"
import { BinaryOperatorExpression } from "./operator-expression"

export class AdditionOperator<T> extends BinaryOperatorExpression<T> {
  calc(left: Value<T>, right: Value<T>): Value<T> {
    if (left instanceof NumericValue && right instanceof NumericValue) {
      return new NumericValue(left.value + right.value) as Value<T>
    }
    throw `Happy little accident while adding ${left} ${right}`
  }
  constructor(left: Expression, right: Expression) {
    super(left, right)
  }
}
