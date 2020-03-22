import { DeepReadonly } from 'utility-types';


export enum ActionTypes {
  FINISH_LEVEL = 'levels/FINISH_LEVEL',
}

export type State = DeepReadonly<{
  unlockedLevels: number;
}>;
