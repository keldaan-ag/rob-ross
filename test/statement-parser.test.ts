import { RobRoss } from "../src"

test("assign one variable", () => {
  const interpreter = new RobRoss()
  interpreter.execute("mem1 = 5")
  expect(interpreter.variables.get("mem1")?.value).toBe(5)
})

test("assign multiplies variables", () => {
  const interpreter = new RobRoss()
  interpreter.execute(
    `mem1 = 5
    mem2 = 2
    mem3 = 4
    mem4 = 0
    `
  )
  expect(interpreter.variables.get("mem1")?.value).toBe(5)
  expect(interpreter.variables.get("mem2")?.value).toBe(2)
  expect(interpreter.variables.get("mem3")?.value).toBe(4)
  expect(interpreter.variables.get("mem4")?.value).toBe(0)
})

test("assign multiplies variables separed with spaces", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`mem1 = 5 mem2 = 2 mem3 = 4 mem4 = 0`)
  expect(interpreter.variables.get("mem1")?.value).toBe(5)
  expect(interpreter.variables.get("mem2")?.value).toBe(2)
  expect(interpreter.variables.get("mem3")?.value).toBe(4)
  expect(interpreter.variables.get("mem4")?.value).toBe(0)
})

test("re assign variables", () => {
  const interpreter = new RobRoss()
  interpreter.execute(
    `mem1 = 5
    mem2 = 2
    mem1 = 4
    mem2 = 0
    `
  )
  expect(interpreter.variables.get("mem1")?.value).toBe(4)
  expect(interpreter.variables.get("mem2")?.value).toBe(0)
})

test("boolean assign", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`
    mem1 = true
    mem1 = false
    `)
  expect(interpreter.variables.get("mem1")?.value).toBe(false)
})

test("variable assign", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`
      mem1 = 0
      mem2 = mem1
      mem1 = mem1 + 1
      `)
  expect(interpreter.variables.get("mem1")?.value).toBe(1)
  expect(interpreter.variables.get("mem2")?.value).toBe(0)
})

test("variable assign", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`
      mem1 = 0
      mem2 = mem1
      mem1 = mem1 + 1
      `)
  expect(interpreter.variables.get("mem1")?.value).toBe(1)
  expect(interpreter.variables.get("mem2")?.value).toBe(0)
})

test("variable assign to undeclared variable", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`
      mem2 = mem1
      mem3 = mem2!
      `)
  expect(interpreter.variables.get("mem2")?.value).toBe(false)
  expect(interpreter.variables.get("mem3")?.value).toBe(true)
})
