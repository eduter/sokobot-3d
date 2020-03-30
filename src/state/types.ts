import { State as LevelsState } from './ducks/levels/types';
import { State as GameState } from './ducks/game/types';

export type State = {
  levels: LevelsState;
  game: GameState;
}
