export enum TokenType {
  Whitespace = "[\\s\\t\\n\\r]",
  Keyword = "(if|goto|end|paint|step|then|look)",
  Color = "#([a-f0-9]{3}){1,2}\\b",
  Logical = "true|false",
  Numeric = "[0-9]+",
  Variable = "[a-zA-Z_]+[a-zA-Z0-9_]*",
  Operator = "(\\+|\\-|\\>|\\<|\\={1,2}|\\!)",
}
