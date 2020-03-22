import { ActionTypes, State } from './types';
import { Action } from './actions';
import { assertNever } from '../../../utils/types';


const INITIAL_STATE: State = {
  unlockedLevels: 1
};

function levels(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case ActionTypes.FINISH_LEVEL:
      return {
        unlockedLevels: action.payload.level === state.unlockedLevels - 1 ? state.unlockedLevels + 1 : state.unlockedLevels
      };
    default:
      // assertNever(action);
      return state;
  }
}


export default levels;
