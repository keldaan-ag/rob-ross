import { Coordinate } from "./coordinate"
import { Orientation } from "./orientation"

export type Config = {
  width: number
  height: number
  position: { coordinate: Coordinate; orientation: Orientation }
}
