import { ActionTypes, LevelMap } from './types';


interface StartGameAction {
  type: ActionTypes.START_GAME;
  payload: LevelMap;
}

interface MoveAction {
  type: ActionTypes.MOVE_FORWARD
      | ActionTypes.MOVE_BACKWARD
      | ActionTypes.TURN_RIGHT
      | ActionTypes.TURN_LEFT
      ;
}

export type Action = StartGameAction | MoveAction;


function startGame(map: LevelMap): Action {
  return {
    type: ActionTypes.START_GAME,
    payload: map
  };
}

function moveForward(): Action {
  return { type: ActionTypes.MOVE_FORWARD };
}

function moveBackward(): Action {
  return { type: ActionTypes.MOVE_BACKWARD };
}

function turnRight(): Action {
  return { type: ActionTypes.TURN_RIGHT };
}

function turnLeft(): Action {
  return { type: ActionTypes.TURN_LEFT };
}


export {
  startGame,
  moveForward,
  moveBackward,
  turnRight,
  turnLeft
};
