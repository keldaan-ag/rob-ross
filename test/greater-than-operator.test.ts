import { LogicalValue, NumericValue, Value } from "../src/expressions/value"
import { VariableExpression } from "../src/expressions/variable-expression"
import { GreaterThanOperator } from "../src/operators/greater-than-operator"

test("test", () => {
  const variables = new Map<string, Value<any>>()
  variables.set("mem1", new NumericValue(3))
  variables.set("mem2", new NumericValue(4))

  let operator = new GreaterThanOperator(
    new NumericValue(2),
    new NumericValue(3)
  )
  expect(operator.evaluate().value).toBe(false)

  operator = new GreaterThanOperator(new NumericValue(3), new NumericValue(3))
  expect(operator.evaluate().value).toBe(false)

  operator = new GreaterThanOperator(new NumericValue(4), new NumericValue(3))
  expect(operator.evaluate().value).toBe(true)

  operator = new GreaterThanOperator(
    new VariableExpression("mem2", variables),
    new VariableExpression("mem1", variables)
  )
  expect(operator.evaluate().value).toBe(true)
})

test("test error", () => {
  expect(() => {
    const variables = new Map<string, Value<any>>()
    variables.set("mem1", new NumericValue(3))
    variables.set("mem2", new LogicalValue(true))

    const operator = new GreaterThanOperator(
      new VariableExpression("mem1", variables),
      new VariableExpression("mem2", variables)
    )
    operator.evaluate()
  }).toThrow('Happy little accident while comparing ">" between 3 true')
})
