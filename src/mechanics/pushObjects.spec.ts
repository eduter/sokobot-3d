import { Direction } from './directions';
import pushObjects from './pushObjects';
import { Tile } from './types';


const height1boxes0: Tile = { height: 1, objects: [] };
const height1boxes1: Tile = { height: 1, objects: [{ type: 'box' }] };
const height1boxes2: Tile = { height: 1, objects: [{ type: 'box' }, { type: 'box' }] };
const height2boxes0: Tile = { height: 2, objects: [] };
const height2boxes1: Tile = { height: 2, objects: [{ type: 'box' }] };

describe('pushObjects', () => {

  it('pushes boxes through flat surfaces', () => {
    expect(
      pushObjects([[height1boxes0, height1boxes1, height1boxes0]], [0, 0], Direction.NORTH)
    ).toEqual(
      [[height1boxes0, height1boxes0, height1boxes1]]
    );
    expect(
      pushObjects([[height1boxes0, height1boxes2, height1boxes0]], [0, 0], Direction.NORTH)
    ).toEqual(
      [[height1boxes0, height1boxes0, height1boxes2]]
    );
  });

  it('pushes boxes off higher surfaces', () => {
    expect(
      pushObjects([[height2boxes0, height2boxes1, height1boxes0]], [0, 0], Direction.NORTH)
    ).toEqual(
      [[height2boxes0, height2boxes0, height1boxes1]]
    );
    expect(
      pushObjects([[height2boxes0, height1boxes2, height1boxes0]], [0, 0], Direction.NORTH)
    ).toEqual(
      [[height2boxes0, height1boxes1, height1boxes1]]
    );
  });

});
