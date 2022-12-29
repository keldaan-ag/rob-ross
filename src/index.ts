import { Canvas } from "./space/canvas"
import { Value } from "./expressions/value"
import { LexicalParser } from "./lexical/lexical-parser"
import { StatementParser } from "./statements/statement-parser"
import { Config } from "./types/config"
import { Robot } from "./space/robot"

export class RobRoss {
  variables: Map<String, Value<any>>
  canvas: Canvas
  robot: Robot

  constructor(config?: Partial<Config>) {
    this.variables = new Map<String, Value<any>>()
    this.canvas = new Canvas(
      config?.width ? config.width : 50,
      config?.height ? config.height : 50
    )
    this.robot = new Robot(config?.position)
  }

  execute(code: string) {
    const lexicalParser = new LexicalParser(code)
    const tokens = lexicalParser.parse()
    const statementParser = new StatementParser(
      tokens,
      this.variables,
      this.canvas,
      this.robot
    )
    const statement = statementParser.parse()
    statement.execute()
  }
}
