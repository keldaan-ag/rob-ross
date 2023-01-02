import { Coordinate } from "../types/coordinate"

export class Robot {
  coordinate: Coordinate
  constructor(coordinate?: Partial<Coordinate>) {
    this.coordinate = {
      x: coordinate?.x ? coordinate.x : 0,
      y: coordinate?.y ? coordinate.y : 0,
    }
  }
}
