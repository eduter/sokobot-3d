import { ActionTypes, State } from './types';
import { Action } from './actions';
import { Cmd, loop, LoopReducer } from 'redux-loop';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { isUnlocked } from './selectors';
import levels from '../../../data/levels.json';
import { LevelMap } from '../../../mechanics/types';
import { Maybe } from '../../../utils/types';
import { gameActions } from '../game';

const INITIAL_STATE: State = {
  unlockedLevels: 1
};

type AnyAction = Action | LocationChangeAction | ReturnType<typeof gameActions.startGame>;

const levelsReducer: LoopReducer<State, AnyAction> = (
  state: State = INITIAL_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      const level = parseLevel(action.payload.location.pathname);

      if (level !== undefined) {
        const levelData = levels[level];

        if (levelData && isUnlocked(state, level)) {
          return loop(
            state,
            Cmd.action(gameActions.startGame(levelData.map as unknown as LevelMap))
          );
        }
      }
      return state;
    case ActionTypes.FINISH_LEVEL:
      return {
        unlockedLevels: action.payload.level === state.unlockedLevels - 1 ? state.unlockedLevels + 1 : state.unlockedLevels
      };
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
