import { Statement } from "./statement"

export class CompositeStatement implements Statement {
  statements2Execute: Array<Statement> = new Array<Statement>()

  constructor() {}

  execute(): void {
    this.statements2Execute.forEach((s) => s.execute())
  }

  addStatement(statement: Statement): void {
    if (statement != null) this.statements2Execute.push(statement)
  }
}
