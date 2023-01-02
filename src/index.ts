import { Canvas } from "./space/canvas"
import { Value } from "./expressions/value"
import { LexicalParser } from "./lexical/lexical-parser"
import { StatementParser } from "./statement-parser"
import { Config } from "./types/config"
import { Robot } from "./space/robot"
import { CompositeStatement } from "./statements/composite-statement"

export class RobRoss {
  variables: Map<String, Value<any>>
  canvas: Canvas
  robot: Robot

  constructor(config?: Partial<Config>) {
    this.variables = new Map<String, Value<any>>()
    this.canvas = new Canvas(
      config?.width ? config.width : 51,
      config?.height ? config.height : 51
    )
    this.robot = new Robot(config?.coordinate)
  }

  execute(code: string) {
    const lexicalParser = new LexicalParser(code)
    const tokens = lexicalParser.parse()
    const statement = new CompositeStatement()
    StatementParser.parse(
      statement,
      tokens,
      this.variables,
      this.canvas,
      this.robot
    )
    statement.execute()
  }
}
