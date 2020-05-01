import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import game from './game';
import levels from './levels';
import settings from './settings';
import { combineReducers } from 'redux-loop';
import { State as LevelsState } from './levels/types';
import { State as GameState } from './game/types';
import { State as SettingsState } from './settings/types';


export type State = {
  game: GameState;
  levels: LevelsState;
  router: RouterState<History.PoorMansUnknown>;
  settings: SettingsState;
}

function createRootReducer(history: History) {
  return combineReducers<State, any>({
    game,
    levels,
    router: connectRouter(history),
    settings
  });
}


export default createRootReducer;
