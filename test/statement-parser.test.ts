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

test("if test", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`
    mem1 = 1
    if mem1 > 0
    mem1 = 2
    end
  `)
  expect(interpreter.variables.get("mem1")?.value).toBe(2)
})

test("bad if", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute(`
      mem1 = 1
      if 5
      mem1 = 2
      end
    `)
  }).toThrow("Happy little accident while comparing non logical value 5")
})

test("paint test", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`
    paint #00ff00
  `)
  expect(interpreter.canvas.getValue(interpreter.robot.coordinate)).toBe(
    "#00ff00"
  )
})

test("paint mem test", () => {
  const interpreter = new RobRoss()
  interpreter.execute(`
    mem1 = #00ff00
    paint mem1
  `)
  expect(interpreter.canvas.getValue(interpreter.robot.coordinate)).toBe(
    "#00ff00"
  )
})

test("bad paint", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute(`
      paint 8
    `)
  }).toThrow("Happy little accident expecting color lexeme")
})

test("bad equal", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute(`
      mem1 5
    `)
  }).toThrow("Happy little accident expecting = symbol")
})

test("bad end", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute(`
      mem1 = 4
      end
    `)
  }).toThrow("Happy little syntax error with starting lexem end")
})

test("bad declaration", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute(`
      if 5 < paint
    `)
  }).toThrow("Happy little accident, only look keyword is allowed")
})

test("substraction", () => {
  const interpreter = new RobRoss()
  interpreter.execute("a = 5 b = 7 c = b-a")
  expect(interpreter.variables.get("c")?.value).toBe(2)
})

test("equal", () => {
  const interpreter = new RobRoss()
  interpreter.execute("a = 5 if a == 5 b = 3 end")
  expect(interpreter.variables.get("b")?.value).toBe(3)
})

test("step", () => {
  const interpreter = new RobRoss()
  interpreter.execute("step 0")
  expect(interpreter.robot.coordinate.x).toBe(0)
  expect(interpreter.robot.coordinate.y).toBe(1)
  interpreter.execute("a=2 step a")
  expect(interpreter.robot.coordinate.x).toBe(1)
  expect(interpreter.robot.coordinate.y).toBe(1)
})

test("error step", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute("step #ff00ff")
  }).toThrow("Happy little accident expecting numeric lexeme")
})

test("look", () => {
  const interpreter = new RobRoss({
    height: 50,
    width: 50,
    coordinate: { x: 25, y: 25 },
  })
  interpreter.execute("a = look")
  expect(interpreter.variables.get("a")?.value).toBe("#ffffff")
  interpreter.execute("step 4 paint #00ff00 step 2 step 6 b=look")
  expect(interpreter.variables.get("b")?.value).toBe("#00ff00")
})

test("look error", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute("look b = 0")
  }).toThrow(
    "Happy little accident with expression that can't start with look keyword"
  )
})

test("operator error", () => {
  expect(() => {
    const interpreter = new RobRoss()
    interpreter.execute(`
      if 5 < +
    `)
  }).toThrow(
    "After the happy little < declaration expected any of the following lexemes true|false,[a-zA-Z_]+[a-zA-Z0-9_]*,[0-9]+,(if|elif|else|for|paint|step|look|from|to),#([a-f0-9]{3}){1,2}\\b"
  )
})
