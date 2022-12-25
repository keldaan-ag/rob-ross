import { Value } from "./value"

export interface Expression {
  evaluate(): Value<any>
}
