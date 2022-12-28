import { Value } from "./expressions/value"
import { LexicalParser } from "./lexical/lexical-parser"
import { StatementParser } from "./statements/statement-parser"

export class RobRoss {
  variables: Map<String, Value<any>>

  constructor() {
    this.variables = new Map<String, Value<any>>()
  }

  execute(code: string) {
    const lexicalParser = new LexicalParser(code)
    const tokens = lexicalParser.parse()
    const statementParser = new StatementParser(tokens, this.variables)
    const statement = statementParser.parse()
    statement.execute()
  }
}
