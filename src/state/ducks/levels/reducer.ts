import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Cmd, loop } from 'redux-loop';
import levels from '../../../data/levels.json';
import { LevelMap } from '../../../mechanics/types';
import { Maybe, Reducer } from '../../../utils/types';
import { gameActions } from '../game';
import { LevelsAction } from './actions';
import { isUnlocked } from './selectors';
import { ActionTypes, State } from './types';


const INITIAL_STATE: State = {
  unlockedLevels: 1
};

type HandledAction = LevelsAction | LocationChangeAction;
type TriggeredAction = ReturnType<typeof gameActions.startLevel>;

const levelsReducer: Reducer<State, HandledAction, TriggeredAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      const level = parseLevel(action.payload.location.pathname);

      if (level !== undefined) {
        const levelData = levels[level];

        if (levelData && isUnlocked(state, level)) {
          return loop(
            state,
            Cmd.action(gameActions.startLevel(level, levelData.map as unknown as LevelMap))
          );
        }
      }
      return state;
    case ActionTypes.FINISH_LEVEL:
      if (action.payload.level === state.unlockedLevels - 1) {
        return {
          unlockedLevels: state.unlockedLevels + 1
        };
      }
      return state;
    default:
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
