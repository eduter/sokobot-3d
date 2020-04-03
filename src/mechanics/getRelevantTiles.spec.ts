import getRelevantTiles from './getRelevantTiles';
import { Direction } from './directions';
import { Tile } from './types';


const hole: Tile = { height: 0, objects: [] };
const height1boxes0: Tile = { height: 1, objects: [] };
const height1boxes1: Tile = { height: 1, objects: [{ type: 'box' }] };
const height1boxes2: Tile = { height: 1, objects: [{ type: 'box' }, { type: 'box' }] };
const height2boxes0: Tile = { height: 2, objects: [] };
const height3boxes0: Tile = { height: 3, objects: [] };

describe('getRelevantTiles', () => {

  const tiles: Tile[][] = [
    [height1boxes0, height1boxes1, height1boxes2],
    [height2boxes0, hole         , height1boxes0],
    [height3boxes0, height1boxes0, height1boxes0]
  ];

  it('retrieves the (up to) three tiles relevant to a movement', () => {
    expect(getRelevantTiles(tiles, [0, 0], Direction.NORTH))
      .toEqual([height1boxes0, height1boxes1, height1boxes2]);
    expect(getRelevantTiles(tiles, [0, 1], Direction.EAST))
      .toEqual([height1boxes1, hole, height1boxes0]);
    expect(getRelevantTiles(tiles, [1, 2], Direction.WEST))
      .toEqual([height1boxes0, height1boxes2, undefined]);
  });

});
