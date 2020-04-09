import { ActionTypes } from './types';
import { Action } from '../../../utils/types';


export type LevelsAction = (
  Action<ActionTypes.START_LEVEL, { level: number }>
  | Action<ActionTypes.FINISH_LEVEL, { level: number }>
);

function startLevel(level: number): LevelsAction {
  return {
    type: ActionTypes.START_LEVEL,
    payload: {
      level
    }
  };
}

function finishLevel(level: number): LevelsAction {
  return {
    type: ActionTypes.FINISH_LEVEL,
    payload: {
      level
    }
  };
}


export {
  startLevel,
  finishLevel
};
