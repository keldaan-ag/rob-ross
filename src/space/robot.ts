import { Coordinate } from "../types/coordinate"
import { Orientation } from "../types/orientation"

export class Robot {
  coordinate: Coordinate
  orientation: Orientation
  constructor(config?: {
    coordinate?: Partial<Coordinate>
    orientation?: Orientation
  }) {
    this.coordinate = {
      x: config?.coordinate?.x ? config.coordinate.x : 0,
      y: config?.coordinate?.y ? config.coordinate.y : 0,
    }
    this.orientation = config?.orientation ? config.orientation : Orientation.UP
  }
}
