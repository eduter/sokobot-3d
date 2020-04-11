import { Action } from '../../../utils/types';
import { ActionTypes } from './types';


export type LevelsAction = (
  Action<ActionTypes.SELECT_LEVEL, { level: number }>
  | Action<ActionTypes.CLEAR_LEVEL>
);

function selectLevel(level: number): LevelsAction {
  return {
    type: ActionTypes.SELECT_LEVEL,
    payload: {
      level
    }
  };
}

function clearLevel(): LevelsAction {
  return { type: ActionTypes.CLEAR_LEVEL };
}


export {
  selectLevel,
  clearLevel
};
