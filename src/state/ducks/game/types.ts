import { LevelMap } from '../../../mechanics/types';


export enum ActionTypes {
  START_GAME = 'game/START_GAME',
  MOVE_FORWARD = 'game/MOVE_FORWARD',
  MOVE_BACKWARD = 'game/MOVE_BACKWARD',
  TURN_RIGHT = 'game/TURN_RIGHT',
  TURN_LEFT = 'game/TURN_LEFT'
}

export type State = LevelMap | null;
