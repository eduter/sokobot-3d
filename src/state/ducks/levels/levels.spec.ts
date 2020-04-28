import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Cmd, Loop } from 'redux-loop';
import { getLevelMap } from '../../../levels';
import { gameActions } from '../game';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import { State } from './types';


describe('levels reducer', () => {

  it('initializes the state', () => {
    const action = { type: 'any unknown action' };
    const resultingState = reducer(undefined, action as any) as State;

    expect(selectors.getSelectedLevel(resultingState)).toBeUndefined();
    expect(selectors.isUnlocked(resultingState, 0)).toBe(true);
    expect(selectors.isUnlocked(resultingState, 1)).toBe(false);
  });

  it('triggers SELECT_LEVEL, when the location changes to /level/:level', () => {
    const stateBefore: State = { unlockedLevels: 3 };
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          pathname: '/level/42'
        }
      }
    } as LocationChangeAction;

    expect(reducer(stateBefore, action)).toEqual([
      stateBefore,
      Cmd.action(actions.selectLevel(42))
    ]);
  });

  it('does not change state or trigger any action, when location changes to something else', () => {
    const stateBefore: State = { unlockedLevels: 3 };
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          pathname: '/anything-else'
        }
      }
    } as LocationChangeAction;

    expect(reducer(stateBefore, action)).toBe(stateBefore);
  });

  it('selects a level, when the level exists and is unblocked', () => {
    const stateBefore: State = { unlockedLevels: 3 };
    const stateAfter = (reducer(stateBefore, actions.selectLevel(1)) as Loop<State, any>)[0];

    expect(selectors.getSelectedLevel(stateBefore)).toBeUndefined();
    expect(selectors.getSelectedLevel(stateAfter)).toEqual(1);
  });

  it('triggers gameActions.startLevel, when a level is successfully selected', () => {
    const stateBefore: State = { unlockedLevels: 3 };

    expect(reducer(stateBefore, actions.selectLevel(1))).toEqual([
      {...stateBefore, selectedLevel: 1},
      Cmd.action(gameActions.startLevel(getLevelMap(1)!))
    ]);
  });

  it('does not change the state, when trying to select a nonexistent level', () => {
    const stateBefore: State = { unlockedLevels: 99 };

    expect(reducer(stateBefore, actions.selectLevel(90))).toBe(stateBefore);
  });

  it('does not change the state, when trying to select a blocked level', () => {
    const stateBefore: State = { unlockedLevels: 1 };

    expect(reducer(stateBefore, actions.selectLevel(4))).toBe(stateBefore);
  });

  it('unlocks the next level, when finishing the highest unlocked level', () => {
    const stateBefore: State = { unlockedLevels: 5, selectedLevel: 4 };
    const action = actions.clearLevel();
    const stateAfter = reducer(stateBefore, action) as State;

    expect(selectors.isUnlocked(stateBefore, 5)).toBe(false);
    expect(selectors.isUnlocked(stateAfter, 5)).toBe(true);
  });

  it('does not unlock any level, when finishing a level already finished', () => {
    const stateBefore: State = { unlockedLevels: 5, selectedLevel: 3 };
    const action = actions.clearLevel();
    const stateAfter = reducer(stateBefore, action) as State;

    expect(selectors.isUnlocked(stateAfter, 5)).toBe(false);
  });

  it('unselects the level, when clearing it', () => {
    const stateBefore: State = { unlockedLevels: 5, selectedLevel: 3 };
    const action = actions.clearLevel();
    const stateAfter = reducer(stateBefore, action) as State;

    expect(selectors.getSelectedLevel(stateBefore)).toEqual(3);
    expect(selectors.getSelectedLevel(stateAfter)).toBeUndefined();
  });

  it('ignores unknown actions', () => {
    const state: State = {
      unlockedLevels: 1
    };
    const action = { type: 'any unknown action' };
    const resultingState = reducer(state, action as any);

    expect(resultingState).toBe(state);
  });

});
