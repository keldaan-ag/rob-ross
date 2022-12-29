import {
  ColorValue,
  VariableValue,
  NumericValue,
} from "../src/expressions/value"
import { SubstractionOperator } from "../src/operators/substraction-operator"

test("test sub", () => {
  const leftExpression = new NumericValue(4)
  const rightExpression = new NumericValue(2)
  const operator = new SubstractionOperator(leftExpression, rightExpression)
  expect(operator.evaluate().value).toBe(2)
})

test("test error sub", () => {
  expect(() => {
    const leftExpression = new NumericValue(2)
    const rightExpression = new VariableValue("mem1")
    const operator = new SubstractionOperator(leftExpression, rightExpression)
    operator.evaluate()
  }).toThrow('Happy little accident while comparing "-" between 2 mem1')

  expect(() => {
    const leftExpression = new ColorValue("#ffffff")
    const rightExpression = new ColorValue("#00ff00")
    const operator = new SubstractionOperator(leftExpression, rightExpression)
    operator.evaluate()
  }).toThrow(
    'Happy little accident while comparing "-" between #ffffff #00ff00'
  )
})
