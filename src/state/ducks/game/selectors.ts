import { Direction } from '../../../utils/directionHelpers';
import { State, Tile } from './types';


export interface TileInfo extends Tile {
  x: number;
  y: number;
  target: boolean;
}

function getRobotPosition(state: State): [number, number, number] {
  if (!state) {
    throw Error('Trying to get robot\'s position before starting a game.');
  }
  const [x, y] = state.robot.position;
  const height = state.tiles[x][y].height + state.tiles[x][y].objects.length + 1;

  return [x, y, height];
}

function getRobotDirection(state: State): Direction {
  if (!state) {
    throw Error('Trying to get robot\'s direction before starting a game.');
  }
  return state.robot.direction;
}

function getMapDimensions(state: State): [number, number] {
  if (!state) {
    throw Error('No map defined.');
  }
  return [state.width, state.height];
}

function getTilesInfo(state: State): TileInfo[] {
  if (!state) {
    throw Error('No map defined.');
  }
  const targets = new Set<string>();
  const tilesInfo = [];

  state.targets.forEach(point => {
    targets.add(point.join(','));
  });

  for (let x = 0; x < state.width; x++) {
    for (let y = 0; y < state.height; y++) {
      tilesInfo.push({ x, y, target: targets.has(`${x},${y}`), ...state.tiles[x][y] });
    }
  }
  return tilesInfo;
}


export {
  getRobotPosition,
  getRobotDirection,
  getMapDimensions,
  getTilesInfo
};
