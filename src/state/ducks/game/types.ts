import { Direction, Point2D } from '../../../mechanics/directions';


export enum ActionTypes {
  START_GAME = 'game/START_GAME',
  MOVE_FORWARD = 'game/MOVE_FORWARD',
  MOVE_BACKWARD = 'game/MOVE_BACKWARD',
  TURN_RIGHT = 'game/TURN_RIGHT',
  TURN_LEFT = 'game/TURN_LEFT'
}

export interface LevelMap {
  height: number;
  width: number;
  tiles: Tile[][];
  targets: Point2D[];
  robot: {
    position: Point2D;
    direction: Direction;
  };
}

export interface Tile {
  height: number;
  objects: MovableObject[];
}

type MovableObject = Box;// | Ramp;

interface Box {
  type: 'box';
}

interface Ramp {
  type: 'ramp';
  direction: Direction;
}


export type State = LevelMap | null;
