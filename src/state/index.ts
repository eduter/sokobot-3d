import { State } from './ducks';
import { gameActions, gameSelectors } from './ducks/game';
import { levelsActions, levelsSelectors } from './ducks/levels';
import { settingsActions, settingsSelectors } from './ducks/settings';
import configureStore from './configureStore';


export type RootState = State;

export {
  configureStore,
  gameActions,
  gameSelectors,
  levelsActions,
  levelsSelectors,
  settingsActions,
  settingsSelectors
};
