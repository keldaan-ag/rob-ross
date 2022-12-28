import { ColorValue, MemoryValue, NumericValue } from "../src/expressions/value"
import { VariableExpression } from "../src/expressions/variable-expression"
import { EqualsOperator } from "../src/operators/equals-operator"

test("test equals", () => {
  let additionOperator = new EqualsOperator(
    new NumericValue(2),
    new NumericValue(3)
  )
  expect(additionOperator.evaluate().value).toBe(false)

  additionOperator = new EqualsOperator(
    new NumericValue(3),
    new NumericValue(3)
  )
  expect(additionOperator.evaluate().value).toBe(true)

  additionOperator = new EqualsOperator(
    new VariableExpression("mem1"),
    new VariableExpression("mem1")
  )
  expect(additionOperator.evaluate().value).toBe(true)

  additionOperator = new EqualsOperator(
    new VariableExpression("mem1"),
    new VariableExpression("mem2")
  )
  expect(additionOperator.evaluate().value).toBe(false)

  additionOperator = new EqualsOperator(
    new ColorValue("#ffffff"),
    new ColorValue("#ffffff")
  )
  expect(additionOperator.evaluate().value).toBe(true)

  additionOperator = new EqualsOperator(
    new ColorValue("#ffffff"),
    new ColorValue("#000000")
  )
  expect(additionOperator.evaluate().value).toBe(false)
})

test("test error equals", () => {
  expect(() => {
    const leftExpression = new NumericValue(2)
    const rightExpression = new MemoryValue("mem1")
    const operator = new EqualsOperator(leftExpression, rightExpression)
    operator.evaluate()
  }).toThrow('Happy little accident while comparing "===" between 2 mem1')
})
