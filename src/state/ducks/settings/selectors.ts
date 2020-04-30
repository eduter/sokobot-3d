import { State } from './types';


function displayOnScreenControls(state: State): boolean {
  return state.onScreenControls;
}


export {
  displayOnScreenControls
};
