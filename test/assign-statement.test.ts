import { NumericValue, Value } from "../src/expressions/value"
import { AssignStatement } from "../src/statements/assign-statement"

test("assign test", () => {
  const variables = new Map<string, Value<any>>()
  const value = new NumericValue(2)
  const assignStatement = new AssignStatement(
    "mem1",
    value.evaluate(),
    variables
  )
  assignStatement.execute()
  expect(variables.get("mem1")?.value).toBe(2)
})
