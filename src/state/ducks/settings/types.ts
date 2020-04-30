import { DeepReadonly } from 'utility-types';


export enum ActionTypes {
  TOGGLE_ON_SCREEN_CONTROLS = 'settings/TOGGLE_ON_SCREEN_CONTROLS'
}

export type State = DeepReadonly<{
  onScreenControls: boolean;
}>;
