import { Expression } from "../expressions/expression"
import { ColorValue } from "../expressions/value"
import { Canvas } from "../space/canvas"
import { Robot } from "../space/robot"
import { Statement } from "./statement"

export class PaintStatement implements Statement {
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
    if (value instanceof ColorValue) {
      this.canvas.setValue(this.robot.coordinate, value.value)
    } else {
      throw "Happy little accident expecting color lexeme"
    }
  }
}
