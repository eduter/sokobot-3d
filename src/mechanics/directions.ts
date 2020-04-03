export type Point2D = [number, number];

enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST'
}

const DIRECTIONS = {
  NORTH: { dx: 0, dy: 1, angle: 0 },
  EAST: { dx: 1, dy: 0, angle: -Math.PI / 2 },
  SOUTH: { dx: 0, dy: -1, angle: Math.PI },
  WEST: { dx: -1, dy: 0, angle: Math.PI / 2 }
} as const;

const rightOf: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.EAST,
  [Direction.EAST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.WEST,
  [Direction.WEST]: Direction.NORTH
};

const leftOf: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.WEST,
  [Direction.WEST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.EAST,
  [Direction.EAST]: Direction.NORTH
};

function move(point: Point2D, direction: Direction): Point2D {
  const [x, y] = point;
  const { dx, dy } = DIRECTIONS[direction];

  return [x + dx, y + dy];
}

function rotateRight(direction: Direction): Direction {
  return rightOf[direction];
}

function rotateLeft(direction: Direction): Direction {
  return leftOf[direction];
}

function oppositeDirection(direction: Direction): Direction {
  return rightOf[rightOf[direction]];
}

function directionToAngle(direction: Direction): number {
  return DIRECTIONS[direction].angle;
}


export {
  Direction,
  move,
  rotateRight,
  rotateLeft,
  oppositeDirection,
  directionToAngle
};
