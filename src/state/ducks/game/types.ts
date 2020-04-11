import { LevelMap } from '../../../mechanics/types';


export enum ActionTypes {
  START_LEVEL = 'game/START_LEVEL',
  FINISH_LEVEL = 'game/FINISH_LEVEL',
  MOVE = 'game/MOVE',
  MOVE_FORWARD = 'game/MOVE_FORWARD',
  MOVE_BACKWARD = 'game/MOVE_BACKWARD',
  TURN_RIGHT = 'game/TURN_RIGHT',
  TURN_LEFT = 'game/TURN_LEFT'
}

export interface State {
  finished: boolean;
  map?: LevelMap;
}
