import * as actions from './actions';
import reducer, { INITIAL_STATE } from './reducer';
import * as selectors from './selectors';
import { State } from './types';


describe('settings reducer', () => {

  it('initializes the state', () => {
    const action = { type: 'any unknown action' };
    const resultingState = reducer(undefined, action as any) as State;

    expect(selectors.displayOnScreenControls(resultingState)).toBe(true);
  });

  it('toggles on-screen controls', () => {
    {
      const stateBefore: State = { ...INITIAL_STATE, onScreenControls: true };
      const stateAfter = reducer(stateBefore, actions.toggleOnScreenControls()) as State;

      expect(selectors.displayOnScreenControls(stateAfter)).toBe(false);
    }
    {
      const stateBefore: State = { ...INITIAL_STATE, onScreenControls: false };
      const stateAfter = reducer(stateBefore, actions.toggleOnScreenControls()) as State;

      expect(selectors.displayOnScreenControls(stateAfter)).toBe(true);
    }
  });

  it('ignores unknown actions', () => {
    const action = { type: 'any unknown action' };
    const resultingState = reducer(INITIAL_STATE, action as any);

    expect(resultingState).toBe(INITIAL_STATE);
  });

});
