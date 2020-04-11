import { DeepReadonly } from 'utility-types';


export enum ActionTypes {
  SELECT_LEVEL = 'levels/SELECT_LEVEL',
  CLEAR_LEVEL = 'levels/CLEAR_LEVEL',
}

export type State = DeepReadonly<{
  readonly unlockedLevels: number;
  readonly selectedLevel?: number;
}>;
