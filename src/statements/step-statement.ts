import { Expression } from "../expressions/expression"
import { ColorValue, NumericValue } from "../expressions/value"
import { Canvas } from "../space/canvas"
import { Robot } from "../space/robot"
import { Statement } from "./statement"

export class StepStatement implements Statement {
  expression: Expression
  canvas: Canvas
  robot: Robot
  constructor(expression: Expression, canvas: Canvas, robot: Robot) {
    this.expression = expression
    this.canvas = canvas
    this.robot = robot
  }
  execute(): void {
    const value = this.expression.evaluate()
    if (value instanceof NumericValue) {
      const orientation = this.robot.orientation
    } else {
      throw "Happy little accident expecting numeric lexeme"
    }
  }
}
