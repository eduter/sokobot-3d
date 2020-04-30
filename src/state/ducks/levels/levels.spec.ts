import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Cmd, Loop } from 'redux-loop';
import * as levels from '../../../levels';
import { gameActions } from '../game';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import { State } from './types';


jest.mock('../../../levels');

const getLevelNames = levels.getLevelNames as jest.Mock;
const getLevelMap = levels.getLevelMap as jest.Mock;


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
    // level map mock only needs to be truthy
    getLevelMap.mockReturnValueOnce({});

    const stateBefore: State = { unlockedLevels: 3 };
    const stateAfter = (reducer(stateBefore, actions.selectLevel(1)) as Loop<State, any>)[0];

    expect(selectors.getSelectedLevel(stateBefore)).toBeUndefined();
    expect(selectors.getSelectedLevel(stateAfter)).toEqual(1);
  });

  it('triggers gameActions.startLevel, when a level is successfully selected', () => {
    // level map mock only needs to be truthy
    const mapMock = 'map mock';
    getLevelMap.mockImplementation(level => level === 2 ? mapMock : undefined);

    const stateBefore: State = { unlockedLevels: 3 };
    const result = reducer(stateBefore, actions.selectLevel(2));

    expect(result).toEqual([
      { ...stateBefore, selectedLevel: 2 },
      Cmd.action(gameActions.startLevel(mapMock as any))
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

  it('keeps the selected level after clearing it, until another is selected', () => {
    const stateBefore: State = { unlockedLevels: 5, selectedLevel: 3 };
    const action = actions.clearLevel();
    const stateAfter = reducer(stateBefore, action) as State;

    expect(selectors.getSelectedLevel(stateBefore)).toEqual(3);
    expect(selectors.getSelectedLevel(stateAfter)).toEqual(3);
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

describe('selectors.getNextLevel()', () => {

  it('returns undefined, when no level is selected', () => {
    const state: State = { unlockedLevels: 5, selectedLevel: undefined };

    expect(selectors.getNextLevel(state)).toEqual(undefined);
  });

  it('returns the next level after the currently selected', () => {
    getLevelNames.mockReturnValue(['lv0', 'lv1', 'lv2', 'lv3']);
    expect(selectors.getNextLevel({ unlockedLevels: 5, selectedLevel: 0 })).toEqual(1);
    expect(selectors.getNextLevel({ unlockedLevels: 5, selectedLevel: 2 })).toEqual(3);
  });

  it('returns undefined, when the selected level is the last', () => {
    const state: State = { unlockedLevels: 5, selectedLevel: 2 };

    getLevelNames.mockReturnValueOnce(['lv0', 'lv1', 'lv2']);
    expect(selectors.getNextLevel(state)).toEqual(undefined);
  });

});
