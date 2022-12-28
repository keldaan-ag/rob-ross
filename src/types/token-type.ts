export enum TokenType {
  Whitespace = "[\\s\\t\\n\\r]",
  Keyword = "(if|goto|end|paint|step|set|calc)",
  Color = "#([a-f0-9]{3}){1,2}\\b",
  Logical = "true|false",
  Numeric = "[0-9]+",
  Memory = "(mem1|mem2|mem3|mem4)",
  Operator = "(\\+|\\-|\\>|\\<|\\={1,2}|\\!)",
}

export type Memory = "mem1" | "mem2" | "mem3" | "mem4"
