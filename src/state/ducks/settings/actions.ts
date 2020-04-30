import { Action } from '../../../utils/types';
import { ActionTypes } from './types';


export type SettingsAction = (
  Action<ActionTypes.TOGGLE_ON_SCREEN_CONTROLS>
);

function toggleOnScreenControls(): SettingsAction {
  return { type: ActionTypes.TOGGLE_ON_SCREEN_CONTROLS };
}


export {
  toggleOnScreenControls
};
