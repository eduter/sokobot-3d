import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Cmd, loop } from 'redux-loop';
import { getLevelMap } from '../../../levels';
import { assertNever, Maybe, Reducer } from '../../../utils/types';
import { gameActions } from '../game';
import { LevelsAction, selectLevel } from './actions';
import { isUnlocked } from './selectors';
import { ActionTypes, State } from './types';


const INITIAL_STATE: State = {
  unlockedLevels: 1
};

type HandledAction = LevelsAction | LocationChangeAction;
type TriggeredAction = LevelsAction | ReturnType<typeof gameActions.startLevel>;

const levelsReducer: Reducer<State, HandledAction, TriggeredAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const level = parseLevel(action.payload.location.pathname);

      if (level !== undefined) {
        return loop(
          state,
          Cmd.action(selectLevel(level))
        );
      }
      return state;
    }
    case ActionTypes.SELECT_LEVEL: {
      const { level } = action.payload;
      const levelMap = getLevelMap(level);

      if (levelMap && isUnlocked(state, level)) {
        return loop(
          { ...state, selectedLevel: level },
          Cmd.action(gameActions.startLevel(levelMap))
        );
      }
      return state;
    }
    case ActionTypes.CLEAR_LEVEL:
      return {
        ...state,
        unlockedLevels: state.unlockedLevels + (state.selectedLevel === state.unlockedLevels - 1 ? 1 : 0)
      };
    default:
      assertNever(action);
      return state;
  }
};

function parseLevel(path: string): Maybe<number> {
  const prefix = '/level/';

  if (!path.startsWith(prefix)) {
    return undefined;
  }
  return parseInt(path.substr(prefix.length));
}


export default levelsReducer;
