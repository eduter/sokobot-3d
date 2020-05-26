import getPossibleMoves from './possibleMoves';
import { Tile } from './types';
import { Point2D } from './directions';


describe('getPossibleMoves', () => {

  it('returns an empty array, when the robot is stuck', () => {
    const tiles: Tile[][] = [
      [tile(1, 1), tile(1, 0), tile(0, 0)],
      [tile(1, 0), tile(2, 0), tile(1, 0)]
    ];
    const robotPosition: Point2D = [1, 0];
    const possibleMoves = getPossibleMoves(tiles, robotPosition);
    expect(possibleMoves).toEqual([]);
  });

  it('returns all positions (except current), when there are no obstacles', () => {
    const tiles: Tile[][] = [
      [tile(1, 0), tile(1, 0), tile(1, 0)],
      [tile(1, 0), tile(1, 0), tile(1, 0)],
      [tile(1, 0), tile(1, 0), tile(1, 0)]
    ];
    const possibleMoves = getPossibleMoves(tiles, [2, 2]);
    expectArrayEquivalence(possibleMoves, [
      [0, 0], [1, 0], [2, 0],
      [0, 1], [1, 1], [2, 1],
      [0, 2], [1, 2]
    ])
  });

  it('works on a more complex map', () => {
    const tiles: Tile[][] = [
      [tile(3, 0), tile(2, 0), tile(4, 0), tile(1, 0)],
      [tile(2, 0), tile(3, 0), tile(3, 1), tile(2, 0)],
      [tile(3, 0), tile(2, 1), tile(2, 2), tile(3, 0)]
    ];
    const possibleMoves = getPossibleMoves(tiles, [1, 1]);
    expectArrayEquivalence(possibleMoves, [[1, 0], [0, 1], [2, 0], [2, 1]]);
  });

});

function tile(height: number, boxes: number): Tile {
  return {
    height,
    objects: new Array(boxes).fill({ type: 'box' })
  };
}

const expectArrayEquivalence = <T>(actual: T[], expected: T[]) => {
  expect(actual).toEqual(expect.arrayContaining(expected));
  expect(expected).toEqual(expect.arrayContaining(actual));
};
