import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Cmd, loop } from 'redux-loop';
import levels from '../../../data/levels.json';
import { LevelMap } from '../../../mechanics/types';
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
      const levelData = levels[level];

      if (levelData && isUnlocked(state, level)) {
        return loop(
          { ...state, selectedLevel: level },
          Cmd.action(gameActions.startLevel(levelData.map as unknown as LevelMap))
        );
      }
      return state;
    }
    case ActionTypes.CLEAR_LEVEL:
      return {
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
