import { Direction, directionToAngle, move, rotateLeft, rotateRight } from './directions';

describe('directionHelpers', () => {

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

  it('rotates a direction 90 degrees to the right', () => {
    expect(rotateRight(Direction.NORTH)).toEqual(Direction.EAST);
    expect(rotateRight(Direction.EAST)).toEqual(Direction.SOUTH);
    expect(rotateRight(Direction.SOUTH)).toEqual(Direction.WEST);
    expect(rotateRight(Direction.WEST)).toEqual(Direction.NORTH);
  });

  it('rotates a direction 90 degrees to the left', () => {
    expect(rotateLeft(Direction.NORTH)).toEqual(Direction.WEST);
    expect(rotateLeft(Direction.WEST)).toEqual(Direction.SOUTH);
    expect(rotateLeft(Direction.SOUTH)).toEqual(Direction.EAST);
    expect(rotateLeft(Direction.EAST)).toEqual(Direction.NORTH);
  });

  it('converts a direction to an angle in radians', () => {
    expect(directionToAngle(Direction.NORTH)).toEqual(0);
    expect(directionToAngle(Direction.EAST)).toEqual(-Math.PI / 2);
    expect(directionToAngle(Direction.SOUTH)).toEqual(Math.PI);
    expect(directionToAngle(Direction.WEST)).toEqual(Math.PI / 2);
  });

});
