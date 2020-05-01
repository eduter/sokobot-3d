import { Store } from 'redux';
import { State } from './ducks';


/**
 * Loads the specified state slices from local storage.
 */
function loadPersistedState(slices: Array<keyof State>): Partial<State> {
  const persistedState: Partial<State> = {};

  slices.forEach(sliceName => {
    try {
      const serializedSliceState = localStorage.getItem(sliceName);

      if (serializedSliceState) {
        persistedState[sliceName] = JSON.parse(serializedSliceState);
      }
    } catch (err) {
      console.warn(`Failed to load the state of slice "${sliceName}"`, err);
    }
  });
  return persistedState;
}

/**
 * Persists the specified state slices to local storage.
 */
function setupStatePersistence(store: Store<State>, slices: Array<keyof State>) {
  let previousState = new Map(Object.entries(store.getState()));

  store.subscribe(() => {
    const newState = new Map(Object.entries(store.getState()));
    const changedSlices = slices.filter(sliceName => newState.get(sliceName) !== previousState.get(sliceName));

    changedSlices.forEach(sliceName => {
      saveSliceState(sliceName, newState.get(sliceName)!);
    });
    if (changedSlices.length > 0) {
      previousState = newState;
    }
  });
}

/**
 * Save the specified slice to local storage.
 */
function saveSliceState<K extends keyof State>(sliceName: K, sliceState: State[K]) {
  try {
    const serializedSlice = JSON.stringify(sliceState);

    localStorage.setItem(sliceName, serializedSlice);
  } catch (err) {
    console.warn(`Failed to persist the state of slice "${sliceName}"`, err);
  }
}


export {
  loadPersistedState,
  setupStatePersistence
};
