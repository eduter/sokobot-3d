import { Direction } from '../../../mechanics/directions';
import { LevelMap, MovableObject } from '../../../mechanics/types';
import { State } from './types';


interface TileStaticInfo {
  x: number;
  y: number;
  height: number;
  hasTarget: boolean;
}

interface MovableObjectsInfo extends MovableObject {
  position: [number, number, number];
}


function getRobotPosition(state: State): [number, number, number] {
  assertMapDefined(state);

  const [x, y] = state.map.robot.position;
  const z = state.map.tiles[x][y].height + state.map.tiles[x][y].objects.length + 1;

  return [x, y, z];
}

function getRobotDirection(state: State): Direction {
  assertMapDefined(state);
  return state.map.robot.direction;
}

function getRobotKey(state: State): string {
  assertMapDefined(state);
  return state.map.robot.key!;
}

function getMapDimensions(state: State): [number, number] {
  assertMapDefined(state);
  return [state.map.width, state.map.height];
}

/**
 * Lists the static info about all map tiles.
 */
function getTilesInfo(state: State): TileStaticInfo[] {
  assertMapDefined(state);

  const { map: { tiles }} = state;
  const targets = new Set<string>(state.map.targets.map(point => point.join('-')));
  const tilesInfo = [];

  for (let x = 0; x < tiles.length; x++) {
    for (let y = 0; y < tiles[x].length; y++) {
      const height = tiles[x][y].height;
      const hasTarget = targets.has(x + '-' + y);

      tilesInfo.push({ x, y, height, hasTarget });
    }
  }
  return tilesInfo;
}

/**
 * Lists all map objects that can be moved (pushed).
 */
function getMovableObjectsInfo(state: State): MovableObjectsInfo[] {
  assertMapDefined(state);

  const { map: { tiles }} = state;
  const allObjects = [];

  for (let x = 0; x < tiles.length; x++) {
    for (let y = 0; y < tiles[x].length; y++) {
      const tileObjects = tiles[x][y].objects.map((obj, index) => {
        return {
          ...obj,
          position: [x, y, tiles[x][y].height + index + 1]
        } as MovableObjectsInfo;
      });

      allObjects.push(...tileObjects);
    }
  }
  return allObjects;
}

function assertMapDefined(state: State): asserts state is State & { map: LevelMap } {
  if (!state.map) {
    throw Error('No map defined.');
  }
}


export {
  getRobotPosition,
  getRobotDirection,
  getRobotKey,
  getMapDimensions,
  getTilesInfo,
  getMovableObjectsInfo
};
