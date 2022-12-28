import {
  ColorValue,
  LogicalValue,
  MemoryValue,
  NumericValue,
} from "../src/expressions/value"
import { NotOperator } from "../src/operators/not-operator"

test("test", () => {
  let operator = new NotOperator(new LogicalValue(true))
  expect(operator.evaluate().value).toBe(false)

  operator = new NotOperator(new LogicalValue(false))
  expect(operator.evaluate().value).toBe(true)
})

test("test error", () => {
  expect(() => {
    const expression = new NumericValue(1)
    const operator = new NotOperator(expression)
    operator.evaluate()
  }).toThrow(
    "Happy little accident while performing NOT operator for non logical value 1"
  )

  expect(() => {
    const expression = new NumericValue(0)
    const operator = new NotOperator(expression)
    operator.evaluate()
  }).toThrow(
    "Happy little accident while performing NOT operator for non logical value 0"
  )

  expect(() => {
    const expression = new MemoryValue("mem1")
    const operator = new NotOperator(expression)
    operator.evaluate()
  }).toThrow(
    "Happy little accident while performing NOT operator for non logical value mem1"
  )

  expect(() => {
    const expression = new ColorValue("#ffffff")
    const operator = new NotOperator(expression)
    operator.evaluate()
  }).toThrow(
    "Happy little accident while performing NOT operator for non logical value #ffffff"
  )
})
