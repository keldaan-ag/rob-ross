import { Canvas } from "../space/canvas"
import { Robot } from "../space/robot"
import { Expression } from "./expression"
import { ColorValue, Value } from "./value"

export class LookExpression implements Expression {
  robot: Robot
  canvas: Canvas

  constructor(robot: Robot, canvas: Canvas) {
    this.robot = robot
    this.canvas = canvas
  }
  evaluate(): Value<string> {
    return new ColorValue(this.canvas.getValue(this.robot.coordinate))
  }
}
