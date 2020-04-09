import { DeepReadonly } from 'utility-types';


export enum ActionTypes {
  START_LEVEL = 'levels/START_LEVEL',
  FINISH_LEVEL = 'levels/FINISH_LEVEL',
}

export type State = DeepReadonly<{
  readonly unlockedLevels: number;
}>;
