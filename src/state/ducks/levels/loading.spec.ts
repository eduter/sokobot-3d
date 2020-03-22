import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import { State } from './types';

describe('levels reducer', () => {

  test('reducer initializes state', () => {
    const action = { type: 'any unknown action' };
    const resultingState = reducer(undefined, action as any);

    expect(selectors.isUnlocked(resultingState, 0)).toBe(true);
    expect(selectors.isUnlocked(resultingState, 1)).toBe(false);
  });

  test('unlocks the next level, when finishing the highest unlocked level', () => {
    const stateBefore = { unlockedLevels: 5 };
    const action = actions.finishLevel(4);
    const stateAfter = reducer(stateBefore, action);

    expect(selectors.isUnlocked(stateBefore, 5)).toBe(false);
    expect(selectors.isUnlocked(stateAfter, 5)).toBe(true);
  });

  test('does not unlock anything, when finishing a level already finished', () => {
    const stateBefore = { unlockedLevels: 5 };
    const action = actions.finishLevel(3);
    const stateAfter = reducer(stateBefore, action);

    expect(selectors.isUnlocked(stateBefore, 5)).toBe(false);
    expect(selectors.isUnlocked(stateAfter, 5)).toBe(false);
  });

  test('reducer ignores unknown actions', () => {
    const state: State = {
      unlockedLevels: 1
    };
    const action = { type: 'any unknown action' };
    const resultingState = reducer(state, action as any);

    expect(resultingState).toBe(state);
  });


});
