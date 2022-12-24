export enum TokenType {
  Whitespace = "[\\s\\t\\n\\r]",
  Keyword = "(if|then|end|paint|step)",
  Color = "red|blue|green",
  GroupDivider = "(\\[|\\])",
  Logical = "true|false",
  Numeric = "[0-9]+",
  Text = '"([^"]*)"',
  Variable = "[a-zA-Z_]+[a-zA-Z0-9_]*",
  Operator = "(\\+|\\-|\\>|\\<|\\={1,2}|\\!|\\:{2})",
}
