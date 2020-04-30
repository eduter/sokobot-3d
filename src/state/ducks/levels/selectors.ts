import { getLevelNames } from '../../../levels';
import { Maybe } from '../../../utils/types';
import { State } from './types';


function getSelectedLevel(state: State) {
  return state.selectedLevel;
}

function isUnlocked(state: State, level: number) {
  return level < state.unlockedLevels;
}

function getNextLevel(state: State): Maybe<number> {
  if (state.selectedLevel !== undefined) {
    const nextLevel = state.selectedLevel + 1;

    if (nextLevel in getLevelNames()) {
      return nextLevel;
    }
  }
  return undefined;
}


export {
  getSelectedLevel,
  isUnlocked,
  getNextLevel
};
