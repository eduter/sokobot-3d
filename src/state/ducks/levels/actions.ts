import { ActionTypes } from './types';


type FinishLevelAction = {
  type: ActionTypes.FINISH_LEVEL;
  payload: {
    level: number;
  }
}

export type Action = FinishLevelAction;


function finishLevel(level: number): FinishLevelAction {
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
