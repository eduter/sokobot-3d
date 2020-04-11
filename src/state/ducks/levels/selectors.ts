import { State } from './types';


function getSelectedLevel(state: State) {
  return state.selectedLevel;
}

function isUnlocked(state: State, level: number) {
  return level < state.unlockedLevels;
}


export {
  getSelectedLevel,
  isUnlocked
};
