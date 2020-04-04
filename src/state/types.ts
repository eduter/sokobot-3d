import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { State as GameState } from './ducks/game/types';
import { State as LevelsState } from './ducks/levels/types';
import PoorMansUnknown = History.PoorMansUnknown;


export type State = {
  levels: LevelsState;
  game: GameState;
  router: RouterState<PoorMansUnknown>;
}
