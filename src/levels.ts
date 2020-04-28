import { LevelMap } from './mechanics/types';
import { Maybe } from './utils/types';
import { Direction } from './mechanics/directions';


const levels: LevelMap[] = [
  // 1 move
  {
    height: 3,
    width: 3,
    targets: [[1, 2]],
    tiles: [
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [{ type: 'box' }] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
    ],
    robot: {
      position: [1, 0],
      direction: Direction.NORTH
    }
  },
  // 2nd 2D
  {
    height: 4,
    width: 5,
    targets: [[0, 1], [4, 0]],
    tiles: [
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [{ type: 'box' }] }, { height: 0, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [{ type: 'box' }] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 0, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
    ],
    robot: {
      position: [2, 0],
      direction: Direction.NORTH
    }
  },
  // 1st 3D
  {
    height: 5,
    width: 5,
    targets: [[0, 0], [4, 4]],
    tiles: [
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 0, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 2, objects: [] }, { height: 2, objects: [] }, { height: 1, objects: [{ type: 'box' }, { type: 'box' }] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 2, objects: [] }, { height: 2, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
    ],
    robot: {
      position: [2, 2],
      direction: Direction.NORTH
    }
  },
  // 2nd 3D
  {
    height: 3,
    width: 5,
    targets: [[0, 2], [4, 2]],
    tiles: [
      [{ height: 1, objects: [] },{ height: 1, objects: [] },{ height: 1, objects: []}],
      [{ height: 2, objects: [] },{ height: 2, objects: [{ type: 'box' }] },{ height: 1, objects: [{ type: 'box' }]}],
      [{ height: 2, objects: [] },{ height: 2, objects: [{ type: 'box' }] },{ height: 1, objects: []}],
      [{ height: 2, objects: [] },{ height: 2, objects: [{ type: 'box' }] },{ height: 1, objects: []}],
      [{ height: 1, objects: [] },{ height: 1, objects: [] },{ height: 1, objects: []}]
    ],
    robot: {
      position: [2, 0],
      direction: Direction.NORTH
    }
 },
  // 3rd 3D
  {
    height: 6,
    width: 5,
    tiles: [
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 2, objects: [] }, { height: 2, objects: [{ type: 'box' }] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 2, objects: [] }, { height: 2, objects: [] }],
      [{ height: 2, objects: [] }, { height: 2, objects: [{ type: 'box' }] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 2, objects: [{ type: 'box' }] }, { height: 2, objects: [] }],
      [{ height: 2, objects: [] }, { height: 2, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 2, objects: [{ type: 'box' }] }, { height: 2, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
    ],
    targets: [[0, 2], [0, 3], [4, 0], [4, 5]],
    robot: {
      position: [2, 0],
      direction: Direction.NORTH
    }
  }
];

/**
 * Lists the names of all levels.
 * (levels may have have meaningful names later on)
 */
function getLevelNames(): string[] {
  return levels.map((_, index) => `Level ${index + 1}`);
}

/**
 * Returns a copy of a level's map, given its index.
 */
function getLevelMap(level: number): Maybe<LevelMap> {
  const map = levels[level];

  if (map) {
    return addKeys(level, map);
  }
  return undefined;
}

/**
 * Returns a copy of a map, adding unique keys to robot and movable objects.
 */
function addKeys(level: number, map: LevelMap): LevelMap {
  const [robotX, robotY] = map.robot.position;
  const robotTile = map.tiles[robotX][robotY];
  const robotZ = robotTile.height + robotTile.objects.length;

  return {
    ...map,
    robot: {
      ...map.robot,
      key: createUniqueKey(level, robotX, robotY, robotZ)
    },
    tiles: map.tiles.map((column, x) => (
      column.map(({ height, objects }, y) => ({
        height,
        objects: objects.map((obj, index) => ({
          ...obj,
          key: createUniqueKey(level, x, y, height + 1 + index)
        }))
      }))
    ))
  };
}

/**
 * Creates a deterministic unique key for an object, based on its level and initial position.
 */
function createUniqueKey(level: number, initialX: number, initialY: number, initialZ: number): string {
  return [level, initialX, initialY, initialZ].join('-');
}


export {
  getLevelNames,
  getLevelMap
};
