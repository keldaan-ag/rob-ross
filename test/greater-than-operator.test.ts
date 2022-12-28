import { MemoryValue, NumericValue } from "../src/expressions/value"
import { VariableExpression } from "../src/expressions/variable-expression"
import { GreaterThanOperator } from "../src/operators/greater-than-operator"

test("test", () => {
  let operator = new GreaterThanOperator(
    new NumericValue(2),
    new NumericValue(3)
  )
  expect(operator.evaluate().value).toBe(false)

  operator = new GreaterThanOperator(new NumericValue(3), new NumericValue(3))
  expect(operator.evaluate().value).toBe(false)

  operator = new GreaterThanOperator(new NumericValue(4), new NumericValue(3))
  expect(operator.evaluate().value).toBe(true)
})

test("test error", () => {
  expect(() => {
    const leftExpression = new NumericValue(2)
    const rightExpression = new MemoryValue("mem1")
    const operator = new GreaterThanOperator(leftExpression, rightExpression)
    operator.evaluate()
  }).toThrow('Happy little accident while comparing ">" between 2 mem1')

  expect(() => {
    const operator = new GreaterThanOperator(
      new VariableExpression("mem1"),
      new VariableExpression("mem1")
    )
    operator.evaluate()
  }).toThrow('Happy little accident while comparing ">" between mem1 mem1')

  expect(() => {
    const operator = new GreaterThanOperator(
      new VariableExpression("mem1"),
      new VariableExpression("mem2")
    )
    operator.evaluate()
  }).toThrow('Happy little accident while comparing ">" between mem1 mem2')
})
