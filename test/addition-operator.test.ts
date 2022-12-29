import { OperatorExpression } from "../src/expressions/operator-expression"
import {
  ColorValue,
  VariableValue,
  NumericValue,
} from "../src/expressions/value"
import { AdditionOperator } from "../src/operators/addition-operator"

test("test addition", () => {
  const leftExpression = new NumericValue(2)
  const rightExpression = new NumericValue(3)
  const additionOperator = new AdditionOperator(leftExpression, rightExpression)
  expect(additionOperator.evaluate().value).toBe(5)
})

test("test error addition", () => {
  expect(() => {
    const leftExpression = new NumericValue(2)
    const rightExpression = new VariableValue("mem1")
    const additionOperator = new AdditionOperator(
      leftExpression,
      rightExpression
    )
    additionOperator.evaluate()
  }).toThrow('Happy little accident while comparing "+" between 2 mem1')

  expect(() => {
    const leftExpression = new ColorValue("#ffffff")
    const rightExpression = new ColorValue("#00ff00")
    const additionOperator = new AdditionOperator(
      leftExpression,
      rightExpression
    )
    additionOperator.evaluate()
  }).toThrow(
    'Happy little accident while comparing "+" between #ffffff #00ff00'
  )
})
