import { Direction } from '../../../mechanics/directions';
import { LevelMap } from '../../../mechanics/types';
import { Action } from '../../../utils/types';
import { ActionTypes } from './types';


export type GameAction = (
  Action<ActionTypes.START_LEVEL, { level: number, map: LevelMap }>
  | Action<ActionTypes.FINISH_LEVEL>
  | Action<ActionTypes.MOVE_FORWARD>
  | Action<ActionTypes.MOVE_BACKWARD>
  | Action<ActionTypes.TURN_LEFT>
  | Action<ActionTypes.TURN_RIGHT>
  | Action<ActionTypes.MOVE, Direction>
);

function startLevel(level: number, map: LevelMap): GameAction {
  return {
    type: ActionTypes.START_LEVEL,
    payload: {
      level,
      map
    }
  };
}

function finishLevel(): GameAction {
  return { type: ActionTypes.FINISH_LEVEL };
}

function moveForward(): GameAction {
  return { type: ActionTypes.MOVE_FORWARD };
}

function moveBackward(): GameAction {
  return { type: ActionTypes.MOVE_BACKWARD };
}

function turnRight(): GameAction {
  return { type: ActionTypes.TURN_RIGHT };
}

function turnLeft(): GameAction {
  return { type: ActionTypes.TURN_LEFT };
}

function move(direction: Direction): GameAction {
  return {
    type: ActionTypes.MOVE,
    payload: direction
  };
}


export {
  startLevel,
  finishLevel,
  moveForward,
  moveBackward,
  turnRight,
  turnLeft,
  move
};
