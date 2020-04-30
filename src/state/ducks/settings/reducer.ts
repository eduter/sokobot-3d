import { assertNever, Reducer } from '../../../utils/types';
import { SettingsAction } from './actions';
import { ActionTypes, State } from './types';


const INITIAL_STATE: State = {
  onScreenControls: true
};

const settingsReducer: Reducer<State, SettingsAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_ON_SCREEN_CONTROLS:
      return {
        onScreenControls: !state.onScreenControls
      };
    default:
      assertNever(action.type);
      return state;
  }
};


export default settingsReducer;
export { INITIAL_STATE };
