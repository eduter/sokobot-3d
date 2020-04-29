import {
  Direction,
  directionToAngle,
  minimizeRotation,
  move,
  oppositeDirection,
  rotateLeft,
  rotateRight
} from './directions';

describe('move', () => {
  it('moves a point one step in the given direction', () => {
    expect(move([0, 0], Direction.NORTH)).toEqual([0, 1]);
    expect(move([0, 0], Direction.SOUTH)).toEqual([0, -1]);
    expect(move([0, 0], Direction.EAST)).toEqual([1, 0]);
    expect(move([0, 0], Direction.WEST)).toEqual([-1, 0]);

    expect(move([3, 2], Direction.NORTH)).toEqual([3, 3]);
    expect(move([7, 1], Direction.SOUTH)).toEqual([7, 0]);
    expect(move([9, 7], Direction.EAST)).toEqual([10, 7]);
    expect(move([3, 9], Direction.WEST)).toEqual([2, 9]);
  });
});

describe('rotateRight', () => {
  it('rotates a direction 90 degrees to the right', () => {
    expect(rotateRight(Direction.NORTH)).toEqual(Direction.EAST);
    expect(rotateRight(Direction.EAST)).toEqual(Direction.SOUTH);
    expect(rotateRight(Direction.SOUTH)).toEqual(Direction.WEST);
    expect(rotateRight(Direction.WEST)).toEqual(Direction.NORTH);
  });
});

describe('rotateLeft', () => {
  it('rotates a direction 90 degrees to the left', () => {
    expect(rotateLeft(Direction.NORTH)).toEqual(Direction.WEST);
    expect(rotateLeft(Direction.WEST)).toEqual(Direction.SOUTH);
    expect(rotateLeft(Direction.SOUTH)).toEqual(Direction.EAST);
    expect(rotateLeft(Direction.EAST)).toEqual(Direction.NORTH);
  });
});

describe('oppositeDirection', () => {
  it('rotates a direction 180 degrees', () => {
    expect(oppositeDirection(Direction.NORTH)).toEqual(Direction.SOUTH);
    expect(oppositeDirection(Direction.SOUTH)).toEqual(Direction.NORTH);
    expect(oppositeDirection(Direction.WEST)).toEqual(Direction.EAST);
    expect(oppositeDirection(Direction.EAST)).toEqual(Direction.WEST);
  });
});

describe('directionToAngle', () => {
  it('converts a direction to an angle in radians', () => {
    const rightAngle = Math.PI / 2;
    expect(directionToAngle(Direction.NORTH)).toEqual(0 * rightAngle);
    expect(directionToAngle(Direction.WEST)).toEqual(1 * rightAngle);
    expect(directionToAngle(Direction.SOUTH)).toEqual(2 * rightAngle);
    expect(directionToAngle(Direction.EAST)).toEqual(3 * rightAngle);
  });
});

describe('minimizeRotation', () => {
  it('finds the angle that minimizes the rotation needed to go from one angle to a given direction', () => {
    const rightAngle = Math.PI / 2;

    expect(minimizeRotation(48 * rightAngle, -rightAngle)).toBeCloseTo(47 * rightAngle);
    expect(minimizeRotation(48 * rightAngle, 3 * rightAngle)).toBeCloseTo(47 * rightAngle);

    expect(minimizeRotation(48 * rightAngle, 0)).toBeCloseTo(48 * rightAngle);
    expect(minimizeRotation(48 * rightAngle, 4 * rightAngle)).toBeCloseTo(48 * rightAngle);

    expect(minimizeRotation(48 * rightAngle, rightAngle)).toBeCloseTo(49 * rightAngle);
    expect(minimizeRotation(48 * rightAngle, -3 * rightAngle)).toBeCloseTo(49 * rightAngle);


    expect(minimizeRotation(-9 * rightAngle, 0)).toBeCloseTo(-8 * rightAngle);
    expect(minimizeRotation(-9 * rightAngle, 4 * rightAngle)).toBeCloseTo(-8 * rightAngle);

    expect(minimizeRotation(-9 * rightAngle, -rightAngle)).toBeCloseTo(-9 * rightAngle);
    expect(minimizeRotation(-9 * rightAngle, 3 * rightAngle)).toBeCloseTo(-9 * rightAngle);

    expect(minimizeRotation(-9 * rightAngle, 2 * rightAngle)).toBeCloseTo(-10 * rightAngle);
    expect(minimizeRotation(-9 * rightAngle, -2 * rightAngle)).toBeCloseTo(-10 * rightAngle);
  });
});
