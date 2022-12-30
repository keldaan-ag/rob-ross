export enum Orientation {
  UP = 0,
  UP_RIGHT = 1,
  RIGHT = 2,
  DOWN_RIGHT = 3,
  DOWN = 4,
  DOWN_LEFT = 5,
  LEFT = 6,
  UP_LEFT = 7,
}

export const OrienationDirection: {
  [key in Orientation]: { dx: number; dy: number }
} = {
  [Orientation.UP]: {
    dx: 0,
    dy: 1,
  },
  [Orientation.UP_RIGHT]: {
    dx: 1,
    dy: 1,
  },
  [Orientation.RIGHT]: {
    dx: 1,
    dy: 0,
  },
  [Orientation.DOWN_RIGHT]: {
    dx: 1,
    dy: -1,
  },
  [Orientation.DOWN]: {
    dx: 0,
    dy: -1,
  },
  [Orientation.DOWN_LEFT]: {
    dx: -1,
    dy: -1,
  },
  [Orientation.LEFT]: {
    dx: -1,
    dy: 0,
  },
  [Orientation.UP_LEFT]: {
    dx: -1,
    dy: 1,
  },
}
