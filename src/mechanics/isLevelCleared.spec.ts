import { Direction } from './directions';
import isLevelCleared from './isLevelCleared';
import { LevelMap } from './types';


const baseMap: LevelMap = {
  height: 3,
  width: 3,
  targets: [],
  tiles: [],
  robot: {
    position: [1, 0],
    direction: Direction.NORTH
  }
};

describe('isLevelCleared', () => {

  it('is false, when there is a target without a box on it', () => {
    const map: LevelMap = {
      ...baseMap,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
        [{ height: 1, objects: [] }, { height: 2, objects: [{ type: 'box' }, { type: 'box' }] }, { height: 1, objects: [] }],
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
      ],
      targets: [[0, 0], [1, 1]]
    };
    expect(isLevelCleared(map)).toBe(false);
  });

  it('is false, when there is a box on a tile without a target', () => {
    const map: LevelMap = {
      ...baseMap,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
        [{ height: 1, objects: [] }, { height: 2, objects: [{ type: 'box' }] }, { height: 1, objects: [{ type: 'box' }] }],
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
      ],
      targets: [[1, 1]]
    };
    expect(isLevelCleared(map)).toBe(false);
  });

  it('is true, when there is one box on each target', () => {
    const map: LevelMap = {
      ...baseMap,
      tiles: [
        [{ height: 1, objects: [{ type: 'box' }] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
        [{ height: 1, objects: [] }, { height: 2, objects: [{ type: 'box' }] }, { height: 1, objects: [] }],
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
      ],
      targets: [[0, 0], [1, 1]]
    };
    expect(isLevelCleared(map)).toBe(true);
  });

  it('is true, even when there is more than one box on each target', () => {
    const map: LevelMap = {
      ...baseMap,
      tiles: [
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
        [{ height: 1, objects: [] }, { height: 2, objects: [{ type: 'box' }, { type: 'box' }, { type: 'box' }] }, { height: 1, objects: [] }],
        [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
      ],
      targets: [[1, 1]]
    };
    expect(isLevelCleared(map)).toBe(true);
  });

});
