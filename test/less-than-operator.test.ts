import { MemoryValue, NumericValue } from "../src/expressions/value"
import { VariableExpression } from "../src/expressions/variable-expression"
import { LessThanOperator } from "../src/operators/less-than-operator"

test("test", () => {
  let operator = new LessThanOperator(new NumericValue(2), new NumericValue(3))
  expect(operator.evaluate().value).toBe(true)

  operator = new LessThanOperator(new NumericValue(3), new NumericValue(3))
  expect(operator.evaluate().value).toBe(false)

  operator = new LessThanOperator(new NumericValue(4), new NumericValue(3))
  expect(operator.evaluate().value).toBe(false)
})

test("test error", () => {
  expect(() => {
    const leftExpression = new NumericValue(2)
    const rightExpression = new MemoryValue("mem1")
    const operator = new LessThanOperator(leftExpression, rightExpression)
    operator.evaluate()
  }).toThrow('Happy little accident while comparing "<" between 2 mem1')

  expect(() => {
    const operator = new LessThanOperator(
      new VariableExpression("mem1"),
      new VariableExpression("mem1")
    )
    operator.evaluate()
  }).toThrow('Happy little accident while comparing "<" between mem1 mem1')

  expect(() => {
    const operator = new LessThanOperator(
      new VariableExpression("mem1"),
      new VariableExpression("mem2")
    )
    operator.evaluate()
  }).toThrow('Happy little accident while comparing "<" between mem1 mem2')
})
