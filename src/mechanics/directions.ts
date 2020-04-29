export type Point2D = [number, number];

enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST'
}

const rightAngle = Math.PI / 2;

const DIRECTIONS = {
  NORTH: { dx: 0, dy: 1, angle: 0 },
  WEST: { dx: -1, dy: 0, angle: rightAngle },
  SOUTH: { dx: 0, dy: -1, angle: 2 * rightAngle },
  EAST: { dx: 1, dy: 0, angle: 3 * rightAngle }
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

/**
 * Finds the angle that minimizes the rotation needed to go from one angle to a given direction.
 *
 * @param previousAngle - an angle in radians (may be negative or well over 2 * PI)
 * @param currentDirection - an angle (in radians) indicating the direction of the result, within a circumference
 * @return the closest angle to {@param previousAngle}, which points in the same direction as the angle
 *    {@param currentDirection}
 */
function minimizeRotation(previousAngle: number, currentDirection: number): number {
  const fullRotation = 2 * Math.PI;
  const directionDiff = (currentDirection - previousAngle) % fullRotation;

  if (directionDiff > Math.PI) {
    return previousAngle + directionDiff - fullRotation;
  } else if (directionDiff < -Math.PI) {
    return previousAngle + directionDiff + fullRotation;
  }
  return previousAngle + directionDiff;
}

export {
  Direction,
  move,
  rotateRight,
  rotateLeft,
  oppositeDirection,
  directionToAngle,
  minimizeRotation
};
