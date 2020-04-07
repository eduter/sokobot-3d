import { ActionTypes } from './types';
import { Action } from '../../../utils/types';


export type LevelsAction = Action<ActionTypes.FINISH_LEVEL, { level: number }>;

function finishLevel(level: number): LevelsAction {
  return {
    type: ActionTypes.FINISH_LEVEL,
    payload: {
      level
    }
  };
}


export {
  finishLevel
};
