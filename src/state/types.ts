import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { State as GameState } from './ducks/game/types';
import { State as LevelsState } from './ducks/levels/types';


export type State = {
  levels: LevelsState;
  game: GameState;
  router: RouterState<History.PoorMansUnknown>;
}
