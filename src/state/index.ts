import { levelsSelectors } from './ducks/levels';
import { State as LevelState } from './ducks/levels/types';
import { State as RootState } from './types';


type BoundSelectors<ROOT_STATE, STATE, SELECTORS extends Selectors<STATE>> = {
  [K in keyof SELECTORS]: (state: ROOT_STATE, ...args: SelectorArgs<SELECTORS[K]>) => ReturnType<SELECTORS[K]>
}

type Selectors<State> = { [name: string]: (state: State, ...args: any[]) => any }

type SelectorArgs<T extends (state: any, ...args: any) => any> = T extends (state: any, ...args: infer P) => any ? P : never;


function bindSelectors<RootState, K extends keyof RootState, SELECTORS extends Selectors<RootState[K]>>(
  sliceName: K,
  selectors: Selectors<RootState[K]>
): BoundSelectors<RootState, RootState[K], SELECTORS> {
  return Object.fromEntries(Object.entries(selectors).map(([name, selector]) => {
    return [
      name,
      (rootState: RootState, ...args: SelectorArgs<typeof selector>) => selector(rootState[sliceName], ...args)
    ];
  })) as any;
}

const isUnlockedArgs: SelectorArgs<typeof levelsSelectors.isUnlocked> = [2];

function testBoundSelectors(state: RootState, boundSelectors: BoundSelectors<RootState, LevelState, typeof levelsSelectors>) {
  boundSelectors.isUnlocked(state, 3)
}

function test(state: RootState) {
  const boundLevelSelectors = bindSelectors<RootState, 'levels', typeof levelsSelectors>('levels', levelsSelectors);

  // levelSelectors3.isUnlocked(state, 'bug');
  boundLevelSelectors.isUnlocked(state, 4);
  boundLevelSelectors.getSelectedLevel(state);
}
