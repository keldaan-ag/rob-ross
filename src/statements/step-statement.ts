import { Expression } from "../expressions/expression"
import { ColorValue, NumericValue } from "../expressions/value"
import { Canvas } from "../space/canvas"
import { Robot } from "../space/robot"
import { OrienationDirection, Orientation } from "../types/orientation"
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
      const orientation = (value.value % 7) as Orientation
      this.robot.coordinate.x = Math.max(
        0,
        Math.min(
          this.canvas.width,
          this.robot.coordinate.x + OrienationDirection[orientation].dx
        )
      )
      this.robot.coordinate.y = Math.max(
        0,
        Math.min(
          this.canvas.height,
          this.robot.coordinate.y + OrienationDirection[orientation].dy
        )
      )
    } else {
      throw "Happy little accident expecting numeric lexeme"
    }
  }
}
