import { Direction } from '../../../mechanics/directions';
import { Tile } from '../../../mechanics/types';
import { State } from './types';


export interface TileInfo extends Tile {
  x: number;
  y: number;
  target: boolean;
}

function getRobotPosition(state: State): [number, number, number] {
  if (!state.map) {
    throw Error('Trying to get robot\'s position before starting a game.');
  }
  const [x, y] = state.map.robot.position;
  const height = state.map.tiles[x][y].height + state.map.tiles[x][y].objects.length + 1;

  return [x, y, height];
}

function getRobotDirection(state: State): Direction {
  if (!state.map) {
    throw Error('Trying to get robot\'s direction before starting a game.');
  }
  return state.map.robot.direction;
}

// TODO: move level to the levels duck 🤦
function getCurrentLevel(state: State) {
  return state.level;
}

function getMapDimensions(state: State): [number, number] {
  if (!state.map) {
    throw Error('No map defined.');
  }
  return [state.map.width, state.map.height];
}

function getTilesInfo(state: State): TileInfo[] {
  if (!state.map) {
    throw Error('No map defined.');
  }
  const targets = new Set<string>();
  const tilesInfo = [];

  state.map.targets.forEach(point => {
    targets.add(point.join(','));
  });

  for (let x = 0; x < state.map.width; x++) {
    for (let y = 0; y < state.map.height; y++) {
      tilesInfo.push({ x, y, target: targets.has(`${x},${y}`), ...state.map.tiles[x][y] });
    }
  }
  return tilesInfo;
}


export {
  getCurrentLevel,
  getRobotPosition,
  getRobotDirection,
  getMapDimensions,
  getTilesInfo
};
