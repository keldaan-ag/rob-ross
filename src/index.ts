import { LexicalParser } from "./lexical/lexical-parser"
import { StatementParser } from "./statements/statement-parser"

export class RobRoss {
  static execute(code: string) {
    const lexicalParser = new LexicalParser(code)
    const tokens = lexicalParser.parse()
    const statementParser = new StatementParser(tokens)
    const statement = statementParser.parse()
    statement.execute()
  }
}
