import { State } from './types';


function isUnlocked(state: State, level: number) {
  return level < state.unlockedLevels;
}


export {
  isUnlocked
};
