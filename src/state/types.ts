import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { State as GameState } from './ducks/game/types';
import { State as LevelsState } from './ducks/levels/types';
import { State as SettingsState } from './ducks/settings/types';


export type State = {
  levels: LevelsState;
  game: GameState;
  settings: SettingsState;
  router: RouterState<History.PoorMansUnknown>;
}
