import { Coordinate } from "../types/coordinate"

export class Canvas {
  width: number
  height: number
  cells: Array<string>

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.cells = new Array<string>(this.width * this.height)
  }

  getValue(coordinate: Coordinate) {
    if (
      coordinate.x >= 0 &&
      coordinate.x < this.width &&
      coordinate.y >= 0 &&
      coordinate.y < this.height
    ) {
      const v = this.cells[this.height * coordinate.x + coordinate.y]
      return v ? v : "#ffffff"
    }
    throw "Happy little out of bound exception"
  }

  setValue(coordinate: Coordinate, value: string) {
    if (
      coordinate.x >= 0 &&
      coordinate.x < this.width &&
      coordinate.y >= 0 &&
      coordinate.y < this.height
    ) {
      this.cells[this.height * coordinate.x + coordinate.y] = value
    }
  }

  forEach(callback: (x: number, y: number, tg: string) => void) {
    for (let r = 0; r < this.width; r++) {
      for (let c = 0; c < this.height; c++) {
        callback(r, c, this.cells[this.height * r + c])
      }
    }
  }
}
