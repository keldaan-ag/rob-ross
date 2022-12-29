import { Coordinate } from "../types/coordinate"

export class Canvas {
  rows: number
  columns: number
  cell: Array<string | undefined>

  constructor(rows: number, colums: number) {
    this.rows = rows
    this.columns = colums
    this.cell = new Array<string | undefined>(this.rows * this.columns)
  }

  getValue(coordinate: Coordinate) {
    if (
      coordinate.x >= 0 &&
      coordinate.x < this.rows &&
      coordinate.y >= 0 &&
      coordinate.y < this.columns
    ) {
      return this.cell[this.columns * coordinate.x + coordinate.y]
    }
  }

  setValue(coordinate: Coordinate, value: string) {
    if (
      coordinate.x >= 0 &&
      coordinate.x < this.rows &&
      coordinate.y >= 0 &&
      coordinate.y < this.columns
    ) {
      this.cell[this.columns * coordinate.x + coordinate.y] = value
    }
  }

  forEach(callback: (x: number, y: number, tg: string | undefined) => void) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        callback(r, c, this.cell[this.columns * r + c])
      }
    }
  }
}
