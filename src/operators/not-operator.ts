import { LogicalValue, Value } from "../expressions/value"
import { UnaryOperatorExpression } from "../expressions/operator-expression"
import { Expression } from "../expressions/expression"

export class NotOperator<T> extends UnaryOperatorExpression<T> {
  calc(value: Value<T>): Value<T> {
    if (value instanceof LogicalValue) {
      return new LogicalValue(!value.value) as Value<T>
    } else {
      throw `Happy little accident while performing NOT operator for non logical value ${value.value}`
    }
  }
  constructor(value: Expression) {
    super(value)
  }
}
